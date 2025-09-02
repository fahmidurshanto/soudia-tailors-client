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
  once: false, // Allow animations to re-trigger
  mirror: true, // Re-animate elements when scrolling back
  offset: 50, // Trigger animations earlier
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
