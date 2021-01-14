import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const Select = ({
  name,
  placeholder,
  onChange,
  value,
  options,
  label,
  icon,
  id
}) => {
  return (
    <div className={styles.oval}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <select name={name} id={id} onChange={onChange} value={value}>
        <option selected>{placeholder}</option>
        {options.map((el) => (
          <option key={el.name}>{el.name}</option>
        ))}
      </select>
      <img className={styles.icon} src={icon} alt="user" />
    </div>
  );
};
Select.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};
Select.defaultProps = {
  name: '',
  placeholder: '',
  label: ''
};

export default Select;
