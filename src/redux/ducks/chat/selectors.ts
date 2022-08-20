import { RootState } from '../../store'

export const selectChatMessages = (state: RootState) =>
  state.chatState.messages
