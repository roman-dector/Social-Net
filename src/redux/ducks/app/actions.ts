import * as types from './types'

export const setIsAppInitialized = (
  isAppInitialized: boolean
): types.setIsAppInitializedActionType => ({
  type: types.SET_IS_APP_INITIALIZED,
  isAppInitialized,
})

export const setAppTheme = (
  theme: 'light' | 'dark'
): types.setAppThemeActionType => ({
  type: types.SET_APP_THEME,
  theme,
})
