export const SET_IS_APP_INITIALIZED = 'social-network/app/SET_IS_APP_INITIALIZED';

export type setIsAppInitializedActionType = {
  type: typeof SET_IS_APP_INITIALIZED;
  isAppInitialized: boolean;
};

export type AppReducerActionsType = setIsAppInitializedActionType