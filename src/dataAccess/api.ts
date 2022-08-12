import axios from 'axios'
import * as respTypes from './responsesTypes'
import { authTypes } from '../redux/ducks/auth'
import { profileTypes } from '../redux/ducks/profile'

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0',
  headers: {
    'API-KEY':
      process.env.REACT_APP_API_KEY || '5fd6286d-f0d9-4683-b3a9-4cdeb04d51f6',
  },
  withCredentials: true,
})

export const authAPI = {
  async authMe(): Promise<
    respTypes.ApiResponseType<respTypes.AuthMeResponseDataType>
  > {
    return await instance.get('/auth/me')
  },

  async login({
    email,
    password,
    rememberMe,
    captcha,
  }: authTypes.LoginDataType): Promise<
    respTypes.ApiResponseType<respTypes.LoginResponseDataType>
  > {
    return await instance.post('/auth/login', {
      email,
      password,
      rememberMe,
      captcha,
    })
  },

  async logout(): Promise<
    respTypes.ApiResponseType<respTypes.CommonResponseDataType>
  > {
    return await instance.delete('/auth/login')
  },
}

export const securityAPI = {
  async getCaptchaUrl(): Promise<
    respTypes.ApiResponseType<respTypes.GetCaptchaUrlResponseDataType>
  > {
    return await instance.get('/security/get-captcha-url')
  },
}

export const profileAPI = {
  async getUserProfileInfo(
    userId: number
  ): Promise<respTypes.ApiResponseType<profileTypes.UserProfileInfoType>> {
    return await instance.get(`/profile/${userId}`)
  },

  async getUserStatus(
    userId: number
  ): Promise<respTypes.ApiResponseType<string>> {
    return await instance.get(`/profile/status/${userId}`)
  },

  async updateLoggedUserInfo(
    userInfo: profileTypes.UserPersonalInfoType
  ): Promise<respTypes.ApiResponseType<respTypes.CommonResponseDataType>> {
    return await instance.put('/profile', userInfo)
  },

  async updateLoggedUserStatus(
    status: string
  ): Promise<respTypes.ApiResponseType<respTypes.CommonResponseDataType>> {
    return await instance.put('/profile/status', { status })
  },

  async updateLoggedUserPhoto(
    image: File
  ): Promise<
    respTypes.ApiResponseType<respTypes.UpdataLoggedUserPhotoDataType>
  > {
    let formData = new FormData()
    formData.append('image', image)
    return await instance.put('/profile/photo', formData)
  },
}

export const usersAPI = {
  async getUsers(
    count = 10,
    page = 1,
    term = null,
    friend = null
  ): Promise<respTypes.ApiResponseType<respTypes.GetUsersResponseDataType>> {
    return await instance.get('/users', {
      params: {
        count,
        page,
        term,
        friend,
      },
    })
  },
}
