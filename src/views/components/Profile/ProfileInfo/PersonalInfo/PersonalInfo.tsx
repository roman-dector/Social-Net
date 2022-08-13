import styles from '../ProfileInfo.module.scss'

import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  useForm,
  UseFormHandleSubmit,
  UseFormReset,
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

  const formMethods = useForm<PersonalInfoFormType>({
    defaultValues: {
      fullName: props.fullName,
      lookingForAJob: props.lookingForAJob,
      lookingForAJobDescription: props.lookingForAJobDescription,
      aboutMe: props.aboutMe,
      ...props.contacts,
    }
  })

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
        reset={formMethods.reset}
      />
    </div>
  )
}

type EditInfoIconType = {
  isEditProfileInfo: boolean
  setIsEditProfileInfo: (x: boolean) => void
  handleSubmit: UseFormHandleSubmit<PersonalInfoFormType>
  reset: UseFormReset<PersonalInfoFormType>
}

const EditInfoIcon: FC<EditInfoIconType> = props => {
  const dispatch = useDispatch()

  const userId = useSelector(selectLoggedUserId)
  const isFetchingProfileInfo = useSelector(selectIsFetchingProfileInfo)

  const onSubmit: SubmitHandler<PersonalInfoFormType> = data => {
    props.reset({...data})
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
        <div>
          <div
            onClick={() => {
              props.handleSubmit(onSubmit)()
              props.setIsEditProfileInfo(false)
            }}
          >
            <svg viewBox='0 0 70 70' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M9 7.53088C6.23857 7.53088 4 9.76946 4 12.5309V61C4 63.7614 6.23858 66 9 66H52.7462C55.5076 66 57.7462 63.7614 57.7462 61V37.5556C57.7462 36.2464 56.6846 35.1852 55.3751 35.1852C54.0655 35.1852 53.0039 36.2464 53.0039 37.5556V56.2593C53.0039 59.0207 50.7653 61.2593 48.0039 61.2593H13.7423C10.9809 61.2593 8.74231 59.0207 8.74231 56.2593V17.2716C8.74231 14.5102 10.9809 12.2716 13.7423 12.2716H37.1962C38.5058 12.2716 39.5674 11.2104 39.5674 9.90125C39.5674 8.59213 38.5058 7.53088 37.1962 7.53088H9Z'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M57.5982 5.04331C56.5778 4.09931 55.0124 4.18543 54.1018 5.23567L33.4279 29.0785L23.1659 20.4464C22.0968 19.547 20.5289 19.7074 19.6639 20.8045C18.7989 21.9017 18.9644 23.5201 20.0336 24.4195L32.0732 34.5469C33.0891 35.4015 34.5554 35.2993 35.441 34.3457C35.5852 34.2391 35.7204 34.1146 35.8436 33.9725L57.7968 8.6542C58.7075 7.60396 58.6186 5.98731 57.5982 5.04331ZM63.9535 11.1424C62.9368 10.1942 61.3708 10.2741 60.4559 11.3208L34.4502 41.0719L18.216 27.2869C17.1512 26.3827 15.5829 26.5358 14.713 27.6288C13.8431 28.7218 14.0012 30.3409 15.066 31.245L32.9625 46.4416C33.4828 46.8834 34.1233 47.0728 34.7438 47.0234C35.4478 47.0489 36.1565 46.7658 36.6645 46.1846L64.1377 14.7546C65.0526 13.7079 64.9702 12.0907 63.9535 11.1424Z'
              />
              <path d='M64.3024 14.451C62.6029 12.8387 61.2387 12.0716 60.4282 11.3027C60.8433 10.3306 60.1317 9.30265 60.1317 9.30265C60.1317 9.30265 58.924 8.2224 57.6317 8.80265C56.7763 7.9912 55.626 6.21964 54.3396 4.99932C56.9591 2.23827 61.3127 2.11583 64.0639 4.72584C66.815 7.33585 66.9218 11.6899 64.3024 14.451Z' />
              <path d='M24.0759 21.2106C22.4829 22.8645 21.7263 24.2012 20.9665 24.99C20.0027 24.5623 18.9862 25.2487 18.9862 25.2487C18.9862 25.2487 17.919 26.4252 18.4968 27.7142C17.6951 28.5466 15.943 29.6543 14.7373 30.9061C11.9962 28.2658 11.8646 23.9551 14.4433 21.2777C17.0221 18.6004 21.3348 18.5704 24.0759 21.2106Z' />
            </svg>
          </div>

          <div
            onClick={() => {
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
                d='M58.3103 5.78626C57.3942 4.74074 55.8284 4.66271 54.8129 5.61196L31.8789 27.0505L22.8455 17.6756C21.8761 16.6696 20.3 16.6653 19.3252 17.6662C18.3504 18.667 18.3461 20.2939 19.3155 21.3L29.9532 32.3398C30.8613 33.2823 32.3018 33.3456 33.2817 32.5271C33.454 32.4309 33.618 32.312 33.7697 32.1702L58.1303 9.39813C59.1458 8.44887 59.2264 6.83178 58.3103 5.78626ZM63.9578 12.5264C63.0456 11.4772 61.4799 11.3931 60.4607 12.3386L36.3456 34.7086C35.3263 35.6541 35.2395 37.2711 36.1516 38.3203C37.0638 39.3695 38.6295 39.4535 39.6487 38.5081L63.7639 16.138C64.7831 15.1925 64.8699 13.5755 63.9578 12.5264ZM13.4081 23.649C12.4292 24.6455 12.4178 26.2722 13.3826 27.2823L23.8994 38.2923C24.8643 39.3025 26.44 39.3135 27.419 38.317C28.3979 37.3205 28.4093 35.6938 27.4445 34.6837L16.9277 23.6737C15.9628 22.6635 14.3871 22.6525 13.4081 23.649Z'
              />
              <rect
                width='5.05937'
                height='18.99'
                rx='2.52969'
                transform='matrix(0.764482 -0.644645 -0.668576 -0.743644 46.8674 51.0275)'
              />
              <rect
                width='5.05864'
                height='18.8058'
                rx='2.52932'
                transform='matrix(0.761519 -0.648143 -0.672022 -0.740531 40.4411 56.4678)'
              />
              <rect
                width='5.05937'
                height='18.828'
                rx='2.52969'
                transform='matrix(0.654696 0.755892 0.734739 -0.678349 17.3274 52.0649)'
              />
              <rect
                width='5.05864'
                height='19.0616'
                rx='2.52932'
                transform='matrix(0.658155 0.752883 0.731581 -0.681754 11.4965 45.9953)'
              />
              <path d='M23.5786 18.428C21.9282 20.0337 20.7373 21.1922 19.9502 21.958C19 21.5 18 22 18 22C18 22 17 23 17.5346 24.3081C16.7039 25.1163 15.1525 26.6257 13.9033 27.841C11.2493 25.1131 11.2638 20.7946 13.9356 18.1952C16.6074 15.5959 20.9247 15.7001 23.5786 18.428Z' />
              <path d='M64.1707 15.6483C62.4712 14.036 61.1071 13.2689 60.2966 12.5C60.7116 11.5279 60 10.5 60 10.5C60 10.5 58.7923 9.41975 57.5 10C56.6447 9.18854 55.4943 7.41699 54.208 6.19667C56.8274 3.43562 61.1811 3.31318 63.9322 5.92319C66.6834 8.5332 66.7901 12.8873 64.1707 15.6483Z' />
              <path d='M49.2235 46C47.4795 47.5036 46.2212 48.5885 45.3895 49.3056C45.7625 50.2921 45.1769 51.2445 45.1769 51.2445C45.1769 51.2445 44.0933 52.1532 42.8371 51.5063C41.9593 52.2631 40.32 53.6766 39 54.8146C41.4848 57.6966 45.7877 58.0596 48.6109 55.6255C51.434 53.1914 51.7083 48.8819 49.2235 46Z' />
              <path d='M22.3527 54.2988C20.822 52.5889 19.7177 51.3552 18.9877 50.5397C18.0091 50.9319 17.0484 50.3668 17.0484 50.3668C17.0484 50.3668 16.1229 49.3037 16.7474 48.0371C15.9771 47.1765 14.5382 45.5691 13.3797 44.2749C10.5444 46.8128 10.2547 51.1142 12.7325 53.8822C15.2103 56.6503 19.5174 56.8368 22.3527 54.2988Z' />
            </svg>
          </div>
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
