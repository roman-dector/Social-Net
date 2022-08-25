import * as types from './types'

export const setMusicList = (
  musicList: types.MusicItem[]
): types.SetMusicListActionType => ({
  type: types.SET_MUSIC_LIST,
  musicList,
})
