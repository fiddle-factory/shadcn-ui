import type { Meta, StoryObj } from "@storybook/react"
import { LoginPage } from "./login-page"

const meta: Meta<typeof LoginPage> = {
  title: "Pages/LoginPage",
  component: LoginPage,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof LoginPage>

export const Default: Story = {
  render: () => <LoginPage />,
}

