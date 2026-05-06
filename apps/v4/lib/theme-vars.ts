export type ThemeVars = Record<string, string>

export type ThemeModes = {
  light: ThemeVars
  dark: ThemeVars
}

const SHARED_APP_THEME_VARS: ThemeVars = {
  surface: "var(--secondary)",
  "surface-foreground": "var(--secondary-foreground)",
  code: "var(--surface)",
  "code-foreground": "var(--surface-foreground)",
  "code-highlight": "var(--muted)",
  "code-number": "var(--muted-foreground)",
  selection: "var(--foreground)",
  "selection-foreground": "var(--background)",
}

const OKLCH_DESTRUCTIVE_FOREGROUND: ThemeModes = {
  light: {
    "destructive-foreground": "oklch(0.97 0.01 17)",
  },
  dark: {
    "destructive-foreground": "oklch(0.58 0.22 27)",
  },
}

export function withAppThemeVars(
  vars: ThemeModes,
  options?: {
    destructiveForeground?: Partial<ThemeModes>
  }
): ThemeModes {
  return {
    light: {
      ...(options?.destructiveForeground?.light ?? OKLCH_DESTRUCTIVE_FOREGROUND.light),
      ...vars.light,
      ...SHARED_APP_THEME_VARS,
    },
    dark: {
      ...(options?.destructiveForeground?.dark ?? OKLCH_DESTRUCTIVE_FOREGROUND.dark),
      ...vars.dark,
      ...SHARED_APP_THEME_VARS,
    },
  }
}

export function formatCssColor(value: string) {
  if (/^(var\(|oklch\(|hsl\(|rgb\(|rgba\(|#|color-mix\()/i.test(value)) {
    return value
  }

  return `hsl(${value})`
}
