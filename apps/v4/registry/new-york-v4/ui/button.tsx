import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const ATC_STYLES = `
  @property --atc-complete {
    initial-value: 0;
    inherits: true;
    syntax: '<number>';
  }

  @keyframes atc-spin {
    to { rotate: 360deg; }
  }

  .atc-wrapper {
    position: relative;
    display: inline-flex;
    border-radius: inherit;
  }

  .atc-border {
    position: absolute;
    inset: calc(-1 * var(--atc-border-width, 2px));
    border: var(--atc-border-width, 2px) solid transparent;
    -webkit-mask:
      linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0) border-box;
    mask:
      linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0) border-box;
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    border-radius: inherit;
    pointer-events: none;
    z-index: 1;
  }

  .atc-border--animated::after {
    content: '';
    width: calc(100% + 2 * var(--atc-border-width, 2px));
    height: calc(100% + 2 * var(--atc-border-width, 2px));
    background: conic-gradient(
      from calc(var(--atc-complete, 0) * 180deg) in hsl increasing hue,
      #0000 0 calc((1 - var(--atc-complete)) * 20%),
      hsl(0 100% 65%) calc((1 - var(--atc-complete)) * 30%),
      hsl(339 100% 65%) calc(100% - ((1 - var(--atc-complete)) * 30%)),
      #0000 calc(100% - ((1 - var(--atc-complete)) * 20%)) 100%
    );
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    z-index: -1;
    animation: atc-spin var(--atc-spin-duration, 2s) infinite linear;
    transition: --atc-complete 0.22s ease-out;
    border-radius: inherit;
  }

  .atc-border--complete {
    border-color: hsl(140 90% 50%);
    opacity: 0;
    transition: opacity 0.22s ease-out;
  }

  .atc-border--complete.is-complete {
    opacity: 1;
  }

  .atc-btn {
    transition-property: translate, scale;
    transition-duration: 0.16s;
    transition-timing-function: ease-out;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .atc-btn:not([data-adding='true']):active {
    translate: 0 1px;
    scale: 0.98;
  }

  @media (prefers-reduced-motion: reduce) {
    .atc-border--animated::after {
      animation: none;
    }
    .atc-border--complete {
      transition: none;
    }
  }
`

type ButtonState = 'idle' | 'complete'

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  onClick,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"
  const [btnState, setBtnState] = React.useState<ButtonState>('idle')
  const [spinDuration, setSpinDuration] = React.useState(2)
  const [completeDuration, setCompleteDuration] = React.useState(900)
  const [borderWidth, setBorderWidth] = React.useState(2)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    if (btnState === 'complete') return
    setBtnState('complete')
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setBtnState('idle')
    }, completeDuration)
  }, [btnState, onClick, completeDuration])

  React.useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  // geneditor-listener-start
  React.useEffect(() => {
    const el = document.querySelector('[data-config-id="Button-Comp-0"]')
    if (!el) return
    const handler = (e: Event) => {
      const d = (e as CustomEvent).detail
      if (d.spinDuration !== undefined) setSpinDuration(d.spinDuration)
      if (d.completeDuration !== undefined) setCompleteDuration(d.completeDuration)
      if (d.borderWidth !== undefined) setBorderWidth(d.borderWidth)
    }
    el.addEventListener('animation:update', handler)
    return () => el.removeEventListener('animation:update', handler)
  }, [])
  // geneditor-listener-end

  const isComplete = btnState === 'complete'

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ATC_STYLES }} />
      <div
        data-config-id="Button-Comp-0"
        className="atc-wrapper"
        style={{
          borderRadius: 'var(--radius-md, 6px)',
          '--atc-complete': isComplete ? 1 : 0,
          '--atc-spin-duration': `${spinDuration}s`,
          '--atc-border-width': `${borderWidth}px`,
        } as React.CSSProperties}
      >
        <span className="atc-border atc-border--animated" />
        <span className={`atc-border atc-border--complete${isComplete ? ' is-complete' : ''}`} />
        <Comp
          data-slot="button"
          data-variant={variant}
          data-size={size}
          data-adding={isComplete ? 'true' : 'false'}
          className={cn("atc-btn", buttonVariants({ variant, size, className }))}
          onClick={handleClick}
          {...props}
        />
      </div>
    </>
  )
}

export { Button, buttonVariants }


