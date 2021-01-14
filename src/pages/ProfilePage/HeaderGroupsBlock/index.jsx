import React from 'react';
import style from './styles.module.css';

const HeaderInterests = ({ label }) => {
  return (
    <div className={style.header}>
      <h2>{label}</h2>
    </div>
  );
};

export default HeaderInterests;
