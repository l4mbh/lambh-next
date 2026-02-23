"use client"

import { useEffect } from "react"
import { useBreadcrumbStore } from "@/store/breadcrumb-store"

export function BreadcrumbTitleUpdater({ slug, title }: { slug: string, title: string }) {
    const setCustomLabel = useBreadcrumbStore(state => state.setCustomLabel)

    useEffect(() => {
        setCustomLabel(slug, title)
    }, [slug, title, setCustomLabel])

    return null
}
