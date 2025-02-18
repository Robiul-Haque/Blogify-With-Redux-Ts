import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import router from './route/route.tsx';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store.ts';
import { Toaster } from 'sonner';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <PersistGate loading={null} persistor={persistor} />
      <Toaster richColors />
    </Provider>
  </StrictMode>,
)
