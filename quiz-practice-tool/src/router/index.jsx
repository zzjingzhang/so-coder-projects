import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Quiz from '../pages/Quiz';
import Result from '../pages/Result';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/quiz',
    element: <Quiz />,
  },
  {
    path: '/result',
    element: <Result />,
  },
]);

export default router;
