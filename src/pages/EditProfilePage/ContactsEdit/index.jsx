/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Contact from './Contact';
import style from './styles.module.css';

const ContactsEditPage = ({ ...props }) => {
  const initContact = {
    linkedIn: '',
    phone: '',
    skype: '',
    telegram: ''
  };
  const contactName = Object.keys(initContact);
  const contactsPoints = contactName.map((el) => (
    <Contact name={el} {...props} key={el} />
  ));

  return (
    <div className={style.contactsBlock}>
      <h3>Contacts</h3>
      <div className={style.contacts}>{contactsPoints}</div>
    </div>
  );
};
export default ContactsEditPage;

ContactsEditPage.propTypes = {
  contacts: PropTypes.PropTypes.shape({
    telegram: PropTypes.string,
    phone: PropTypes.string,
    skype: PropTypes.string,
    linkedIn: PropTypes.string
  }).isRequired
};
