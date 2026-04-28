import { Routes, Route } from 'react-router-dom'
import ArtStudio from './pages/ArtStudio.jsx'

function App() {
  return (
    <div className="w-full h-full">
      <Routes>
        <Route path="/" element={<ArtStudio />} />
      </Routes>
    </div>
  )
}

export default App
