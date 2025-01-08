import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () =>
    // const data = await getIngredientsApi();
    await getIngredientsApi()
);
