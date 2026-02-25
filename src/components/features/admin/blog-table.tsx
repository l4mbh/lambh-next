"use client"

import { useState, useTransition } from "react"
import { syncBlogsFromNotion, getBlogs } from "@/backend/actions/blog"
import { Button } from "@/components/ui/button"
import { RefreshCw, ExternalLink, FileText } from "lucide-react"
import { toast } from "sonner"

interface BlogPost {
    id: string
    notionId: string
    title: string
    slug: string
    description: string | null
    coverImage: string | null
    tags: string[]
    published: boolean
    publishedAt: Date | null
    createdAt: Date
    updatedAt: Date
}

interface BlogTableProps {
    initialBlogs: BlogPost[]
}

export function BlogTable({ initialBlogs }: BlogTableProps) {
    const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs)
    const [isSyncing, startSync] = useTransition()

    const handleSync = () => {
        startSync(async () => {
            const result = await syncBlogsFromNotion()

            if (result.error) {
                toast.error(result.error)
                return
            }

            toast.success(`Synced ${result.count} blog posts from Notion`)

            // Refresh the list
            const { posts: updated } = await getBlogs({ limit: 1000, publishedOnly: false })
            setBlogs(updated)
        })
    }

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <div className="space-y-4">
            {/* Action Bar */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    {blogs.length} blog post{blogs.length !== 1 ? "s" : ""}
                </p>
                <Button
                    onClick={handleSync}
                    disabled={isSyncing}
                    variant="default"
                    iconPlacement="right"
                    icon={<RefreshCw className={`h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />}
                >
                    {isSyncing ? "Syncing..." : "Sync"}
                </Button>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-muted/50">
                                <th className="text-left font-medium px-4 py-3 text-muted-foreground">Title</th>
                                <th className="text-left font-medium px-4 py-3 text-muted-foreground">Slug</th>
                                <th className="text-left font-medium px-4 py-3 text-muted-foreground">Tags</th>
                                <th className="text-left font-medium px-4 py-3 text-muted-foreground">Status</th>
                                <th className="text-left font-medium px-4 py-3 text-muted-foreground">Updated</th>
                                <th className="text-left font-medium px-4 py-3 text-muted-foreground w-[80px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                                        <div className="flex flex-col items-center gap-3">
                                            <FileText className="h-10 w-10 text-muted-foreground/40" />
                                            <div>
                                                <p className="font-medium">No blog posts yet</p>
                                                <p className="text-xs mt-1">Click &quot;Sync from Notion&quot; to import your posts.</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                blogs.map((blog) => (
                                    <tr
                                        key={blog.id}
                                        className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                                    >
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                {blog.coverImage && (
                                                    <img
                                                        src={blog.coverImage}
                                                        alt=""
                                                        className="h-8 w-12 rounded object-cover shrink-0"
                                                    />
                                                )}
                                                <span className="font-medium truncate max-w-[250px]">
                                                    {blog.title}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <code className="text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                                                {blog.slug}
                                            </code>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-1 flex-wrap">
                                                {blog.tags.length > 0 ? (
                                                    blog.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-muted-foreground text-xs">—</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${blog.published
                                                    ? "bg-green-500/10 text-green-500"
                                                    : "bg-yellow-500/10 text-yellow-500"
                                                    }`}
                                            >
                                                {blog.published ? "Published" : "Draft"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                                            {formatDate(blog.updatedAt)}
                                        </td>
                                        <td className="px-4 py-3">
                                            <a
                                                href={`https://notion.so/${blog.notionId.replace(/-/g, "")}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center h-8 w-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                                title="Open in Notion"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
