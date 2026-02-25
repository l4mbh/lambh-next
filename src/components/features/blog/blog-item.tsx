import React from 'react';
import Link from 'next/link';
import type { BlogPost } from '@prisma/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Button } from '@/components/ui/button';

interface BlogItemProps {
    blog: BlogPost;
}

export function BlogItem({ blog }: BlogItemProps) {
    // Shared logic with NotionPageRenderer to appropriately route Notion-hosted images
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
        <Card className="flex flex-col bg-black h-full overflow-hidden transition-all hover:shadow-md hover:border-primary/50 group">
            {blog.coverImage ? (
                <div className="relative rounded-lg !w-[95%] mx-auto mt-2 h-48 overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={imageUrl}
                        alt={blog.title}
                        className="object-cover rounded-lg w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            ) : <div className="relative flex items-center justify-center w-[95%] mx-auto mt-2 h-48 overflow-hidden bg-black rounded-lg ">
                <div className="flex items-center justify-center w-full h-full">
                    <span className="text-white text-2xl font-bold letter-spacing-5 space-x-2">POST</span>
                </div>
            </div>}
            <Separator />
            <CardHeader className="flex-grow p-4 gap-y-2">
                {/* Line 1: Tags & Date */}
                <div className="flex items-center justify-between h-5">
                    <div className="flex gap-2 overflow-hidden mr-2">
                        {blog.tags.map((tag: string) => (
                            <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} className="hover:opacity-80 transition-opacity">
                                <Badge variant="secondary" className="px-1.5 py-0 whitespace-nowrap cursor-pointer">
                                    {tag}
                                </Badge>
                            </Link>
                        ))}
                    </div>
                    {/* Add clicking the date filters from that date to today */}
                    <Link
                        href={`/blog?from=${(blog.publishedAt || blog.createdAt).toISOString()}`}
                        className="text-xs text-muted-foreground whitespace-nowrap hover:text-primary transition-colors cursor-pointer"
                    >
                        {blog.publishedAt
                            ? format(new Date(blog.publishedAt), 'MMM dd, yyyy')
                            : format(new Date(blog.createdAt), 'MMM dd, yyyy')}
                    </Link>
                </div>

                {/* Line 2: Title */}
                <CardTitle
                    className="text-lg leading-tight line-clamp-1 h-6"
                    title={blog.title}
                >
                    <Link href={`/blog/${blog.slug}`} className="hover:text-primary transition-colors">
                        {blog.title}
                    </Link>
                </CardTitle>

                {/* Lines 3 & 4: Description (2 lines max) */}
                <div className="h-10">
                    <CardDescription
                        className="line-clamp-2 text-sm text-muted-foreground leading-snug"
                        title={blog.description || "No description provided."}
                    >
                        {blog.description || <span className="invisible">No description provided.</span>}
                    </CardDescription>
                </div>
            </CardHeader>
            <Separator />
            <CardFooter className="pt-0 text-xs text-muted-foreground text-center flex items-center justify-center">
                <Link href={`/blog/${blog.slug}`} className="text-primary hover:underline font-medium">
                    <Button variant="postItem">
                        Read more
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
