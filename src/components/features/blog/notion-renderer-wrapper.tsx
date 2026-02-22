"use client"

import dynamic from "next/dynamic"
import { NotionRenderer } from "react-notion-x"

import "react-notion-x/src/styles.css"
// Optional: add prismjs/mac-ui styles if we want code highlighting inside notion blocks
import "prismjs/themes/prism-tomorrow.css"

// Lazy loading heavy components
const Code = dynamic(() =>
    import('react-notion-x/build/third-party/code').then((m) => m.Code)
)
const Collection = dynamic(() =>
    import('react-notion-x/build/third-party/collection').then(
        (m) => m.Collection
    )
)
const Equation = dynamic(() =>
    import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
)
const Pdf = dynamic(() =>
    import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf)
)
const Modal = dynamic(
    () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
    { ssr: false }
)


interface ClientNotionRendererProps {
    recordMap: any
    darkMode?: boolean
}

export function ClientNotionRenderer({ recordMap, darkMode = true }: ClientNotionRendererProps) {

    // Custom logic to optimize Notion un-cacheable images using a basic next/image mapper
    // In production, consider Cloudflare workers or next image `src` replacements.
    const mapImageUrl = (url: string, block: any): string | undefined => {
        if (!url) return undefined
        if (url.startsWith('data:')) return url

        // Provide mapping functionality to avoid notion's expiring AWS AWS signatures locking out Client Side loads
        // Usually react-notion-x handles the default proxying securely, but we can override:
        return url;
    }

    return (
        <div className="notion-wrapper max-w-4xl mx-auto dark:text-foreground">
            <NotionRenderer
                recordMap={recordMap}
                fullPage={true}
                darkMode={darkMode}
                // @ts-expect-error react-notion-x internal typings mismatch
                mapImageUrl={mapImageUrl}
                components={{
                    Code,
                    Collection,
                    Equation,
                    Pdf,
                    Modal
                }}
            />
        </div>
    )
}
