import styles from './App.module.scss'

import React, { useEffect, FC } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { compose } from '@reduxjs/toolkit'
import { connect } from 'react-redux'

import { initializeApp } from '../../redux/ducks/app/operations'
import { appSelectors } from '../../redux/ducks/app'
import withStore from '../hocs/withStore'
import {
  Header,
  SideBar,
  Login,
  Profile,
  Dialogs,
  Users,
  Music,
  Settings,
  NotFound,
  Preloader,
} from '../components/index.js'
import { RootState } from '../../redux/store'

type MapStateToPropsType = {
  isAppInitialized: boolean
}

type MapDispatchToPropsType = {
  initializeApp: () => void
}

type AppPropsType = MapStateToPropsType & MapDispatchToPropsType

const App: FC<AppPropsType> = props => {
  useEffect(() => props.initializeApp())

  if (!props.isAppInitialized) return <Preloader />

  return (
    <HashRouter>
      <div className={styles.app}>
        <Header />
        <SideBar />

        <div className={styles.contentWrapper}>
          <Routes>
            <Route path='/' element={<Navigate replace to='/profile' />} />

            <Route path='/login' element={<Login />} />

            <Route path='/profile' element={<Profile />}>
              <Route path=':userId' element={<Profile />} />
            </Route>

            <Route path='/dialogs' element={<Dialogs />} />

            <Route path='/users' element={<Users />} />

            <Route path='/music' element={<Music />} />

            <Route path='/settings' element={<Settings />} />

            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  )
}

const mapStateToProps = (state: RootState): MapStateToPropsType => ({
  isAppInitialized: appSelectors.getIsAppInitialized(state),
})

export default compose(
  withStore,
  connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootState>(
    mapStateToProps,
    { initializeApp }
  )
)(App)
