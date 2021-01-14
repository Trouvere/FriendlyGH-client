import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const Burger = ({ onClick, isOpen }) => {
  return (
    <div className={styles.menuToggle}>
      <input type="checkbox" checked={isOpen} onChange={onClick} />
      <span className={styles.span1} />
      <span className={styles.span2} />
      <span className={styles.span3} />
    </div>
  );
};

Burger.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Burger;
