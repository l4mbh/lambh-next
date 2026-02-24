import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import { db } from "./db"
import authConfig from "./auth.config"
import { UserModel } from "./models/user.model"

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

                const user = await UserModel.findByEmail(credentials.email as string)

                if (!user || !user.password) return null

                const isMatch = await UserModel.verifyPassword(credentials.password as string, user.password)

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
                token.email = user.email
            }

            if (token.email) {
                const dbUser = await db.user.findUnique({
                    where: { email: token.email as string },
                    select: { name: true, role: true }
                })
                if (dbUser) {
                    token.name = dbUser.name
                    token.role = dbUser.role
                }
            }

            return token
        },
        async session({ session, token }) {
            if (session.user && token) {
                session.user.role = token.role as any
                if (token.email) {
                    session.user.email = token.email as string
                }
            }
            return session
        }
    }
})
