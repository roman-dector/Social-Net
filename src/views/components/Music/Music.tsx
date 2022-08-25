import styles from './Music.module.scss'

import { ChangeEventHandler, FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  getMusicList,
  saveMusicFile,
} from '../../../redux/ducks/music/operations'
import { selectMusicList } from '../../../redux/ducks/music/selectors'
import { PlayControl } from './PlayControl/PlayControl'
import { MusicList, AddMusicButton } from './LeftPanel/LeftPanel'

const Music: FC<{}> = () => {
  const dispatch = useDispatch()

  const musicList = useSelector(selectMusicList)

  useEffect(() => {
    dispatch(getMusicList())
  }, [])

  const onChangeAudio: ChangeEventHandler<HTMLInputElement> = e => {
    if (e?.target?.files?.length) {
      dispatch(saveMusicFile('tmp', e.target.files[0]))
    }
  }

  return (
    <div className={styles.musicPage}>
      <div>
        <AddMusicButton onChangeAudio={onChangeAudio} />
        <MusicList musicList={musicList} onChangeAudio={onChangeAudio} />
      </div>

      <div>
        <PlayControl />
      </div>
    </div>
  )
}

export default Music
