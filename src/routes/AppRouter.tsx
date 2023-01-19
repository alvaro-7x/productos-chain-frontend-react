import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ProcesandoDatos } from '../components/ProcesandoDatos/ProcesandoDatos';

const RutasPublicas = lazy(() => import('./RutasPublicas').then(module => ({ default: module.RutasPublicas })));
const RutasPrivadas = lazy(() => import('./RutasPrivadas').then(module => ({ default: module.RutasPrivadas })));

export const AppRouter = () =>
{
  return (
    <HashRouter>
      <Suspense fallback={<ProcesandoDatos loading={true} />}>
        <Routes>
          <Route path="/auth/*" element={<RutasPublicas />} />
          <Route path="/wallet/*" element={<RutasPrivadas />} />

          <Route path="*" element={<Navigate to="/auth/login" />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};
