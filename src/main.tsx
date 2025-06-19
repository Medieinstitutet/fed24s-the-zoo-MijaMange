import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // ✅ se till att denna fil finns (eller byt till './styles/index.css' om den ligger där)
import './styles/animations.css'; // ✅ fade-in m.m.
import 'react-toastify/dist/ReactToastify.css'; // ✅ toast-popup

import { RouterProvider } from 'react-router-dom';
import router from './router/Router';
import { AnimalProvider } from './context/AnimalContext';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AnimalProvider>
      <ToastContainer position="top-center" autoClose={2000} />
      <RouterProvider router={router} />
    </AnimalProvider>
  </React.StrictMode>
);
