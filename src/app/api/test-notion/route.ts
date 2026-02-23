import { NextResponse } from "next/server"
import { notion } from "@/backend/controllers/notion"
import { env } from "@/lib/env"

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const dbId = env.NOTION_DATABASE_ID
        if (!dbId) return NextResponse.json({ error: "Missing DB ID" })

        const recordMap = await notion.getPage(dbId)

        const blocks = recordMap.block || {}
        const sampleBlocks: any[] = []
        let count = 0
        for (const [id, blockData] of Object.entries(blocks) as any) {
            if (count < 5) {
                sampleBlocks.push({ id, raw: blockData })
                count++
            }
        }

        return NextResponse.json({
            sampleBlocks: sampleBlocks,
            collectionKeys: Object.keys(recordMap.collection || {}),
            blockKeys: Object.keys(blocks),
            collectionViewKeys: Object.keys(recordMap.collection_view || {}),
            collectionQueryKeys: Object.keys(recordMap.collection_query || {})
        })
    } catch (e: any) {
        return NextResponse.json({ error: e.message })
    }
}
