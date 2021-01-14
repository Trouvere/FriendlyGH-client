import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import style from './styles.module.css';

const Contact = ({ name, contact }) => {
  if (name === 'id' || contact === null) {
    return '';
  }
  return (
    <div className={style.contact}>
      <span className={classnames(style.styleBeforeIcon, name)} />
      <a href={contact} className={style.contactItem}>
        {contact}
      </a>
    </div>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  contact: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default Contact;
