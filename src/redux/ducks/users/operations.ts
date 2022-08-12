import { AppThunk } from '../../store'
import * as actions from './actions'
import { usersAPI } from '../../../dataAccess/api'
import { usersTypes } from '.'

export const getUsers = (): AppThunk<Promise<void>> => async dispatch => {
  let response = await usersAPI.getUsers()
  if (!response.data.error) {
    dispatch(actions.setUsersItems(response.data.items))
    dispatch(actions.toggleIsGettingUsersItems(false))
  }
}
