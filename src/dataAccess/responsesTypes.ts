import { authTypes } from '../redux/ducks/auth'
import { profileTypes } from '../redux/ducks/profile'

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
  data: profileTypes.PhotosType
}

export type CommonResponseDataType = {
  resultCode: number
  messages: Array<string>
  data: { userId: number }
}

export type GetCaptchaUrlResponseDataType = {
  url: string
}
