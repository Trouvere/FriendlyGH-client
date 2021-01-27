import React from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ErrorMessage from '../ErrorMessage';
import styles from './styles.module.css';

export const InputForFormik = ({
  placeholder,
  colorLabel,
  label,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.wrapper}>
      {label && (
        <label
          htmlFor={label}
          className={classnames({
            [styles.white]: colorLabel === 'white',
            [styles.black]: colorLabel === 'black'
          })}
        >
          {label}
        </label>
      )}
      <input className={styles.input} placeholder={placeholder} {...field} />
      {meta.touched && meta.error ? (
        <ErrorMessage className="error">{meta.error}</ErrorMessage>
      ) : null}
    </div>
  );
};
export const TextareaForFormik = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.wrapper}>
      {label && <label htmlFor={label}>{label}</label>}
      <textarea className={styles.textarea} {...field} />
      {meta.touched && meta.error ? (
        <ErrorMessage className="error">{meta.error}</ErrorMessage>
      ) : null}
    </div>
  );
};

export const SelectForFormik = ({ options, label, ...props }) => {
  const optionsPoint = options.map((el) => {
    return (
      <option key={el.name} value={el.id === undefined ? el.name : el.id}>
        {el.name}
      </option>
    );
  });
  const [field] = useField(props);
  return (
    <div className={styles.wrapper}>
      {label && <label htmlFor={label}>{label}</label>}
      <select className={styles.input} {...field}>
        <option value="">Change</option>
        {optionsPoint}
      </select>
    </div>
  );
};

export const CheckboxForFormik = ({ id, interest, ...props }) => {
  const [field] = useField(props);
  return (
    <label
      className={
        field.value.some((idI) => idI === id)
          ? styles.activeCheckboxBlock
          : styles.checkboxBlock
      }
    >
      <input
        className={styles.checkbox}
        type="checkbox"
        {...field}
        {...props}
        checked={field.value.some((idI) => idI === id)}
      />
      <p>{interest.name}</p>
    </label>
  );
};

export const RadioForFormik = ({ children, ...props }) => {
  const [field] = useField(props);
  return (
    <label className={styles.radio}>
      <input {...field} {...props} />
      {children}
    </label>
  );
};

InputForFormik.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  colorLabel: PropTypes.oneOf(['white', 'black'])
};
InputForFormik.defaultProps = {
  placeholder: '',
  label: '',
  colorLabel: 'white'
};

TextareaForFormik.propTypes = {
  label: PropTypes.string
};
TextareaForFormik.defaultProps = {
  label: ''
};

SelectForFormik.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired
};
SelectForFormik.defaultProps = {
  label: ''
};

CheckboxForFormik.propTypes = {
  id: PropTypes.string.isRequired,
  interest: PropTypes.PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    tag: PropTypes.string
  }).isRequired
};

RadioForFormik.propTypes = {
  children: PropTypes.node.isRequired
};
