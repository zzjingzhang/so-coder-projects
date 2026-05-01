import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { GameProvider } from './context/GameContext';
import MainMenu from './pages/MainMenu';
import LevelSelect from './pages/LevelSelect';
import GamePage from './pages/GamePage';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <GameProvider>
        <BrowserRouter>
          <div className="w-full h-full">
            <Routes>
              <Route path="/" element={<MainMenu />} />
              <Route path="/levels" element={<LevelSelect />} />
              <Route path="/game/:levelId" element={<GamePage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </GameProvider>
    </ConfigProvider>
  );
}

export default App;
