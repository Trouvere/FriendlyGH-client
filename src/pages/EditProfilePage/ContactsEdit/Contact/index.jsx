import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import style from './styles.module.css';
import { InputForFormik } from '../../../../components/ForFormik';

const Contact = ({ name }) => {
  if (name === 'id') {
    return '';
  }
  return (
    <div className={style.contact}>
      <span className={classnames(style.styleBeforeIcon, name)} />
      <InputForFormik
        name={name}
        placeholder={name}
        label={name}
        colorLabel="white"
      />
    </div>
  );
};

Contact.propTypes = {
  name: PropTypes.string
};
Contact.defaultProps = {
  name: ''
};

export default Contact;
