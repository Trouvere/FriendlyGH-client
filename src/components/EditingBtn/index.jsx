import React from 'react';
import PropTypes from 'prop-types';
import style from './styles.module.css';

const EditBtn = ({ onSignUpButtonClick }) => {
  return (
    <button
      className={style.editButton}
      type="button"
      onClick={onSignUpButtonClick}
    >
      Edit Profile
    </button>
  );
};
EditBtn.propTypes = {
  onSignUpButtonClick: PropTypes.func.isRequired
};

export default EditBtn;
