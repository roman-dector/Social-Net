import styles from './Header.module.scss'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectIsUserAuthed } from '../../../redux/ducks/auth/selectors'
import { logout } from '../../../redux/ducks/auth/operations'

import logo from './logo192.png'
import { FC } from 'react'
import { RootState } from '../../../redux/store'

type MapStateToPropsType = {
  isUserAuthed: boolean
}

type MapDispatchToPropsType = {
  logout: () => void
}

type HeaderPropsType = MapStateToPropsType & MapDispatchToPropsType

const Header: FC<HeaderPropsType> = props => {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <img className={styles.logo} src={logo} alt={'logo'} />

        <div className={styles.log}>
          {props.isUserAuthed ? (
            <a onClick={props.logout}>Log Out</a>
          ) : (
            <Link to='/login'>Log In</Link>
          )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState): MapStateToPropsType => ({
  isUserAuthed: selectIsUserAuthed(state),
})

export default connect<
  MapStateToPropsType,
  MapDispatchToPropsType,
  {},
  RootState
>(mapStateToProps, { logout })(Header)
