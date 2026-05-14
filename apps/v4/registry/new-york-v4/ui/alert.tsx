import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default:
          "*:data-[slot=alert-description]:text-[color:var(--alert-description-color)]",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
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
  const [backgroundColor, setBackgroundColor] = React.useState("#ef4444")
  const [backgroundOpacity, setBackgroundOpacity] = React.useState(0.1)
  const [borderColor, setBorderColor] = React.useState("#ef4444")
  const [borderOpacity, setBorderOpacity] = React.useState(0.5)
  const [textColor, setTextColor] = React.useState("#ef4444")

  // geneditor-listener-start
  React.useEffect(() => {
    const el = document.querySelector('[data-config-id="Alert-div-0"]')
    if (!el) return
    const handler = (e: Event) => {
      const d = (e as CustomEvent).detail
      if (d.backgroundColor !== undefined) setBackgroundColor(d.backgroundColor)
      if (d.backgroundOpacity !== undefined) setBackgroundOpacity(d.backgroundOpacity)
      if (d.borderColor !== undefined) setBorderColor(d.borderColor)
      if (d.borderOpacity !== undefined) setBorderOpacity(d.borderOpacity)
      if (d.textColor !== undefined) setTextColor(d.textColor)
    }
    el.addEventListener('animation:update', handler)
    return () => el.removeEventListener('animation:update', handler)
  }, [])
  // geneditor-listener-end

  const alertStyle =
    variant === "destructive"
      ? style
      : ({
          backgroundColor: `color-mix(in oklab, ${backgroundColor} ${backgroundOpacity * 100}%, transparent)`,
          borderColor: `color-mix(in oklab, ${borderColor} ${borderOpacity * 100}%, transparent)`,
          color: textColor,
          "--alert-description-color": `color-mix(in oklab, ${textColor} 90%, transparent)`,
          ...style,
        } as React.CSSProperties)

  return (
    <div
      data-config-id="Alert-div-0"
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      style={alertStyle}
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


