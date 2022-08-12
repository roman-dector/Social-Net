import { RootState } from '../../store'
import * as types from './types'

const selectUsersItems = (state: RootState): types.UsersItemsType =>
  state.usersState.usersItems

export {
  selectUsersItems
}
