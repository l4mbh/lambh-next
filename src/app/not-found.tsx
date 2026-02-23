import Link from "next/link"
import { FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
            <div className="bg-muted p-4 rounded-full mb-6">
                <FileQuestion className="h-12 w-12 text-muted-foreground" />
            </div>

            <h2 className="text-4xl font-extrabold tracking-tight mb-2">404</h2>
            <h3 className="text-xl font-medium mb-4">Page not found</h3>

            <p className="text-muted-foreground mb-8 max-w-md">
                Sorry, we couldn't find the page you're looking for. It might have been removed, renamed, or doesn't exist.
            </p>

            <Link href="/">
                <Button variant="default">
                    Return Home
                </Button>
            </Link>
        </div>
    )
}
