import { Navbar } from "@/components/layout/navbar"
import { auth } from "@/backend/auth"
import { AppBreadcrumb } from "@/components/layout/app-breadcrumb"
import { BackToTop } from "@/components/layout/back-to-top"

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    return (
        <div className="flex min-h-screen flex-col relative w-full">
            <Navbar session={session} />
            <main className="flex-1 w-full flex flex-col pt-16">
                {/* pt-16 ensures content starts after the 4rem/64px navbar */}
                <AppBreadcrumb className="w-full px-6 pt-6 max-w-7xl mx-auto" />
                <div className="w-full">
                    {children}
                </div>
            </main>
            <BackToTop />
        </div>
    )
}
