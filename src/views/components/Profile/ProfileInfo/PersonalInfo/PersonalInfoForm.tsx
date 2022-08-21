import styles from '../ProfileInfo.module.scss'

import { FC } from 'react'
import { UseFormRegister, useFormContext } from 'react-hook-form'

import {
  AboutMeType,
  MyContactsType,
  PersonalInfoType,
  PersonalInfoFormType,
  ContactTitleType,
} from '../../../../../redux/ducks/profile/types'

export const PersonalInfoForm: FC<PersonalInfoType> = props => {
  return (
    <>
      <AboutMeForm
        fullName={props.fullName}
        lookingForAJob={props.lookingForAJob}
        lookingForAJobDescription={props.lookingForAJobDescription}
        aboutMe={props.aboutMe}
      />
      <MyContactsForm contacts={props.contacts} />
    </>
  )
}

const AboutMeForm: FC<AboutMeType> = props => {
  const { register, setValue, getValues, } = useFormContext()
  return (
    <form className={styles.aboutMe}>
      <h3>Personal info</h3>

      <div>
        <label>Name:</label>
        <input {...register('fullName')} />
      </div>

      <div className={styles.lookingForAJob}>
        <label>Looking for a job:</label>
        <div
          className={styles.checkboxContainer}
          onClick={e => {
            setValue('lookingForAJob', !getValues('lookingForAJob'))

            let tip = e.currentTarget.childNodes[1]

            if (getValues('lookingForAJob')) {
              // @ts-ignore
              tip.classList.remove(styles.hidden)
              // @ts-ignore
              tip.classList.add(styles.visible)
            } else {
              // @ts-ignore
              tip.classList.remove(styles.visible)
              // @ts-ignore
              tip.classList.add(styles.hidden)
            }
          }}
        >
          <input
                {...register('lookingForAJob')}
                type={'checkbox'}
              />
          <svg
            className={ getValues('lookingForAJob') ? styles.visible : styles.hidden}
            width='12'
            viewBox='0 0 60 48'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clip-rule='evenodd'
              d='M47.8241 5.04331C46.8038 4.09931 45.2384 4.18543 44.3277 5.23567L23.6539 29.0785L13.3919 20.4464C12.3227 19.547 10.7548 19.7074 9.88984 20.8045C9.02487 21.9017 9.1904 23.5201 10.2595 24.4195L22.2992 34.5469C23.3151 35.4015 24.7813 35.2993 25.6669 34.3457C25.8111 34.2391 25.9463 34.1146 26.0695 33.9725L48.0228 8.6542C48.9335 7.60396 48.8445 5.98731 47.8241 5.04331ZM54.1794 11.1424C53.1627 10.1942 51.5968 10.2741 50.6818 11.3208L24.6762 41.0719L8.44199 27.2869C7.37718 26.3827 5.80882 26.5358 4.93895 27.6288C4.06909 28.7218 4.22712 30.3409 5.29193 31.245L23.1885 46.4416C23.7087 46.8834 24.3493 47.0728 24.9698 47.0234C25.6737 47.0489 26.3824 46.7658 26.8904 46.1846L54.3636 14.7546C55.2786 13.7079 55.1961 12.0907 54.1794 11.1424Z'
            />
            <path
              d='M54.5283 14.451C52.8288 12.8387 51.4647 12.0716 50.6542 11.3027C51.0692 10.3306 50.3576 9.30265 50.3576 9.30265C50.3576 9.30265 49.1499 8.2224 47.8576 8.80265C47.0023 7.99119 45.8519 6.21964 44.5656 4.99932C47.185 2.23827 51.5387 2.11583 54.2898 4.72584C57.041 7.33585 57.1477 11.6899 54.5283 14.451Z'
            />
            <path
              d='M14.3019 21.2106C12.7088 22.8645 11.9523 24.2012 11.1925 24.99C10.2286 24.5623 9.21213 25.2487 9.21213 25.2487C9.21213 25.2487 8.14497 26.4252 8.72279 27.7142C7.92105 28.5466 6.16899 29.6543 4.96326 30.9061C2.22213 28.2658 2.09052 23.9551 4.6693 21.2777C7.24808 18.6004 11.5607 18.5704 14.3019 21.2106Z'
            />
            <rect
              x='9.97595'
              y='22.5316'
              width='23.9551'
              height='6'
              transform='rotate(38.7257 9.97595 22.5316)'
            />
            <rect
              x='23'
              y='34.3092'
              width='37.3809'
              height='6'
              transform='rotate(-49.2282 23 34.3092)'
            />
          </svg>
        </div>
      </div>

      <div>
        <label>Job description:</label> <br />
        <textarea {...register('lookingForAJobDescription')} />
      </div>

      <div>
        <label>About me:</label> <br />
        <textarea {...register('aboutMe')} />
      </div>
    </form>
  )
}

const MyContactsForm: FC<MyContactsType> = props => {
  const { register } = useFormContext<PersonalInfoFormType>()
  return (
    <form className={styles.contacts}>
      <h3>My contacts:</h3>
      {props.contacts
        ? Object.entries(props.contacts).map((e, i) => {
            return (
              <ContactForm
                key={i}
                title={e[0] as ContactTitleType}
                value={e[1]}
                register={register}
              />
            )
          })
        : null}
    </form>
  )
}

const ContactForm: FC<{
  title: ContactTitleType
  value: string
  register: UseFormRegister<PersonalInfoFormType>
}> = props => {
  return (
    <div>
      <label>{props.title !== 'mainLink' ? props.title : 'your site'}:</label>
      <input {...props.register(props.title)} />
    </div>
  )
}
