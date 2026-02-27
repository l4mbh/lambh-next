import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

// Export auth config separately from auth.ts so we can use it in middleware.
// NOTE: We CANNOT import `bcryptjs` or `db` here because this gets bundled into Next.js Edge Runtime (middleware),
// which does not support Node.js child-processes or crypto APIs used by bcrypt natively.
// See `src/backend/auth.ts` for the Node.js implementation of the authorize callback.
export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
} satisfies NextAuthConfig
