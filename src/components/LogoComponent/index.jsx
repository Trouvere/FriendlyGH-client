import React from 'react';
import logo from '../../assets/img/FriendlyLogo.svg';

import style from './style.module.css';

const LogoComponent = () => {
  return <img src={logo} className={style.logo} alt="logo" />;
};

export default LogoComponent;
