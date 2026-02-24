import { NextResponse } from "next/server"
import { auth } from "@/backend/auth"
import { db } from "@/backend/db"
import bcrypt from "bcryptjs"
import { z } from "zod"

const profileUpdateSchema = z.object({
    name: z.string().min(2).max(50),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
})

export async function PUT(req: Request) {
    try {
        const session = await auth()
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const validatedData = profileUpdateSchema.parse(body)

        // Find the user to get existing password (for validation)
        const user = await db.user.findUnique({
            where: { email: session.user.email },
        })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        const updateData: any = {
            name: validatedData.name,
        }

        // If trying to update password
        if (validatedData.newPassword) {
            if (!validatedData.currentPassword) {
                return NextResponse.json(
                    { error: "Current password is required to set a new password" },
                    { status: 400 }
                )
            }

            // Verify current password is correct
            const isPasswordValid = await bcrypt.compare(
                validatedData.currentPassword,
                user.password || "" // Accounts created via OAuth might not have a password
            )

            if (!isPasswordValid) {
                return NextResponse.json(
                    { error: "Incorrect current password" },
                    { status: 400 }
                )
            }

            // Hash user's new password before creating
            const hashedNewPassword = await bcrypt.hash(validatedData.newPassword, 10)
            updateData.password = hashedNewPassword
        }

        // Execute Update
        await db.user.update({
            where: { email: session.user.email },
            data: updateData,
        })

        return NextResponse.json({ message: "Profile updated successfully" })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: "Invalid data provided" }, { status: 400 })
        }
        console.error("Profile update error:", error)
        return NextResponse.json(
            { error: "An unexpected error occurred" },
            { status: 500 }
        )
    }
}
