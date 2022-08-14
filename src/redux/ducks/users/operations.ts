import { AppThunk } from '../../store'
import * as actions from './actions'
import { usersAPI } from '../../../dal/api'
import { usersTypes } from '.'

export const getUsers =
  ({count = 10, page = 1, term = undefined, friend = undefined}): AppThunk<Promise<void>> =>
  async dispatch => {
    let response = await usersAPI.getUsers(count, page, term, friend)
    if (!response.data.error) {
      dispatch(actions.setUsersItems(response.data.items))
      dispatch(actions.setTotalUsersCount(response.data.totalCount))
      dispatch(actions.toggleIsGettingUsersItems(false))
    }
  }
