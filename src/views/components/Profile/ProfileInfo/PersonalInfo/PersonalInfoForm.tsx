import styles from '../ProfileInfo.module.scss'

import { FC } from 'react'
import {
  useForm,
  useWatch,
  UseFormRegister,
  UseFormHandleSubmit,
  SubmitHandler,
  FormProvider,
  useFormContext,
} from 'react-hook-form'

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
  const { register, watch } = useFormContext()
  return (
    <form className={styles.aboutMe}>
      <h3>Personal info</h3>

      <div>
        <label>Name:</label>
        <input {...register('fullName')} defaultValue={props.fullName} />
      </div>

      <div>
        <div className={styles.checkbox}>
          <label>Looking for a job:</label>
          <input
            {...register('lookingForAJob')}
            type={'checkbox'}
            defaultChecked={props.lookingForAJob}
          />
        </div>
      </div>

      <div>
        <label>Job description:</label> <br />
        <textarea
          {...register('lookingForAJobDescription')}
          defaultValue={props.lookingForAJobDescription}
        />
      </div>

      <div>
        <label>About me:</label> <br />
        <textarea {...register('aboutMe')} defaultValue={props.aboutMe} />
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
      <input {...props.register(props.title)} defaultValue={props.value} />
    </div>
  )
}
