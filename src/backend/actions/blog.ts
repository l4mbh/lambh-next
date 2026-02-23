"use server"

import { db } from "@/backend/db"
import { notion, getNotionPage } from "@/backend/controllers/notion"
import { env } from "@/lib/env"
import { auth } from "@/backend/auth"
import slugify from 'slugify';

/**
 * Fetch all blog posts from the database.
 */
export async function getBlogs() {
    return db.blogPost.findMany({
        orderBy: { updatedAt: "desc" },
    })
}

/**
 * Fetch a single blog post by slug along with its Notion RecordMap.
 */
export async function getBlogBySlug(slug: string) {
    const blog = await db.blogPost.findUnique({
        where: { slug }
    })

    if (!blog) return null;

    const recordMap = await getNotionPage(blog.notionId)

    return {
        blog,
        recordMap
    }
}


/**
 * Interface mapping for the official Notion API properties.
 */
interface NotionPageProperties {
    [key: string]: any;
}

interface ParsedNotionPage {
    notionId: string;
    title: string;
    slug: string;
    description: string | null;
    coverImage: string | null;
    tags: string[];
    published: boolean;
    publishedAt: Date | null;
}

/**
 * Sync blog posts from Notion database into PostgreSQL.
 * Uses the official Notion REST API to fetch database pages and extract properties.
 */
export async function syncBlogsFromNotion() {
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
        return { error: "Unauthorized" }
    }

    const databaseId = env.NOTION_DATABASE_ID
    if (!databaseId) {
        return { error: "NOTION_DATABASE_ID is not configured in .env" }
    }

    try {
        const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${env.NOTION_API_KEY}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Notion API Error:", errorText);
            return { error: `Failed to fetch Notion database: ${response.statusText}` };
        }

        const data = await response.json();
        const results = data.results || [];

        // Extract pages from results
        const pages: ParsedNotionPage[] = []

        for (const page of results) {
            if (page.object !== "page") continue;

            const properties: NotionPageProperties = page.properties || {};

            // Extract title
            const titleProp = properties["Title"] || properties["title"] || properties["Name"] || properties["name"];
            const title = titleProp?.title?.[0]?.plain_text || "Untitled";

            if (!title || title === "Untitled") continue;

            // Extract custom slug (if exists)
            const slugProp = properties["Slug"] || properties["slug"];
            const customSlug = slugProp?.rich_text?.[0]?.plain_text || null;

            // Generate fallback slug
            const generatedSlug = customSlug || slugify(title, { replacement: '-', lower: true, strict: true, locale: 'vi' });

            // Final slug includes notionId to avoid duplicates
            const finalSlug = `${generatedSlug}-${page.id.substring(0, 8)}`;

            // Extract description
            const descProp = properties["Description"] || properties["description"];
            const description = descProp?.rich_text?.[0]?.plain_text || null;

            // Extract tags
            const tagsProp = properties["Tags"] || properties["tags"];
            const tags = tagsProp?.multi_select?.map((t: { name: string }) => t.name) || [];

            // Extract published
            const pubProp = properties["Published"] || properties["published"];
            const published = pubProp?.checkbox ?? false;

            // Extract publishedAt
            const pubAtProp = properties["Published At"] || properties["published at"];
            const publishedAtStr = pubAtProp?.date?.start || null;
            const publishedAt = publishedAtStr ? new Date(publishedAtStr) : null;

            // Extract cover image (fallback to custom "Cover Image" property if native cover is empty)
            let coverImage = null;
            if (page.cover) {
                if (page.cover.type === "external") {
                    coverImage = page.cover.external.url;
                } else if (page.cover.type === "file") {
                    coverImage = page.cover.file.url;
                }
            } else {
                const customCoverProp = properties["Cover Image"] || properties["cover image"] || properties["Cover image"] || properties["cover_image"];
                if (customCoverProp?.type === 'url') {
                    coverImage = customCoverProp.url;
                } else if (customCoverProp?.type === 'files' && customCoverProp.files?.length > 0) {
                    const file = customCoverProp.files[0];
                    coverImage = file.type === 'external' ? file.external.url : file.file.url;
                }
            }

            pages.push({
                notionId: page.id,
                title: title.trim(),
                slug: finalSlug,
                description,
                coverImage,
                tags,
                published,
                publishedAt
            })
        }

        // Upsert each page into the database
        let syncedCount = 0
        for (const page of pages) {
            await db.blogPost.upsert({
                where: { notionId: page.notionId },
                update: {
                    title: page.title,
                    slug: page.slug, // Update the slug as well if it changed
                    description: page.description,
                    coverImage: page.coverImage,
                    tags: page.tags,
                    published: page.published,
                    publishedAt: page.publishedAt,
                },
                create: {
                    notionId: page.notionId,
                    title: page.title,
                    slug: page.slug,
                    description: page.description,
                    coverImage: page.coverImage,
                    tags: page.tags,
                    published: page.published,
                    publishedAt: page.publishedAt || new Date(),
                },
            })
            syncedCount++
        }

        return { success: true, count: syncedCount }
    } catch (err) {
        console.error("Error syncing blogs from Notion:", err)
        return { error: "Failed to sync blogs from Notion. Check server logs." }
    }
}
