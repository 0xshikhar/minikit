import * as React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> { }

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn("w-full max-w-4xl mx-auto px-4 py-8", className)}
                {...props}
            />
        )
    }
)
Container.displayName = "Container"

export { Container } 