import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Classes from './pages/Classes'
import About from './pages/About'
import Schedule from './pages/Schedule'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/about" element={<About />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </Layout>
  )
}

export default App
