import React from 'react';
import PropTypes from 'prop-types';
import ChatsPoint from '../../components/ChatsPoint';
import style from './styles.module.css';

const ChatsPage = ({
  skypeChats,
  recommendedIds,
  userRole,
  onClickForDeleteChat
}) => {
  const allChatsPoint = skypeChats.map((el) => {
    return (
      <ChatsPoint
        nameChat={el.name}
        linkChat={el.link}
        key={el.id}
        chatId={el.id}
        recommended={recommendedIds.some((id) => id === el.id)}
        isDeleteButtonVisible={userRole === 'admin'}
        onClickForDeleteChat={onClickForDeleteChat}
      />
    );
  });
  allChatsPoint.sort(
    (prev, next) => next.props.recommended - prev.props.recommended
  );
  return (
    <div className={style.groupsPage}>
      <div className={style.chatsBlock}>{allChatsPoint}</div>
    </div>
  );
};

export default ChatsPage;

ChatsPage.propTypes = {
  skypeChats: PropTypes.arrayOf(PropTypes.object).isRequired,
  recommendedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  userRole: PropTypes.string,
  onClickForDeleteChat: PropTypes.func
};

ChatsPage.defaultProps = {
  userRole: '',
  onClickForDeleteChat: () => {}
};
