import React from 'react';
import Link from 'next/link';
import type { BlogPost } from '@prisma/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
                <div className="flex items-center justify-between h-5 w-full">
                    <div className="flex gap-2 overflow-hidden mr-2">
                        {blog.tags.slice(0, 2).map((tag: string) => (
                            <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} className="hover:opacity-80 transition-opacity shrink-0">
                                <Badge variant="secondary" className="px-1.5 py-0 whitespace-nowrap cursor-pointer">
                                    {tag}
                                </Badge>
                            </Link>
                        ))}
                        {blog.tags.length > 2 && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Badge variant="secondary" className="px-1.5 py-0 whitespace-nowrap shrink-0 cursor-pointer">
                                        +{blog.tags.length - 2}
                                    </Badge>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="max-w-[200px] z-50 p-2 flex flex-wrap gap-1.5">
                                    {blog.tags.slice(2).map((tag: string) => (
                                        <DropdownMenuItem key={tag} asChild className="p-0 cursor-pointer focus:bg-transparent inline-flex shrink-0">
                                            <Link href={`/blog?tag=${encodeURIComponent(tag)}`}>
                                                <Badge variant="secondary" className="px-2 py-0.5 justify-center text-xs font-normal cursor-pointer hover:bg-secondary/80">
                                                    {tag}
                                                </Badge>
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                    {/* Add clicking the date filters from that date to today */}
                    <Link
                        href={`/blog?from=${(blog.publishedAt || blog.createdAt).toISOString()}`}
                        className="text-xs text-muted-foreground whitespace-nowrap hover:text-primary transition-colors cursor-pointer shrink-0"
                    >
                        {blog.publishedAt
                            ? format(new Date(blog.publishedAt), 'MMM dd, yyyy')
                            : format(new Date(blog.createdAt), 'MMM dd, yyyy')}
                    </Link>
                </div>

                {/* Line 2: Title */}
                <CardTitle
                    className="text-lg leading-tight truncate h-6 w-full block"
                    title={blog.title}
                >
                    <Link href={`/blog/${blog.slug}`} className="hover:text-primary transition-colors block w-full truncate">
                        {blog.title}
                    </Link>
                </CardTitle>

                {/* Lines 3 & 4: Description (2 lines max) */}
                <div className="h-10 w-full overflow-hidden">
                    <CardDescription
                        className="line-clamp-2 overflow-hidden text-sm text-muted-foreground leading-snug text-ellipsis"
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
