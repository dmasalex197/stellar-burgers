import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';

import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/thunk/user';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError('');

    const resultActionLogin = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultActionLogin)) {
      navigate('/');
    } else if (loginUser.rejected.match(resultActionLogin)) {
      setError('Неправильный логин или пароль');
    }
  };

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
