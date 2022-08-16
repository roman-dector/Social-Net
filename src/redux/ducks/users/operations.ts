import { AppThunk } from '../../store'
import * as actions from './actions'
import { usersAPI } from '../../../dal/api'
import { followAPI } from '../../../dal/api'

export const getUsers =
  ({
    count = 10,
    page = 1,
    term = undefined,
    friend = undefined,
  }: {
    count: number
    page: number
    term: string | undefined
    friend: string | undefined
  }): AppThunk<Promise<void>> =>
  async dispatch => {
    let response = await usersAPI.getUsers(count, page, term, friend)
    if (!response.data.error) {
      dispatch(actions.setUsersItems(response.data.items))
      dispatch(actions.setTotalUsersCount(response.data.totalCount))
      dispatch(actions.toggleIsGettingUsersItems(false))
    }
  }

export const followUser =
(userId: number): AppThunk<Promise<void>> =>
async dispatch => {
  let response = await followAPI.followUser(userId)
  if (!response.data.resultCode) {
    dispatch(actions.setUserFollowed(userId, true))
    dispatch(actions.setIsToggleFollowingInProgress(userId, false))
  }
}

export const unfollowUser =
(userId: number): AppThunk<Promise<void>> =>
async dispatch => {
  let response = await followAPI.unfollowUser(userId)
  if (!response.data.resultCode) {
    dispatch(actions.setUserFollowed(userId, false))
    dispatch(actions.setIsToggleFollowingInProgress(userId, false))
  }
}
