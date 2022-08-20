import { DialogType } from '../../../dal/responsesTypes'

export const SET_STARTED_DIALOGS = 'social-network/dialogs/SET_STARTED_DIALOGS'
export const SET_DIALOG_MESSAGES = 'social-network/dialogs/SET_DIALOG_MESSAGES'

export type SetStartedDialogsActionType = {
  type: typeof SET_STARTED_DIALOGS
  dialogs: DialogType[]
}

export type SetDialogMessagesActionType = {
  type: typeof SET_DIALOG_MESSAGES
  payload: { userId: number; messages: string[] }
}

export type CombinedChatActionType =
  | SetStartedDialogsActionType
  | SetDialogMessagesActionType
