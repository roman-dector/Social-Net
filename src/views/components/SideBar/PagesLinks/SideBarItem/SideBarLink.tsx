import { NavLink } from 'react-router-dom';
import styles from './SideBarLink.module.scss';

const SideBarLink = ({ to, name }: {to: string, name: string}) => {
  return (
    <li className={styles.sideBarLink}>
      <NavLink
        to={to}
        className={data => (data.isActive ? styles.sideBarLink_active : styles.sideBarLink_link)}
      >
        {name}
      </NavLink>
    </li>
  );
};

export default SideBarLink;
