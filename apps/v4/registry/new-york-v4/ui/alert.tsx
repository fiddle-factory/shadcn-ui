import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "",
        destructive:
          "text-destructive [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  style,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  const [backgroundClass, setBackgroundClass] = React.useState("bg-card")
  const [borderClass, setBorderClass] = React.useState("border-border")
  const [textClass, setTextClass] = React.useState("text-card-foreground")

  // geneditor-listener-start
  React.useEffect(() => {
    const el = document.querySelector('[data-config-id="alert.stories-Alert-2"]')
    if (!el) return
    const handler = (e: Event) => {
      const d = (e as CustomEvent).detail
      if (d.backgroundClass !== undefined) setBackgroundClass(d.backgroundClass)
      if (d.borderClass !== undefined) setBorderClass(d.borderClass)
      if (d.textClass !== undefined) setTextClass(d.textClass)
    }
    el.addEventListener('animation:update', handler)
    return () => el.removeEventListener('animation:update', handler)
  }, [])
  // geneditor-listener-end

  return (
    <div
      data-config-id="alert.stories-Alert-2"
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), backgroundClass, borderClass, textClass, className)}
      style={style}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }




