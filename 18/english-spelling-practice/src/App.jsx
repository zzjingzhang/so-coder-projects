import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PracticeProvider } from './context/PracticeContext';
import HomePage from './pages/HomePage';
import ImportPage from './pages/ImportPage';
import SetupPage from './pages/SetupPage';
import PracticePage from './pages/PracticePage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <PracticeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/import" element={<ImportPage />} />
          <Route path="/setup" element={<SetupPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </BrowserRouter>
    </PracticeProvider>
  );
}

export default App;
