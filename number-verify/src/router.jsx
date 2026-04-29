import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/Home'
import { NotFoundPage } from './pages/NotFound'

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
