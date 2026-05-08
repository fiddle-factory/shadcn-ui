import * as React from "react"
import { cva } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

// ─── Dock magnification context ───────────────────────────────────────────────
interface DockContextValue {
  hoveredIndex: number | null
  onHover: (i: number | null) => void
  magnifyScale: number
  neighborScale: number
  farScale: number
  transitionDuration: number
}

const DockContext = React.createContext<DockContextValue>({
  hoveredIndex: null,
  onHover: () => {},
  magnifyScale: 1.28,
  neighborScale: 1.14,
  farScale: 1.06,
  transitionDuration: 500,
})

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList({
  className,
  children,
  magnifyScale: magnifyScaleProp = 1.28,
  neighborScale: neighborScaleProp = 1.14,
  farScale: farScaleProp = 1.06,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List> & {
  magnifyScale?: number
  neighborScale?: number
  farScale?: number
}) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
  const [magnifyScale, setMagnifyScale] = React.useState(magnifyScaleProp)
  const [neighborScale, setNeighborScale] = React.useState(neighborScaleProp)
  const [farScale, setFarScale] = React.useState(farScaleProp)
  const [transitionDuration, setTransitionDuration] = React.useState(500)
  const counterRef = React.useRef(0)

  // geneditor-listener-start
  React.useEffect(() => {
    const el = document.querySelector('[data-config-id="NavigationMenu-NavigationMenuPrimitive.Root-0"]')
    if (!el) return
    const handler = (e: Event) => {
      const d = (e as CustomEvent).detail
      if (d.magnifyScale !== undefined) setMagnifyScale(d.magnifyScale)
      if (d.neighborScale !== undefined) setNeighborScale(d.neighborScale)
      if (d.farScale !== undefined) setFarScale(d.farScale)
      if (d.transitionDuration !== undefined) setTransitionDuration(d.transitionDuration)
    }
    el.addEventListener('animation:update', handler)
    return () => el.removeEventListener('animation:update', handler)
  }, [])
  // geneditor-listener-end

  // Assign sequential dock indices to direct children
  counterRef.current = 0
  const indexedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child
    const idx = counterRef.current++
    return React.cloneElement(child as React.ReactElement<{ _dockIndex?: number }>, {
      _dockIndex: idx,
    })
  })

  return (
    <DockContext.Provider value={{ hoveredIndex, onHover: setHoveredIndex, magnifyScale, neighborScale, farScale, transitionDuration }}>
      <NavigationMenuPrimitive.List
        data-slot="navigation-menu-list"
        className={cn(
          "group flex flex-1 list-none items-end justify-center gap-0.5",
          "rounded-2xl border border-border/50 bg-background/80 px-2 py-1.5 shadow-lg backdrop-blur-md",
          className
        )}
        {...props}
      >
        {indexedChildren}
      </NavigationMenuPrimitive.List>
    </DockContext.Provider>
  )
}

function NavigationMenuItem({
  className,
  _dockIndex,
  onMouseEnter,
  onMouseLeave,
  style,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item> & {
  _dockIndex?: number
}) {
  const { hoveredIndex, onHover, magnifyScale, neighborScale, farScale, transitionDuration } =
    React.useContext(DockContext)

  const scale = React.useMemo(() => {
    if (hoveredIndex === null || _dockIndex === undefined) return 1
    const dist = Math.abs(hoveredIndex - _dockIndex)
    if (dist === 0) return magnifyScale
    if (dist === 1) return neighborScale
    if (dist === 2) return farScale
    return 1
  }, [hoveredIndex, _dockIndex, magnifyScale, neighborScale, farScale])

  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "bottom center",
        // ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1) — matches the CodePen exactly
        transition: `transform ${transitionDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        zIndex: scale > 1 ? 10 : undefined,
        willChange: "transform",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (_dockIndex !== undefined) onHover(_dockIndex)
        onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        onHover(null)
        onMouseLeave?.(e)
      }}
      {...props}
    />
  )
}

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center gap-2 rounded-xl bg-transparent px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,background-color,box-shadow] duration-200 focus-visible:ring-[3px] focus-visible:outline-1"
)

function NavigationMenuTrigger({
  className,
  children,
  icon,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger> & {
  /** Optional icon to display above the label (e.g. a Lucide icon element) */
  icon?: React.ReactNode
}) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(
        navigationMenuTriggerStyle(),
        "group",
        icon && "h-auto flex-col gap-1.5 pb-2 pt-2.5",
        className
      )}
      {...props}
    >
      {icon && (
        <span className="flex size-8 items-center justify-center rounded-xl bg-accent/50 text-accent-foreground transition-colors duration-200 group-hover:bg-accent group-data-[state=open]:bg-accent [&_svg]:size-4">
          {icon}
        </span>
      )}
      <span className="flex items-center gap-0.5">
        {children}
        <ChevronDownIcon
          className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
          aria-hidden="true"
        />
      </span>
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
        "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div
      className={cn(
        "absolute top-full left-0 isolate z-50 flex justify-center"
      )}
    >
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
          className
        )}
        {...props}
      />
    </div>
  )
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
}






