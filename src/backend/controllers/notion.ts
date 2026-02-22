import { NotionAPI } from "notion-client"
import { env } from "@/lib/env"

// Singleton to avoid re-instantiating NotionClient during dev rebuilds
const getNotionClient = () => {
    return new NotionAPI({
        activeUser: env.NOTION_API_KEY ? "custom_bot" : undefined,
        authToken: env.NOTION_API_KEY,
        // For official or unofficial APIs. Usually notion-client (unofficial) uses authToken. 
        // If using official, one would use `@notionhq/client`, but react-notion-x requires the RecordMap from `notion-client`.
    })
}

declare const globalThis: {
    notionGlobal: ReturnType<typeof getNotionClient>;
} & typeof global;

export const notion = globalThis.notionGlobal ?? getNotionClient()

if (process.env.NODE_ENV !== 'production') globalThis.notionGlobal = notion

// Simple memory caching wrapper to prevent rate limits or excessive API calls.
const _recordMapCache = new Map<string, { map: any, expires: number }>()

export async function getNotionPage(pageId: string) {
    if (!pageId) return null;

    const current = Date.now()
    if (_recordMapCache.has(pageId)) {
        const cached = _recordMapCache.get(pageId)!
        if (cached.expires > current) {
            return cached.map
        }
    }

    try {
        const recordMap = await notion.getPage(pageId)

        // simple 5 min cache
        _recordMapCache.set(pageId, { map: recordMap, expires: current + 1000 * 60 * 5 })

        return recordMap
    } catch (err) {
        console.error("Error fetching Notion Page:", err)
        return null
    }
}
