/* eslint-disable prettier/prettier */
import React from 'react';
import Contact from './Contact';
import style from './styles.module.css';

const Contacts = ({ contacts }) => {
  let contactsName = [];
  if (contacts) {
    contactsName = Object.keys(contacts);
  }
  const contactBlock = contactsName.map((el) => {
    if (contacts[el]) {
      return <Contact name={el} contact={contacts[el]} key={el} />;
    }
    return '';
  });
  return (
    <div className={style.contactsBlock}>
      <h3>Contacts</h3>
      {contacts ? (
        <div className={style.contacts}>{contactBlock}</div>
      ) : (
        <p className={style.infoTextContact}>
          Contacts not Set! Please go to edit Profile
        </p>
      )}
    </div>
  );
};

export default Contacts;
