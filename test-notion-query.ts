import { Client } from '@notionhq/client';
import dotenv from 'dotenv';
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

async function main() {
    try {
        const response = await notion.databases.query({
            database_id: databaseId as string,
        });
        console.log("Database Query returned:", response.results.length, "results.");
        if (response.results.length > 0) {
            console.log("Sample result properties:");
            const item = response.results[0] as any;
            console.log(JSON.stringify(item.properties, null, 2));
        }
    } catch (e) {
        console.error(e);
    }
}

main();
