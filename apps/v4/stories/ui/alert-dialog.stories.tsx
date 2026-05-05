import { useEffect, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/new-york-v4/ui/alert-dialog"
import { Button } from "@/registry/new-york-v4/ui/button"

const meta: Meta<typeof AlertDialog> = {
  title: "UI/AlertDialog",
  component: AlertDialog,
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof AlertDialog>

export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

function DestructiveAlertDialogStory() {
  const [buttonLabel, setButtonLabel] = useState("Delete Account")

  // geneditor-listener-start
  useEffect(() => {
    const el = document.querySelector('[data-config-id="Button-Comp-0"]')
    if (!el) return
    const handler = (e: Event) => {
      const d = (e as CustomEvent).detail
      if (d.buttonLabel !== undefined) setButtonLabel(d.buttonLabel)
    }
    el.addEventListener("animation:update", handler)
    return () => el.removeEventListener("animation:update", handler)
  }, [])
  // geneditor-listener-end

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button data-config-id="Button-Comp-0" variant="destructive">
          {buttonLabel}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the project "my-app" and all of its
            data. This action is irreversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">
            Delete Project
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const Destructive: Story = {
  render: () => <DestructiveAlertDialogStory />,
}


