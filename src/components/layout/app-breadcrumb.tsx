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
import { useBreadcrumbStore } from "@/store/breadcrumb-store"

interface AppBreadcrumbProps {
    className?: string;
    customLabels?: Record<string, string>;
}

export function AppBreadcrumb({ className, customLabels: propCustomLabels }: AppBreadcrumbProps) {
    const pathname = usePathname()
    const storeCustomLabels = useBreadcrumbStore((state) => state.customLabels);
    const customLabels = { ...propCustomLabels, ...storeCustomLabels };

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
                        let label = path
                            .split('-')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')

                        if (customLabels && customLabels[path]) {
                            label = customLabels[path]
                        }

                        // Truncate long labels
                        if (label.length > 30) {
                            label = label.substring(0, 30) + "..."
                        }

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
