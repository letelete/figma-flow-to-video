import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '~/ui/app';

import '~/lib/i18n/config';
import '~/ui/styles.css';

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
