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

export const Vertical: Story = {
  render: function Render() {
    const [option1, setOption1] = useState("1")
    const [option2, setOption2] = useState("2")
    const [option3, setOption3] = useState("3")

    // geneditor-listener-start
    useEffect(() => {
      const el = document.querySelector('[data-config-id="ButtonGroup-div-0"]')
      if (!el) return
      const handler = (e: Event) => {
        const d = (e as CustomEvent).detail
        if (d.option1 !== undefined) setOption1(d.option1)
        if (d.option2 !== undefined) setOption2(d.option2)
        if (d.option3 !== undefined) setOption3(d.option3)
      }
      el.addEventListener("animation:update", handler)
      return () => el.removeEventListener("animation:update", handler)
    }, [])
    // geneditor-listener-end

    return (
      <ButtonGroup data-config-id="ButtonGroup-div-0" orientation="vertical">
        <Button variant="outline">{option1}</Button>
        <Button variant="outline">{option2}</Button>
        <Button variant="outline">{option3}</Button>
      </ButtonGroup>
    )
  },
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


