"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
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
import { registerAction } from "@/backend/actions/auth"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { signIn } from "next-auth/react"
import { GoogleIcon } from "./icon/google-icon"

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export function RegisterForm() {
    const [error, setError] = useState<string | null>(null)
    const [isPending, setIsPending] = useState(false)

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    async function onSubmit(values: z.infer<typeof registerSchema>) {
        setIsPending(true)
        setError(null)

        const formData = new FormData()
        formData.append("name", values.name)
        formData.append("email", values.email)
        formData.append("password", values.password)

        const result = await registerAction(formData)

        if (result?.error) {
            setError(result.error)
            toast.error(result.error)
            setIsPending(false)
            return
        }
        toast.success("Account created.")
    }

    return (
        <Form {...form}>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Full Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="John Doe"
                                        {...field}
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="you@example.com"
                                        {...field}
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        {...field}
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        {...field}
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-4 rounded-sm">
                        {error}
                    </div>
                )}

                <Button
                    type="submit"
                    className="w-full mt-4"
                    isLoading={isPending}
                >
                    Create Account
                </Button>

                <div className="relative mt-6 mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-zinc-800" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-black px-2 text-zinc-500 font-mono tracking-widest">
                            Or continue with
                        </span>
                    </div>
                </div>

                <Button
                    type="button"
                    variant="outline"
                    className="w-full border-zinc-800 hover:bg-zinc-900 hover:text-white"
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    icon={<GoogleIcon className="mr-2 h-4 w-4" />}
                >
                    Google
                </Button>
            </form>
        </Form>
    )
}

