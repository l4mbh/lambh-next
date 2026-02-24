"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MonitorPlay, LayoutDashboard, FileText, Settings, Search } from "lucide-react"

import { UserNav } from "./user-nav"
import type { Session } from "next-auth"

export function Navbar({ session }: { session: Session | null }) {
    const pathname = usePathname()

    const navItems = [
        { icon: MonitorPlay, label: "Home", href: "/" },
        { icon: FileText, label: "Blog", href: "/blog" },
    ]

    const adminItems = [
        { icon: LayoutDashboard, label: "Admin", href: "/admin" },
        { icon: FileText, label: "Blog Mgmt", href: "/admin/blogs" },
        { icon: Settings, label: "Settings", href: "/admin/settings" },
    ]

    const BottomGroup = () => (
        <div className="flex items-center gap-4">
            <UserNav session={session} />
        </div>
    )

    return (
        <header className="fixed inset-x-0 top-0 z-20 flex h-16 items-center justify-center border-b border-border bg-background/80 backdrop-blur-md px-4 md:px-8">
            <div className="w-full max-w-7xl mx-auto flex items-center justify-between h-full">
                {/* Main Nav - Left Aligned */}
                <nav className="flex items-center justify-start h-full overflow-x-auto no-scrollbar flex-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                title={item.label}
                                className={`relative flex items-center justify-center w-24 md:w-28 h-full shrink-0 text-sm font-medium transition-colors group ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                <span className="text-center w-full truncate px-2">{item.label}</span>
                                {/* Active/Hover Indicator */}
                                <span
                                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-primary transition-transform duration-300 ease-out origin-left ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                        }`}
                                />
                            </Link>
                        )
                    })}

                    {/* Divider */}
                    {session?.user.role === "ADMIN" && (
                        <div className="h-4 w-px bg-border/50 shrink-0 mx-2" />
                    )}

                    {/* Admin Nav if authorized */}
                    {session?.user.role === "ADMIN" && adminItems.map((item) => {
                        const isActive = pathname.startsWith(item.href)
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                title={item.label}
                                className={`relative flex items-center justify-center w-28 h-full shrink-0 text-sm font-medium transition-colors group ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                <span className="text-center w-full truncate px-2">{item.label}</span>
                                {/* Active/Hover Indicator */}
                                <span
                                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-primary transition-transform duration-300 ease-out origin-left ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                        }`}
                                />
                            </Link>
                        )
                    })}
                </nav>

                {/* Right Side - User Actions */}
                <div className="flex shrink-0 justify-end ml-4">
                    <BottomGroup />
                </div>
            </div>
        </header>
    )
}
