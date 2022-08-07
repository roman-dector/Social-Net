import styles from './ProfileInfo.module.scss'
import { FC } from 'react'
import Preloader from '../../common/Preloader'
import { useForm, SubmitHandler } from 'react-hook-form'
import ReactTooltip from 'react-tooltip'


type ProfileStatusContainerType = {
  isEditStatus: boolean
  isFetchingProfileStatus: boolean
  userProfileStatus: string | null
  setIsEditStatus: (x: boolean) => void
  onChangeStatus: (x: string) => void
}

export const ProfileStatusContainer: FC<ProfileStatusContainerType> = props => {
  const userStatus = props.userProfileStatus ? props.userProfileStatus : ''

  return (
    <div className={styles.userProfileStatusContainer}>
      {props.isEditStatus ? (
        <ProfileStatusForm
          oldStatus={userStatus}
          setIsEditStatus={props.setIsEditStatus}
          onChangeStatus={props.onChangeStatus}
        />
      ) : (
        <ProfileStatus
          isFetchingProfileStatus={props.isFetchingProfileStatus}
          userProfileStatus={props.userProfileStatus}
          setIsEditStatus={props.setIsEditStatus}
        />
      )}
    </div>
  )
}

const ProfileStatus = (props: {
  isFetchingProfileStatus: boolean
  userProfileStatus: string | null
  setIsEditStatus: (x: boolean) => void
}) =>
  props.isFetchingProfileStatus ? (
    <Preloader width={50} />
  ) : (
    <>
      <div
        className={styles.userProfileStatus}
        onDoubleClick={() => {
          props.setIsEditStatus(true)
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

const ProfileStatusForm = (props: {
  oldStatus: string
  setIsEditStatus: (x: boolean) => void
  onChangeStatus: (x: string) => void
}) => {
  const { register, handleSubmit } = useForm<{ status: string }>({
    defaultValues: {
      status: props.oldStatus,
    },
  })

  const onSubmit: SubmitHandler<{status: string}> = data => {
    props.onChangeStatus(data.status)
    props.setIsEditStatus(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('status')} onBlur={handleSubmit(onSubmit)} autoFocus={true}/>
    </form>
  )
}
