import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-4xl text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow-xs hover:bg-holi-800 hover:text-holi-200",
                destructive:
                    "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                outline:
                    "border border-accent bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
                ghost:
                    "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "text-lg h-10 sm:h-12 px-8 gap-2.5 has-[>svg]:px-7 [&_svg:not([class*='size-'])]:size-6",
                xs: "text-sm h-8 pt-1 pb-1.5 px-6 gap-2 has-[>svg]:px-5 [&_svg]:mt-0.25 [&_svg:not([class*='size-'])]:size-4",
                sm: "text-md h-10 pt-1.5 pb-1.75 px-7 gap-2.25 has-[>svg]:px-6 [&_svg]:mt-0.25 [&_svg:not([class*='size-'])]:size-5",
                md: "text-lg h-12 px-8 gap-2.5 has-[>svg]:px-7 [&_svg:not([class*='size-'])]:size-6",
                lg: "text-xl h-14 pt-2.5 pb-3 px-9 gap-2.75 has-[>svg]:px-8 [&_svg]:mt-0.5 [&_svg:not([class*='size-'])]:size-7",
                xl: "text-2xl h-16 pt-3 pb-4.25 px-10 gap-3 has-[>svg]:px-9 [&_svg]:mt-0.75 [&_svg:not([class*='size-'])]:size-8",
                icon: "size-9",

            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

function Button({
                    className,
                    variant,
                    size,
                    asChild = false,
                    ...props
                }: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
    asChild?: boolean
}) {
    const Comp = asChild ? Slot : "button"

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({variant, size, className}))}
            {...props}
        />
    )
}

export { Button, buttonVariants }
