import { Button } from "@/components/ui/button"

export default function Header() {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary" />
                <span className="text-xl font-bold">App</span>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="link">Sign in</Button>
                <Button variant="link">Sign up</Button>
            </div>
        </div>
    )
}