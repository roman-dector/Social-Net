import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  selectIsUserAuthed,
  selectIsAuthenticating,
  selectCaptchaUrl,
} from '../../../redux/ducks/auth/selectors';
import { login } from '../../../redux/ducks/auth/operations';
import { setIsAuthenticating } from '../../../redux/ducks/auth/actions';

import LoginForm from './LoginForm';

const Login = props => {
  if (props.isUserAuthed) return <Navigate replace to='/profile' />;

  return (
    <LoginForm
      login={props.login}
      isAuthenticating={props.isAuthenticating}
      setIsAuthenticating={props.setIsAuthenticating}

      captchaUrl={props.captchaUrl}
    />
  );
};

const mapStateToPops = state => ({
  isUserAuthed: selectIsUserAuthed(state),
  isAuthenticating: selectIsAuthenticating(state),
  captchaUrl: selectCaptchaUrl(state),
});

export default connect(mapStateToPops, { login, setIsAuthenticating })(Login);
