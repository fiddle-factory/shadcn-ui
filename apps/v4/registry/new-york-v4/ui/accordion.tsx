"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
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
  const [triggerFontSize, setTriggerFontSize] = React.useState(12)
  // geneditor-listener-start
  React.useEffect(() => {
    const el = document.querySelector('[data-config-id="Accordion-AccordionPrimitive.Root-0"]')
    if (!el) return
    const handler = (e: Event) => {
      const d = (e as CustomEvent).detail
      if (d.triggerFontSize !== undefined) setTriggerFontSize(d.triggerFontSize)
    }
    el.addEventListener('animation:update', handler)
    return () => el.removeEventListener('animation:update', handler)
  }, [])
  // geneditor-listener-end
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        style={{ fontSize: triggerFontSize }}
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
  const [contentFontSize, setContentFontSize] = React.useState(12)
  React.useEffect(() => {
    const el = document.querySelector('[data-config-id="Accordion-AccordionPrimitive.Root-0"]')
    if (!el) return
    const handler = (e: Event) => {
      const d = (e as CustomEvent).detail
      if (d.contentFontSize !== undefined) setContentFontSize(d.contentFontSize)
    }
    el.addEventListener('animation:update', handler)
    return () => el.removeEventListener('animation:update', handler)
  }, [])
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden"
      style={{ fontSize: contentFontSize }}
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }



