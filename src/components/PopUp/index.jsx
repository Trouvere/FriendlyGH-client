import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const PopUp = ({ onClick, children }) => {
  return (
    <div className={styles.editWrapper}>
      <div className={styles.form}>
        <button type="button" className={styles.closeButton} onClick={onClick}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default PopUp;

PopUp.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};
