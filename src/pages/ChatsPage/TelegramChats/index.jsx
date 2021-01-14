import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import TelegramWidget from './Widget';
import style from './styles.module.css';
import TelegramPoint from './TelegramPoint';

const TelegramChats = ({ telegramChats, recommendedIds }) => {
  const [currentChatId, setCurrentChatId] = useState(telegramChats[0]?.id);
  const [currentChatLink, setCurrentChatLink] = useState(
    telegramChats[0]?.link
  );
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1000px)'
  });
  const telegramChatsPoint = telegramChats.map((el) => {
    return (
      <TelegramPoint
        key={el.id}
        widgetLink={el.link}
        widgetId={el.id}
        nameChat={el.name}
        currentChatId={currentChatId}
        recommended={recommendedIds.some((id) => id === el.id)}
        onClick={() => {
          setCurrentChatLink(el.link);
          setCurrentChatId(el.id);
        }}
      />
    );
  });
  telegramChatsPoint.sort(
    (prev, next) => next.props.recommended - prev.props.recommended
  );
  return (
    <div className={style.telegramChats}>
      <div className={style.telegramPoints}>{telegramChatsPoint}</div>
      <div className={style.telegramRightBlock}>
        {isDesktopOrLaptop && (
          <TelegramWidget
            linkChats={currentChatLink}
            idChats={currentChatId}
            typeWidget="windowWidget"
          />
        )}
      </div>
    </div>
  );
};

export default TelegramChats;

TelegramChats.propTypes = {
  telegramChats: PropTypes.arrayOf(PropTypes.object).isRequired,
  recommendedIds: PropTypes.arrayOf(PropTypes.string).isRequired
};
