import styles from './ProfileInfo.module.scss'

import default_avatar from '../../../assets/default_avatar.jpg'
import Preloader from '../../common/Preloader'
import { useForm } from 'react-hook-form'
import { ContactsType } from '../../../../redux/ducks/profile/types'
import { ChangeEvent, ChangeEventHandler, FC, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactTooltip from 'react-tooltip'

import {
  updateLoggedUserPhoto,
  updateLoggedUserStatus,
} from '../../../../redux/ducks/profile/operations'
import {
  selectUserProfileInfo,
  selectUserProfileStatus,
  selectIsFetchingProfileStatus,
} from '../../../../redux/ducks/profile/selectors'

type OnChangePhotoType = (e: ChangeEvent<HTMLInputElement>) => void
type OnChangeStatusType = (e: ChangeEvent<HTMLInputElement>) => void

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

  const onChangeStatus: ChangeEventHandler<HTMLInputElement> = e => {
    // dispatch(updateLoggedUserStatus(e.target.textContent))
    alert(e.target.textContent)
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
          onChangeStatus={setIsEditStatus}
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

type ProfileStatusContainerType = {
  isEditStatus: boolean
  isFetchingProfileStatus: boolean
  userProfileStatus: string | null
  onChangeStatus: (x: boolean) => void
}

const ProfileStatusContainer: FC<ProfileStatusContainerType> = props => {
  const userStatus = props.userProfileStatus ? props.userProfileStatus : ''

  return props.isEditStatus ? (
    <ProfileStatusForm oldStatus={userStatus} />
  ) : (
    <ProfileStatus
      isFetchingProfileStatus={props.isFetchingProfileStatus}
      userProfileStatus={props.userProfileStatus}
      onChangeStatus={props.onChangeStatus}
    />
  )
}

const ProfileStatus = (props: {
  isFetchingProfileStatus: boolean
  userProfileStatus: string | null
  onChangeStatus: (x: boolean) => void
}) =>
  props.isFetchingProfileStatus ? (
    <Preloader />
  ) : (
    <>
      <div
        className={styles.userProfileStatus}
        onDoubleClick={() => {
          props.onChangeStatus(true)
        }}
        data-tip
        data-for='changeProfileStatusHint'
      >
        {props.userProfileStatus}
      </div>
      <ReactTooltip
        id='changeProfileStatusHint'
        type='info'
        delayShow={50}
        backgroundColor='#41c3e0a7'
        arrowColor='#41c3e0a7'
      >
        <span>Double click to edit</span>
      </ReactTooltip>
    </>
  )

const ProfileStatusForm = (props: { oldStatus: string }) => {
  const { register, handleSubmit } = useForm<{ status: string }>({
    defaultValues: {
      status: props.oldStatus,
    },
  })

  return (
    <form>
      <input {...register('status')} />
    </form>
  )
}

export default ProfileInfo
