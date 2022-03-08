import * as types from './types'

const initialState = {
  isAppInitialized: false,
}

type InitialStateType = typeof initialState

const appReducer = (
  state: InitialStateType = initialState,
  action: types.AppReducerActionsType
): InitialStateType => {
  switch (action.type) {
    case types.SET_IS_APP_INITIALIZED:
      return {
        ...state,
        isAppInitialized: action.isAppInitialized,
      }
    default:
      return state
  }
}

export type { InitialStateType }

export default appReducer
