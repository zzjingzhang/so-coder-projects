import { createBrowserRouter } from 'react-router-dom';
import CubeVisualizer from '../components/CubeVisualizer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <CubeVisualizer />,
  },
]);

export default router;
