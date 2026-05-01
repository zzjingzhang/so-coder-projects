import { Routes, Route } from 'react-router-dom'
import CounterPage from './pages/CounterPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<CounterPage />} />
    </Routes>
  )
}

export default App
