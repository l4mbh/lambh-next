import { getBlogs } from "@/backend/actions/blog"
import { BlogList } from "@/components/features/blog/blog-list"

export default async function BlogPage() {
    // Fetch blogs from PostgreSQL database
    const blogs = await getBlogs()

    // Filter only published blogs for the public facing page
    const publishedBlogs = blogs.filter((blog: any) => blog.published)

    return (
        <div className="container mx-auto p-4 lg:p-8 space-y-8 max-w-7xl">
            <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Our Blog</h1>
                    <p className="text-muted-foreground mt-2">
                        Read the latest news, updates, and articles.
                    </p>
                </div>
            </div>

            <BlogList blogs={publishedBlogs} />
        </div>
    )
}
