"use server"

import { signIn, signOut } from "@/backend/auth"
import { AuthError } from "next-auth"

export async function loginAction(formData: FormData) {
    try {
        await signIn("credentials", formData)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials." }
                default:
                    return { error: "Something went wrong." }
            }
        }
        throw error // Important: Next.js redirects throw errors which need to physically bubble up
    }
}

export async function logoutAction() {
    await signOut()
}
