import styles from './UserPreviewCard.module.scss'
import default_avatar from '../../../assets/default_avatar.jpg'

import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  followUser,
  unfollowUser,
} from '../../../../redux/ducks/users/operations'
import { setIsToggleFollowingInProgress } from '../../../../redux/ducks/users/actions'
import { UserItemType } from '../../../../redux/ducks/users/types'

export const UserPreviewCard: FC<UserItemType> = props => {
  return (
    <div className={styles.userPreviewCard}>
      <img
        src={props.photos.large ? props.photos.large : default_avatar}
        alt={`${props.name} profile photo`}
      />
      <div>{props.name}</div>
      <FollowButton
        id={props.id}
        followed={props.followed}
        isToggleFollowingInProgress={props.isToggleFollowingInProgress}
      />
    </div>
  )
}

const FollowButton: FC<{
  id: number
  followed: boolean
  isToggleFollowingInProgress: boolean
}> = props => {
  const dispatch = useDispatch()

  const onFollowButtonClickHandler = () => {
    dispatch(setIsToggleFollowingInProgress(props.id, true))

    if (props.followed) {
      dispatch(unfollowUser(props.id))
    } else {
      dispatch(followUser(props.id))
    }
  }

  return (
    <div
      className={styles.followButton}
      onClick={
        props.isToggleFollowingInProgress
          ? () => {}
          : onFollowButtonClickHandler
      }
    >
      {props.followed ? 'Following' : 'Follow'}
    </div>
  )
}
