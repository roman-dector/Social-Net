import { profileTypes } from '../profile'

export const SET_USERS_ITEMS = 'social-network/users/SET_USERS_ITEMS'
export const TOGGLE_IS_GETTING_USERS_ITEMS =
  'social-network/users/TOGGLE_IS_GETTING_USERS_ITEM'
export const SET_TOTAL_USERS_COUNT_TYPE =
  'social-network/users/SET_TOTAL_USERS_COUNT_TYPE'
export const SET_USER_FOLLOWED = 'social-network/users/SET_IS_USER_FOLLOWED'
export const FOLLOW_USER = 'social-network/users/FOLLOW_USER'
export const UNFOLLOW_USER = 'social-network/users/UnfOLLOW_USER'
export const SET_IS_TOGGLE_FOLLOWING_IN_PROGRESS =
  'social-network/users/SET_IS_TOGGLE_FOLLOWING_IN_PROGRESS'

export type UserItemType = {
  id: number
  name: string
  status: string
  photos: profileTypes.PhotosType
  followed: boolean
  isToggleFollowingInProgress: boolean
}

export type UsersItemsType = Array<UserItemType>

export type ToggleIsGettingUsersItemsActionType = {
  type: typeof TOGGLE_IS_GETTING_USERS_ITEMS
  isGettingUsersItems: boolean
}

export type SetUsersItemsActionType = {
  type: typeof SET_USERS_ITEMS
  usersItems: Array<UserItemType>
}

export type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT_TYPE
  totalUsersCount: number
}

export type SetUserFollowedActionType = {
  type: typeof SET_USER_FOLLOWED
  followed: { userId: number; isUserFollowed: boolean }
}

export type FollowUserActionType = {
  type: typeof FOLLOW_USER
  userId: number
}

export type UnfollowUserActionType = {
  type: typeof UNFOLLOW_USER
  userId: number
}

export type SetIsToggleFollowingInProgressActionType = {
  type: typeof SET_IS_TOGGLE_FOLLOWING_IN_PROGRESS
  payload: { userId: number; isToggleFollowingInProgress: boolean }
}

export type CombinedUsersItemsReducerActionType =
  | SetUsersItemsActionType
  | ToggleIsGettingUsersItemsActionType
  | SetTotalUsersCountActionType
  | SetUserFollowedActionType
  | FollowUserActionType
  | UnfollowUserActionType
  | SetIsToggleFollowingInProgressActionType
