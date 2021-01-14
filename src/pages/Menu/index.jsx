import React, { useState } from 'react';
import classnames from 'classnames';
import NavBlock from '../../components/NavComponent';
import Burger from '../../components/Burger';
import style from './style.module.css';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={style.menu} onBlur={() => setIsOpen(false)}>
      <div
        className={classnames({
          [style.navBlock]: true,
          [style.navBlockActive]: isOpen
        })}
      >
        <NavBlock />
      </div>
      <div className={style.burgerBlock}>
        <Burger onClick={toggleIsOpen} isOpen={isOpen} />
      </div>
    </div>
  );
};

export default Menu;
