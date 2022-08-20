import { AppThunk } from '../../store'
import { chatAPI, ChatMessageType } from '../../../dal/chatAPI'

import * as types from './types'
import * as actions from './actions'
import { Dispatch } from 'react'

let _messageHandler: ((messages: ChatMessageType[]) => void) | null = null

const messageHandlerCreator = (
  dispatch: Dispatch<types.SetChatMessagesActionType>
) => {
  if (!_messageHandler) {
    _messageHandler = (messages: ChatMessageType[]) => {
      dispatch(actions.setChatMessages(messages))
    }
  }
  return _messageHandler
}

export const startMessageListening =
  (): AppThunk<Promise<void>> => async dispatch => {
    console.log('start listen')
    debugger
    chatAPI.start()
    chatAPI.subscribe(messageHandlerCreator(dispatch))
  }

export const stopMessageListening =
  (): AppThunk<Promise<void>> => async dispatch => {
    debugger
    chatAPI.unsubscribe(messageHandlerCreator(dispatch))
  }

export const sendMessage = (message: string): AppThunk<Promise<void>> => async dispatch => {
  debugger
  chatAPI.sendMessage(message)
}
