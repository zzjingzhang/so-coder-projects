import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GamePage } from './components/GamePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GamePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
