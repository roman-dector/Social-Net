import styles from './UserPreviewCard.module.scss'
import default_avatar from '../../../assets/default_avatar.jpg'

import { FC } from 'react'
import { useDispatch } from 'react-redux'

import {
  followUser,
  unfollowUser,
} from '../../../../redux/ducks/users/operations'
import { UserItemType } from '../../../../redux/ducks/users/types'

export const UserPreviewCard: FC<UserItemType> = props => {
  const dispatch = useDispatch()

  const onFollowButtonClickHandler = () => {
    if (props.followed) {
      dispatch(unfollowUser(props.id))
    } else {
      dispatch(followUser(props.id))
    }
  }

  return (
    <div className={styles.userPreviewCard}>
      <img
        src={props.photos.large ? props.photos.large : default_avatar}
        alt={`${props.name} profile photo`}
      />
      <div>{props.name}</div>
      <div
        className={styles.followButton}
        onClick={onFollowButtonClickHandler}
      >
        {props.followed ? 'Following' : 'Follow'}
      </div>
    </div>
  )
}
