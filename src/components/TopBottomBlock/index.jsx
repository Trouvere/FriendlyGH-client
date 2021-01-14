import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './style.module.css';

const TopBottomBlock = ({ children, className }) => {
  return (
    <div className={classnames(style.topBottomBlock, className)}>
      {children}
    </div>
  );
};

TopBottomBlock.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};
TopBottomBlock.defaultProps = {
  children: '',
  className: ''
};
export default TopBottomBlock;
