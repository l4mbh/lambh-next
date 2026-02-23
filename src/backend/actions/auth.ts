"use server"

import { signIn, signOut } from "@/backend/auth"
import { UserModel } from "@/backend/models/user.model"
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

export async function registerAction(formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
        return { error: "Email and password are required." }
    }

    // Check if user already exists
    const existingUser = await UserModel.findByEmail(email)

    if (existingUser) {
        return { error: "An account with this email already exists." }
    }

    // Create user via model
    await UserModel.create({ name, email, password })

    // Auto sign-in after registration
    try {
        const signInData = new FormData()
        signInData.append("email", email)
        signInData.append("password", password)
        signInData.append("redirectTo", "/")
        await signIn("credentials", signInData)
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: "Account created but failed to sign in. Please sign in manually." }
        }
        throw error
    }
}

export async function logoutAction() {
    await signOut()
}
