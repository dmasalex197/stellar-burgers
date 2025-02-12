import {
  ingredientsReducer,
  IngredientsState,
  initialState
} from '../slices/ingredientsSlice';
import { fetchIngredients } from '../thunk/ingredients';

const testData = [
  {
    _id: '1',
    name: 'Ingredient 1',
    type: 'type1',
    proteins: 10,
    fat: 1,
    carbohydrates: 20,
    calories: 420,
    price: 1000,
    image: 'image1',
    image_mobile: 'mobile1',
    image_large: 'large1'
  }
];

describe('ingredientsSlice', () => {
  it('true, когда ожидание отправлено сбрасывает ошибку', () => {
    const actualState = ingredientsReducer(
      {
        ...initialState
      },
      fetchIngredients.pending('')
    );

    expect(actualState).toEqual({
      ingredients: [],
      loading: true,
      error: null
    });
  });

  it('данные записываются в store и store.isLoading меняется на false', () => {
    const actualState = ingredientsReducer(
      {
        ...initialState,
        loading: true
      },
      fetchIngredients.fulfilled(testData, '')
    );

    expect(actualState).toEqual({
      ingredients: testData,
      loading: false,
      error: null
    });
  });

  it('запись ошибки в store и store.isLoading меняется на false.', () => {
    const testError = new Error('Error Test');
    const expectedState: IngredientsState = {
      ingredients: [],
      loading: false,
      error: testError.message
    };

    const actualState = ingredientsReducer(
      {
        ...initialState,
        loading: true
      },
      fetchIngredients.rejected(testError, '')
    );

    expect(actualState).toMatchObject(expectedState);
  });
});
