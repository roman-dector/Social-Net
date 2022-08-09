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

export type ContactTitleType =
  | 'vk'
  | 'github'
  | 'twitter'
  | 'website'
  | 'youtube'
  | 'mainLink'
  | 'facebook'
  | 'instagram'

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

// export type ContactsType = {ContactTitleType: string}

export type AboutMeType = {
  fullName: string
  lookingForAJob: boolean
  lookingForAJobDescription: string
  aboutMe: string
}

export type MyContactsType = {
  contacts: ContactsType
}

export type PersonalInfoType = AboutMeType & MyContactsType
export type PersonalInfoFormType = AboutMeType & ContactsType

export type UserPersonalInfoType = PersonalInfoType & { userId: number }

export type UserProfileInfoType = UserPersonalInfoType & { photos: PhotosType }

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
