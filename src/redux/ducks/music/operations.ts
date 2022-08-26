import { AppThunk } from '../../store'

import { musicAPI } from '../../../dal/localForage'

import * as types from './types'
import * as actions from './actions'

export const getMusicList = (): AppThunk => async dispatch => {
  const blob = window.URL || window.webkitURL

  let response = await musicAPI.getAudioFromLF()
  if (response) {
    dispatch(
      actions.setMusicList(
        response.map(item => ({
          name: item.name,
          audioUrl: blob.createObjectURL(item.audioFile),
          pictureUrl: item.picture === null ? null :  blob.createObjectURL(item.picture),
        }))
      )
    )
  }
}

export const saveMusicFile =
  (name: string, audioFile: File, picture: File | null = null): AppThunk =>
  async dispatch => {
    await musicAPI.saveAudioToLF(name, audioFile, picture)
    dispatch(getMusicList())
  }
