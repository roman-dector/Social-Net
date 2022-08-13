import { profileTypes } from '../profile'

export const SET_USERS_ITEMS =
  'social-network/users/SET_USERS_ITEMS'
export const TOGGLE_IS_GETTING_USERS_ITEMS =
  'social-network/users/TOGGLE_IS_GETTING_USERS_ITEM'
export const SET_TOTAL_USERS_COUNT_TYPE =
  'social-network/users/SET_TOTAL_USERS_COUNT_TYPE'


export type UserItemType = {
  id: number
  name: string
  status: string
  photos: profileTypes.PhotosType
  followed: boolean
}

export type UsersItemsType = Array<UserItemType>

export type ToggleIsGettingUsersItemsActionType = {
  type: typeof TOGGLE_IS_GETTING_USERS_ITEMS,
  isGettingUsersItems: boolean,
}

export type SetUsersItemsActionType = {
  type: typeof SET_USERS_ITEMS,
  usersItems: Array<UserItemType>,
}

export type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT_TYPE,
  totalUsersCount: number,
}

export type CombinedUsersReducerActionType =
  | SetUsersItemsActionType
  | ToggleIsGettingUsersItemsActionType
  | SetTotalUsersCountActionType
