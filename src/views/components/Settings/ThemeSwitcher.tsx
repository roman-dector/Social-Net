import styles from './Settings.module.scss'

import { useTheme } from '../../hooks/useTheme'

export const ThemeSwitcher = () => {
  const {theme, setTheme} = useTheme()
  return (
    <div
      className={styles.themeSwitcher}
      onClick={() => {
        if (theme === 'dark') {
          setTheme('light')
        } else {
          setTheme('dark')
        }
      }}
    >
      {
        theme === 'dark'
        ? 'Dark theme applied'
        : 'Light theme applied'
      }
    </div>
  )
}