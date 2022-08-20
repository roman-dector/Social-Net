import { ChatMessageType } from '../../../dal/chatAPI'

import * as types from './types'

const chatState = {
  messages: [] as Array<ChatMessageType>,
}

type ChatStateType = typeof chatState

const chatReducer = (
  state: ChatStateType = chatState,
  action: types.CombinedChatActionType
): ChatStateType => {
  switch (action.type) {
    case types.SET_CHAT_MESSAGES:
      return {
        ...state,
        messages: [...state.messages, ...action.messages],
      }
    default:
      return state
  }
}

export default chatReducer
