/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../API';

const initialState = {
  userProfile: {
    id: '',
    firstName: '',
    lastName: '',
    roleInCompany: '',
    photo: '',
    contacts: {
      id: '',
      linkedIn: '',
      phone: '',
      skype: '',
      telegram: ''
    },
    aboutMe: '',
    interests: []
  },
  status: 'idle',
  error: null
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserProfileStatus: (state, action) => {
      state.status = action.payload;
    },
    setUserProfileSuccess: (state, action) => {
      state.userProfile = action.payload.data;
      state.status = 'success';
    },
    setUserProfileError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.error.clientMessage;
    }
  }
});

export const {
  setUserProfileStatus,
  setUserProfileSuccess,
  setUserProfileError
} = userProfileSlice.actions;

export const getUserProfile = (userId) => async (dispatch) => {
  try {
    dispatch(setUserProfileStatus('loading'));
    const data = await userApi.getUser(userId);
    dispatch(setUserProfileSuccess({ data }));
  } catch (error) {
    error.clientMessage = "Can't get user profile";
    dispatch(setUserProfileError({ error }));
  }
};

export default userProfileSlice.reducer;
