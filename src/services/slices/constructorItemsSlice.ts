import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { CONSTRUCTOR_ITEMS_SLICE_NAME } from './sliceNames';

interface ConstructorItemsState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  loading: boolean;
}

const initialState: ConstructorItemsState = {
  bun: null,
  ingredients: [],
  loading: false
};

export const constructorItemsSlice = createSlice({
  name: CONSTRUCTOR_ITEMS_SLICE_NAME,
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    moveIngredientUp(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index > 0 && index < state.ingredients.length) {
        const temp = state.ingredients[index];
        state.ingredients[index] = state.ingredients[index - 1];
        state.ingredients[index - 1] = temp;
      }
    },
    moveIngredientDown(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index >= 0 && index < state.ingredients.length - 1) {
        const temp = state.ingredients[index];
        state.ingredients[index] = state.ingredients[index + 1];
        state.ingredients[index + 1] = temp;
      }
    },
    removeIngredient(state, action: PayloadAction<number>) {
      const index = action.payload;
      state.ingredients = [
        ...state.ingredients.slice(0, index),
        ...state.ingredients.slice(index + 1)
      ];
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    }
  }
});

export const {
  addIngredient,
  moveIngredientUp,
  moveIngredientDown,
  removeIngredient,
  clearConstructor,
  setLoading
} = constructorItemsSlice.actions;

export const constructorItemsReducer = constructorItemsSlice.reducer;
