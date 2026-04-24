import { Routes, Route } from 'react-router-dom';
import { GeneratorPage } from './pages/GeneratorPage';
import { PortfolioPage } from './pages/PortfolioPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<GeneratorPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
    </Routes>
  );
}

export default App;
