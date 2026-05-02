import { Routes, Route } from 'react-router-dom';
import LoanCalculator from './components/LoanCalculator';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoanCalculator />} />
      <Route path="/calculator" element={<LoanCalculator />} />
    </Routes>
  );
}

export default App;
