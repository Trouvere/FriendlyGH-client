/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../API';

const initialState = {
  allUsers: [],
  status: 'idle',
  error: null
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersStatus: (state, action) => {
      state.status = action.payload;
    },
    setUsersSuccess: (state, action) => {
      state.allUsers = action.payload.data;
      state.status = 'success';
    },
    setUsersError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.error.clientMessage;
    }
  }
});

export const {
  setUsersStatus,
  setUsersSuccess,
  setUsersError
} = usersSlice.actions;

export const requestAllUser = () => async (dispatch) => {
  try {
    dispatch(setUsersStatus('loading'));
    const data = await userApi.getAllUser();
    dispatch(setUsersSuccess({ data }));
  } catch (error) {
    error.clientMessage = "Can't get user profile";
    dispatch(setUsersError({ error }));
  }
};

export default usersSlice.reducer;
