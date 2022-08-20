import { authTypes } from '../redux/ducks/auth'
import { profileTypes } from '../redux/ducks/profile'
import { usersTypes } from '../redux/ducks/users'

export type CommonResponseType<DataType> = {
  resultCode: number
  messages: string[]
  data: DataType
}

export type ApiResponseType<DataType> = {
  data: DataType
  status: number
  statusText: string
  headers: Object // FIXME: make types
  config: Object // for this fields
}

export type CommonApiResponse<DataType> = ApiResponseType<
  CommonResponseType<DataType>
>

export type AuthMeResponseType = CommonApiResponse<authTypes.LoggedUserInfoType>

export type LoginResponseType = CommonApiResponse<{ userId: number }>

export type LogoutResponseType = CommonApiResponse<{}>

export type GetCaptchaUrlResponseType = ApiResponseType<{ url: string }>

export type GetUserProfileInfoResponseType =
  ApiResponseType<profileTypes.UserProfileInfoType>

export type UpdataLoggedUserPhotoResponseType = CommonApiResponse<{
  photos: profileTypes.PhotosType
}>

export type GetUsersResponseType = ApiResponseType<{
  items: usersTypes.UserItemType[]
  totalCount: number
  error: string
}>

// dialogsAPI

export type DialogType = {
  hasNewMessages: boolean
  id: number
  lastDialogActivityDate: Date
  lastUserActivityDate: Date
  newMessagesCount: number
  photos: profileTypes.PhotosType
  userName: string
}

export type GetStartedDialogsResponseType = ApiResponseType<DialogType[]>

export type StartDialogResponseType = ApiResponseType<{
  data: Object
  fieldsErrors: string[]
  messages: string[]
  resultCode: number
}>

export type GetDialogMessagesResponseType = ApiResponseType<{
  error: string | null
  items: string[]
  totalCount: number
}>

