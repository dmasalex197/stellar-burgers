import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';

import { registerUser } from '../../services/thunk/user';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError('');
    const resultActionRegister = await dispatch(
      registerUser({ name: userName, password, email })
    );
    if (registerUser.fulfilled.match(resultActionRegister)) {
      navigate('/');
    } else if (registerUser.rejected.match(resultActionRegister)) {
      setError('Что-то пошло не так');
    }
  };

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
