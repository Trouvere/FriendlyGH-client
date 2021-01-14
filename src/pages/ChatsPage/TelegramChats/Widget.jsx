/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import PropTypes from 'prop-types';
import style from './styles.module.css';

const TelegramWidget = ({ linkChats, idChats, typeWidget }) => {
  return (
    <div>
      {typeWidget === 'windowWidget' && (
        <iframe
          id={idChats}
          frameBorder="0"
          scrolling="no"
          horizontalscrolling="no"
          verticalscrolling="no"
          async
          className={style.telegram}
          src={linkChats}
        />
      )}
      {typeWidget === 'smallWidget' && (
        <iframe
          src={linkChats}
          frameBorder="0"
          scrolling="no"
          horizontalscrolling="no"
          verticalscrolling="no"
          className={style.smallWidget}
          async
        />
      )}
      {typeWidget === 'mediumWidget' && (
        <iframe
          src={linkChats}
          frameBorder="0"
          scrolling="no"
          horizontalscrolling="no"
          verticalscrolling="no"
          className={style.mediumWidget}
          async
        />
      )}
    </div>
  );
};

export default TelegramWidget;

TelegramWidget.propTypes = {
  linkChats: PropTypes.string.isRequired,
  idChats: PropTypes.string.isRequired,
  typeWidget: PropTypes.string.isRequired
};
