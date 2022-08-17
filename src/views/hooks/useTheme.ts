import { useState, useLayoutEffect } from 'react'

export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useLayoutEffect(() => {
    document.documentElement.setAttribute('app-theme', theme)
  }, [theme])

  return { theme, setTheme }
}
