import { AppThunk } from '../../store'
import * as actions from './actions'
import { usersAPI } from '../../../dataAccess/api'
import { usersTypes } from '.'

export const getUsers =
  ({count = 10, page = 1, term = null, friend = null}): AppThunk<Promise<void>> =>
  async dispatch => {
    let response = await usersAPI.getUsers(count, page, term, friend)
    if (!response.data.error) {
      dispatch(actions.setUsersItems(response.data.items))
      dispatch(actions.setTotalUsersCount(response.data.totalCount))
      dispatch(actions.toggleIsGettingUsersItems(false))
    }
  }
