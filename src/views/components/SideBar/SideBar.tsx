import styles from './SideBar.module.scss'

import PagesLinks from './PagesLinks/PagesLinks'

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__content}>
        <PagesLinks />
      </div>
    </div>
  )
}

export default SideBar
