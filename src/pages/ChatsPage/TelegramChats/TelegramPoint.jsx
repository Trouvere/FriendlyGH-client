import React from 'react';
import classnames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import style from './styles.module.css';
import TelegramWidget from './Widget';
import starImg from '../../../assets/img/icons/star.svg';

const TelegramPoint = ({
  widgetLink,
  widgetId,
  onClick,
  nameChat,
  currentChatId,
  recommended
}) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1000px)'
  });
  const linkSmallWidget = widgetLink
    .substr(0, 28)
    .concat('count/')
    .concat(widgetLink.substr(28));
  const linkMediumWidget = widgetLink
    .substr(0, 28)
    .concat('count-with-pics/')
    .concat(widgetLink.substr(28));
  return (
    <div className={style.chatPoint} key={widgetId}>
      <button
        type="button"
        onClick={onClick}
        className={classnames({
          [style.telegramPointBtn]: true,
          [style.activeChatPoint]: widgetId === currentChatId
        })}
      >
        {recommended && (
          <img className={style.recommendedImg} src={starImg} alt="starImg" />
        )}
        {nameChat}
      </button>
      {isDesktopOrLaptop && (
        <TelegramWidget
          linkChats={linkSmallWidget}
          idChats={currentChatId}
          typeWidget="smallWidget"
        />
      )}
      {!isDesktopOrLaptop && (
        <TelegramWidget
          linkChats={linkMediumWidget}
          idChats={currentChatId}
          typeWidget="mediumWidget"
        />
      )}
    </div>
  );
};

export default TelegramPoint;

TelegramPoint.propTypes = {
  widgetLink: PropTypes.string.isRequired,
  widgetId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  nameChat: PropTypes.string.isRequired,
  currentChatId: PropTypes.string.isRequired,
  recommended: PropTypes.bool.isRequired
};
