import * as React from "react"
import type { Preview } from "@storybook/react"
import { ThemeProvider } from "./mocks/next-themes"
import "./preview.css"
import "../styles/globals.css"

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Global color mode",
      defaultValue: "light",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === "dark" ? "dark" : "light"

      return React.createElement(
        ThemeProvider,
        { defaultTheme: theme },
        React.createElement(
          "div",
          {
            className:
              theme === "dark"
                ? "dark inline-block bg-background text-foreground"
                : "inline-block bg-background text-foreground",
          },
          React.createElement(Story)
        )
      )
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "padded",
  },
  tags: ["autodocs"],
}

export default preview
