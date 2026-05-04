import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FuelCell from './components/FuelCell';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-800 text-center">
              酸性氢氧燃料电池演示
            </h1>
            <p className="text-gray-600 text-center mt-2">
              交互式化学教学演示 - 了解燃料电池的工作原理
            </p>
          </div>
        </header>
        
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<FuelCell />} />
          </Routes>
        </main>
        
        <footer className="bg-white border-t border-gray-200 mt-8">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <p className="text-gray-500 text-center text-sm">
              © 2026 高中化学教学演示 - 燃料电池原理
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
