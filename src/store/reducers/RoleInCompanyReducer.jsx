/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { roleInCompanyApi } from '../../API';

const initialState = {
  roleInCompanyData: [],
  status: 'idle',
  error: null
};

const roleInCompanySlice = createSlice({
  name: 'roleInCompanyData',
  initialState,
  reducers: {
    setRoleInCompanyStatus: (state, action) => {
      state.status = action.payload;
    },
    setRoleInCompanySuccess: (state, action) => {
      state.roleInCompanyData = action.payload.data;
      state.status = 'success';
    },
    setRoleInCompanyError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.error.clientMessage;
    }
  }
});

export const {
  setRoleInCompanyError,
  setRoleInCompanySuccess,
  setRoleInCompanyStatus
} = roleInCompanySlice.actions;

export const setRoleInCompany = () => async (dispatch) => {
  try {
    dispatch(setRoleInCompanyStatus('loading'));
    const data = await roleInCompanyApi.getRoleInCompany();
    dispatch(setRoleInCompanySuccess({ data }));
  } catch (error) {
    error.clientMessage = "Can't get role in the company";
    dispatch(setRoleInCompanyError({ error }));
  }
};

export default roleInCompanySlice.reducer;
