import { AppThunk } from '../../store'
import { authOperations } from '../auth'
import { themeAPI } from '../../../dal/localForage'
import * as actions from './actions'

export const initializeApp =
  (): AppThunk =>
  (dispatch): void => {
    Promise.all([
      dispatch(authOperations.authMe()),
      dispatch(setAppTheme()),
    ]).then(() => dispatch(actions.setIsAppInitialized(true)))
  }

export const setAppTheme = (): AppThunk => async dispatch => {
  let theme = await themeAPI.getAppThemeFromLF()
  if (theme !== null) {
    dispatch(actions.setAppTheme(theme))
    document.documentElement.setAttribute('app-theme', theme)
  } else {
    document.documentElement.setAttribute('app-theme', 'dark')
  }
}
