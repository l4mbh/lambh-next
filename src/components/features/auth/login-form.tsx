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
import { loginAction } from "@/backend/actions/auth"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import { GoogleIcon } from "./icon/google-icon"

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required"),
})

export function LoginForm() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [isPending, setIsPending] = useState(false)

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        setIsPending(true)
        setError(null)

        const formData = new FormData()
        formData.append("email", values.email)
        formData.append("password", values.password)
        formData.append("redirectTo", "/")

        const result = await loginAction(formData)

        if (result?.error) {
            setError(result.error)
            setIsPending(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="admin@lambh.io.vn"
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
                    Proceed
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
                    iconPlacement="left"
                >
                    Google
                </Button>
            </form>
        </Form>
    )
}

