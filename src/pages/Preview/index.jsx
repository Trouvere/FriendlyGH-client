import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import style from './styles.module.css';

const Preview = () => {
  const isAuth = useSelector((state) => state.authData.isAuth);
  const history = useHistory();
  if (isAuth) {
    history.push('/profile');
  }
  return (
    <div className={style.priview}>
      <div className={style.welcomeBlock}>
        <p className={style.addText}>Welcome to</p>
        <h1 className={style.nameApp}>FRIENDLY</h1>
        <p className={style.addText}>application</p>
        <div className={style.toLogin}>
          <span>click</span>
          <NavLink to="/login" className={style.nav}>
            here
          </NavLink>
          <span>to login or register</span>
        </div>
      </div>
      <div className={style.bacground}>
        <div className={style.bacgroundLeft} />
        <div className={style.bacgroundRigth} />
      </div>
    </div>
  );
};
export default Preview;
