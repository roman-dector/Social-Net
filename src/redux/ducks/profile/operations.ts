import { AppThunk } from '../../store'
import * as actions from './actions'
import { profileAPI } from '../../../dal/api'
import { profileTypes } from '.' 

export const getUserProfileInfo =
  (userId: number): AppThunk<Promise<void>> =>
  async dispatch => {
    let response = await profileAPI.getUserProfileInfo(userId)
    dispatch(actions.setUserProfileInfo(response.data))
    dispatch(actions.toggleIsFetchingProfileInfo(false))
  }

export const getUserStatus =
  (userId: number): AppThunk<Promise<void>> =>
  async dispatch => {
    let response = await profileAPI.getUserStatus(userId)
    dispatch(actions.setUserStatus(response.data))
    dispatch(actions.toggleIsFetchingProfileStatus(false))
  }

export const updateLoggedUserPhoto =
  (image: File): AppThunk<Promise<void>> =>
  async dispatch => {
    let response = await profileAPI.updateLoggedUserPhoto(image)
    if (!response.data.resultCode)
      dispatch(actions.setUserPhotos(response.data.data.photos))
  }

export const updateLoggedUserStatus =
  (newStatus: string): AppThunk<Promise<void>> =>
  async dispatch => {
    let response = await profileAPI.updateLoggedUserStatus(newStatus)
    if (!response.data.resultCode) {
      dispatch(actions.setUserStatus(newStatus))
      dispatch(actions.toggleIsFetchingProfileStatus(false))
    }
  }

export const updateLoggedUserInfo =
  (userId: number, userInfo: profileTypes.PersonalInfoType): AppThunk<Promise<void>> =>
  async dispatch => {
    let response = await profileAPI.updateLoggedUserInfo({...userInfo, userId})
    if (!response.data.resultCode) {
      dispatch(getUserProfileInfo(userId))
      dispatch(actions.toggleIsFetchingProfileInfo(false))
    }
  }