import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EventDetailPage from './pages/EventDetailPage'
import BookingPage from './pages/BookingPage'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/event/:id" element={<EventDetailPage />} />
          <Route path="/booking/:eventId" element={<BookingPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
