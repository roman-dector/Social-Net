import * as types from './types'

const initialState = {
  isAppInitialized: false,
  appTheme: 'dark',
}

type InitialStateType = typeof initialState

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

export type { InitialStateType }

export default appReducer
