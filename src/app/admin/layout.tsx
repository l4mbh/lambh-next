import { Sidebar } from "@/components/layout/sidebar"
import { auth } from "@/backend/auth"
import { redirect } from "next/navigation"

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
        <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar session={session} />
            <main className="flex-1 w-full flex flex-col pt-16">
                <header className="h-14 border-b border-border flex items-center px-6 shrink-0">
                    <h1 className="font-semibold text-sm">Administration Panel</h1>
                </header>

                <div className="flex-1 w-full overflow-y-auto p-6">
                    {children}
                </div>
            </main>
        </div>
    )
}
