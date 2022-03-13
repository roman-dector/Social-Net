import { AppThunk } from '../../store'
import * as actions from './actions'
import { profileAPI } from '../../../dataAccess/api'

export const getUserProfileInfo =
  (userId: number): AppThunk<Promise<void>> =>
  async dispatch => {
    let response = await profileAPI.getUserProfileInfo(userId)
    dispatch(actions.setUserProfileInfo(response.data))
  }

export const getUserStatus =
  (userId: number): AppThunk =>
  async dispatch => {
    let response = await profileAPI.getUserStatus(userId)

    return dispatch(actions.setUserStatus(response.data))
  }

export const updateLoggedUserPhoto =
  (image: File): AppThunk =>
  async dispatch => {
    let response = await profileAPI.updateLoggedUserPhoto(image)
    if (!response.data.resultCode)
      dispatch(actions.setUserPhotos(response.data.data))
  }
