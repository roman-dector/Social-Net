import { FC } from 'react'
import styles from '../Music.module.scss'

export const PlayControl: FC<{}> = props => {
  return (
    <div className={styles.playControl}>
      <img src={'https://via.placeholder.com/150'} />
    </div>
  )
}
