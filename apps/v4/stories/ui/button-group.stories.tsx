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

function ButtonGroupDefaultDemo() {
  const [firstLabel, setFirstLabel] = useState("1")
  const [secondLabel, setSecondLabel] = useState("2")
  const [thirdLabel, setThirdLabel] = useState("3")

  // geneditor-listener-start
  useEffect(() => {
    const el = document.querySelector('[data-config-id="ButtonGroup-div-0"]')
    if (!el) return
    const handler = (e: Event) => {
      const d = (e as CustomEvent).detail
      if (d.firstLabel !== undefined) setFirstLabel(d.firstLabel)
      if (d.secondLabel !== undefined) setSecondLabel(d.secondLabel)
      if (d.thirdLabel !== undefined) setThirdLabel(d.thirdLabel)
    }
    el.addEventListener("animation:update", handler)
    return () => el.removeEventListener("animation:update", handler)
  }, [])
  // geneditor-listener-end

  return (
    <ButtonGroup data-config-id="ButtonGroup-div-0">
      <Button variant="outline">{firstLabel}</Button>
      <Button variant="outline">{secondLabel}</Button>
      <Button variant="outline">{thirdLabel}</Button>
    </ButtonGroup>
  )
}

export const Default: Story = {
  render: () => <ButtonGroupDefaultDemo />,
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


