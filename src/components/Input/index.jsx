import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const Input = ({
  type,
  form,
  name,
  placeholder,
  onChange,
  value,
  onBlur,
  label,
  icon,
  id
}) => {
  let className;
  if (form === 'underlined') {
    className = styles.underlined;
  }
  if (form === 'oval') {
    className = styles.oval;
  }
  return (
    <div className={className}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className={styles.input}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      {icon && <img className={styles.icon} src={icon} alt="user" />}
    </div>
  );
};
Input.propTypes = {
  type: PropTypes.string,
  form: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  value: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};
Input.defaultProps = {
  form: 'underlined',
  type: 'input',
  name: '',
  placeholder: '',
  onBlur: () => {},
  label: ''
};

export default Input;
