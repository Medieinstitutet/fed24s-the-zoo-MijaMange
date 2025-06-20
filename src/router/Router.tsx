import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import AnimalList from '../pages/AnimalList';
import AnimalDetail from '../pages/AnimalDetail';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },               // ← Ändrat här!
      { path: 'animals', element: <AnimalList /> },
      { path: 'animals/:id', element: <AnimalDetail /> },
      { path: '*', element: <NotFound /> }
    ]
    
  }
]);

export default router;
