import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { authenticationApi } from '../../API/index';
import Input from '../../components/Input';
import styles from './styles.module.css';
import Button from '../../components/Button';
import ErrorMessage from '../../components/ErrorMessage';
import { signUpSchemaLogin } from '../../plugins/validation';
import userIcon from '../../assets/img/user.svg';
import passwordIcon from '../../assets/img/lock.svg';

const LoginForm = ({ onSignUpButtonClick, onAuthDataFetched }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [showError, setShowError] = useState(false);
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: signUpSchemaLogin,
    onSubmit: async (data) => {
      setIsFetching(true);
      try {
        const response = await authenticationApi.singIn({
          email: data.email,
          password: data.password
        });
        await window.localStorage.setItem(
          'authData',
          JSON.stringify({
            email: response.email,
            isAuth: true,
            token: response.accessToken
          })
        );
        await onAuthDataFetched(
          JSON.parse(window.localStorage.getItem('authData'))
        );
        setShowError(false);
        history.push(`/profile/${response.id}`);
      } catch (error) {
        setShowError(true);
      } finally {
        setIsFetching(false);
      }
    }
  });
  return (
    <div className={styles.formWrapper}>
      <div className={styles.loginWrapper}>
        <form className={styles.loginForm} onSubmit={formik.handleSubmit}>
          <div className={styles.loginTitle}>
            <h3>Login</h3>
          </div>
          <div className={styles.wrapperInput}>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              label="Email"
              icon={userIcon}
              id="email"
            />
            <div className={styles.errorBlock}>
              {formik.errors.email && formik.touched.email && (
                <ErrorMessage>{formik.errors.email}</ErrorMessage>
              )}
            </div>
          </div>
          <div className={styles.wrapperInput}>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              label="Password"
              icon={passwordIcon}
              id="password"
            />
            <div className={styles.errorBlock}>
              {formik.errors.password && formik.touched.password && (
                <ErrorMessage>{formik.errors.password}</ErrorMessage>
              )}
            </div>
          </div>
          <div className={styles.buttonRow}>
            <Button
              color="white"
              type="submit"
              disabled={false}
              isLoading={isFetching}
            >
              LOGIN
            </Button>
            {showError && (
              <ErrorMessage typeError="formError">
                Error on Email or password
              </ErrorMessage>
            )}
            <div className={styles.blockLink}>
              <span>Or using</span>
              <button
                type="button"
                className={styles.link}
                onClick={onSignUpButtonClick}
                disabled={isFetching}
              >
                SIGN UP
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  onSignUpButtonClick: PropTypes.func.isRequired,
  onAuthDataFetched: PropTypes.func.isRequired
};

export default LoginForm;
