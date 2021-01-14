import React, { useState } from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { authenticationApi } from '../../API/index';
import Input from '../../components/Input';
import styles from './styles.module.css';
import Button from '../../components/Button';
import ErrorMessage from '../../components/ErrorMessage';
import signUpSchema from '../../plugins/validation';
import userIcon from '../../assets/img/user.svg';
import passwordIcon from '../../assets/img/lock.svg';

const RegisterForm = ({ onSignUpButtonClick }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [showError, setShowError] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: signUpSchema,
    onSubmit: async (data) => {
      setIsFetching(true);
      try {
        await authenticationApi.signUp({
          email: data.email,
          password: data.password
        });
        onSignUpButtonClick();
        setShowError(false);
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
            <h3>Sing Up</h3>
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
              id="password1"
            />
            <div className={styles.errorBlock}>
              {formik.errors.password && formik.touched.password && (
                <ErrorMessage>{formik.errors.password}</ErrorMessage>
              )}
            </div>
          </div>
          <div className={styles.wrapperInput}>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              label="Confirm Password"
              icon={passwordIcon}
              id="password2"
            />
            <div className={styles.errorBlock}>
              {formik.errors.confirmPassword &&
                formik.touched.confirmPassword && (
                  <ErrorMessage>{formik.errors.confirmPassword}</ErrorMessage>
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
              Sing up
            </Button>
            {showError && (
              <ErrorMessage typeError="formError">
                This Email was used
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
                LOGIN
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

RegisterForm.propTypes = {
  onSignUpButtonClick: PropTypes.func.isRequired
};

export default RegisterForm;
