/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { locationApi } from '../../API/index';

const initialState = {
  geolocation: null,
  status: 'idle',
  error: null
};

const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState,
  reducers: {
    setGeolocationsStatus: (state, action) => {
      state.status = action.payload;
    },
    setGeolocationsSuccess: (state, action) => {
      state.geolocation = action.payload.data;
      state.status = 'success';
    },
    setGeolocationsError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.error.clientMessage;
    }
  }
});

export const {
  setGeolocationsStatus,
  setGeolocationsSuccess,
  setGeolocationsError
} = geolocationSlice.actions;

export const requestGeolocation = () => async (dispatch) => {
  try {
    dispatch(setGeolocationsStatus('loading'));
    const data = await locationApi.getLocationUser();
    dispatch(setGeolocationsSuccess({ data }));
  } catch (error) {
    error.clientMessage = "Can't get geolocation";
    dispatch(setGeolocationsError({ error }));
  }
};
export default geolocationSlice.reducer;
