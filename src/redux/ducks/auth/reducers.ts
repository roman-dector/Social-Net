import { combineReducers } from '@reduxjs/toolkit'
import * as types from './types'

const authState = {
  isUserAuthed: false,
  isAuthenticating: false,
}

type AuthStateType = typeof authState

const loggedUserState = {
  id: 0,
  email: '',
  login: '',
}

type LoggedUserStateType = typeof loggedUserState

const captchaState = {
  captchaUrl: null as string | null,
}

type CaptchaStateType = typeof captchaState

const authReducer = (
  state: AuthStateType = authState,
  action: any
): AuthStateType => {
  switch (action.type) {
    case types.SET_IS_USER_AUTHED:
      return {
        ...state,
        isUserAuthed: action.isUserAuthed,
      }
    case types.SET_IS_AUTHENTICATING:
      return {
        ...state,
        isAuthenticating: action.isAuthenticating,
      }
    default:
      return state
  }
}

const loggedUserReducer = (
  state: LoggedUserStateType = loggedUserState,
  action: any
): LoggedUserStateType => {
  switch (action.type) {
    case types.SET_LOGGED_USER_INFO:
      return {
        ...state,
        ...action.loggedUserInfo,
      }
    default:
      return state
  }
}

const captchaReducer = (
  state: CaptchaStateType = captchaState,
  action: any
): CaptchaStateType => {
  switch (action.type) {
    case types.SET_CAPTCHA_URL:
      return {
        ...state,
        captchaUrl: action.captchaUrl,
      }
    default:
      return state
  }
}

export default combineReducers({
  auth: authReducer,
  captcha: captchaReducer,
  loggedUser: loggedUserReducer,
})
