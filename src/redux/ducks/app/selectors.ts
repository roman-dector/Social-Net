import { RootState } from '../../store'

export const getIsAppInitialized = (state: RootState): boolean =>
  state.appState.isAppInitialized

export const selectAppTheme = (state: RootState): 'dark' | 'light' =>
  state.appState.appTheme
