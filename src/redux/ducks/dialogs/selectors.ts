import { RootState } from '../../store'

export const selectStartedDialogs = (state: RootState) =>
  state.dialogsState.startedDialogs
