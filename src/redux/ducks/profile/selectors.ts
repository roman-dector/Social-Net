import { RootState } from '../../store'
import * as types from './types'

const selectUserProfileInfo = (state: RootState): types.UserProfileInfoType =>
  state.profileState.profileInfo.userProfileInfo
const selectUserProfileStatus = (state: RootState): string =>
  state.profileState.profileInfo.userProfileStatus

const selectIsFetchingProfileInfo = (state: RootState): boolean =>
  state.profileState.profileInfo.isFetchingProfileInfo

const selectIsFetchingProfileStatus = (state: RootState): boolean =>
  state.profileState.profileInfo.isFetchingProfileStatus

export {
  selectUserProfileInfo,
  selectUserProfileStatus,
  selectIsFetchingProfileInfo,
  selectIsFetchingProfileStatus,
}
