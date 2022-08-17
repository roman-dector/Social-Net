import styles from './Settings.module.scss'

import { ThemeSwitcher } from './ThemeSwitcher'

const Settings = () => {
  return (
    <div className={styles.settings}>
      <div className={styles.settingsTablo}>
      <h1>Settings</h1>

      <ThemeSwitcher />
      </div>
    </div>
  )
}

export default Settings
