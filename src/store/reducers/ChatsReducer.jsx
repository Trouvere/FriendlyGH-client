/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getChatsApi } from '../../API/index';
import { setRecommendedChatsToStateIdle } from './RecommendedChatsReducer';

const initialState = {
  allChats: [],
  status: 'idle',
  error: null
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChatsStatus: (state, action) => {
      state.status = action.payload;
    },
    setChatsSuccess: (state, action) => {
      state.allChats = action.payload.data.chatsObj;
      state.status = 'success';
    },
    setChatsError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.error.clientMessage;
    }
  }
});

export const {
  setChatsError,
  setChatsSuccess,
  setChatsStatus
} = chatsSlice.actions;

export const requestAllChats = () => async (dispatch) => {
  try {
    dispatch(setChatsStatus('loading'));
    const data = await getChatsApi.getAllChats();
    dispatch(setChatsSuccess({ data }));
  } catch (error) {
    error.clientMessage = "Can't get all chats";
    dispatch(setChatsError({ error }));
  }
};

export const setRecommendedChatsAndChatsToStateIdle = () => (dispatch) => {
  dispatch(setChatsStatus('idle'));
  dispatch(setRecommendedChatsToStateIdle());
};

export const deleteChats = (chatId) => async (dispatch) => {
  try {
    await getChatsApi.deleteChat(chatId);
    dispatch(setRecommendedChatsAndChatsToStateIdle());
  } catch (error) {
    error.clientMessage = "Can't delete chat";
    dispatch(setChatsError({ error }));
  }
};

export default chatsSlice.reducer;
