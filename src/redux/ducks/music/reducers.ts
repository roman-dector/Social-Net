import * as types from './types'

const musicState = {
  musicList: [] as types.MusicItem[]
}

type MusicStateType = typeof musicState

const musicReducer = (
  state: MusicStateType = musicState,
  action: types.CombinedMusicActionType
): MusicStateType => {
  switch (action.type) {
    case types.SET_MUSIC_LIST:
      return {
        ...state,
        musicList: action.musicList
      }
    default:
      return state
  }
}

export default musicReducer
