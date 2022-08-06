import styles from './ProfileInfo.module.scss'

import default_avatar from '../../../assets/default_avatar.jpg'
import Preloader from '../../common/Preloader'
import { useForm } from 'react-hook-form'
import {
  ContactsType,
} from '../../../../redux/ducks/profile/types'
import { ChangeEvent, ChangeEventHandler, FC } from 'react'
import {shallowEqual, useSelector, useDispatch } from 'react-redux'

import {
  updateLoggedUserPhoto,
} from '../../../../redux/ducks/profile/operations'
import {
  selectUserProfileInfo,
  selectUserProfileStatus,
  selectIsFetchingProfileStatus,
} from '../../../../redux/ducks/profile/selectors'

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
  const isFetchingProfileStatus: boolean = useSelector(selectIsFetchingProfileStatus)


  const onChangePhoto: ChangeEventHandler<HTMLInputElement> = e => {
    if (e?.target?.files?.length)
      dispatch(updateLoggedUserPhoto(e.target.files[0]))
  }
  return (
    <div className={styles.profileInfo}>
      <div className={styles.profilePhotoContainer}>
        <ProfilePhoto
          photo={photos?.large ? photos?.large : default_avatar}
          onChangePhoto={onChangePhoto}
        />
        <ProfileStatus
          isFetchingProfileStatus={isFetchingProfileStatus}
          userProfileStatus={userProfileStatus}
        />
      </div>
      <div className={styles.personalInfo}>
        <h3>Personal info</h3>
        <p>
          <b>Name: </b>
          {fullName}
        </p>
        <p>
          <b>Looking for a job: </b>
          {lookingForAJob ? 'Yes' : 'No'}
        </p>
        {lookingForAJob ? (
          <p>
            <b>Looking for a job description: </b> <br />
            {lookingForAJobDescription}
          </p>
        ) : null}
        <p>
          <b>About me: </b> <br />
          {aboutMe}
        </p>
      </div>

      <MyContacts contacts={contacts} />
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

const ProfileStatus = (props: {
  isFetchingProfileStatus: boolean
  userProfileStatus: string | null
}) =>
  props.isFetchingProfileStatus ? (
    <Preloader />
  ) : (
    <span
      className={styles.userProfileStatus}
      onDoubleClick={()=>{alert('Hey')}}
      onMouseEnter={()=>{}}
    >
      {props.userProfileStatus}
    </span>
  )

export default ProfileInfo
