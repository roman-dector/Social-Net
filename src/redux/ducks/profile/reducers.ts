import { combineReducers } from '@reduxjs/toolkit'
import * as types from './types'

const profileInfoState = {
  isFetchingProfileInfo: false,
  isFetchingProfileStatus: false,
  userProfileInfo: {} as types.UserProfileInfoType,
  userProfileStatus: '',
}

type ProfileInfoStateType = typeof profileInfoState

const profilePostsState = {}

type ProfilePostsStateType = typeof profilePostsState

const profileInfoReducer = (
  state: ProfileInfoStateType = profileInfoState,
  action: types.CombinedProfileReducerActionType
): ProfileInfoStateType => {
  switch (action.type) {
    case types.SET_USER_PROFILE_INFO:
      return {
        ...state,
        userProfileInfo: action.userProfileInfo,
      }
    case types.SET_USER_STATUS:
      return {
        ...state,
        userProfileStatus: action.userStatus,
      }
    case types.SET_USER_PHOTOS:
      return {
        ...state,
        userProfileInfo: { ...state.userProfileInfo, photos: action.photos },
      }
    case types.TOGGLE_IS_FETCHING_PROFILE_INFO:
      return {
        ...state,
        isFetchingProfileInfo: action.isFetchingProfileInfo,
      }
    case types.TOGGLE_IS_FETCHING_PROFILE_STATUS:
      return {
        ...state,
        isFetchingProfileStatus: action.isFetchingProfileStatus,
      }
    default:
      return state
  }
}

const profilePostsReducer = (
  state: ProfilePostsStateType = profilePostsState,
  action: any
): ProfilePostsStateType => {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  profileInfo: profileInfoReducer,
  profilePosts: profilePostsReducer,
})
