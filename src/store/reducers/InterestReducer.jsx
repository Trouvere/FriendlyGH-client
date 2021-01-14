/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { interestApi } from '../../API/index';

const initialState = {
  allInterest: [],
  status: 'idle',
  error: null
};

const interestSlice = createSlice({
  name: 'interests',
  initialState,
  reducers: {
    setInterestStatus: (state, action) => {
      state.status = action.payload;
    },
    setInterestSuccess: (state, action) => {
      state.allInterest = action.payload.data;
      state.status = 'success';
    },
    setInterestError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.error.clientMessage;
    }
  }
});

export const {
  setInterestStatus,
  setInterestSuccess,
  setInterestError
} = interestSlice.actions;

export const requestAllInterest = () => async (dispatch) => {
  try {
    dispatch(setInterestStatus('loading'));
    const data = await interestApi.getAllInterest();
    dispatch(setInterestSuccess({ data }));
  } catch (error) {
    error.clientMessage = "Can't get all interests";
    dispatch(setInterestError({ error }));
  }
};
export const setInterestStatusToStateIdle = () => (dispatch) => {
  dispatch(setInterestStatus('idle'));
};
export default interestSlice.reducer;
