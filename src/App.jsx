import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Measurement from './pages/Measurement';
import Contact from './pages/Contact';
import Order from './pages/Order';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/measurement', element: <Measurement /> },
      { path: '/contact', element: <Contact /> },
      { path: '/order', element: <Order /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;