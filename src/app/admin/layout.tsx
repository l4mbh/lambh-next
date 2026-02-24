import { Navbar } from "@/components/layout/navbar"
import { auth } from "@/backend/auth"
import { redirect } from "next/navigation"
import type { Metadata } from "next"
import { AppBreadcrumb } from "@/components/layout/app-breadcrumb"
import { AdminSidebar } from "@/components/layout/admin-sidebar"

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "Admin area for Next_Lambh.io.vn",
}

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN") {
        // Safety check (Middleware also protects this, but good to be redundant)
        redirect("/")
    }

    return (
        <div className="flex min-h-screen">
            <Navbar session={session} />
            <AdminSidebar />
            <div className="flex w-full flex-col sm:pl-64">
                <main className="flex-1 w-full flex flex-col pt-16">
                    <header className="h-14 border-b border-border flex items-center px-6 shrink-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <h1 className="font-semibold text-sm">Administration Panel</h1>
                    </header>
                    <div className="flex-1 w-full p-6">
                        <AppBreadcrumb />
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
