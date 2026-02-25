"use client"

import React from 'react';
import { Copy, Github, Facebook } from "lucide-react";
import { toast } from "sonner";
import Link from 'next/link';

export function Footer() {
    const email = "lambh.1998@gmail.com";

    const [year, setYear] = React.useState<number | null>(null);

    React.useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        toast.success("Email copied to clipboard!");
    };

    return (
        <footer className="w-full border-t border-border py-8 px-6 md:px-12 bg-background mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative">
                <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground w-full justify-between">
                    <p className="font-mono text-xs uppercase tracking-wider">
                        © {year ?? "2024"} LamBH. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                        {/* Copy Email */}
                        <div className="flex items-center gap-2 group cursor-pointer hover:text-foreground transition-colors" onClick={handleCopy}>
                            <span className="font-mono text-xs">{email}</span>
                            <Copy size={14} className="group-hover:text-primary transition-colors" />
                        </div>

                        <div className="hidden md:block w-[1px] h-4 bg-border"></div>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            <Link href="https://github.com/l4mbh" target="_blank" rel="noopener noreferrer" className="hover:text-foreground hover:-translate-y-1 transition-all duration-300">
                                <Github size={18} />
                                <span className="sr-only">GitHub</span>
                            </Link>
                            <Link href="https://facebook.com/buihoanglam.1998" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 hover:-translate-y-1 transition-all duration-300">
                                <Facebook size={18} />
                                <span className="sr-only">Facebook</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
