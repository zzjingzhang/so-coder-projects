import { Routes, Route } from 'react-router-dom'
import LotteryMachine from './components/LotteryMachine'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LotteryMachine />} />
    </Routes>
  )
}

export default App
