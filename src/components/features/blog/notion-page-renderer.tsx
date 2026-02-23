"use client";

import { NotionRenderer } from "react-notion-x";

export function NotionPageRenderer({ recordMap }: { recordMap: any }) {
    return (
        <NotionRenderer
            recordMap={recordMap}
            fullPage={false}
            darkMode={true}
            disableHeader={true}
            mapImageUrl={(url, block) => {
                if (!url) {
                    return "";
                }
                if (url.startsWith("data:")) {
                    return url;
                }

                // Allow external URLs directly without proxy
                if (
                    url.startsWith("http") &&
                    !url.includes("amazonaws.com") &&
                    !url.includes("secure.notion-static.com")
                ) {
                    return url;
                }

                try {
                    const u = new URL(url.startsWith("https") ? url : `https://www.notion.so${url.startsWith("/") ? url : `/${url}`}`);
                    if (u.pathname.startsWith("/secure.notion-static.com") && u.hostname.endsWith(".amazonaws.com")) {
                        return `https://www.notion.so${u.pathname}?table=block&id=${block.id}&cache=v2`;
                    }
                } catch (e) {
                    // Ignore invalid urls
                }

                if (url.startsWith("/images")) {
                    return `https://www.notion.so${url}`;
                }

                // Default fall back to Notion's image API
                const urlObj = new URL('https://www.notion.so/image/' + encodeURIComponent(url));
                urlObj.searchParams.set('table', 'block');
                urlObj.searchParams.set('id', block.id);
                urlObj.searchParams.set('cache', 'v2');
                return urlObj.toString();
            }}
        />
    );
}
