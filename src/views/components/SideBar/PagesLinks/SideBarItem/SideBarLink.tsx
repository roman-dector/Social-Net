import { NavLink } from 'react-router-dom';
import styles from './SideBarLink.module.css';

const SideBarLink = ({ to, name }: {to: string, name: string}) => {
  return (
    <li className={styles.sideBarLink}>
      <NavLink
        to={to}
        className={data => (data.isActive ? styles.active : styles.link)}
      >
        {name}
      </NavLink>
    </li>
  );
};

export default SideBarLink;
