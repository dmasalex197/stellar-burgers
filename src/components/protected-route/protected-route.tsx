import { useSelector } from 'react-redux';
import { Preloader } from '@ui';
import { RootState } from '../../services/store';
import { createSelector } from '@reduxjs/toolkit';
import { Navigate } from 'react-router-dom';

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

  const isAuthenticated = true;

  if (unAuthOnly && isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  if (!unAuthOnly && !isAuthenticated) {
    return <Navigate to='/login' replace />;
  }
};
