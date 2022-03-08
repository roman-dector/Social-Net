export const SET_IS_USER_AUTHED = 'social-network/auth/SET_IS_USER_AUTHED'
export const SET_IS_AUTHENTICATING = 'social-network/auth/SET_IS_AUTHENTICATING'

export const SET_CAPTCHA_URL = 'social-network/auth/SET_CAPTCHA_URL'

export const SET_LOGGED_USER_INFO = 'social-network/auth/SET_LOGGED_USER_INFO'

export type SetIsUserAuthedActionType = {
  type: typeof SET_IS_USER_AUTHED
  isUserAuthed: boolean
}

export type SetIsAuthenticatingActionType = {
  type: typeof SET_IS_AUTHENTICATING
  isAuthenticating: boolean
}

export type SetCaptchaUrlActionType = {
  type: typeof SET_CAPTCHA_URL
  captchaUrl: string
}

export type LoggedUserInfoType = {
  id: number | null
  email: string
  login: string
}

export type SetLoggedUserInfoActionType = {
  type: typeof SET_LOGGED_USER_INFO
  loggedUserInfo: LoggedUserInfoType
}

export type LoginDataType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string | null
}
