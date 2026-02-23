import React from 'react';
import type { BlogPost } from '@prisma/client';
import { BlogItem } from './blog-item';

interface BlogListProps {
    blogs: BlogPost[];
}

export function BlogList({ blogs }: BlogListProps) {
    if (!blogs || blogs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <h3 className="text-xl font-semibold mb-2">No posts available</h3>
                <p className="text-muted-foreground">Check back later for new content!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
                <BlogItem key={blog.id} blog={blog} />
            ))}
        </div>
    );
}
