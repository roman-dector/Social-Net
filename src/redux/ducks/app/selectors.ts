import { RootState } from "../../store";

const getIsAppInitialized = (state: RootState): boolean => state.appState.isAppInitialized;

export { getIsAppInitialized };
