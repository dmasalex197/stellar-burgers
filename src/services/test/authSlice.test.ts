import { fetchUser, loginUser, logoutUser } from '../thunk/user';
import { authInitialState, authReducer } from '../slices/authSlice';

describe('authSlice', () => {
  const testUser = { email: 'dmasalex197@yandex.ru', name: 'dmasalex' };
  const loginData = { email: 'dmasalex197@yandex.ru', password: '132231' };

  it('loginUser.pending loading становится true', () => {
    const action = { type: loginUser.pending.type, payload: undefined };
    const actualState = authReducer(authInitialState, action);
    expect(actualState.loading).toBe(true);
  });

  it('loginUser.fulfilled isAuthenticated становится true и loading false, user получает данные пользователя', () => {
    expect(
      authReducer(authInitialState, {
        type: 'user/logoutThunk/fulfilled'
      })
    ).toEqual({
      ...authInitialState,
      user: null
    });
  });

  it('loginUser.rejected isAuthenticated становится false, loading false, user null', () => {
    const error = new Error('Ошибка авторизации');
    const action = loginUser.rejected(error, 'requestId', loginData);

    const actualState = authReducer(authInitialState, action);

    expect(actualState.isAuthenticated).toBe(false);
    expect(actualState.loading).toBe(false);
    expect(actualState.user).toBeNull();
  });

  it('fetchUser.pending loading становится true', () => {
    const action = fetchUser.pending('requestId');
    const actualState = authReducer(authInitialState, action);

    expect(actualState.loading).toBe(true);
  });

  it('fetchUser.fulfilled isAuthenticated становится true, loading false, user получает данные пользователя', () => {
    const action = fetchUser.fulfilled(testUser, 'requestId');
    const actualState = authReducer(authInitialState, action);

    expect(actualState.isAuthenticated).toBe(true);
    expect(actualState.loading).toBe(false);
    expect(actualState.user).toEqual(testUser);
  });

  it('fetchUser.rejected isAuthenticated становится false, loading false', () => {
    const action = fetchUser.rejected(new Error('Ошибка'), 'requestId');
    const actualState = authReducer(authInitialState, action);

    expect(actualState.isAuthenticated).toBe(false);
    expect(actualState.loading).toBe(false);
  });

  it('logoutUser.fulfilled isAuthenticated становится false, user null, loading false', () => {
    const errorMessage = 'Ошибка при выходе из системы.';
    expect(
      authReducer(authInitialState, {
        type: 'user/logoutThunk/rejected',
        error: { message: errorMessage }
      })
    ).toEqual({
      ...authInitialState
    });
  });

  it('logoutUser.rejected loading становится false', () => {
    const action = logoutUser.rejected(null, 'Ошибка при выходе пользователя');
    const actualState = authReducer(authInitialState, action);

    expect(actualState.loading).toBe(false);
  });
});
