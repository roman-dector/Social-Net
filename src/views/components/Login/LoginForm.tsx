import styles from './LoginForm.module.scss'

import { FC, useState } from 'react'
import { FieldError, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { validate } from '../../validationSchemas/validationFields'
import { LoginDataType } from '../../../redux/ducks/auth/types'
import {
  WrongCredentialsError,
  WrongCaptchaError,
} from '../../../dal/apiErrors'
import { AppThunk } from '../../../redux/store'

const validationSchema = yup.object({
  email: validate.emailRequired(),
  password: validate.passRequired(4),
})

type LoginFormPropsType = {
  isAuthenticating: boolean
  captchaUrl: string | null
  setIsAuthenticating: (status: boolean) => void
  login: (
    data: LoginDataType
  ) => Promise<void | WrongCaptchaError | WrongCredentialsError>
}

const LoginForm: FC<LoginFormPropsType> = props => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<LoginDataType>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  })

  let [formError, setFormError] = useState({ type: '', message: '' })

  const onSubmit: SubmitHandler<LoginDataType> = data => {
    props.setIsAuthenticating(true)
    props
      .login(data)
      .then(() => {
        setFormError({ type: '', message: '' })
      })
      .catch(e => {
        setFormError({ type: 'server', message: e.message })
      })
      .then(() => {
        props.setIsAuthenticating(false)
      })
  }
  return (
    <div className={styles.loginFormContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.email}>
          <label>Email:</label>
          <input {...register('email')} />
          <FieldErrorMessage
            error={errors.email}
            touched={touchedFields.email}
          />
        </div>

        <div className={styles.password}>
          <label>Password:</label>
          <input {...register('password')} type={'password'} />
          <FieldErrorMessage
            error={errors.password}
            touched={touchedFields.password}
          />
        </div>

        <div className={styles.rememberMe}>
          <input {...register('rememberMe')} type={'checkbox'} />
          <label>remember me</label>
        </div>

        {!props.captchaUrl ? null : (
          <div className={styles.captcha}>
            <div className={styles.captchaImgContainer}>
              <img src={props.captchaUrl} alt='captcha image' />
            </div>
            <input {...register('captcha')} />
          </div>
        )}

        <FormErrorMessage error={formError} />

        <div className={styles.submit}>
          <button type='submit' disabled={props.isAuthenticating}>
            Log In
          </button>
        </div>
      </form>
    </div>
  )
}

type FormErrorType = {
  type: string
  message: string
}

const FieldErrorMessage = ({
  error,
  touched,
}: {
  error?: FieldError
  touched?: boolean
}) => {
  if (error && touched) {
    let errorMessage = error.message?.split(' ').splice(1).join(' ')
    return <p className={styles.fieldError}>{errorMessage}</p>
  } else return null
}

const FormErrorMessage = ({ error }: { error: FormErrorType }) => {
  return error.message ? (
    <div className={styles.formErrorContainer}>
      <p className={styles.formError}>{error.message}</p>
    </div>
  ) : null
}

export default LoginForm
