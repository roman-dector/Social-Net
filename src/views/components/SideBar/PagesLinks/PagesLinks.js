import styles from './PagesLinks.module.css';

import SideBarLink from './SideBarItem/SideBarLink';

const PagesLinks = () => {
  return (
    <ul className={styles.pagesLinks}>
      <SideBarLink to='/profile' name='Profile' />
      <SideBarLink to='/dialogs' name='Dialogs' />
      <SideBarLink to='/users' name='Users' />
      <SideBarLink to='/music' name='Music' />
      <SideBarLink to='/settings' name='Settings' />
    </ul>
  );
};

export default PagesLinks;
