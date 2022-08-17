import styles from './Settings.module.scss'

import { ThemeSwitcher } from './ThemeSwitcher'

const Settings = () => {
  return (
    <div className={styles.settings}>
      <div className={styles.settingsTablo}>
        <ThemeSwitcher />
      </div>
    </div>
  )
}

export default Settings
