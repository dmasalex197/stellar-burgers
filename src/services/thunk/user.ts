import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserApi, loginUserApi } from '@api';

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const data = await getUserApi();
  return data.user;
});

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData: { email: string; password: string }) =>
    await loginUserApi(loginData)
);
