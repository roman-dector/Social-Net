import { authTypes } from '../redux/ducks/auth'
import { profileTypes } from '../redux/ducks/profile'
import { usersTypes } from '../redux/ducks/users'

export type ApiResponseType<DataType> = {
  data: DataType
  status: number
  statusText: string
  headers: Object // FIXME: make types
  config: Object // for this fields
}

export type AuthMeResponseDataType = {
  resultCode: number
  messages: Array<string>
  data: authTypes.LoggedUserInfoType
}

export type LoginResponseDataType = {
  resultCode: number
  messages: Array<string>
  data: { userId: number }
}

export type UpdataLoggedUserPhotoDataType = {
  resultCode: number
  messages: Array<string>
  data: {
    photos: profileTypes.PhotosType
  }
}

export type CommonResponseDataType = {
  resultCode: number
  messages: Array<string>
  data: { userId: number }
}

export type GetCaptchaUrlResponseDataType = {
  url: string
}

export type GetUsersResponseDataType = {
  items: Array<usersTypes.UserItemType>
  totalCount: number
  error: string
}
