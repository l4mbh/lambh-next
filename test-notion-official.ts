const { Client } = require('@notionhq/client');
const dotenv = require('dotenv');
dotenv.config();

console.log("Client:", Client);
const notion = new Client({ auth: process.env.NOTION_API_KEY });
console.log("notion keys:", Object.keys(notion));
console.log("notion.databases:", notion.databases);
