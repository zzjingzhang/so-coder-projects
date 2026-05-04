import { Routes, Route } from 'react-router-dom'
import ChartGenerator from './pages/ChartGenerator'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ChartGenerator />} />
    </Routes>
  )
}

export default App
