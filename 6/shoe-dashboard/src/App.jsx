import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LeftSidebar from './components/LeftSidebar'
import RightSidebar from './components/RightSidebar'
import TopNav from './components/TopNav'
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-950">
        <LeftSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopNav />
          <div className="flex flex-1 overflow-hidden">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
            <RightSidebar />
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
