import styles from './App.module.scss'

import { useEffect, FC } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { compose } from '@reduxjs/toolkit'
import { connect, useSelector, useDispatch } from 'react-redux'

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
} from '../components/index'
import { RootState } from '../../redux/store'


const App: FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeApp())
  })

  const isAppInitialized: boolean = useSelector(
    appSelectors.getIsAppInitialized
  )

  if (!isAppInitialized) return <Preloader />

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


export default withStore(App)
