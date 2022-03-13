import styles from './Profile.module.css'

import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import withAuthNavigate from '../../hocs/withAuthNavigate'
import {
  getUserProfileInfo,
  getUserStatus,
} from '../../../redux/ducks/profile/operations'
import { selectIsFetchingProfileInfo } from '../../../redux/ducks/profile/selectors'
import { selectLoggedUserId } from '../../../redux/ducks/auth/selectors'
import {
  toggleIsFetchingProfileInfo,
  toggleIsFetchingProfileStatus,
} from '../../../redux/ducks/profile/actions'

import ProfileInfo from './ProfileInfo/ProfileInfo'
import Preloader from '../common/Preloader'

const Profile: FC<{}> = () => {
  const urlParams = useParams()
  const dispatch = useDispatch()

  const loggedUserId: number | null = useSelector(selectLoggedUserId)
  const isFetchingProfileInfo: boolean = useSelector(
    selectIsFetchingProfileInfo
  )

  useEffect(() => {
    let userId: number | null
    if (urlParams.userId) {
      userId = Number(urlParams.userId)
    }
    userId = loggedUserId

    dispatch(toggleIsFetchingProfileInfo(true))
    dispatch(getUserProfileInfo(userId as number))
    dispatch(toggleIsFetchingProfileInfo(false))

    dispatch(toggleIsFetchingProfileStatus(true))
    dispatch(getUserStatus(userId as number))
    dispatch(toggleIsFetchingProfileStatus(false))
  }, [urlParams])

  return (
    <div className={styles.profile}>
      {isFetchingProfileInfo ? <Preloader /> : <ProfileInfo />}
    </div>
  )
}

export default withAuthNavigate(Profile)
