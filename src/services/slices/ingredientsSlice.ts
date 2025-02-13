import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from '../store';
import { INGREDIENTS_SLICE_NAME } from './sliceNames';
import { fetchIngredients } from '../thunk/ingredients';

export const selectIngredients = (state: RootState): TIngredient[] =>
  state.ingredients.ingredients;

export interface IngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | Error | null;
  // modal: {
  //   isOpen: boolean;
  //   ingredient: TIngredient | null;
  // };
}

export const initialState: IngredientsState = {
  ingredients: [],
  loading: false,
  error: null
  // modal: {
  //   isOpen: false,
  //   ingredient: null
  // }
};

const ingredientsSlice = createSlice({
  name: INGREDIENTS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.ingredients = action.payload;
        }
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Не удалось получить ингредиенты';
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
