import * as types from './types'

export type InitialStateType = {
  isAppInitialized: boolean
  appTheme: 'dark' | 'light'
}

const initialState: InitialStateType = {
  isAppInitialized: false,
  appTheme: 'dark',
}

const appReducer = (
  state: InitialStateType = initialState,
  action: types.CombinedAppReducerActionType
): InitialStateType => {
  switch (action.type) {
    case types.SET_IS_APP_INITIALIZED:
      return {
        ...state,
        isAppInitialized: action.isAppInitialized,
      }

    case types.SET_APP_THEME:
      return {
        ...state,
        appTheme: action.theme,
      }
    default:
      return state
  }
}

export default appReducer
