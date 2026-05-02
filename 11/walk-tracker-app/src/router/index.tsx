import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import BodyInfo from '../pages/BodyInfo';
import Goal from '../pages/Goal';
import Plan from '../pages/Plan';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/body-info',
    element: <BodyInfo />,
  },
  {
    path: '/goal',
    element: <Goal />,
  },
  {
    path: '/plan',
    element: <Plan />,
  },
]);
