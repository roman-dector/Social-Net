import * as types from './types'

export const toggleIsGettingUsersItems = (
  isGettingUsersItems: boolean
): types.ToggleIsGettingUsersItemsActionType => ({
  type: types.TOGGLE_IS_GETTING_USERS_ITEMS,
  isGettingUsersItems,
})

export const setUsersItems = (
  usersItems: types.UsersItemsType
): types.SetUsersItemsActionType => ({
  type: types.SET_USERS_ITEMS,
  usersItems,
})

export const setTotalUsersCount = (
  totalUsersCount: number
): types.SetTotalUsersCountActionType => ({
  type: types.SET_TOTAL_USERS_COUNT_TYPE,
  totalUsersCount: totalUsersCount,
})

export const setUserFollowed = (
  userId: number,
  isUserFollowed: boolean
): types.SetUserFollowedActionType => ({
  type: types.SET_USER_FOLLOWED,
  followed: { userId, isUserFollowed },
})

export const followUser = (userId: number): types.FollowUserActionType => ({
  type: types.FOLLOW_USER,
  userId,
})

export const unfollowUser = (userId: number): types.UnfollowUserActionType => ({
  type: types.UNFOLLOW_USER,
  userId,
})
