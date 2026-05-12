import type { Meta, StoryObj } from "@storybook/react"
import { Loader2, Mail } from "lucide-react"
import { useState, useEffect } from "react"

import { Button } from "@/registry/new-york-v4/ui/button"

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Button>

function DefaultButtonStory() {
  const [label, setLabel] = useState("hey")
  const [variant, setVariant] = useState("default")
  const [size, setSize] = useState("default")

  // geneditor-listener-start
  useEffect(() => {
    const el = document.querySelector('[data-config-id="Button-Comp-0"]')
    if (!el) return
    const handler = (e: Event) => {
      const d = (e as CustomEvent).detail
      if (d.label !== undefined) setLabel(d.label)
      if (d.variant !== undefined) setVariant(d.variant)
      if (d.size !== undefined) setSize(d.size)
    }
    el.addEventListener('animation:update', handler)
    return () => el.removeEventListener('animation:update', handler)
  }, [])
  // geneditor-listener-end

  return (
    <Button variant={variant as any} size={size as any}>
      {label}
    </Button>
  )
}

export const Default: Story = {
  render: () => <DefaultButtonStory />,
}

export const Destructive: Story = {
  render: () => <Button variant="destructive">Destructive</Button>,
}

export const Outline: Story = {
  render: () => <Button variant="outline">Outline</Button>,
}

export const Secondary: Story = {
  render: () => <Button variant="secondary">Secondary</Button>,
}

export const Ghost: Story = {
  render: () => <Button variant="ghost">Ghost</Button>,
}

export const LinkVariant: Story = {
  name: "Link",
  render: () => <Button variant="link">Link</Button>,
}

export const Disabled: Story = {
  render: () => <Button disabled>Disabled</Button>,
}

export const WithIcon: Story = {
  render: () => (
    <Button>
      <Mail />
      Login with Email
    </Button>
  ),
}

export const Loading: Story = {
  render: () => (
    <Button disabled>
      <Loader2 className="animate-spin" />
      Please wait
    </Button>
  ),
}


