import styles from './ProfileInfo.module.scss'

import default_avatar from '../../../assets/default_avatar.jpg'
import edit_info_icon from '../../../assets/edit_info_icon.svg'
import Preloader from '../../common/Preloader'
import { ContactsType } from '../../../../redux/ducks/profile/types'
import { ChangeEvent, ChangeEventHandler, FC, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactTooltip from 'react-tooltip'

import {
  updateLoggedUserPhoto,
  updateLoggedUserStatus,
} from '../../../../redux/ducks/profile/operations'
import {
  toggleIsFetchingProfileStatus
} from '../../../../redux/ducks/profile/actions'

import {
  selectUserProfileInfo,
  selectUserProfileStatus,
  selectIsFetchingProfileStatus,
} from '../../../../redux/ducks/profile/selectors'

import { ProfileStatusContainer } from './ProfileStatus'

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

      <div className={styles.personalInfo}>
        <div className={styles.aboutMe}>
          <h3>Personal info</h3>
          <p>
            <b>Name:</b>
            {fullName}
          </p>
          <p>
            <b>Looking for a job:</b>
            {lookingForAJob ? 'Yes' : 'No'}
          </p>
          {lookingForAJob ? (
            <p>
              <b>Job description:</b> <br />
              {lookingForAJobDescription}
            </p>
          ) : null}
          <p>
            <b>About me:</b> <br />
            {aboutMe}
          </p>
        </div>

        <MyContacts contacts={contacts} />
      </div>

      <div>
        <svg className={styles.editInfoIcon} width="81" viewBox="0 0 81 81" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M44.9565 20.6834C24.6898 40.8167 24.0231 41.6167 21.0898 50.8167C19.0898 57.0833 18.5565 60.8167 19.3565 61.6167C20.1565 62.4167 23.8898 61.8833 30.1565 59.8833C39.3565 56.95 40.1565 56.2833 60.2898 36.0167C83.2231 12.8167 84.1565 11.0834 77.0898 3.88335C69.8898 -3.18331 68.1565 -2.24998 44.9565 20.6834ZM74.4231 9.61669C75.6231 11.8834 73.4898 14.6834 56.1565 32.15C43.0898 45.2167 34.9565 52.55 31.8898 53.4833C29.4898 54.2833 27.0898 54.6833 26.6898 54.2833C26.2898 53.8833 26.6898 51.4833 27.4898 49.0833C28.4231 46.0167 35.7565 37.8834 48.8231 24.95C69.2231 4.68335 71.0898 3.48335 74.4231 9.61669Z" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5 7C2.23858 7 0 9.23858 0 12V76C0 78.7614 2.23858 81 5 81H63C65.7614 81 68 78.7614 68 76V45C68 43.3431 66.6569 42 65 42C63.3431 42 62 43.3431 62 45V70C62 72.7614 59.7614 75 57 75H11C8.23858 75 6 72.7614 6 70V18C6 15.2386 8.23858 13 11 13H42C43.6569 13 45 11.6569 45 10C45 8.34314 43.6569 7 42 7H5Z" />
        </svg>
      </div>
    </div>
  )
}

const Contact = ({ title, value }: { title: string; value: string }) => {
  return (
    <p>
      <b>{title}: </b>
      {value}
    </p>
  )
}

const MyContacts = ({ contacts }: { contacts: ContactsType }) => (
  <div className={styles.contacts}>
    <h3>My contacts: </h3>
    {contacts
      ? Object.entries(contacts).map((e, i) => {
          return !e[1] ? null : <Contact key={i} title={e[0]} value={e[1]} />
        })
      : null}
  </div>
)

const ChangePhoto = (props: { onChangePhoto: OnChangePhotoType }) => (
  <div className={styles.changePhotoContainer}>
    <label>
      <input type={'file'} onChange={props.onChangePhoto} />
      <span>Choose file</span>
    </label>
  </div>
)

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


export default ProfileInfo
