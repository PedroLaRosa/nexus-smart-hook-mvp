import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HealthContainer } from '../../../health/infrastructure/ui/Health';
import { LadingContainer } from '../../../landing/infrastructure/ui/Lading';
import { Routes as AppRoutes } from './routes';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Home} element={<LadingContainer />} />
        <Route path={AppRoutes.Health} element={<HealthContainer />} />
      </Routes>
    </BrowserRouter>
  );
}
