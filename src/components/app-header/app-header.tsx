import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { selectUser } from '../../services/slices/authSlice';

export const AppHeader: FC = () => {
  const user = useSelector(selectUser);
  const userName = user ? user.name : '';

  return <AppHeaderUI userName={userName} />;
};
