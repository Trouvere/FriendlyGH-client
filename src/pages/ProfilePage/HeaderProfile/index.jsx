import React from 'react';
import PropTypes from 'prop-types';
import style from './styles.module.css';

const HeaderProfile = ({
  avatar,
  firstName,
  lastName,
  location,
  aboutMe,
  roleInCompany
}) => {
  return (
    <div className={style.headerProfile}>
      <div className={style.container}>
        <div className={style.leftBlock}>
          <p className={style.hello}>Hello</p>
          <p className={style.name}>
            {`I'm ${firstName || ''} 
            ${lastName || ''}`}
          </p>
          <p className={style.location}>{location}</p>
          <p className={style.roleInCompany}>{roleInCompany}</p>
        </div>
        <div className={style.avatarBlock}>
          {avatar ? (
            <img className={style.avatar} src={avatar} alt="img" />
          ) : (
            <div className={style.notAvatar} />
          )}
        </div>
        <div className={style.rightBlock}>
          <h3>About me</h3>
          <p>{aboutMe || 'Set in edit profile'}</p>
        </div>
      </div>
    </div>
  );
};

HeaderProfile.propTypes = {
  avatar: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  aboutMe: PropTypes.string.isRequired,
  roleInCompany: PropTypes.string.isRequired
};

export default HeaderProfile;
