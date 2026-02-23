"use client" // Error components must be Client Components

import { useEffect } from "react"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Global App Error:", error)
    }, [error])

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
            <div className="bg-destructive/10 p-4 rounded-full mb-6">
                <AlertTriangle className="h-12 w-12 text-destructive" />
            </div>

            <h2 className="text-3xl font-bold tracking-tight mb-2">Something went wrong!</h2>

            <p className="text-muted-foreground mb-8 max-w-md">
                We apologize for the inconvenience. An unexpected error occurred while processing your request. Our team has been notified.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => reset()} variant="default">
                    Try again
                </Button>

                <Button onClick={() => window.location.href = '/'} variant="outline">
                    Return to home
                </Button>
            </div>

            {process.env.NODE_ENV === "development" && (
                <div className="mt-12 text-left bg-muted p-4 rounded-md max-w-3xl w-full overflow-auto text-xs font-mono">
                    <p className="font-bold text-destructive mb-2">{error.message}</p>
                    <pre className="text-muted-foreground">{error.stack}</pre>
                </div>
            )}
        </div>
    )
}
