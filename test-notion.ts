import { NotionAPI } from 'notion-client'
import dotenv from 'dotenv'
dotenv.config()

const notion = new NotionAPI({
    activeUser: process.env.NOTION_ACTIVE_USER,
    authToken: process.env.NOTION_API_KEY
})

async function main() {
    try {
        const dbId = process.env.NOTION_DATABASE_ID
        if (!dbId) throw new Error("Missing NOTION_DATABASE_ID")

        console.log("Fetching DB:", dbId)
        const recordMap = await notion.getPage(dbId)

        const blocks = recordMap.block || {}
        const types = new Set()
        const pages = []

        for (const [id, blockData] of Object.entries(blocks) as any) {
            const block = blockData.value
            if (block && block.type) {
                types.add(block.type)
                if (block.type === 'page' || block.type === 'collection_view_page' || block.type === 'collection_view') {
                    pages.push({ id, type: block.type, title: block.properties?.title?.[0]?.[0] || 'Unknown' })
                }
            }
        }

        console.log("Found Block Types:", Array.from(types))
        console.log("Page-like blocks:", pages)

    } catch (e) {
        console.error(e)
    }
}

main()
