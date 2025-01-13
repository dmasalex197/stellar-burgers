import { useSelector } from 'react-redux';
import { Preloader } from '@ui';
import { RootState } from '../../services/store';
import { createSelector } from '@reduxjs/toolkit';
import { Navigate, Route } from 'react-router-dom';

export const selectAuthState = (state: RootState) => state.auth;

export const selectIsAuthChecked = createSelector(
  [selectAuthState],
  (authState) => authState.isAuthChecked
);

type ProtectedRouteProps = {
  children: React.ReactElement;
  unAuthOnly?: boolean;
};

export const ProtectedRoute = ({
  children,
  unAuthOnly = false
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  const isAuthenticated = false;

  if (unAuthOnly) {
    return isAuthenticated ? (
      <Navigate to='/login' replace />
    ) : (
      <Route>{children}</Route>
    );
  }

  if (!unAuthOnly) {
    return isAuthenticated ? (
      <Route>{children}</Route>
    ) : (
      <Navigate to='/profile' replace />
    );
  }
  return null;
};
