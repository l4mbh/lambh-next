import { z } from "zod";

// Define the environment variables schema
const envSchema = z.object({
    // Database configuration
    DATABASE_URL: z.string().url().default("postgresql://user:password@localhost:5432/mydb?schema=public"),

    // NextAuth
    NEXTAUTH_SECRET: z.string().min(1).default("default-secret-do-not-use-in-production"),
    NEXTAUTH_URL: z.string().url().optional(),

    // Notion Integration
    NOTION_API_KEY: z.string().optional(),
    NOTION_DATABASE_ID: z.string().optional(),
});

// The parsed and validated environment.
// For Next.js, we parse process.env directly.
// The default values are just to prevent the app from crashing while developing before setting up the actual .env
export const env = envSchema.parse({
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NOTION_API_KEY: process.env.NOTION_API_KEY,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
});
