import { DialogType } from '../../../dal/responsesTypes'

import * as types from './types'

const dialogsState = {
  startedDialogs: [] as DialogType[],
  dialogsMessages: [] as { id: number, messages: string[]}[],
}

type DialogsStateType = typeof dialogsState

const dialogsReducer = (
  state: DialogsStateType = dialogsState,
  action: types.CombinedChatActionType
): DialogsStateType => {
  switch (action.type) {
    case types.SET_STARTED_DIALOGS:
      return {
        ...state,
        startedDialogs: action.dialogs,
      }
    case types.SET_DIALOG_MESSAGES:
      return {
        ...state,
        dialogsMessages: state.dialogsMessages.map(d => {
          return d.id === action.payload.userId
            ? { ...d, messages: action.payload.messages }
            : d
        }),
      }
    default:
      return state
  }
}

export default dialogsReducer
