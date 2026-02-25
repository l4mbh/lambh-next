import { BlogListSkeleton } from "@/components/features/blog/blog-list-skeleton"

export default function BlogLoading() {
    return (
        <div className="container mx-auto p-4 lg:p-8 space-y-8 max-w-7xl">

            <BlogListSkeleton />
        </div>
    )
}
