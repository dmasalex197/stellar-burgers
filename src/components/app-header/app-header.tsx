import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { selectUser } from '../../services/slices/authSlice';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useSelector(selectUser);
  const userName = user ? user.name : '';

  return <AppHeaderUI userName={userName} />;
};
