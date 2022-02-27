import * as types from './types'

export const setIsUserAuthed = (
  isUserAuthed: boolean
): types.SetIsUserAuthedActionType => ({
  type: types.SET_IS_USER_AUTHED,
  isUserAuthed,
})

export const setIsAuthenticating = (
  isAuthenticating: boolean
): types.SetIsAuthenticatingActionType => ({
  type: types.SET_IS_AUTHENTICATING,
  isAuthenticating,
})

export const setCaptchaUrl = (
  captchaUrl: string
): types.SetCaptchaUrlActionType => ({
  type: types.SET_CAPTCHA_URL,
  captchaUrl,
})

export const setLoggedUserInfo = (
  loggedUserInfo: types.LoggedUserInfoType
): types.SetLoggedUserInfoActionType => ({
  type: types.SET_LOGGED_USER_INFO,
  loggedUserInfo,
})
