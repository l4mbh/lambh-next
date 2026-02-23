"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"

export function BackToTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Function to check scroll position on the window natively
        const checkScroll = () => {
            setIsVisible(window.scrollY > 300)
        }

        window.addEventListener("scroll", checkScroll)

        // Initial check
        checkScroll()

        return () => {
            window.removeEventListener("scroll", checkScroll)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    if (!isVisible) return null

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 bg-foreground text-background shadow-lg hover:bg-foreground/80 transition-all duration-300 animate-in fade-in zoom-in group"
            aria-label="Back to top"
        >
            <ArrowUp className="size-5 group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
    )
}
