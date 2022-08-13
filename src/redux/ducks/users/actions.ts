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
