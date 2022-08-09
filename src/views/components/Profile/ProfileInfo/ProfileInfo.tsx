import styles from './ProfileInfo.module.scss'

import default_avatar from '../../../assets/default_avatar.jpg'
import Preloader from '../../common/Preloader'
import { ChangeEvent, ChangeEventHandler, FC, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactTooltip from 'react-tooltip'

import {
  updateLoggedUserPhoto,
  updateLoggedUserStatus,
} from '../../../../redux/ducks/profile/operations'
import { toggleIsFetchingProfileStatus } from '../../../../redux/ducks/profile/actions'

import {
  selectUserProfileInfo,
  selectUserProfileStatus,
  selectIsFetchingProfileStatus,
} from '../../../../redux/ducks/profile/selectors'

import { ProfileStatusContainer } from './ProfileStatus'
import { PersonalInfoContainer } from './PersonalInfo/PersonalInfo'

type OnChangePhotoType = (e: ChangeEvent<HTMLInputElement>) => void

const ProfileInfo: FC<{}> = () => {
  const dispatch = useDispatch()
  const {
    photos,
    fullName,
    lookingForAJob,
    lookingForAJobDescription,
    aboutMe,
    contacts,
  } = useSelector(selectUserProfileInfo)

  const userProfileStatus: string | null = useSelector(selectUserProfileStatus)
  const isFetchingProfileStatus: boolean = useSelector(
    selectIsFetchingProfileStatus
  )

  let [isEditStatus, setIsEditStatus] = useState(false)

  const onChangePhoto: ChangeEventHandler<HTMLInputElement> = e => {
    if (e?.target?.files?.length)
      dispatch(updateLoggedUserPhoto(e.target.files[0]))
  }

  const onChangeStatus = (newStatus: string) => {
    dispatch(toggleIsFetchingProfileStatus(true))
    dispatch(updateLoggedUserStatus(newStatus))
  }

  return (
    <div className={styles.profileInfo}>
      <div className={styles.profilePhotoContainer}>
        <ProfilePhoto
          photo={photos?.large ? photos?.large : default_avatar}
          onChangePhoto={onChangePhoto}
        />

        <ProfileStatusContainer
          isEditStatus={isEditStatus}
          isFetchingProfileStatus={isFetchingProfileStatus}
          userProfileStatus={userProfileStatus}
          setIsEditStatus={setIsEditStatus}
          onChangeStatus={onChangeStatus}
        />
      </div>

      <PersonalInfoContainer
        fullName={fullName}
        lookingForAJob={lookingForAJob}
        lookingForAJobDescription={lookingForAJobDescription}
        aboutMe={aboutMe}
        contacts={contacts}
      />

    </div>
  )
}


const ProfilePhoto = (props: {
  photo: string
  onChangePhoto: OnChangePhotoType
}) => {
  return (
    <div className={styles.profilePhoto}>
      <img src={props.photo} alt='user avatar' />
      <ChangePhoto onChangePhoto={props.onChangePhoto} />
    </div>
  )
}

const ChangePhoto = (props: { onChangePhoto: OnChangePhotoType }) => (
  <div className={styles.changePhotoContainer}>
    <label>
      <input type={'file'} onChange={props.onChangePhoto} />
      <span>Choose file</span>
    </label>
  </div>
)

export default ProfileInfo
