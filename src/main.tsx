import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/index.css'; 
import './styles/animations.css';
import './styles/home.css'; // 
import 'react-toastify/dist/ReactToastify.css';

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
