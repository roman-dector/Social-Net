import styles from './LoginForm.module.scss';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { validate } from '../../validationSchemas/validationFields';

const validationSchema = yup.object({
  email: validate.emailRequired(),
  password: validate.passRequired(4),
});

const LoginForm = props => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, touchedFields },
  } = useForm({
    defaultVaues: {},
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = data => {
    props.setIsAuthenticating(true);
    props
      .login(data)
      .catch(e => {
        setError('formError', { type: 'server', message: e.message });
      })
      .then(() => props.setIsAuthenticating(false));
  };
  return (
    <div className={styles.loginFormContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.email}>
          <label>Email:</label>
          <input {...register('email')} />
          <FieldError error={errors.email} touched={touchedFields.email} />
        </div>

        <div className={styles.password}>
          <label>Password:</label>
          <input {...register('password')} type={'password'} />
          <FieldError
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

        <FormError error={errors.formError} />

        <div className={styles.submit}>
          <button type='submit' disabled={props.isAuthenticating}>
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

const FieldError = ({ error, touched }) => {
  if (error && touched) {
    let errorMessage = error.message.split(' ').splice(1).join(' ');
    return <p className={styles.fieldError}>{errorMessage}</p>;
  } else return null;
};

const FormError = ({ error }) => {
  return error ? (
    <div className={styles.formErrorContainer}>
      <p className={styles.formError}>{error.message}</p>
    </div>
  ) : null;
};

export default LoginForm;
