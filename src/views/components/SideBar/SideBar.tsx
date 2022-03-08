import styles from './SideBar.module.css';

import PagesLinks from './PagesLinks/PagesLinks';

const SideBar = () => {
  return (
    <div className={styles.sideBar}>
      <div className={styles.sideBarContent}>
        <PagesLinks />
      </div>
    </div>
  );
};

export default SideBar;
