import styles from '../ProfileInfo.module.scss'

import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  useForm,
  useWatch,
  UseFormHandleSubmit,
  SubmitHandler,
  FormProvider,
} from 'react-hook-form'

import {
  AboutMeType,
  MyContactsType,
  PersonalInfoType,
  PersonalInfoFormType,
  ContactTitleType,
} from '../../../../../redux/ducks/profile/types'
import { updateLoggedUserInfo } from '../../../../../redux/ducks/profile/operations'
import { selectLoggedUserId } from '../../../../../redux/ducks/auth/selectors'
import { selectIsFetchingProfileInfo } from '../../../../../redux/ducks/profile/selectors'
import { toggleIsFetchingProfileInfo } from '../../../../../redux/ducks/profile/actions'

import { PersonalInfoForm } from './PersonalInfoForm'

export const PersonalInfoContainer: FC<PersonalInfoType> = props => {
  let [isEditProfileInfo, setIsEditProfileInfo] = useState(false)

  const formMethods = useForm<PersonalInfoFormType>()

  return (
    <div className={styles.personalInfo}>
      {isEditProfileInfo ? (
        <FormProvider {...formMethods}>
          <PersonalInfoForm {...props} />
        </FormProvider>
      ) : (
        <PersonalInfo {...props} />
      )}

      <EditInfoIcon
        isEditProfileInfo={isEditProfileInfo}
        setIsEditProfileInfo={setIsEditProfileInfo}
        handleSubmit={formMethods.handleSubmit}
      />
    </div>
  )
}

type EditInfoIconType = {
  isEditProfileInfo: boolean
  setIsEditProfileInfo: (x: boolean) => void
  handleSubmit: UseFormHandleSubmit<PersonalInfoFormType>
}

const EditInfoIcon: FC<EditInfoIconType> = props => {
  const dispatch = useDispatch()

  const userId = useSelector(selectLoggedUserId)
  const isFetchingProfileInfo = useSelector(selectIsFetchingProfileInfo)

  const onSubmit: SubmitHandler<PersonalInfoFormType> = data => {
    dispatch(toggleIsFetchingProfileInfo(true))
    dispatch(
      updateLoggedUserInfo(userId, {
        lookingForAJob: data.lookingForAJob,
        lookingForAJobDescription: data.lookingForAJobDescription,
        fullName: data.fullName,
        aboutMe: data.aboutMe,
        contacts: {
          github: data.github,
          vk: data.vk,
          facebook: data.facebook,
          instagram: data.instagram,
          twitter: data.twitter,
          website: data.website,
          youtube: data.youtube,
          mainLink: data.mainLink,
        },
      })
    )
  }

  return (
    <div className={styles.editInfoIcon}>
      {props.isEditProfileInfo ? (
        <div
          onClick={() => {
            props.handleSubmit(onSubmit)()
            props.setIsEditProfileInfo(false)
          }}
        >
          <svg
            viewBox='0 0 70 70'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M9 7.53088C6.23857 7.53088 4 9.76946 4 12.5309V61C4 63.7614 6.23858 66 9 66H52.7462C55.5076 66 57.7462 63.7614 57.7462 61V37.5556C57.7462 36.2464 56.6846 35.1852 55.3751 35.1852C54.0655 35.1852 53.0039 36.2464 53.0039 37.5556V56.2593C53.0039 59.0207 50.7653 61.2593 48.0039 61.2593H13.7423C10.9809 61.2593 8.74231 59.0207 8.74231 56.2593V17.2716C8.74231 14.5102 10.9809 12.2716 13.7423 12.2716H37.1962C38.5058 12.2716 39.5674 11.2104 39.5674 9.90125C39.5674 8.59213 38.5058 7.53088 37.1962 7.53088H9Z'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M56.2241 2.78799C56.9811 1.91503 58.1903 1.70817 59.163 2.20532C59.4982 2.31115 59.8172 2.49314 60.0952 2.75287L65.9225 8.19863C66.1525 8.41353 66.3312 8.66371 66.4586 8.93335C67.1897 9.8954 67.1688 11.287 66.3509 12.2226L36.6645 46.1846C36.1565 46.7658 35.4477 47.0489 34.7438 47.0234C34.1233 47.0728 33.4828 46.8834 32.9625 46.4416L15.0659 31.245C14.7859 31.0072 14.5685 30.7199 14.4161 30.4057C13.8628 29.5727 13.8382 28.424 14.4826 27.5586L19.5004 20.8205C19.9623 20.2004 20.6566 19.8768 21.3603 19.8746C21.9873 19.8162 22.6375 20.0019 23.1659 20.4464L33.4279 29.0785L56.2241 2.78799ZM19.7062 28.5522L34.4502 41.0719L61.2533 10.4086L58.4316 7.92212L35.8436 33.9725C35.7203 34.1146 35.5851 34.2391 35.4409 34.3457C34.5553 35.2993 33.0891 35.4015 32.0732 34.5469L21.7364 25.8519L19.7062 28.5522Z'
            />
          </svg>
        </div>
      ) : (
        <div
          onClick={
            isFetchingProfileInfo
              ? () => {}
              : () => {
                  props.setIsEditProfileInfo(true)
                }
          }
        >
          <svg
            viewBox='0 0 70 70'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M20.6691 42.1514C22.9876 34.8823 23.5145 34.2502 39.533 18.3424C57.8699 0.222227 59.2399 -0.515222 64.9307 5.06832C70.5161 10.7572 69.7784 12.1268 51.6522 30.4576C35.7391 46.4708 35.1068 46.9975 27.8353 49.3152C22.8822 50.8955 19.9314 51.3169 19.2991 50.6848C18.6668 50.0527 19.0883 47.1029 20.6691 42.1514ZM48.3853 27.4025C62.0853 13.6016 63.7714 11.3893 62.823 9.59836C60.1884 4.75227 58.713 5.70041 42.5891 21.7136C32.2614 31.9325 26.4653 38.3588 25.7276 40.7819C25.0953 42.6782 24.7791 44.5745 25.0953 44.8905C25.4114 45.2066 27.3083 44.8905 29.2053 44.2584C31.6291 43.521 38.0576 37.7267 48.3853 27.4025ZM4 12.5309C4 9.76945 6.23857 7.53088 9 7.53088H37.1962C38.5058 7.53088 39.5674 8.59212 39.5674 9.90125C39.5674 11.2104 38.5058 12.2716 37.1962 12.2716H13.7423C10.9809 12.2716 8.74231 14.5102 8.74231 17.2716V56.2593C8.74231 59.0207 10.9809 61.2593 13.7423 61.2593H48.0039C50.7653 61.2593 53.0039 59.0207 53.0039 56.2593V37.5556C53.0039 36.2464 54.0655 35.1852 55.3751 35.1852C56.6846 35.1852 57.7462 36.2464 57.7462 37.5556V61C57.7462 63.7614 55.5076 66 52.7462 66H9C6.23858 66 4 63.7614 4 61V12.5309Z'
            />
          </svg>
        </div>
      )}
    </div>
  )
}

const PersonalInfo: FC<PersonalInfoType> = props => (
  <>
    <AboutMe
      fullName={props.fullName}
      lookingForAJob={props.lookingForAJob}
      lookingForAJobDescription={props.lookingForAJobDescription}
      aboutMe={props.aboutMe}
    />
    <MyContacts contacts={props.contacts} />
  </>
)

const AboutMe: FC<AboutMeType> = props => (
  <div className={styles.aboutMe}>
    <h3>Personal info</h3>
    <div>
      <b>Name:</b>
      <span>{props.fullName}</span>
    </div>
    <div>
      <b>Looking for a job:</b>
      <span>{props.lookingForAJob ? 'Yes' : 'No'}</span>
    </div>
    {props.lookingForAJob ? (
      <div>
        <b>Job description:</b> <br />
        <span>{props.lookingForAJobDescription}</span>
      </div>
    ) : null}
    <div>
      <b>About me:</b> <br />
      <span>{props.aboutMe}</span>
    </div>
  </div>
)

const MyContacts: FC<MyContactsType> = props => (
  <div className={styles.contacts}>
    <h3>My contacts: </h3>
    {props.contacts
      ? Object.entries(props.contacts).map((e, i) => {
          return !e[1] ? null : (
            <Contact key={i} title={e[0] as ContactTitleType} value={e[1]} />
          )
        })
      : null}
  </div>
)

const Contact: FC<{ title: ContactTitleType; value: string }> = props => {
  return (
    <div>
      <b>{props.title !== 'mainLink' ? props.title : 'your site'}:</b>
      <span>{props.value}</span>
    </div>
  )
}
