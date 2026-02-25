import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { env } from '@/lib/env'

const prismaClientSingleton = () => {
    // Configure pg Pool with a max size to prevent reaching Supabase Session mode limits
    const pool = new Pool({
        connectionString: env.DATABASE_URL,
        max: 10, // Limit connections to database
        idleTimeoutMillis: 30000,
    })
    const adapter = new PrismaPg(pool)
    return new PrismaClient({ adapter })
}

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const db = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db
