import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import style from './style.module.css';

const NavBlock = () => {
  const isAuth = useSelector((state) => state.authData.isAuth);
  const id = useSelector((state) => state.profileData.profile.id);
  return (
    isAuth && (
      <nav className={style.navBlock}>
        <NavLink
          to={`/profile/${id}`}
          className={style.navLink}
          activeClassName={style.activeNav}
        >
          Profile
        </NavLink>
        <NavLink
          to="/users"
          className={style.navLink}
          activeClassName={style.activeNav}
        >
          Users
        </NavLink>
        <NavLink
          to="/groups"
          className={style.navLink}
          activeClassName={style.activeNav}
        >
          Chats
        </NavLink>
      </nav>
    )
  );
};
export default NavBlock;
