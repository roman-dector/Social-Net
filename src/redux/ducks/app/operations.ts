import { AppThunk } from '../../store'
import { authOperations } from '../auth'
import { getAppThemeFromLS } from '../../../dal/localStorage'
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
  let theme = await getAppThemeFromLS()
  if (theme !== null) {
    dispatch(actions.setAppTheme(theme))
  }
}
