import dotenv from 'dotenv';
dotenv.config();

async function main() {
    try {
        const response = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log("Found results:", data.results?.length);
        if (data.results && data.results.length > 0) {
            console.log("First item properties schema:");
            console.log(JSON.stringify(data.results[0].properties, null, 2));
        } else {
            console.log("Full response:", data);
        }
    } catch (e) {
        console.error(e);
    }
}
main();
