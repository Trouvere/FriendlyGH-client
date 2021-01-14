import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './styles.module.css';

const UsersCard = ({ name, lastName, photo, position, id, location }) => {
  const fullName = `${name || ''} ${lastName || ''}`;
  return (
    <div className={style.usersCard}>
      <NavLink className={style.navLink} to={`/profile/${id}`}>
        <h3 className={style.headerCard}>
          {fullName === ' ' ? 'unanimous' : fullName}
        </h3>
        <div className={style.imgBlock}>
          {photo ? (
            <img src={photo} alt="avatar" />
          ) : (
            <div className={style.avatar} />
          )}
        </div>
        <p className={style.position}>{position}</p>
        <p className={style.position}>{location}</p>
      </NavLink>
    </div>
  );
};

export default UsersCard;

UsersCard.propTypes = {
  name: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  photo: PropTypes.string,
  position: PropTypes.string,
  location: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

UsersCard.defaultProps = {
  photo: '',
  position: 'employee',
  location: 'world'
};
