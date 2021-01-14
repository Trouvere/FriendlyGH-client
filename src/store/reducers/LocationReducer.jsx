/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { locationApi } from '../../API/index';

const initialState = {
  allLocations: [],
  status: 'idle',
  error: null
};

const locationSlice = createSlice({
  name: 'locationData',
  initialState,
  reducers: {
    setLocationStatus: (state, action) => {
      state.status = action.payload;
    },
    setLocationSuccess: (state, action) => {
      state.allLocations = action.payload.data;
      state.status = 'success';
    },
    setLocationError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.error.clientMessage;
    }
  }
});

export const {
  setLocationStatus,
  setLocationSuccess,
  setLocationError
} = locationSlice.actions;

export const setLocation = () => async (dispatch) => {
  try {
    dispatch(setLocationStatus('loading'));
    const data = await locationApi.getAllLocationsForUser();
    dispatch(setLocationSuccess({ data }));
  } catch (error) {
    error.clientMessage = "Can't get all locations";
    dispatch(setLocationError({ error }));
  }
};
export default locationSlice.reducer;
