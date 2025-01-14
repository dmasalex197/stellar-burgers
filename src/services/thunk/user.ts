import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchWithRefresh,
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TAuthResponse,
  TLoginData,
  TRefreshResponse,
  TRegisterData,
  TUserResponse,
  updateUserApi
} from '@api';

export const fetchWithRefreshThunk = createAsyncThunk<
  TRefreshResponse,
  { url: string; options: RequestInit }
>(
  'api/fetchWithRefresh',
  async ({ url, options }, {}) =>
    await fetchWithRefresh<TRefreshResponse>(url, options)
);

export const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  'auth/loginUser',
  async (body) => await loginUserApi(body)
);

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const data = await getUserApi();
  return data.user;
});

export const updateUser = createAsyncThunk<TUserResponse, TRegisterData>(
  'auth/fetchNewDateUser',
  async (body) => await updateUserApi(body)
);

export const registerUser = createAsyncThunk<TAuthResponse, TRegisterData>(
  'auth/registerUser',
  async (body) => await registerUserApi(body)
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (args: { email: string }) => {
    const { email } = args;
    return await forgotPasswordApi({ email });
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (args: { password: string; token: string }) => {
    const { password, token } = args;
    return await resetPasswordApi({ password, token });
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('Требуется токен');
  }
  await logoutApi();
  return true;
});
