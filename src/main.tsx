import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './shared/infrastructure/ui/App';
import './shared/infrastructure/ui/globals.css';
import './shared/infrastructure/i18n/i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
