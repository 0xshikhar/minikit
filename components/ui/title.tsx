import * as React from "react"
import { cn } from "@/lib/utils"

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        className={cn("text-3xl font-bold tracking-tight mb-6", className)}
        {...props}
      />
    )
  }
)
Title.displayName = "Title"

export { Title } 