/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getChatsApi } from '../../API/index';

const initialState = {
  recommendedChats: [],
  status: 'idle',
  error: null
};

const recommendedChatsSlice = createSlice({
  name: 'recommendedChats',
  initialState,
  reducers: {
    setRecommendedChatsStatus: (state, action) => {
      state.status = action.payload;
    },
    setRecommendedChatsSuccess: (state, action) => {
      state.recommendedChats = action.payload.data.recommendedChats;
      state.status = 'success';
    },
    setRecommendedChatsError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.error;
    }
  }
});

export const {
  setRecommendedChatsStatus,
  setRecommendedChatsSuccess,
  setRecommendedChatsError
} = recommendedChatsSlice.actions;

export const requestIdRecommendedChats = (userId) => async (dispatch) => {
  try {
    dispatch(setRecommendedChatsStatus('loading'));
    const data = await getChatsApi.getIdRecommendedChats(userId);
    dispatch(setRecommendedChatsSuccess({ data }));
  } catch (error) {
    error.clientMessage = "Can't get recommended chats";
    dispatch(setRecommendedChatsError({ error }));
  }
};
export const setRecommendedChatsToStateIdle = () => (dispatch) => {
  dispatch(setRecommendedChatsStatus('idle'));
};
export default recommendedChatsSlice.reducer;
