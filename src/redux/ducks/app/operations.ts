import { AppDispatch, AppThunk } from '../../store'
import { authOperations } from '../auth'
import * as actions from './actions'

export const initializeApp =
  (): AppThunk =>
  (dispatch): void => {
    Promise.all([dispatch(authOperations.authMe())]).then(() =>
      dispatch(actions.setIsAppInitialized(true))
    )
  }
