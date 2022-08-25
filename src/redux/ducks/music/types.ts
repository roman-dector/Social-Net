export const SET_MUSIC_LIST = 'social-network/music/SET_MUSIC_LIST'

export type MusicItem = {
  name: string
  audioUrl: string
}

export type SetMusicListActionType = {
  type: typeof SET_MUSIC_LIST
  musicList: MusicItem[]
}

export type CombinedMusicActionType =
  | SetMusicListActionType
