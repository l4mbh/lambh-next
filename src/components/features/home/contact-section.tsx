"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Mail, ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";

interface ContactSectionProps {
    email: string;
}

export function ContactSection({ email }: ContactSectionProps) {
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        toast.success("Email copied to clipboard!");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.success("Message sent successfully (Demo mode)!");
        setShowForm(false);
        setIsSubmitting(false);
    };

    return (
        <section id="contact" className="w-full px-6 md:px-12 py-32 border-t border-border bg-black text-white relative overflow-hidden flex items-center justify-center min-h-[calc(100vh-4rem)] snap-start transition-all duration-500">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-black to-black pointer-events-none" />

            <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
                {!showForm ? (
                    <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
                        <h2 className="text-[12vw] sm:text-7xl md:text-9xl font-black tracking-tighter leading-none mb-6 uppercase mix-blend-difference">
                            Let's Talk
                        </h2>

                        {/* Copy Email Block */}
                        <div className="text-xl md:text-2xl text-zinc-400 font-mono mb-12 flex items-center gap-3 bg-zinc-900/50 py-3 px-6 rounded-full border border-zinc-800 backdrop-blur-sm group hover:border-zinc-700 transition-colors">
                            <span>{email}</span>
                            <button
                                onClick={handleCopy}
                                className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-300 hover:text-white"
                                title="Copy Email"
                            >
                                <Copy size={18} />
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <a href={`mailto:${email}`}>
                                <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white rounded-none h-14 px-8 text-base tracking-widest uppercase bg-transparent w-full sm:w-auto">
                                    Open Mail App
                                </Button>
                            </a>
                            <Button
                                variant="postItem"
                                className="w-full sm:w-auto"
                                onClick={() => setShowForm(true)}
                                icon={<Mail size={16} />}
                            >
                                Direct Message
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="w-full max-w-2xl bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 p-8 md:p-12 animate-in slide-in-from-bottom-8 fade-in duration-500 shadow-2xl">
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-800">
                            <div>
                                <h3 className="text-3xl font-bold tracking-tight mb-2">Send a message</h3>
                                <p className="text-zinc-400 font-mono text-sm">To: {email}</p>
                            </div>
                            <button
                                onClick={() => setShowForm(false)}
                                className="p-3 bg-zinc-900 hover:bg-zinc-800 rounded-full transition-colors group"
                            >
                                <ArrowLeft className="text-zinc-400 group-hover:text-white transition-colors" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold block">Your Name</label>
                                    <Input
                                        required
                                        type="text"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold block">Your Email</label>
                                    <Input
                                        required
                                        type="email"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold block">Message</label>
                                <Textarea
                                    required
                                    rows={5}
                                    className="resize-none"
                                    placeholder="Hello Lam, I'd like to work with you on..."
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="postItem"
                                className="w-full mt-4"
                                isLoading={isSubmitting}
                                icon={<Send size={16} />}
                                iconPlacement="right"
                            >
                                SEND MESSAGE
                            </Button>
                        </form>
                    </div>
                )}
            </div>
        </section>
    );
}
