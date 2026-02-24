"use client"

import { LoginForm } from "@/components/features/auth/login-form"
import { RegisterForm } from "@/components/features/auth/register-form"
import { useState } from "react"
import { Sparkles, ArrowLeft } from "lucide-react"
import Link from "next/link"

type AuthTab = "login" | "signup"

export default function LoginPage() {
    const [activeTab, setActiveTab] = useState<AuthTab>("login")

    return (
        <div className="flex min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
            {/* Minimal Background noise/texture (optional, keeping it pitch black for now) */}

            {/* Header */}
            <header className="absolute top-0 w-full flex items-center justify-between px-6 py-6 md:px-12 z-20">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-white transition-colors group"
                >
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Return</span>
                </Link>
            </header>

            {/* Main Content */}
            <div className="flex w-full flex-col px-6 pt-32 pb-24 sm:px-12 relative z-10 max-w-lg mx-auto min-h-[600px]">

                {/* Auth Container */}
                <div className="w-full flex justify-center mb-12">
                    <div className="flex gap-8 border-b border-zinc-800 pb-2">
                        <button
                            onClick={() => setActiveTab("login")}
                            className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${activeTab === "login" ? "text-white" : "text-zinc-600 hover:text-zinc-400"
                                }`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setActiveTab("signup")}
                            className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${activeTab === "signup" ? "text-white" : "text-zinc-600 hover:text-zinc-400"
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
                            {activeTab === "login" ? "Welcome Back." : "Join Us."}
                        </h1>
                        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                            {activeTab === "login" ? "Authenticate to continue" : "Setup your new account"}
                        </p>
                    </div>

                    <div key={activeTab} className="animate-in fade-in slide-in-from-right-4 duration-500">
                        {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
                    </div>
                </div>
            </div>
        </div>
    )
}

