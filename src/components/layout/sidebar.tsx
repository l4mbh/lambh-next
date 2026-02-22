"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MonitorPlay, LayoutDashboard, FileText, Settings, Search } from "lucide-react"

import { UserNav } from "./user-nav"
import type { Session } from "next-auth"

export function Sidebar({ session }: { session: Session | null }) {
    const pathname = usePathname()

    const navItems = [
        { icon: MonitorPlay, label: "Home", href: "/" },
        { icon: FileText, label: "Blog", href: "/blog" },
    ]

    const adminItems = [
        { icon: LayoutDashboard, label: "Admin", href: "/admin" },
        { icon: Settings, label: "Settings", href: "/admin/settings" },
    ]

    const BottomGroup = () => (
        <div className="flex items-center gap-4">
            <button className="text-muted-foreground hover:text-foreground">
                <Settings className="w-5 h-5" />
            </button>
            <UserNav session={session} />
        </div>
    )

    return (
        <header className="fixed inset-x-0 top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-sidebar px-4 md:px-6">
            {/* Main Nav */}
            <nav className="flex items-center gap-1 sm:gap-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            title={item.label}
                            className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${isActive
                                ? "bg-primary/10 text-primary"
                                : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                                }`}
                        >
                            <item.icon className="h-5 w-5 stroke-[1.5]" />
                            <span className="text-sm font-medium hidden sm:inline-block">{item.label}</span>
                        </Link>
                    )
                })}

                {/* Divider */}
                <div className="h-6 w-px bg-border mx-2" />

                {/* Admin Nav if authorized */}
                {session?.user.role === "ADMIN" && adminItems.map((item) => {
                    const isActive = pathname.startsWith(item.href)
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            title={item.label}
                            className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${isActive
                                ? "bg-primary/10 text-primary"
                                : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                                }`}
                        >
                            <item.icon className="h-5 w-5 stroke-[1.5]" />
                            <span className="text-sm font-medium hidden md:inline-block">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            <BottomGroup />
        </header>
    )
}
