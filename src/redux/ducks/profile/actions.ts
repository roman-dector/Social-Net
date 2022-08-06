import * as types from './types'

export const setUserProfileInfo = (
  userProfileInfo: types.UserProfileInfoType
): types.SetUserProfileInfoActionType => ({
  type: types.SET_USER_PROFILE_INFO,
  userProfileInfo,
})

export const setUserStatus = (userStatus: string): types.SetUserStatusActionType => ({
  type: types.SET_USER_STATUS,
  userStatus,
})

export const setUserPhotos = (
  photos: types.PhotosType
): types.SetUserPhotosActionType => ({
    type: types.SET_USER_PHOTOS,
    photos,
  })

export const toggleIsFetchingProfileInfo = (
  isFetchingProfileInfo: boolean
): types.ToggleIsFetchingProfileInfoActionType => ({
  type: types.TOGGLE_IS_FETCHING_PROFILE_INFO,
  isFetchingProfileInfo,
})

export const toggleIsFetchingProfileStatus = (
  isFetchingProfileStatus: boolean
): types.ToggleIsFetchingProfileStatusActionType => ({
  type: types.TOGGLE_IS_FETCHING_PROFILE_STATUS,
  isFetchingProfileStatus,
})
