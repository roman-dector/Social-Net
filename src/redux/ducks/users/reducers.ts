import { combineReducers } from '@reduxjs/toolkit'
import * as types from './types'

const usersState = {
  usersItems: [] as types.UsersItemsType,
  isGettingUsersItems: false,
}

type UsersStateType = typeof usersState

const usersItemsReducer = (
  state: UsersStateType = usersState,
  action: types.CombinedUsersReducerActionType
): UsersStateType => {
  switch (action.type) {
    case types.TOGGLE_IS_GETTING_USERS_ITEMS:
      return {
        ...state,
        isGettingUsersItems: action.isGettingUsersItems,
      }
    case types.SET_USERS_ITEMS:
      return {
        ...state,
        usersItems: action.usersItems,
      }
    default:
      return state
  }
}

export default usersItemsReducer