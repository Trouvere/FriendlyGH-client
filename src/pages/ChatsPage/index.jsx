import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatsPage from './ChatsPage';
import {
  requestAllChats,
  deleteChats
} from '../../store/reducers/ChatsReducer';
import { requestIdRecommendedChats } from '../../store/reducers/RecommendedChatsReducer';
import TelegramChats from './TelegramChats';
import style from './styles.module.css';
import telegramImg from '../../assets/img/icons/telegram.svg';
import skypeImg from '../../assets/img/icons/skype1.svg';
import ButtonWithImg from '../../components/ButtonWithImg';
import searchImg from '../../assets/img/icons/search.svg';
import Input from '../../components/Input';
import allChatsImg from '../../assets/img/icons/select.svg';
import plus from '../../assets/img/icons/plus.svg';
import useProfile from '../../plugins/Hooks/useProfile';
import PopUp from '../../components/PopUp';
import AddChatForm from './FormForAddChat/FormForAddChats';

const ChatsPageContainer = () => {
  const dispatch = useDispatch();

  const {
    allChats,
    idRecommendedChats,
    statusRecommendedChats,
    statusChats,
    userRole
  } = useSelector((state) => ({
    allChats: state.chatsData.allChats,
    idRecommendedChats: state.recommendData.recommendedChats,
    statusRecommendedChats: state.recommendData.status,
    statusChats: state.chatsData.status,
    userRole: state.profileData.profile.role
  }));
  const profileData = useProfile();
  useEffect(() => {
    if (statusChats === 'idle') {
      dispatch(requestAllChats());
    }
  }, [statusChats]);

  useEffect(() => {
    if (profileData.id) {
      if (statusRecommendedChats === 'idle') {
        dispatch(requestIdRecommendedChats(profileData.id));
      }
    }
  }, [profileData.id, statusRecommendedChats]);
  const onClickForDeleteChat = (chatId) => {
    dispatch(deleteChats(chatId));
  };
  const [isOpenPopUp, setIsOpenPopUp] = useState(false);
  const skypeChats = allChats.filter((el) => el.messenger === 'skype');
  const telegramChats = allChats.filter((el) => el.messenger === 'telegram');
  const [messengerChats, setMessengerChats] = useState('all Chats');
  const [search, setSearch] = useState('');

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const searchItems = (items) => {
    if (search.length === 0) {
      return items;
    }
    const searchToLowerCase = search.toLowerCase();
    return items.filter((item) => {
      return item.name.toLowerCase().indexOf(searchToLowerCase) > -1;
    });
  };
  return (
    <div>
      {isOpenPopUp && (
        <PopUp onClick={() => setIsOpenPopUp(false)}>
          <AddChatForm onSubmit={() => setIsOpenPopUp(false)} />
        </PopUp>
      )}
      <div className={style.btns}>
        <div className={style.btnWrapper}>
          <ButtonWithImg
            text="all Chats"
            img={allChatsImg}
            isActive={messengerChats === 'all Chats'}
            onClick={() => setMessengerChats('all Chats')}
          />
        </div>
        <div className={style.btnWrapper}>
          <ButtonWithImg
            text="telegram"
            img={telegramImg}
            isActive={messengerChats === 'telegram'}
            onClick={() => setMessengerChats('telegram')}
          />
        </div>
        <div className={style.btnWrapper}>
          <ButtonWithImg
            text="skype"
            img={skypeImg}
            isActive={messengerChats === 'skype'}
            onClick={() => setMessengerChats('skype')}
          />
        </div>
        <div className={style.btnWrapper}>
          {userRole === 'admin' && (
            <ButtonWithImg
              type="button"
              text="add chat"
              img={plus}
              onClick={() => {
                setIsOpenPopUp(true);
              }}
            />
          )}
        </div>
        <div className={style.wrapperSearchInput}>
          <Input
            form="oval"
            name="search"
            placeholder="Find Groups"
            onChange={onSearchChange}
            value={search}
            icon={searchImg}
            id="search"
          />
        </div>
      </div>
      {messengerChats === 'telegram' && (
        <TelegramChats
          telegramChats={searchItems(telegramChats)}
          recommendedIds={idRecommendedChats}
        />
      )}
      {messengerChats === 'skype' && (
        <ChatsPage
          skypeChats={searchItems(skypeChats)}
          recommendedIds={idRecommendedChats}
        />
      )}
      {messengerChats === 'all Chats' && (
        <ChatsPage
          skypeChats={searchItems(allChats)}
          recommendedIds={idRecommendedChats}
          userRole={userRole}
          onClickForDeleteChat={onClickForDeleteChat}
        />
      )}
    </div>
  );
};

export default ChatsPageContainer;
