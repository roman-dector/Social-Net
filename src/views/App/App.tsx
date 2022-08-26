import styles from './App.module.css'

import { useEffect, FC, Suspense } from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { initializeApp } from '../../redux/ducks/app/operations'
import { appSelectors } from '../../redux/ducks/app'
import withStore from '../hocs/withStore'
import {
  Header,
  SideBar,
  Login,
  Profile,
  Users,
  Music,
  Settings,
  NotFound,
  Preloader,
} from '../components/index'

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
    <Router>
      <div className={styles.appContainer}>
        <div className={styles.app}>
          <Header />
          <SideBar />

          <div className={styles.contentWrapper}>
            <Suspense fallback={<Preloader />}>
              <Routes>
                <Route path='/' element={<Navigate replace to='/profile' />} />

                <Route path='/login' element={<Login />} />

                <Route path='/profile' element={<Profile />}>
                  <Route path=':userId' element={<Profile />} />
                </Route>

                <Route path='/users' element={<Users />} />

                <Route path='/music' element={<Music />} />

                <Route path='/settings' element={<Settings />} />

                <Route path='*' element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default withStore(App)
