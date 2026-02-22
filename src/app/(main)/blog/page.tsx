import { getNotionPage } from "@/backend/controllers/notion"
import { ClientNotionRenderer } from "@/components/features/blog/notion-renderer-wrapper"
import { env } from "@/lib/env"

export default async function BlogPage() {

    const pageId = env.NOTION_DATABASE_ID || "notion-community-002bf9298ee747c3bd29ffca71ea5330" // Fallback to a public example page
    const recordMap = await getNotionPage(pageId)

    if (!recordMap) {
        return (
            <div className="p-8">
                <h2 className="text-xl font-bold mb-4">Blog</h2>
                <p className="text-muted-foreground">Unable to fetch Notion content. Please check your NOTION_DATABASE_ID or API key.</p>
            </div>
        )
    }

    return (
        <div className="blog-container p-4 lg:p-8">
            <ClientNotionRenderer recordMap={recordMap} darkMode={true} />
        </div>
    )
}
