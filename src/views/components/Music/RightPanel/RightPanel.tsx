import { FC } from 'react'
import { MusicItem } from '../../../../redux/ducks/music/types'

import { PlayControl } from './PlayControl/PlayControl'

export const RightPanel: FC<{ currentMusicItem: MusicItem | null }> = props => {
  return (
    <div>
      <PlayControl musicItem={props.currentMusicItem} />
    </div>
  )
}
