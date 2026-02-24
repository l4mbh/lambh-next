import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full bg-zinc-900/50 border border-zinc-800 focus:border-white focus:ring-1 focus:ring-white rounded-none px-4 py-3 outline-none text-white transition-colors h-12 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-zinc-500",
        className
      )}
      {...props}
    />
  )
}

export { Input }
