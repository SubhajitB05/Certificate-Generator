
import { createSlice } from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';

const token = localStorage.getItem('token');
const decodedToken = token ? jwtDecode(token) : null;

const initialState = {
  isAuthenticated: !!token,
  user: decodedToken ? { id: decodedToken._id, role: decodedToken.role } : null,
  token: token || null,
  role: decodedToken ? decodedToken.role : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
      localStorage.setItem('token', action.payload.token);
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem('token');
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
