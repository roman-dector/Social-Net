import { RootState } from '../../store'

export const selectMusicList = (state: RootState) =>
  state.musicState.musicList
