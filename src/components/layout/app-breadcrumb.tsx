"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface AppBreadcrumbProps {
    className?: string;
}

export function AppBreadcrumb({ className }: AppBreadcrumbProps) {
    const pathname = usePathname()

    // Ignore breadcrumb on exact home page to avoid redundancy
    if (pathname === "/") return null

    const paths = pathname.split('/').filter(Boolean)

    return (
        <div className={className}>
            <Breadcrumb className="mb-6">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {paths.length > 0 && <BreadcrumbSeparator />}
                    {paths.map((path, index) => {
                        const href = `/${paths.slice(0, index + 1).join('/')}`
                        const isLast = index === paths.length - 1

                        // Format the label neatly
                        const label = path
                            .split('-')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')

                        return (
                            <React.Fragment key={path}>
                                <BreadcrumbItem>
                                    {isLast ? (
                                        <BreadcrumbPage>{label}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink asChild>
                                            <Link href={href}>{label}</Link>
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {!isLast && <BreadcrumbSeparator />}
                            </React.Fragment>
                        )
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}
