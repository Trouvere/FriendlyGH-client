/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import style from './styles.module.css';

const ChatsPoint = ({
  nameChat,
  linkChat,
  recommended,
  isDeleteButtonVisible,
  onClickForDeleteChat,
  chatId
}) => {
  return (
    <div className={style.chatsPoint}>
      <h4 className={style.nameChat}>{nameChat}</h4>
      <a
        href={linkChat}
        className={recommended ? style.linkChatRecommended : style.linkChat}
      >
        {linkChat}
      </a>
      {isDeleteButtonVisible && (
        <button
          className={style.delete}
          onClick={() => onClickForDeleteChat(chatId)}
          type="button"
        />
      )}
    </div>
  );
};

ChatsPoint.propTypes = {
  recommended: PropTypes.bool,
  linkChat: PropTypes.string.isRequired,
  nameChat: PropTypes.string.isRequired,
  isDeleteButtonVisible: PropTypes.bool,
  onClickForDeleteChat: PropTypes.func,
  chatId: PropTypes.string
};

ChatsPoint.defaultProps = {
  recommended: false,
  isDeleteButtonVisible: false,
  chatId: '',
  onClickForDeleteChat: () => {}
};
export default ChatsPoint;
