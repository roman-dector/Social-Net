import styles from './PlayControl.module.scss'

import { FC } from 'react'
import { MusicItem } from '../../../../../redux/ducks/music/types'

export const PlayControl: FC<{ musicItem: MusicItem | null }> = props => {
  let audioImg = 'https://via.placeholder.com/150'
  let audioName = 'Select track to play'
  let audioUrl = ''

  if (props.musicItem) {
    audioImg = props.musicItem.pictureUrl
      ? props.musicItem.pictureUrl
      : 'https://via.placeholder.com/150'

    audioName = props.musicItem.name
    audioUrl = props.musicItem.audioUrl
  }

  return (
    <div className={styles.playControl}>
      <img src={audioImg} />

      <span>{audioName}</span>

      <audio src={audioUrl} controls />
    </div>
  )
}
