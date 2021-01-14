import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.module.css';

const ErrorMessage = ({ children, typeError }) => {
  return (
    <div
      className={classnames({
        [styles.errorMessage]: true,
        [styles.inputError]: typeError === 'inputError',
        [styles.formError]: typeError === 'formError'
      })}
    >
      {children}
    </div>
  );
};

export default ErrorMessage;

ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
  typeError: PropTypes.string
};
ErrorMessage.defaultProps = {
  typeError: 'inputError'
};
