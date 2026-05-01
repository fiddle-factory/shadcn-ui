"use client"

import * as React from "react"
import { useEffect } from "react"
import { ChevronDownIcon } from "lucide-react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  // geneditor-listener-start
  useEffect(() => {
    const el = document.querySelector('[data-config-id="Accordion-AccordionPrimitive.Root-0"]')
    if (!el) return
    const handler = (e: Event) => {
      const d = (e as CustomEvent).detail
      if (d.triggerFontSize !== undefined) {
        ;(el as HTMLElement).style.setProperty("--accordion-trigger-font-size", d.triggerFontSize + "rem")
      }
      if (d.contentFontSize !== undefined) {
        ;(el as HTMLElement).style.setProperty("--accordion-content-font-size", d.contentFontSize + "rem")
      }
    }
    el.addEventListener("animation:update", handler)
    return () => el.removeEventListener("animation:update", handler)
  }, [])
  // geneditor-listener-end
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      data-config-id="Accordion-AccordionPrimitive.Root-0"
      style={
        {
          "--accordion-trigger-font-size": "0.75rem",
          "--accordion-content-font-size": "0.75rem",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        style={{ fontSize: "var(--accordion-trigger-font-size, 0.75rem)" }}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden"
      style={{ fontSize: "var(--accordion-content-font-size, 0.75rem)" }}
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }




