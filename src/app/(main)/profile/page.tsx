import { Metadata } from "next"
import { auth } from "@/backend/auth"
import { redirect } from "next/navigation"
import { db } from "@/backend/db"
import { ProfileForm } from "@/components/features/profile/profile-form"

export const metadata: Metadata = {
    title: "User Profile",
    description: "Manage your user account settings",
}

export default async function ProfilePage() {
    const session = await auth()

    if (!session?.user?.email) {
        redirect("/login")
    }

    const dbUser = await db.user.findUnique({
        where: { email: session.user.email },
        select: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
        },
    })

    if (!dbUser) {
        redirect("/login")
    }

    return (
        <div className="container px-16 md:px-24 max-w-2xl py-10">
            <div className="space-y-6">
                <div>
                    <h3 className="text-2xl font-bold tracking-tight">Profile</h3>
                    <p className="text-sm text-muted-foreground">
                        Update your account details and manage your password.
                    </p>
                </div>
                <hr className="bg-border h-px w-full" />
                <ProfileForm user={dbUser} />
            </div>
        </div>
    )
}
