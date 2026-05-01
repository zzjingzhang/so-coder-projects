import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAppStore } from './store/appStore'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Charts from './pages/Charts'
import CalendarPage from './pages/Calendar'
import TablePage from './pages/Table'
import Forms from './pages/Forms'
import Icons from './pages/Icons'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useAppStore(state => state.isAuthenticated)
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="charts" element={<Charts />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="table" element={<TablePage />} />
          <Route path="forms" element={<Forms />} />
          <Route path="icons" element={<Icons />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
