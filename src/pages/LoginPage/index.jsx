import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../../store/reducers/AuthReducer';
import LoginForm from './login';
import style from './styles.module.css';
import RegisterForm from './singUp';

const LoginPage = () => {
  const dispatch = useDispatch();
  const handleAuthDataFetched = ({ email, token, isAuth }) =>
    dispatch(setAuthData({ email, isAuth, token }));

  const [isLoginFormShown, setIsLoginFormShown] = useState(true);
  const handleSignUpButtonClick = () => {
    setIsLoginFormShown(!isLoginFormShown);
  };
  return (
    <div className={style.page}>
      <div className={style.rightImg} />
      <div className={style.leftImg} />
      {isLoginFormShown ? (
        <LoginForm
          onSignUpButtonClick={handleSignUpButtonClick}
          onAuthDataFetched={handleAuthDataFetched}
        />
      ) : (
        <RegisterForm onSignUpButtonClick={handleSignUpButtonClick} />
      )}
    </div>
  );
};

export default LoginPage;
