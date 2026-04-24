import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import Home from '../pages/Home';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/category',
    element: <Home />,
  },
  {
    path: '/wishlist',
    element: <Home />,
  },
  {
    path: '/cart',
    element: <Home />,
  },
  {
    path: '/profile',
    element: <Home />,
  },
  {
    path: '*',
    element: <Home />,
  },
];

const router = createBrowserRouter(routes);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
