import styles from './LeftPanel.module.scss'

import { MusicItem } from '../../../../redux/ducks/music/types'

import { SetStateAction, FC, useState, Dispatch, useContext } from 'react'

import { AddMusicPopup } from './AddMusicPopup'
import { LeftPanelContext } from '../Music'

export const LeftPanel: FC<{ musicList: MusicItem[] }> = props => {
  return (
    <div className={styles.leftPanel}>
      <AddMusicButton />
      <MusicList musicList={props.musicList} />
    </div>
  )
}

const MusicList: FC<{ musicList: MusicItem[] }> = props => {
  return (
    <div className={styles.musicList}>
      {props.musicList.map((item, idx) => (
        <SongPreview key={idx} musicItem={item} />
      ))}
    </div>
  )
}

const SongPreview: FC<{ musicItem: MusicItem }> = props => {
  const setCurrentMusicItem = useContext(LeftPanelContext)

  const onClickHandler = () => {
    if (setCurrentMusicItem) {
      setCurrentMusicItem(props.musicItem)
    }
  }

  let audioImg = 'https://via.placeholder.com/150'

  if (props.musicItem.pictureUrl) {
    audioImg = props.musicItem.pictureUrl
  }

  return (
    <div className={styles.songPreview} onClick={onClickHandler}>
      <div>
        <img src={audioImg} className={styles.songPic} />
        <span className={styles.songName}>{props.musicItem.name}</span>
      </div>
    </div>
  )
}

export const AddMusicButton: FC<{}> = props => {
  const [isActive, setIsActive] = useState(false)

  return (
    <>
      <div
        className={styles.addMusicButton}
        onClick={() => {
          setIsActive(true)
        }}
      ></div>
      {isActive ? <AddMusicPopup setIsActive={setIsActive} /> : null}
    </>
  )
}
