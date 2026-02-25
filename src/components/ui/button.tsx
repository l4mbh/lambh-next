import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap !rounded-md text-xs font-bold uppercase tracking-widest transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 outline-none active:scale-[0.98] group",
  {
    variants: {
      variant: {
        default: "bg-white text-black hover:bg-zinc-200",
        destructive: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20",
        outline: "border border-zinc-800 bg-transparent hover:bg-zinc-900 text-white",
        secondary: "bg-zinc-900 text-white hover:bg-zinc-800",
        ghost: "hover:bg-zinc-900 text-white",
        link: "text-zinc-400 underline-offset-4 hover:underline hover:text-white",
        postItem: "corner-border bg-black text-white hover:text-primary hover:bg-neutral-900",
        accent: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_-3px_rgba(0,122,204,0.3)] hover:shadow-[0_0_20px_-2px_rgba(0,122,204,0.6)] border border-primary/50",
      },
      size: {
        default: "h-12 px-6 py-3",
        xs: "h-8 px-3 text-[10px]",
        sm: "h-10 px-4",
        lg: "h-14 px-8 text-sm",
        icon: "h-12 w-12 p-0",
        "icon-sm": "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  icon?: React.ReactNode
  iconPlacement?: "left" | "right"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, icon, iconPlacement = "left", children, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "button"

    if (asChild) {
      return (
        <Comp
          data-slot="button"
          data-variant={variant}
          data-size={size}
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      )
    }

    return (
      <Comp
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={isLoading || props.disabled}
        ref={ref}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin shrink-0" />}
        {!isLoading && icon && iconPlacement === "left" && (
          <span className="shrink-0 transition-transform duration-300 group-hover:-translate-x-1">{icon}</span>
        )}
        <span className="transition-transform duration-300 group-hover:scale-[1.02] truncate">{children}</span>
        {!isLoading && icon && iconPlacement === "right" && (
          <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-1">{icon}</span>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
