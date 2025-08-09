import { useEffect, useMemo, useState } from "react"
import { ThemeProviderContext, type Theme, type ThemeProviderProps } from "./use-theme"



export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )
  const systemTheme = useMemo<Theme>(() => {
    return window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light"
  }, [])

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [systemTheme, theme])

  const value = {
    theme,
    systemTheme,
    useSystemTheme: theme === "system",
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
