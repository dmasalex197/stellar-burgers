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
  TRegisterData
} from '@api';
import { TUser } from '@utils-types';

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const data = await getUserApi();
  return data.user;
});

export const loginUser = createAsyncThunk<TUser, TLoginData>(
  'auth/loginUser',
  async (loginData) => {
    const data = await loginUserApi(loginData);
    return data.user;
  }
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

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      return true;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchWithRefreshThunk = createAsyncThunk<
  TRefreshResponse,
  { url: string; options: RequestInit }
>('api/fetchWithRefresh', async ({ url, options }, { rejectWithValue }) => {
  try {
    return await fetchWithRefresh<TRefreshResponse>(url, options);
  } catch (err) {
    return rejectWithValue(err);
  }
});
