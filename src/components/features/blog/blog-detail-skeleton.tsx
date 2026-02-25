import { Skeleton } from "@/components/ui/skeleton";

export function BlogDetailSkeleton() {
    return (
        <article className="container mx-auto p-4 lg:p-8 space-y-12 max-w-3xl relative animate-in fade-in duration-500">
            {/* Breadcrumb Skeleton */}
            <div className="flex items-center space-x-2 w-1/3">
                <Skeleton className="h-4 w-16" />
                <span className="text-muted-foreground">/</span>
                <Skeleton className="h-4 w-12" />
                <span className="text-muted-foreground">/</span>
                <Skeleton className="h-4 w-32" />
            </div>

            {/* Header Skeleton */}
            <header className="space-y-6 text-center pb-8 border-b border-border/40 flex flex-col items-center">
                {/* Tags */}
                <div className="flex justify-center gap-2 mb-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                </div>

                {/* Title */}
                <div className="space-y-2 w-full flex flex-col items-center">
                    <Skeleton className="h-10 md:h-12 w-3/4" />
                    <Skeleton className="h-10 md:h-12 w-1/2" />
                </div>

                {/* Date */}
                <Skeleton className="h-4 w-32 mt-4" />
            </header>

            {/* Cover Image Skeleton */}
            <Skeleton className="w-full aspect-[21/9] rounded-2xl shadow-2xl ring-1 ring-border/50" />

            {/* Content Skeleton */}
            <div className="mt-12 space-y-6">
                <Skeleton className="h-8 w-1/3 mb-6" /> {/* Heading */}
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />

                <div className="py-4" />

                <Skeleton className="h-8 w-1/4 mb-6" /> {/* Subheading */}
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-11/12" />

                <div className="py-6" />

                {/* Image block skeleton */}
                <Skeleton className="w-full aspect-video rounded-lg" />
            </div>

            {/* Comments Area Skeleton */}
            <div className="mt-16 pt-8 border-t border-border/40 space-y-6">
                <Skeleton className="h-8 w-40" />
                <div className="flex space-x-4">
                    <Skeleton className="h-10 w-10 border-radius-full rounded-full" />
                    <div className="space-y-2 flex-1">
                        <Skeleton className="h-20 w-full rounded-md" />
                        <div className="flex justify-end">
                            <Skeleton className="h-10 w-24 rounded-md" />
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
