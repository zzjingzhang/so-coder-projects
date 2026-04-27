import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LevelSelectPage from './pages/LevelSelectPage';
import GamePage from './pages/GamePage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/levels" element={<LevelSelectPage />} />
      <Route path="/game/:levelId" element={<GamePage />} />
    </Routes>
  );
}

export default App;
