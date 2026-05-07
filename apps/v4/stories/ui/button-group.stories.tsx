import type { Meta, StoryObj } from "@storybook/react"
import { Bold, Italic, Underline } from "lucide-react"
import { useEffect, useState } from "react"

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

function VerticalStory() {
  const [label1, setLabel1] = useState("1")
  const [label2, setLabel2] = useState("2")
  const [label3, setLabel3] = useState("3")

  // geneditor-listener-start
  useEffect(() => {
    const el = document.querySelector('[data-config-id="ButtonGroup-div-0"]')
    if (!el) return
    const handler = (e: Event) => {
      const d = (e as CustomEvent).detail
      if (d.label1 !== undefined) setLabel1(d.label1)
      if (d.label2 !== undefined) setLabel2(d.label2)
      if (d.label3 !== undefined) setLabel3(d.label3)
    }
    el.addEventListener("animation:update", handler)
    return () => el.removeEventListener("animation:update", handler)
  }, [])
  // geneditor-listener-end

  return (
    <ButtonGroup data-config-id="ButtonGroup-div-0" orientation="vertical">
      <Button variant="outline">{label1}</Button>
      <Button variant="outline">{label2}</Button>
      <Button variant="outline">{label3}</Button>
    </ButtonGroup>
  )
}

export const Vertical: Story = {
  render: () => <VerticalStory />,
}

export const WithIcons: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline" size="icon">
        <Bold />
      </Button>
      <Button variant="outline" size="icon">
        <Italic />
      </Button>
      <Button variant="outline" size="icon">
        <Underline />
      </Button>
    </ButtonGroup>
  ),
}



