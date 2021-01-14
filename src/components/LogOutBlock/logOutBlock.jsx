import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import style from './style.module.css';
import { resetAuthentication } from '../../store/reducers/AuthReducer';

const LogOutBlock = ({ email }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className={style.logOutBlock}>
      <p className={style.email}>{email}</p>
      <button
        type="button"
        className={style.button}
        onClick={() => {
          dispatch(resetAuthentication());
          history.push('/login');
        }}
      >
        LogOut
      </button>
    </div>
  );
};

export default LogOutBlock;

LogOutBlock.propTypes = {
  email: PropTypes.string.isRequired
};
