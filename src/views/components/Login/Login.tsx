import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  selectIsUserAuthed,
  selectIsAuthenticating,
  selectCaptchaUrl,
} from '../../../redux/ducks/auth/selectors'
import { login } from '../../../redux/ducks/auth/operations'
import { setIsAuthenticating } from '../../../redux/ducks/auth/actions'

import LoginForm from './LoginForm'
import { AppThunk, RootState } from '../../../redux/store'
import { LoginDataType } from '../../../redux/ducks/auth/types'
import {
  WrongCredentialsError,
  WrongCaptchaError,
} from '../../../dal/apiErrors'

type MapStateToPopsType = {
  isUserAuthed: boolean
  isAuthenticating: boolean
  captchaUrl: string | null
}
type MapDispatchToPopsType = {
  setIsAuthenticating: (status: boolean) => void
  login: ({
    email,
    password,
    rememberMe,
    captcha,
  }: LoginDataType) => Promise<void | WrongCaptchaError | WrongCredentialsError>
}
type LoginPropsType = MapStateToPopsType & MapDispatchToPopsType

const Login: FC<LoginPropsType> = props => {
  if (props.isUserAuthed) return <Navigate replace to='/profile' />

  return (
    <LoginForm
      login={props.login}
      isAuthenticating={props.isAuthenticating}
      setIsAuthenticating={props.setIsAuthenticating}
      captchaUrl={props.captchaUrl}
    />
  )
}

const mapStateToPops = (state: RootState): MapStateToPopsType => ({
  isUserAuthed: selectIsUserAuthed(state),
  isAuthenticating: selectIsAuthenticating(state),
  captchaUrl: selectCaptchaUrl(state),
})

export default connect(mapStateToPops, { login, setIsAuthenticating })(Login)
