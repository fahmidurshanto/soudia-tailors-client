import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import router from './Routes/Routes';
import { RouterProvider } from 'react-router-dom';
import 'animate.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { store } from './app/store';
import { Provider } from 'react-redux';

AOS.init({
  duration: 1000,
  once: true,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
