"use client"

import React, { useState, useEffect } from 'react';
import type { BlogPost } from '@prisma/client';
import { BlogItem } from './blog-item';
import { parseAsString, parseAsInteger, useQueryState } from 'nuqs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, X, Calendar, ListFilter } from 'lucide-react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface BlogListProps {
    blogs: BlogPost[];
    allTags: string[];
    totalPages: number;
    currentPage: number;
}

export function BlogList({ blogs, allTags, totalPages, currentPage }: BlogListProps) {
    // 1. URL State with nuqs (Server takes care of filtering based on these)
    // We must pass { shallow: false } so Next.js actively fetches the new Server Component state
    const [searchQuery, setSearchQuery] = useQueryState('q', parseAsString.withOptions({ shallow: false }).withDefault(''));
    const [selectedTag, setSelectedTag] = useQueryState('tag', parseAsString.withOptions({ shallow: false }).withDefault(''));
    const [dateFrom, setDateFrom] = useQueryState('from', parseAsString.withOptions({ shallow: false }).withDefault(''));
    const [page, setPage] = useQueryState('page', parseAsInteger.withOptions({ shallow: false }).withDefault(1));

    // 2. Local state for debouncing the search input
    const [localSearch, setLocalSearch] = useState(searchQuery || '');

    // Debounce effect
    useEffect(() => {
        const handler = setTimeout(() => {
            if (localSearch !== (searchQuery || '')) {
                setSearchQuery(localSearch || null);
                setPage(null); // Reset page on new search
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [localSearch, setSearchQuery, searchQuery, setPage]);

    // Clear all filters
    const clearFilters = () => {
        setLocalSearch('');
        setSearchQuery(null);
        setSelectedTag(null);
        setDateFrom(null);
        setPage(null); // Reset to page 1 implicitly
    };

    const hasActiveFilters = searchQuery !== '' || selectedTag !== '' || dateFrom !== '';

    // Filter Toggle State (Default open if filters are active)
    const [showFilters, setShowFilters] = useState(hasActiveFilters);

    // Pagination logic
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage === 1 ? null : newPage);
        }
    };

    const createPageRange = () => {
        const delta = 2; // Number of pages to show around current
        const range = [];
        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            range.unshift("...");
        }
        if (currentPage + delta < totalPages - 1) {
            range.push("...");
        }

        range.unshift(1);
        if (totalPages > 1) {
            range.push(totalPages);
        }

        return range;
    }

    return (
        <div className="space-y-8">
            {/* Header and Toggle */}
            <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-end border-b border-border/40 pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Here i share what i think</h1>
                    <p className="text-muted-foreground mt-2">
                        I share my thoughts about technology, life, and everything in between.
                    </p>
                </div>
                <Button
                    variant={hasActiveFilters && !showFilters ? "secondary" : "outline"}
                    onClick={() => setShowFilters(!showFilters)}
                    className="shrink-0 rounded-full"
                    size="sm"
                    icon={<ListFilter className="w-4 h-4 mr-2" />}
                    iconPlacement="left"
                >
                    <span className="flex items-center gap-2">
                        {showFilters ? "Hide Filters" : "Show Filters"}
                        {hasActiveFilters && !showFilters && (
                            <span className="ml-2 flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                        )}
                    </span>
                </Button>
            </div>

            {/* Filter Controls Section */}
            {showFilters && (
                <div className="flex flex-col gap-6 p-6 bg-zinc-950 border border-zinc-900 rounded-lg shadow-sm animate-in slide-in-from-top-4 fade-in duration-300">

                    {/* Top Row: Search input */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <Input
                            placeholder="Search posts by title or description..."
                            value={localSearch}
                            onChange={(e) => {
                                setLocalSearch(e.target.value);
                            }}
                            className="pl-10 bg-black border-zinc-900 focus-visible:ring-zinc-800"
                        />
                        {localSearch && (
                            <button
                                onClick={() => {
                                    setLocalSearch('');
                                    setSearchQuery(null);
                                    setPage(null);
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    {/* Bottom Row: Tags & Clear Filters */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

                        {/* Tags List */}
                        <div className="flex flex-wrap gap-2">
                            {allTags.map(tag => (
                                <Badge
                                    key={tag}
                                    variant={selectedTag === tag ? "default" : "secondary"}
                                    className={`cursor-pointer transition-colors px-3 py-1 text-xs ${selectedTag === tag
                                        ? "bg-white text-black hover:bg-zinc-200"
                                        : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                                        }`}
                                    onClick={() => {
                                        setSelectedTag(selectedTag === tag ? null : tag);
                                        setPage(null); // Reset pagination
                                    }}
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        {/* Active Filters Info & Clear Button */}
                        {hasActiveFilters && (
                            <div className="flex items-center gap-3 text-xs">
                                {dateFrom && (
                                    <span className="flex items-center gap-1 text-zinc-400 bg-zinc-900 px-2 py-1 rounded">
                                        <Calendar className="h-3 w-3" />
                                        Since: {new Date(dateFrom).toLocaleDateString()}
                                    </span>
                                )}
                                <button
                                    onClick={clearFilters}
                                    className="text-zinc-500 hover:text-white transition-colors flex items-center gap-1 font-medium group"
                                >
                                    <X className="h-3 w-3 group-hover:text-red-400" />
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Results Section */}
            {!blogs || blogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
                    <div className="bg-zinc-900/50 rounded-full p-4 mb-4">
                        <Search className="h-6 w-6 text-zinc-500" />
                    </div>
                    <h3 className="text-lg font-medium mb-1 text-zinc-300">
                        {hasActiveFilters ? "No matching posts" : "No posts available"}
                    </h3>
                    <p className="text-zinc-500 text-sm mb-4">
                        {hasActiveFilters ? "We couldn't find anything matching your current filters." : "Check back later for new content!"}
                    </p>
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className="text-xs font-medium text-black bg-white px-4 py-2 rounded uppercase tracking-widest hover:bg-zinc-200 transition-colors"
                        >
                            Clear all filters
                        </button>
                    )}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
                        {blogs.map((blog) => (
                            <BlogItem key={blog.id} blog={blog} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pt-8">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                                            className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                        />
                                    </PaginationItem>

                                    {createPageRange().map((p, i) => (
                                        <PaginationItem key={i}>
                                            {p === "..." ? (
                                                <PaginationEllipsis />
                                            ) : (
                                                <PaginationLink
                                                    href="#"
                                                    isActive={currentPage === p}
                                                    onClick={(e) => { e.preventDefault(); handlePageChange(p as number); }}
                                                >
                                                    {p}
                                                </PaginationLink>
                                            )}
                                        </PaginationItem>
                                    ))}

                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                                            className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
