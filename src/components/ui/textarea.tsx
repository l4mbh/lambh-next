import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
    return (
        <textarea
            data-slot="textarea"
            className={cn(
                "flex min-h-[80px] w-full bg-zinc-900/50 border border-zinc-800 focus:border-white focus:ring-1 focus:ring-white rounded-none px-4 py-3 outline-none text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-zinc-500",
                className
            )}
            {...props}
        />
    )
}

export { Textarea }
