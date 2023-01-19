import { Navigate, Route, Routes } from 'react-router-dom';
import { Auth } from '../pages/Auth/Auth';
import { RootState, useAppSelector } from '../store/store';

export const RutasPublicas = () =>
{
  const auth = useAppSelector((state: RootState) => state.auth);
  const token = localStorage.getItem('token');

  if (auth.cuenta && auth.estado === 'Conectado.' && token)
  {
    return (<Navigate to='/wallet' />);
  }

  return (
    <Routes>
      <Route path="login" element={<Auth />} />

      <Route path="*" element={<Navigate to="login" replace/>} />
    </Routes>
  );
};
