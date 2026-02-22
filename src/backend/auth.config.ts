import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

// Export auth config separately from auth.ts so we can use it in middleware.
// NOTE: We CANNOT import `bcryptjs` or `db` here because this gets bundled into Next.js Edge Runtime (middleware),
// which does not support Node.js child-processes or crypto APIs used by bcrypt natively.
// See `src/backend/auth.ts` for the Node.js implementation of the authorize callback.
export default {
    providers: [
        // Dummy provider here just to satisfy the NextAuth Middleware signature.
        // It will be fully overridden in `src/backend/auth.ts`.
    ],
} satisfies NextAuthConfig
