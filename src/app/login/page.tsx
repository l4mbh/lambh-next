"use client"

import { LoginForm } from "@/components/features/auth/login-form"
import { RegisterForm } from "@/components/features/auth/register-form"
import { useState } from "react"
import { Sparkles, ShieldCheck, ArrowLeft } from "lucide-react"
import Link from "next/link"

type AuthTab = "login" | "signup"

export default function LoginPage() {
    const [activeTab, setActiveTab] = useState<AuthTab>("login")

    const content = {
        login: {
            title: "Welcome back",
            subtitle: "Sign in to your account to continue where you left off.",
            features: [
            ],
        },
        signup: {
            title: "Join us today",
            subtitle: "Create an account and start building something amazing.",
            features: [
            ],
        },
    }

    const current = content[activeTab]

    return (
        <div className="flex min-h-screen bg-background dark:bg-black">
            {/* Left Side — Branding & Text */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.15),transparent_70%)]" />

                <div className="relative z-10 flex flex-col justify-center px-16 xl:px-24">
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-12">
                        <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">Lambh.io</span>
                    </div>

                    {/* Text content with animation */}
                    <div
                        key={activeTab}
                        className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                    >
                        <h1 className="text-5xl font-bold tracking-tight leading-tight mb-4">
                            {current.title}
                        </h1>
                        <p className="text-lg text-muted-foreground mb-10 max-w-md">
                            {current.subtitle}
                        </p>

                        <ul className="space-y-4">
                            {current.features.map((feature, i) => (
                                <li
                                    key={feature}
                                    className="flex items-center gap-3 text-muted-foreground animate-in fade-in slide-in-from-left-4"
                                    style={{ animationDelay: `${(i + 1) * 100}ms`, animationFillMode: "backwards" }}
                                >
                                    <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Right Side — Form */}
            <div className="flex w-full lg:w-1/2 flex-col">
                {/* Header with tabs */}
                <header className="flex items-center justify-between px-6 py-5 sm:px-10">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span className="hidden sm:inline">Home</span>
                        </Link>
                        {/* Mobile logo */}
                        <div className="flex items-center gap-2 lg:hidden ml-2">
                            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                                <Sparkles className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold">Lambh.io</span>
                        </div>
                    </div>

                    {/* Tab switcher */}
                    <div className="relative flex items-center rounded bg-muted/50 p-1">
                        {/* Animated pill background */}
                        <div
                            className="absolute h-[calc(100%-10px)] w-[calc(50%-4px)] rounded bg-background shadow-sm transition-transform duration-300 ease-out"
                            style={{
                                transform: activeTab === "login" ? "translateX(4px)" : "translateX(calc(100%))",
                            }}
                        />
                        <button
                            onClick={() => setActiveTab("login")}
                            className={`relative z-10 rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${activeTab === "login"
                                ? "text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            Sign in
                        </button>
                        <button
                            onClick={() => setActiveTab("signup")}
                            className={`relative z-10 rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${activeTab === "signup"
                                ? "text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            Sign up
                        </button>
                    </div>
                </header>

                {/* Form area */}
                <div className="flex flex-1 items-center justify-center px-6 sm:px-10">
                    <div className="w-full max-w-md">
                        {/* Form with swap animation */}
                        <div
                            key={activeTab}
                            className="animate-in fade-in slide-in-from-right-4 duration-400"
                        >
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold tracking-tight">
                                    {activeTab === "login" ? "Sign in" : "Create account"}
                                </h2>
                                <p className="mt-2 text-muted-foreground">
                                    {activeTab === "login"
                                        ? "Enter your credentials to access your account."
                                        : "Fill in your details to get started."}
                                </p>
                            </div>

                            {activeTab === "login" ? <LoginForm /> : <RegisterForm />}

                            <p className="mt-6 text-center text-sm text-muted-foreground">
                                {activeTab === "login" ? (
                                    <>
                                        Don&apos;t have an account?{" "}
                                        <button
                                            onClick={() => setActiveTab("signup")}
                                            className="font-medium text-primary hover:underline"
                                        >
                                            Sign up
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        Already have an account?{" "}
                                        <button
                                            onClick={() => setActiveTab("login")}
                                            className="font-medium text-primary hover:underline"
                                        >
                                            Sign in
                                        </button>
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
