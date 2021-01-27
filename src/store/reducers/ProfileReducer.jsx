/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../API';
import { setUsersStatus } from './UsersReducer';
import { setRecommendedChatsStatus } from './RecommendedChatsReducer';

const initialState = {
  profile: {
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

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileStatus: (state, action) => {
      state.status = action.payload;
    },
    setProfileSuccess: (state, action) => {
      state.profile = action.payload.data;
      state.status = 'success';
    },
    setProfileError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.error.clientMessage;
    }
  }
});

export const {
  setProfileStatus,
  setProfileSuccess,
  setProfileError
} = profileSlice.actions;

export const setMe = () => async (dispatch) => {
  try {
    dispatch(setProfileStatus('loading'));
    const data = await userApi.getMe();
    dispatch(setProfileSuccess({ data }));
  } catch (error) {
    error.clientMessage = "Can't get user profile";
    dispatch(setProfileError({ error }));
  }
};
export const refreshInformation = () => async (dispatch) => {
  dispatch(setProfileStatus('idle'));
  dispatch(setUsersStatus('idle'));
  dispatch(setRecommendedChatsStatus('idle'));
};

export default profileSlice.reducer;
