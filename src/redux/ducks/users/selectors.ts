import { RootState } from '../../store'
import * as types from './types'

export const selectUsersItems = (state: RootState): types.UsersItemsType =>
  state.usersState.usersItems

export const selectTotalUsersCount = (state: RootState) =>
  state.usersState.totalUsersCount
