import styles from './Settings.module.scss'

import { IoMdSunny, IoMdMoon } from 'react-icons/io'

import { useTheme } from '../../hooks/useTheme'

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
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
      <span>App theme</span>
      <div className={styles.buttonSwitcher}>
        {theme === 'dark' ? (
          <>
            <IoMdMoon size={25} />
            <span>Dark</span>
          </>
        ) : (
          <>
            <IoMdSunny size={25} />
            <span>Light</span>
          </>
        )}
      </div>
    </div>
  )
}
