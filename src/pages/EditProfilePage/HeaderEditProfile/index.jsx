import React from 'react';
import PropTypes from 'prop-types';
import style from './styles.module.css';

import {
  InputForFormik,
  TextareaForFormik,
  SelectForFormik,
  RadioForFormik
} from '../../../components/ForFormik';

const HeaderEditProfile = ({ avatar, rolesInCompany, allLocations }) => {
  return (
    <div className={style.headerProfile}>
      <div className={style.leftBlock}>
        <div className={style.inputBlock}>
          <InputForFormik
            placeholder="first Name"
            name="firstName"
            label="First Name"
          />
          <InputForFormik
            placeholder="last Name"
            name="lastName"
            label="last Name"
          />
          <SelectForFormik
            name="roleInCompany"
            options={rolesInCompany}
            label="Roles In Company"
          />
        </div>
      </div>
      <div className={style.avatarBlock}>
        {avatar ? (
          <img className={style.avatar} src={avatar} alt="img" />
        ) : (
          <div className={style.notAvatar} />
        )}
      </div>
      <div className={style.rightBlock}>
        <div className={style.inputBlock}>
          <TextareaForFormik
            placeholder="About me"
            name="aboutMe"
            label="About Me"
          />
        </div>
        <div
          role="group"
          aria-labelledby="my-radio-group"
          className={style.genderBlock}
        >
          <h4>Gender:</h4>
          <RadioForFormik type="radio" name="gender" value="male">
            <span className={style.radioText}>Male</span>
          </RadioForFormik>
          <RadioForFormik type="radio" name="gender" value="female">
            <span className={style.radioText}>Female</span>
          </RadioForFormik>
        </div>
        <SelectForFormik
          name="location"
          options={allLocations}
          label="Location"
        />
      </div>
    </div>
  );
};

export default HeaderEditProfile;

HeaderEditProfile.propTypes = {
  avatar: PropTypes.string,
  rolesInCompany: PropTypes.arrayOf(PropTypes.object),
  allLocations: PropTypes.arrayOf(PropTypes.object)
};
HeaderEditProfile.defaultProps = {
  avatar: '',
  rolesInCompany: [],
  allLocations: []
};
