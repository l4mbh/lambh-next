import { Skeleton } from "@/components/ui/skeleton"
import { Search } from "lucide-react"

export function BlogListSkeleton() {
    return (
        <div className="space-y-8">
            {/* Header and Toggle Skeleton */}
            <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-end border-b border-border/40 pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Here i share what i think</h1>
                    <p className="text-muted-foreground mt-2">
                        I share my thoughts about technology, life, and everything in between.
                    </p>
                </div>
                <div className="shrink-0">
                    <Skeleton className="h-10 w-32 bg-zinc-900 rounded-full" />
                </div>
            </div>
            {/* Filter Controls Skeleton */}
            <div className="flex flex-col gap-6 p-6 bg-zinc-950 border border-zinc-900 rounded-lg shadow-sm">

                {/* Top Row: Search input skeleton */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-700" />
                    <Skeleton className="h-10 w-full bg-zinc-900 rounded-md" />
                </div>

                {/* Bottom Row: Tags skeleton */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <Skeleton key={i} className="h-6 w-16 bg-zinc-900 rounded-full" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Results Skeleton grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex flex-col bg-black h-full overflow-hidden border border-zinc-900 rounded-xl">
                        {/* Cover Image */}
                        <Skeleton className="w-full h-48 bg-zinc-900 rounded-none" />

                        {/* Content Area */}
                        <div className="flex-grow p-4 gap-y-2 flex flex-col">
                            {/* Tags & Date */}
                            <div className="flex items-center justify-between h-5 mb-2">
                                <div className="flex gap-2">
                                    <Skeleton className="h-4 w-12 bg-zinc-900 rounded" />
                                    <Skeleton className="h-4 w-16 bg-zinc-900 rounded" />
                                </div>
                                <Skeleton className="h-4 w-20 bg-zinc-900 rounded" />
                            </div>

                            {/* Title */}
                            <Skeleton className="h-6 w-3/4 bg-zinc-900 rounded mb-2" />

                            {/* Description */}
                            <div className="h-10 space-y-1">
                                <Skeleton className="h-4 w-full bg-zinc-900 rounded" />
                                <Skeleton className="h-4 w-2/3 bg-zinc-900 rounded" />
                            </div>
                        </div>

                        {/* Footer button */}
                        <div className="p-4 pt-0 flex justify-center">
                            <Skeleton className="h-9 w-24 bg-zinc-900 rounded" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="pt-8 flex justify-center">
                <Skeleton className="h-10 w-64 bg-zinc-900 rounded-md" />
            </div>
        </div>
    )
}
