import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HealthContainer } from '../../../health/infrastructure/ui/Health';
import { LandingContainer } from '../../../landing/infrastructure/ui/Landing';
import { Routes as AppRoutes } from './routes';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Home} element={<LandingContainer />} />
        <Route path={AppRoutes.Health} element={<HealthContainer />} />
      </Routes>
    </BrowserRouter>
  );
}
