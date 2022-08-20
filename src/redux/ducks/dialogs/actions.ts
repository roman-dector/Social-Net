import { DialogType } from '../../../dal/responsesTypes'

import * as types from './types'

export const setStartedDialogs = (
  dialogs: DialogType[]
): types.SetStartedDialogsActionType => ({
  type: types.SET_STARTED_DIALOGS,
  dialogs,
})

export const setDialogMessages = (
  userId: number,
  messages: string[]
): types.SetDialogMessagesActionType => ({
  type: types.SET_DIALOG_MESSAGES,
  payload: { userId, messages },
})
