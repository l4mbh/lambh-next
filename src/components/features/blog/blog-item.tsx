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
    return (
        <Card className="flex flex-col bg-black h-full overflow-hidden transition-all hover:shadow-md hover:border-primary/50 group">
            {blog.coverImage ? (
                <div className="relative w-full h-48 overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            ) : <div className="relative w-full h-48 overflow-hidden bg-black rounded-lg ">
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
                            <Badge key={tag} variant="secondary" className="px-1.5 py-0 whitespace-nowrap">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {blog.publishedAt
                            ? format(new Date(blog.publishedAt), 'MMM dd, yyyy')
                            : format(new Date(blog.createdAt), 'MMM dd, yyyy')}
                    </span>
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
