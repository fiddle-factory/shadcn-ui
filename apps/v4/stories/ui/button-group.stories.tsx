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
      <Button variant="outline">1</Button>
      <Button variant="outline">2</Button>
      <Button variant="outline">3</Button>
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

