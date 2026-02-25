import { getBlogs } from "@/backend/actions/blog"
import { BlogTable } from "@/components/features/admin/blog-table"

export default async function AdminBlogsPage() {
    // Admin needs to see all blogs, so we disable publishedOnly and fetch a large limit
    const { posts: blogs } = await getBlogs({ limit: 10, publishedOnly: false })

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Blog Management</h2>
                <p className="text-muted-foreground">
                    Manage and sync your blog posts from Notion.
                </p>
            </div>

            <BlogTable initialBlogs={blogs} />
        </div>
    )
}
