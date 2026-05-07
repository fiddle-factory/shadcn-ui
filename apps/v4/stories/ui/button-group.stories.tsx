import { useEffect, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Bold, Italic, Underline } from "lucide-react"

import { Button } from "@/registry/new-york-v4/ui/button"
import { ButtonGroup } from "@/registry/new-york-v4/ui/button-group"

const meta: Meta<typeof ButtonGroup> = {
  title: "UI/ButtonGroup",
  component: ButtonGroup,
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof ButtonGroup>

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">First</Button>
      <Button variant="outline">Second</Button>
      <Button variant="outline">Third</Button>
    </ButtonGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  ),
}

function WithIconsDemo() {
  const [btn1Label, setBtn1Label] = useState("1")
  const [btn2Label, setBtn2Label] = useState("2")
  const [btn3Label, setBtn3Label] = useState("3")
  const [variant, setVariant] = useState<"outline" | "default" | "secondary" | "ghost" | "destructive">("outline")
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal")

  // geneditor-listener-start
  useEffect(() => {
    const el = document.querySelector('[data-config-id="ButtonGroup-div-0"]')
    if (!el) return
    const handler = (e: Event) => {
      const d = (e as CustomEvent).detail
      if (d.btn1Label !== undefined) setBtn1Label(d.btn1Label)
      if (d.btn2Label !== undefined) setBtn2Label(d.btn2Label)
      if (d.btn3Label !== undefined) setBtn3Label(d.btn3Label)
      if (d.variant !== undefined) setVariant(d.variant)
      if (d.orientation !== undefined) setOrientation(d.orientation)
    }
    el.addEventListener("animation:update", handler)
    return () => el.removeEventListener("animation:update", handler)
  }, [])
  // geneditor-listener-end

  return (
    <ButtonGroup data-config-id="ButtonGroup-div-0" orientation={orientation}>
      <Button variant={variant} size="icon">{btn1Label}</Button>
      <Button variant={variant} size="icon">{btn2Label}</Button>
      <Button variant={variant} size="icon">{btn3Label}</Button>
    </ButtonGroup>
  )
}

export const WithIcons: Story = {
  render: () => <WithIconsDemo />,
}



