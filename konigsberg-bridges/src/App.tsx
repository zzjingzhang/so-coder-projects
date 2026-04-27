import WaterBackground from './components/WaterBackground';
import GameBoard from './components/GameBoard';
import ControlPanel from './components/ControlPanel';
import MessageToast from './components/MessageToast';
import Footer from './components/Footer';
import { useGameLogic } from './hooks/useGameLogic';
import { useSecurity } from './hooks/useSecurity';
import type { Region } from './types';
import './App.css';

function App() {
  useSecurity();

  const {
    gameState,
    BRIDGES,
    selectStartPosition,
    crossBridge,
    undo,
    reset,
    clearMessage,
    showHint,
  } = useGameLogic();

  return (
    <div className="app">
      <WaterBackground />

      <MessageToast
        message={gameState.message}
        messageType={gameState.messageType}
        onClose={clearMessage}
      />

      <header className="header">
        <h1 className="title">哥尼斯堡七桥问题</h1>
        <p className="subtitle">
          尝试穿过所有 7 座桥，每座桥只能走一次。这是欧拉在 1736 年首次解决的经典图论问题。
        </p>
        <div className="game-status">
          <span className="status-item">
            <span className="status-label">已走过:</span>
            <span className="status-value">{gameState.visitedBridges.length}</span>
            <span className="status-unit">/ 7 座桥</span>
          </span>
          {gameState.currentPosition && (
            <span className="status-item">
              <span className="status-label">当前位置:</span>
              <span className="status-value current-pos">{gameState.currentPosition}</span>
            </span>
          )}
        </div>
      </header>

      <main className="main-content">
        <GameBoard
          currentPosition={gameState.currentPosition}
          visitedBridges={gameState.visitedBridges}
          bridges={BRIDGES}
          onRegionClick={(region: Region) => {
            if (!gameState.gameStarted) {
              selectStartPosition(region);
            }
          }}
          onBridgeClick={crossBridge}
          gameStarted={gameState.gameStarted}
        />

        <ControlPanel
          onUndo={undo}
          onReset={reset}
          onHint={showHint}
          canUndo={gameState.history.length > 0}
        />

        <div className="info-section">
          <div className="info-card">
            <h3>🎮 如何玩</h3>
            <ol>
              <li>点击任意区域（A岛、B岛、C岸或D岸）选择起点</li>
              <li>点击连接的桥梁移动到另一个区域</li>
              <li>每座桥只能走一次</li>
              <li>尝试穿过所有 7 座桥！</li>
            </ol>
          </div>

          <div className="info-card">
            <h3>📚 历史背景</h3>
            <p>
              哥尼斯堡（今俄罗斯加里宁格勒）是18世纪普鲁士的一座城市，
              普雷格尔河流经该城并将其分为四个区域：两个岛屿和两岸。
              七座桥连接着这些区域。市民们想知道是否可以穿过每座桥恰好一次并回到起点。
              1736年，瑞士数学家莱昂哈德·欧拉证明了这是不可能的，
              从而开创了图论这一数学分支。
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
