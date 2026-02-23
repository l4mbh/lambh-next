import { getBlogBySlug } from "@/backend/actions/blog";
import { NotionPageRenderer } from "@/components/features/blog/notion-page-renderer";
import { BreadcrumbTitleUpdater } from "@/components/features/blog/breadcrumb-title-updater";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";

import "react-notion-x/src/styles.css";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const data = await getBlogBySlug(slug);

    if (!data || !data.recordMap || !data.blog) {
        return notFound();
    }

    const { blog, recordMap } = data;

    const getCoverImageUrl = (url: string | null, blockId: string) => {
        if (!url) return undefined;
        if (url.startsWith("data:") || url.startsWith("http") && !url.includes("amazonaws.com") && !url.includes("secure.notion-static.com")) {
            return url;
        }

        try {
            const u = new URL(url.startsWith("https") ? url : `https://www.notion.so${url.startsWith("/") ? url : `/${url}`}`);
            if (u.pathname.startsWith("/secure.notion-static.com") && u.hostname.endsWith(".amazonaws.com")) {
                return `https://www.notion.so${u.pathname}?table=block&id=${blockId}&cache=v2`;
            }
        } catch (e) {
            // Ignore invalid urls
        }

        if (url.startsWith("/images")) {
            return `https://www.notion.so${url}`;
        }

        const urlObj = new URL('https://www.notion.so/image/' + encodeURIComponent(url));
        urlObj.searchParams.set('table', 'block');
        urlObj.searchParams.set('id', blockId);
        urlObj.searchParams.set('cache', 'v2');
        return urlObj.toString();
    };

    const imageUrl = getCoverImageUrl(blog.coverImage, blog.notionId);

    return (
        <article className="container mx-auto p-4 lg:p-8 space-y-12 max-w-3xl relative">
            <BreadcrumbTitleUpdater slug={slug} title={blog.title} />

            <header className="space-y-6 text-center pb-8 border-b border-border/40">
                {blog.tags && blog.tags.length > 0 && (
                    <div className="flex justify-center gap-2 mb-2 flex-wrap">
                        {blog.tags.map((tag: string) => (
                            <span key={tag} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full font-medium tracking-wide">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                    {blog.title}
                </h1>
                <div className="text-sm text-muted-foreground pt-2">
                    <time dateTime={new Date(blog.publishedAt || blog.createdAt).toISOString()}>
                        {format(new Date(blog.publishedAt || blog.createdAt), 'MMMM dd, yyyy')}
                    </time>
                </div>
            </header>

            {blog.coverImage && (
                <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border/50">
                    <img
                        src={imageUrl}
                        alt={blog.title}
                        className="object-cover w-full h-full"
                    />
                </div>
            )}

            <div className="mt-12 notion-wrapper">
                <NotionPageRenderer recordMap={recordMap} />
            </div>
        </article>
    );
}
