import type { Meta, StoryObj } from "@storybook/react"

import { MusicPlayer } from "@/components/music-player"

const meta: Meta<typeof MusicPlayer> = {
  title: "UI/MusicPlayer",
  component: MusicPlayer,
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof MusicPlayer>

export const Default: Story = {
  render: () => <MusicPlayer />,
}

