export const SET_USER_PROFILE_INFO =
  'social-network/profile/SET_USER_PROFILE_INFO'
export const SET_USER_STATUS = 'social-network/profile/SET_USER_STATUS'
export const TOGGLE_IS_FETCHING_PROFILE_INFO =
  'social-network/profile/TOGGLE_IS_FETCHING_PROFILE_INFO'
export const TOGGLE_IS_FETCHING_PROFILE_STATUS =
  'social-network/profile/TOGGLE_IS_FETCHING_PROFILE_STATUS'

export const SET_USER_PHOTOS = 'social-network/profile/SET_USER_PHOTOS'

export type PhotosType = {
  small: string
  large: string
}

export type ContactsType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}

export type UserProfileInfoType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: ContactsType
  photos: PhotosType
  aboutMe: string
}

export type SetUserProfileInfoActionType = {
  type: typeof SET_USER_PROFILE_INFO
  userProfileInfo: UserProfileInfoType
}

export type SetUserStatusActionType = {
  type: typeof SET_USER_STATUS
  userStatus: string
}

export type SetUserPhotosActionType = {
  type: typeof SET_USER_PHOTOS
  photos: PhotosType
}

export type ToggleIsFetchingProfileInfoActionType = {
  type: typeof TOGGLE_IS_FETCHING_PROFILE_INFO
  isFetchingProfileInfo: boolean
}

export type ToggleIsFetchingProfileStatusActionType = {
  type: typeof TOGGLE_IS_FETCHING_PROFILE_STATUS
  isFetchingProfileStatus: boolean
}
