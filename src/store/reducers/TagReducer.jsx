/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { tagApi } from '../../API/index';

const initialState = {
  allTag: [],
  status: 'idle',
  error: null
};

const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTagStatus: (state, action) => {
      state.status = action.payload;
    },
    setTagSuccess: (state, action) => {
      state.allTag = action.payload.data;
      state.status = 'success';
    },
    setTagError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.error.clientMessage;
    }
  }
});

export const { setTagStatus, setTagSuccess, setTagError } = tagSlice.actions;

export const requestAllTag = () => async (dispatch) => {
  try {
    dispatch(setTagStatus('loading'));
    const data = await tagApi.getAllTags();
    dispatch(setTagSuccess({ data }));
  } catch (error) {
    error.clientMessage = "Can't get all Tags";
    dispatch(setTagError({ error }));
  }
};
export default tagSlice.reducer;
