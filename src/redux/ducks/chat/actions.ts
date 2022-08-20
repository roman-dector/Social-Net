import { ChatMessageType } from '../../../dal/chatAPI'

import * as types from './types'

export const setChatMessages = (
  messages: Array<ChatMessageType>
): types.SetChatMessagesActionType => ({
  type: types.SET_CHAT_MESSAGES,
  messages,
})
