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
  async authMe(): Promise<respTypes.AuthMeResponseType> {
    return await instance.get('/auth/me')
  },

  async login({
    email,
    password,
    rememberMe,
    captcha,
  }: authTypes.LoginDataType): Promise<respTypes.LoginResponseType> {
    return await instance.post('/auth/login', {
      email,
      password,
      rememberMe,
      captcha,
    })
  },

  async logout(): Promise<respTypes.CommonApiResponse<{}>> {
    return await instance.delete('/auth/login')
  },
}

export const securityAPI = {
  async getCaptchaUrl(): Promise<respTypes.GetCaptchaUrlResponseType> {
    return await instance.get('/security/get-captcha-url')
  },
}

export const profileAPI = {
  async getUserProfileInfo(
    userId: number
  ): Promise<respTypes.GetUserProfileInfoResponseType> {
    return await instance.get(`/profile/${userId}`)
  },

  async getUserStatus(
    userId: number
  ): Promise<respTypes.ApiResponseType<string>> {
    return await instance.get(`/profile/status/${userId}`)
  },

  async updateLoggedUserInfo(
    userInfo: profileTypes.UserPersonalInfoType
  ): Promise<respTypes.CommonApiResponse<{}>> {
    return await instance.put('/profile', userInfo)
  },

  async updateLoggedUserStatus(
    status: string
  ): Promise<respTypes.CommonApiResponse<{}>> {
    return await instance.put('/profile/status', { status })
  },

  async updateLoggedUserPhoto(
    image: File
  ): Promise<respTypes.UpdataLoggedUserPhotoResponseType> {
    let formData = new FormData()
    formData.append('image', image)
    return await instance.put('/profile/photo', formData)
  },
}

export const usersAPI = {
  async getUsers(
    count: number,
    page: number,
    term: string | undefined,
    friend: string | undefined
  ): Promise<respTypes.GetUsersResponseType> {
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

export const followAPI = {
  async isUserFollowedByLoggedUser(
    userId: number
  ): Promise<respTypes.ApiResponseType<boolean>> {
    return await instance.get(`/follow/${userId}`)
  },

  async followUser(userId: number): Promise<respTypes.CommonApiResponse<{}>> {
    return await instance.post(`/follow/${userId}`)
  },

  async unfollowUser(userId: number): Promise<respTypes.CommonApiResponse<{}>> {
    return await instance.delete(`/follow/${userId}`)
  },
}

export const dialogsAPI = {
  async getStartedDialogs(): Promise<respTypes.GetStartedDialogsResponseType> {
    // return await instance.get(`/dialogs`)
    return await instance.get(`dialogs/messages/new/count`)
  },

  async startDialogWithUser(
    userId: number
  ): Promise<respTypes.StartDialogResponseType> {
    return await instance.put(`dialogs/${userId}`)
  },

  async getDialogMessages(
    userId: number
  ): Promise<respTypes.GetDialogMessagesResponseType> {
    return await instance.get(`dialogs/${userId}/messages`)
  },

  async sendMessageToUser(
    userId: number,
    message: string
  ): Promise<respTypes.ApiResponseType<boolean>> {
    return await instance.post(`dialogs/${userId}/messages`, { message })
  },

  async getNewMessages(): Promise<respTypes.ApiResponseType<boolean>> {
    return await instance.get(`dialogs/messages/new/count`)
  },
}
