import styles from './Header.module.css';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectIsUserAuthed } from '../../../redux/ducks/auth/selectors';
import { logout } from '../../../redux/ducks/auth/operations';

import logo from './logo192.png';

const Header = props => {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <img className={styles.logo} src={logo} alt={'logo'} />

        { props.isUserAuthed
        ? <div className={styles.log}>
          <a onClick={props.logout}>Log Out</a>
        </div>
        : <div className={styles.log}>
          <Link to='/login'>Log In</Link>
        </div>
        }
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isUserAuthed: selectIsUserAuthed(state),
})

export default connect(mapStateToProps, { logout })(Header);
