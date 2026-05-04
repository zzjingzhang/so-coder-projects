import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { EpisodesPage } from '@/pages/EpisodesPage';
import { EpisodeDetailPage } from '@/pages/EpisodeDetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'episodes',
        element: <EpisodesPage />,
      },
      {
        path: 'episode/:id',
        element: <EpisodeDetailPage />,
      },
    ],
  },
]);
