import { Sidebar } from "@/components/layout/sidebar"
import { auth } from "@/backend/auth"

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    return (
        <div className="flex h-screen overflow-hidden bg-background dark:bg-black">
            <Sidebar session={session} />
            <main className="flex-1 w-full flex flex-col pt-16">
                {/* pt-16 ensures content starts after the 4rem/64px navbar */}
                <div className="h-full w-full overflow-y-auto overflow-x-hidden p-6">
                    {children}
                </div>
            </main>
        </div>
    )
}
