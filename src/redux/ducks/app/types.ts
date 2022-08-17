export const SET_IS_APP_INITIALIZED =
  'social-network/app/SET_IS_APP_INITIALIZED'
export const SET_APP_THEME = 'social-network/app/SET_APP_THEME'

export type setIsAppInitializedActionType = {
  type: typeof SET_IS_APP_INITIALIZED
  isAppInitialized: boolean
}

export type setAppThemeActionType = {
  type: typeof SET_APP_THEME
  theme: 'light' | 'dark',
}

export type CombinedAppReducerActionType =
  | setIsAppInitializedActionType
  | setAppThemeActionType
