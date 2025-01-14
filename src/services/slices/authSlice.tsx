import { createSlice } from '@reduxjs/toolkit';

import { TUser } from '@utils-types';
import { RootState } from '../store';
import { deleteCookie, setCookie } from '../../utils/cookie';
import {
  fetchUser,
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUser
} from '../thunk/user';
import { AUTH_SLICE_NAME } from './sliceNames';

interface AuthState {
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  user: TUser | null;
  loading: boolean;
}

const authInitialState: AuthState = {
  isAuthenticated: false,
  isAuthChecked: false,
  user: null,
  loading: false
};

export const selectAuthState = (state: RootState) => state.auth;
export const selectUser = (state: RootState): TUser | null => state.auth.user;

const authSlice = createSlice({
  name: AUTH_SLICE_NAME,
  initialState: authInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        setCookie('userData', JSON.stringify(action.payload.user));
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.user = null;
      })

      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.isAuthChecked = true;
      })

      .addCase(updateUser.pending, (state) => {
        state.isAuthenticated = true;
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.loading = false;
        setCookie('userData', JSON.stringify(action.payload.user));
      })
      .addCase(updateUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.loading = false;
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.loading = false;
        setCookie('accessToken', action.payload.accessToken);
        setCookie('userData', JSON.stringify(action.payload.user));
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(registerUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.user = null;
        state.loading = false;
      })

      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.loading = false;
      })

      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.isAuthChecked = false;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.loading = false;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
        deleteCookie('accessToken');
        deleteCookie('userData');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        console.error('Ошибка выхода:', action.error);
        state.loading = false;
      });
  }
});

export const authReducer = authSlice.reducer;
