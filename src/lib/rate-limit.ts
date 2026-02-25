import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "@/lib/env";

// Create a new ratelimit instance lazy loader
// We use a singleton pattern here so that we don't recreate the Redis instance on every request
let redis: Redis | null = null;
let defaultRatelimit: Ratelimit | null = null;
let isInitialized = false;

function initRedis() {
    if (isInitialized) return;
    if (env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN) {
        redis = new Redis({
            url: env.UPSTASH_REDIS_REST_URL,
            token: env.UPSTASH_REDIS_REST_TOKEN,
        });

        // Default rate limiter: 10 requests per 10 seconds per IP
        defaultRatelimit = new Ratelimit({
            redis,
            limiter: Ratelimit.slidingWindow(10, "10 s"),
            analytics: true,
            // Optional prefix for the keys
            prefix: "@upstash/ratelimit",
        });
    }
    isInitialized = true;
}

/**
 * Creates a custom rate limiter for specific use cases (e.g., auth, sensitive actions)
 */
export const createRateLimiter = (options: {
    limit: number;
    window: `${number} ${"s" | "m" | "h" | "d"}`;
    prefix?: string;
}) => {
    initRedis();
    if (!redis) return null;

    return new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(options.limit, options.window),
        analytics: true,
        prefix: options.prefix ?? "@upstash/ratelimit",
    });
};

/**
 * Common limiters for the application
 */
export const limiters = {
    // Stricter limit for auth actions (e.g. 5 attempts per minute)
    get auth() { return createRateLimiter({ limit: 5, window: "60 s", prefix: "ratelimit:auth" }) },
    // General API limit
    get api() { return createRateLimiter({ limit: 60, window: "60 s", prefix: "ratelimit:api" }) },
    // Very strict limit for things like password re-sets
    get strict() { return createRateLimiter({ limit: 3, window: "60 m", prefix: "ratelimit:strict" }) },
};

/**
 * Helper to check rate limit safely, with a fallback if Redis is not configured
 */
export const checkRateLimit = async (
    identifier: string,
    customLimiter?: Ratelimit | null
) => {
    initRedis();
    const limiter = customLimiter ?? defaultRatelimit;

    // If no Redis config is provided, we bypass rate limiting or log a warning
    // In production, you might want to throw an error if rate limiting is strictly required
    if (!limiter) {
        console.warn("Redis is not configured. Rate limiting is bypassed.");
        return { success: true, remaining: 999 };
    }

    try {
        const result = await limiter.limit(identifier);
        return result;
    } catch (error) {
        // Fallback: If Redis fails, we might want to allow the request to prevent false positives blocking users
        // Alternatively, you can block the request: return { success: false, remaining: 0 };
        console.error("Rate limit error:", error);
        return { success: true, remaining: 0 };
    }
};
