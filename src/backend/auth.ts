import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { db } from "./db"
import authConfig from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    // @ts-expect-error Custom Role breaks strict internal AdapterUser typing temporarily
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null

                const user = await db.user.findUnique({
                    where: { email: credentials.email as string }
                })

                if (!user || !user.password) return null

                const isMatch = await bcrypt.compare(credentials.password as string, user.password)

                if (isMatch) return user

                return null
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // user object is only passed in the first time on sign-in
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user && token) {
                session.user.role = token.role as any
            }
            return session
        }
    }
})
