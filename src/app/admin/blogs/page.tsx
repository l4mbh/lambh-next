import { getBlogs } from "@/backend/actions/blog"
import { BlogTable } from "@/components/features/admin/blog-table"

export default async function AdminBlogsPage() {
    const blogs = await getBlogs()

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
