import { Metadata } from "next"
import { db } from "@/backend/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, ArrowUpRight } from "lucide-react"

export const metadata: Metadata = {
    title: "Admin Dashboard | Next_Lambh.io.vn",
    description: "Admin dashboard overview",
}

async function getDashboardStats() {
    const now = new Date()
    const thisWeekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay())
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)

    const [
        totalUsers,
        newUsersThisWeek,
        newUsersThisMonth,
        totalBlogs,
        newBlogsThisWeek,
        newBlogsThisMonth,
    ] = await Promise.all([
        db.user.count(),
        db.user.count({ where: { createdAt: { gte: thisWeekStart } } }),
        db.user.count({ where: { createdAt: { gte: thisMonthStart } } }),
        db.blogPost.count(),
        db.blogPost.count({ where: { createdAt: { gte: thisWeekStart } } }),
        db.blogPost.count({ where: { createdAt: { gte: thisMonthStart } } }),
    ])

    return {
        users: {
            total: totalUsers,
            newThisWeek: newUsersThisWeek,
            newThisMonth: newUsersThisMonth,
        },
        blogs: {
            total: totalBlogs,
            newThisWeek: newBlogsThisWeek,
            newThisMonth: newBlogsThisMonth,
        },
    }
}

export default async function AdminDashboardPage() {
    const stats = await getDashboardStats()

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">
                    Overview of your platform's key performance indicators.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Users Metric */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="tracking-tight text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.users.total.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center">
                            <ArrowUpRight className="h-3 w-3 mr-1 text-emerald-500" />
                            <span className="text-emerald-500 font-medium">{stats.users.newThisMonth}</span> new this month
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            +{stats.users.newThisWeek} this week
                        </p>
                    </CardContent>
                </Card>

                {/* Blogs Metric */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="tracking-tight text-sm font-medium">Total Blogs</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.blogs.total.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center">
                            <ArrowUpRight className="h-3 w-3 mr-1 text-emerald-500" />
                            <span className="text-emerald-500 font-medium">{stats.blogs.newThisMonth}</span> new this month
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            +{stats.blogs.newThisWeek} this week
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
