import { lazy } from 'react'

export { default as Header } from './Header/Header'
export { default as SideBar } from './SideBar/SideBar'
export { default as Preloader } from './common/Preloader/Preloader'

export const Login = lazy(() => import('./Login/Login'))
export const Profile = lazy(() => import('./Profile/Profile'))
export const Users = lazy(() => import('./Users/Users'))
export const Music = lazy(() => import('./Music/Music'))
export const Settings = lazy(() => import('./Settings/Settings'))
export const NotFound = lazy(() => import('./NotFound/NotFound'))
