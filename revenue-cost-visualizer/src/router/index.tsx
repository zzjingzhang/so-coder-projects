import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { HomePage } from '@/pages/Home'
import { DataInputPage } from '@/pages/DataInput'
import { VisualizePage } from '@/pages/Visualize'
import { TrendsPage } from '@/pages/Trends'
import { NotFoundPage } from '@/pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: '/input',
    element: (
      <Layout>
        <DataInputPage />
      </Layout>
    ),
  },
  {
    path: '/visualize',
    element: (
      <Layout>
        <VisualizePage />
      </Layout>
    ),
  },
  {
    path: '/trends',
    element: (
      <Layout>
        <TrendsPage />
      </Layout>
    ),
  },
  {
    path: '*',
    element: (
      <Layout>
        <NotFoundPage />
      </Layout>
    ),
  },
])
