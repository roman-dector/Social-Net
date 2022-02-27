import { RootState } from '../../store'

export const selectIsUserAuthed = (state: RootState): boolean =>
  state.authState.auth.isUserAuthed
export const selectIsAuthenticating = (state: RootState): boolean =>
  state.authState.auth.isAuthenticating

export const selectCaptchaUrl = (state: RootState): string | null =>
  state.authState.captcha.captchaUrl

export const selectLoggedUserId = (state: RootState): number | null =>
  state.authState.loggedUser.id
