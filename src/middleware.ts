import NextAuth from "next-auth"
import authConfig from "@/backend/auth.config"

const { auth } = NextAuth(authConfig)
import { NextResponse } from "next/server"


export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    // Protect /admin routes
    if (nextUrl.pathname.startsWith('/admin')) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL('/login', nextUrl))
        }

        // Optional: check role
        // const role = req.auth?.user?.role
        // if (role !== 'ADMIN') {
        //   return NextResponse.redirect(new URL('/', nextUrl))
        // }
    }

    return NextResponse.next()
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
