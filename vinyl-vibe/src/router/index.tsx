import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import Home from '../pages/Home';
import Category from '../pages/Category';
import Wishlist from '../pages/Wishlist';
import Cart from '../pages/Cart';
import Profile from '../pages/Profile';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/category',
    element: <Category />,
  },
  {
    path: '/wishlist',
    element: <Wishlist />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/profile',
    element: <Profile />,
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
