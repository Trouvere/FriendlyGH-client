import React from 'react';
import NavBlock from '../../components/NavComponent';
import TopBottomBlock from '../../components/TopBottomBlock';
import LogoComponent from '../../components/LogoComponent';
import style from './styles.module.css';
import LogOutBlockContainer from '../../components/LogOutBlock';

const Header = () => {
  return (
    <header>
      <TopBottomBlock className={style.header}>
        <LogoComponent />
        <NavBlock />
        <LogOutBlockContainer />
      </TopBottomBlock>
    </header>
  );
};

export default Header;
