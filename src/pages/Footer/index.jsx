import React from 'react';
import NameSiteCompanyComponent from '../../components/NameSiteCompanyComponent';
import TopBottomBlock from '../../components/TopBottomBlock';
import style from './styles.module.css';

const Footer = () => {
  return (
    <footer>
      <TopBottomBlock className={style.footer}>
        <NameSiteCompanyComponent />
      </TopBottomBlock>
    </footer>
  );
};

export default Footer;
