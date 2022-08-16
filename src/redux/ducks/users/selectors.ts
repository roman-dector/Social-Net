import { RootState } from '../../store'
import * as types from './types'

export const selectUsersItems = (state: RootState) =>
  state.usersState.usersItems

export const selectTotalUsersCount = (state: RootState) =>
  state.usersState.totalUsersCount

export const selectIsGettingUsersItems = (state: RootState) =>
  state.usersState.isGettingUsersItems

