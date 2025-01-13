import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { RootState } from '../store';
import {
  fetchUser,
  fetchWithRefreshThunk,
  loginUser,
  logoutUser,
  registerUser
} from '../thunk/user';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const selectAuthState = (state: RootState) => state.auth;
export const selectUser = (state: RootState): TUser | null => state.auth.user;

interface AuthState {
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  user: TUser | null;
}

const authInitialState: AuthState = {
  isAuthenticated: false,
  isAuthChecked: false,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setAuth(state, action: PayloadAction<AuthState>) {
      return { ...state, ...action.payload };
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    setUser(state, action: PayloadAction<TUser | null>) {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        setCookie('refreshToken', action.payload.refreshToken);
        setCookie('userData', JSON.stringify(action.payload.user));
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        deleteCookie('userData');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        console.error('Ошибка выхода:', action.error);
      })
      .addCase(fetchWithRefreshThunk.fulfilled, (state, action) => {
        console.log('Fetch with refresh successful:', action.payload);
      })
      .addCase(fetchWithRefreshThunk.rejected, (state, action) => {
        console.error('Ошибка запроса с обновлением токена:', action.error);
      });
  }
});

export const { setAuth, logout, setUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
