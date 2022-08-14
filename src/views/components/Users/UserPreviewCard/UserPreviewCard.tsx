import styles from './UserPreviewCard.module.scss'
import default_avatar from '../../../assets/default_avatar.jpg'

import { FC } from 'react'

import { UserItemType } from '../../../../redux/ducks/users/types'

export const UserPreviewCard: FC<UserItemType> = props => {
  return (
    <div className={styles.userPreviewCard}>
      <img src={props.photos.large ? props.photos.large : default_avatar} alt={`${props.name} profile photo`} />
      <div>{props.name}</div>

      <div>{props.followed ? 'Following' : 'Follow'}</div>
    </div>
  )
}
