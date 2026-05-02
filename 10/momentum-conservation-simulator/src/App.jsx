import { Routes, Route } from 'react-router-dom';
import Simulation from './components/Simulation';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Simulation />} />
    </Routes>
  );
}

export default App;
