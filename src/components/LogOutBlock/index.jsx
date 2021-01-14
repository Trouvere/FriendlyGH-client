import React from 'react';
import { useSelector } from 'react-redux';
import LogOutBlock from './logOutBlock';

const LogOutBlockContainer = React.memo(() => {
  const { isAuth, email } = useSelector((state) => ({
    email: state.authData.email,
    isAuth: state.authData.isAuth
  }));
  return isAuth && <LogOutBlock email={email} />;
});

export default LogOutBlockContainer;
