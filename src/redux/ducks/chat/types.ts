import { ChatMessageType } from '../../../dal/chatAPI'

export const SET_CHAT_MESSAGES = 'social-network/chat/SET_CHAT_MESSAGES'

export type SetChatMessagesActionType = {
  type: typeof SET_CHAT_MESSAGES
  messages: Array<ChatMessageType>
}

export type CombinedChatActionType = SetChatMessagesActionType
