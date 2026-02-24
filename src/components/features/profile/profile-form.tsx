"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

const profileFormSchema = z.object({
    name: z.string().min(2, "Username must be at least 2 characters").max(50),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmNewPassword: z.string().optional(),
}).refine((data) => {
    // If user provides a new password, they must provide current and confirm it
    if (data.newPassword) {
        return !!data.currentPassword && !!data.confirmNewPassword
    }
    return true
}, {
    message: "Current password and confirm password are required to change password",
    path: ["currentPassword"],
}).refine((data) => {
    return data.newPassword === data.confirmNewPassword
}, {
    message: "New passwords do not match",
    path: ["confirmNewPassword"],
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

interface ProfileFormProps {
    user: {
        id: string
        name: string | null
        email: string | null
        emailVerified: Date | null
    }
}

export function ProfileForm({ user }: ProfileFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: user.name || "",
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
    })

    async function onSubmit(data: ProfileFormValues) {
        setIsLoading(true)
        try {
            const response = await fetch("/api/user/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    currentPassword: data.currentPassword,
                    newPassword: data.newPassword,
                }),
            })

            const result = await response.json()

            if (!response.ok) {
                toast.error(result.error || "Failed to update profile")
                return
            }

            toast.success("Profile updated successfully")

            // Clear password fields on success
            form.setValue("currentPassword", "")
            form.setValue("newPassword", "")
            form.setValue("confirmNewPassword", "")

            router.refresh()
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Read-Only Info Section */}
                <div className="space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        Account Basics
                    </h4>

                    <div className="space-y-2">
                        <FormLabel>Email Address</FormLabel>
                        <div className="flex items-center gap-3">
                            <Input value={user.email || ""} disabled className="bg-muted w-full md:max-w-[300px]" />
                            {user.emailVerified ? (
                                <Badge variant="outline" className="text-emerald-500 border-emerald-500 flex gap-1 items-center">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Verified
                                </Badge>
                            ) : (
                                <Badge variant="outline" className="text-destructive border-destructive flex gap-1 items-center">
                                    <XCircle className="w-3 h-3" />
                                    Unverified
                                </Badge>
                            )}
                        </div>
                        <p className="text-[0.8rem] text-muted-foreground">
                            Your email address is used for login and cannot be changed here.
                        </p>
                    </div>

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="w-full md:max-w-[400px]">
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <hr className="bg-border h-px w-full" />

                {/* Password Section */}
                <div className="space-y-4">
                    <div>
                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                            Change Password
                        </h4>
                        <p className="text-[0.8rem] text-muted-foreground mt-1">
                            Leave these fields blank if you do not wish to change your password.
                        </p>
                    </div>

                    <div className="grid gap-4 w-full md:max-w-[400px]">
                        <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmNewPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm New Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                </Button>
            </form>
        </Form>
    )
}
