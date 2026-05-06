import * as React from "react"

type Theme = "light" | "dark" | "system"

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: "light" | "dark"
  themes: Theme[]
  systemTheme: "light"
  forcedTheme: Theme | undefined
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

function resolveTheme(theme: Theme) {
  return theme === "dark" ? "dark" : "light"
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") {
    return
  }

  const resolvedTheme = resolveTheme(theme)
  document.documentElement.classList.toggle("dark", resolvedTheme === "dark")
  document.body.classList.toggle("dark", resolvedTheme === "dark")
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext)

  if (context) {
    return context
  }

  return {
    theme: "light" as Theme,
    setTheme: () => {},
    resolvedTheme: "light" as const,
    themes: ["light", "dark", "system"] as Theme[],
    systemTheme: "light" as const,
    forcedTheme: undefined,
  }
}

export const ThemeProvider = ({
  children,
  defaultTheme = "light",
}: {
  children: React.ReactNode
  defaultTheme?: Theme
}) => {
  const [theme, setTheme] = React.useState<Theme>(defaultTheme)

  React.useEffect(() => {
    setTheme(defaultTheme)
  }, [defaultTheme])

  React.useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      resolvedTheme: resolveTheme(theme),
      themes: ["light", "dark", "system"],
      systemTheme: "light",
      forcedTheme: undefined,
    }),
    [theme]
  )

  return React.createElement(ThemeContext.Provider, { value }, children)
}
