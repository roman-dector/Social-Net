import * as types from './types'

const usersState = {
  totalUsersCount: 0,
  usersItems: [] as types.UsersItemsType,
  isGettingUsersItems: false,
}

type UsersStateType = typeof usersState

const usersItemsReducer = (
  state: UsersStateType = usersState,
  action: types.CombinedUsersItemsReducerActionType
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
        usersItems: action.usersItems.map(i => ({
          ...i,
          isToggleFollowingInProgress: false,
        })),
      }
    case types.SET_TOTAL_USERS_COUNT_TYPE:
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      }
    case types.SET_USER_FOLLOWED:
      return {
        ...state,
        usersItems: state.usersItems.map(userItem => {
          if (userItem.id === action.followed.userId) {
            return { ...userItem, followed: action.followed.isUserFollowed }
          }
          return userItem
        }),
      }
    case types.SET_IS_TOGGLE_FOLLOWING_IN_PROGRESS:
      return {
        ...state,
        usersItems: state.usersItems.map(userItem => {
          if (userItem.id === action.payload.userId) {
            return {
              ...userItem,
              isToggleFollowingInProgress:
                action.payload.isToggleFollowingInProgress,
            }
          }
          return userItem
        }),
      }
    default:
      return state
  }
}

export default usersItemsReducer
