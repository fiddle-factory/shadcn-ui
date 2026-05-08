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

function DefaultStory() {
  const [buttonBg, setButtonBg] = useState("#ef4444")
  const [buttonText, setButtonText] = useState("#ffffff")
  const [buttonBorder, setButtonBorder] = useState("#ef4444")

  // geneditor-listener-start
  useEffect(() => {
    const el = document.querySelector('[data-config-id="ButtonGroup-div-0"]')
    if (!el) return
    const handler = (e: Event) => {
      const d = (e as CustomEvent).detail
      if (d.buttonBg !== undefined) setButtonBg(d.buttonBg)
      if (d.buttonText !== undefined) setButtonText(d.buttonText)
      if (d.buttonBorder !== undefined) setButtonBorder(d.buttonBorder)
    }
    el.addEventListener("animation:update", handler)
    return () => el.removeEventListener("animation:update", handler)
  }, [])
  // geneditor-listener-end

  const buttonStyle: React.CSSProperties = {
    backgroundColor: buttonBg,
    color: buttonText,
    borderColor: buttonBorder,
  }

  return (
    <ButtonGroup data-config-id="ButtonGroup-div-0">
      <Button variant="outline" style={buttonStyle}>1</Button>
      <Button variant="outline" style={buttonStyle}>2</Button>
      <Button variant="outline" style={buttonStyle}>3</Button>
    </ButtonGroup>
  )
}

export const Default: Story = {
  render: () => <DefaultStory />,
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


