import React from 'react';
import PropTypes from 'prop-types';
import style from './styles.module.css';

const SubInterestsBlock = ({ children }) => {
  return <div className={style.block}>{children}</div>;
};

SubInterestsBlock.propTypes = {
  children: PropTypes.node.isRequired
};

export default SubInterestsBlock;
