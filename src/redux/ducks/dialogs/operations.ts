import { AppThunk } from '../../store'

import { dialogsAPI } from '../../../dal/api'

import * as types from './types'
import * as actions from './actions'

export const getStartedDialogs = (): AppThunk => async dispatch => {
  let response = await dialogsAPI.getStartedDialogs()
  dispatch(actions.setStartedDialogs(response.data))
}
