import styles from './Music.module.scss'

import {
  FC,
  useEffect,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getMusicList } from '../../../redux/ducks/music/operations'
import { selectMusicList } from '../../../redux/ducks/music/selectors'
import { RightPanel } from './RightPanel/RightPanel'
import { LeftPanel } from './LeftPanel/LeftPanel'
import { MusicItem } from '../../../redux/ducks/music/types'

export const LeftPanelContext = createContext<Dispatch<
  SetStateAction<MusicItem | null>
> | null>(null)

const Music: FC<{}> = () => {
  const dispatch = useDispatch()

  const [currentMusicItem, setCurrentMusicItem] = useState<MusicItem | null>(
    null
  )

  const musicList = useSelector(selectMusicList)

  useEffect(() => {
    dispatch(getMusicList())
  }, [])

  return (
    <div className={styles.musicPage}>
      <LeftPanelContext.Provider value={setCurrentMusicItem}>
        <LeftPanel musicList={musicList} />
      </LeftPanelContext.Provider>
      <RightPanel currentMusicItem={currentMusicItem} />
    </div>
  )
}

export default Music
