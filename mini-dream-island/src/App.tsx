import { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import { ResourceBar } from './components/ResourceBar';
import { IslandGrid } from './components/IslandGrid';
import { BuildingShop } from './components/BuildingShop';
import { OrderList } from './components/OrderList';
import { BuildingDetail } from './components/BuildingDetail';
import { IslandExpansion } from './components/IslandExpansion';
import { GRID_SIZE } from './data/gameData';

type TabType = 'build' | 'orders' | 'info';

function App() {
  const {
    gameState,
    selectedBuilding,
    selectedPlacedBuilding,
    toastMessage,
    setSelectedBuilding,
    setSelectedPlacedBuilding,
    placeBuilding,
    upgradeBuilding,
    removeBuilding,
    expandIsland,
    canAfford,
    getStorageCapacity,
    getResourceAmount,
  } = useGameState();

  const [activeTab, setActiveTab] = useState<TabType>('build');

  const getBuildingById = (id: string) => {
    return gameState.buildings.find(b => b.id === id);
  };

  const handleCellClick = (position: { x: number; y: number }) => {
    if (selectedBuilding) {
      placeBuilding(position);
    }
  };

  const handlePlacedBuildingClick = (placedBuilding: typeof gameState.placedBuildings[0]) => {
    setSelectedPlacedBuilding(placedBuilding);
  };

  const handleUpgrade = () => {
    if (selectedPlacedBuilding) {
      upgradeBuilding(selectedPlacedBuilding);
    }
  };

  const handleRemove = () => {
    if (selectedPlacedBuilding) {
      removeBuilding(selectedPlacedBuilding);
    }
  };

  const formatPlayTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}小时${minutes}分钟`;
    }
    if (minutes > 0) {
      return `${minutes}分钟${secs}秒`;
    }
    return `${secs}秒`;
  };

  return (
    <div className="min-h-screen game-container">
      {toastMessage && (
        <div className="toast">
          <p className="font-semibold">{toastMessage}</p>
        </div>
      )}

      <div className="bg-white bg-opacity-90 shadow-lg p-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-green-700 flex items-center gap-2">
              🏝️ 迷你筑梦岛
            </h1>
            <div className="text-sm text-gray-500">
              游戏时间: {formatPlayTime(gameState.totalPlayTime)}
            </div>
          </div>
          <ResourceBar 
            resources={gameState.resources} 
            storageCapacity={getStorageCapacity()}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white bg-opacity-80 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                🏝️ 我的岛屿
              </h2>
              <div className="flex justify-center">
                <IslandGrid
                  placedBuildings={gameState.placedBuildings}
                  buildings={gameState.buildings}
                  unlockedAreas={gameState.unlockedAreas}
                  selectedBuilding={selectedBuilding}
                  selectedPlacedBuilding={selectedPlacedBuilding}
                  onCellClick={handleCellClick}
                  onPlacedBuildingClick={handlePlacedBuildingClick}
                />
              </div>
              
              {gameState.placedBuildings.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">
                    已建造建筑 ({gameState.placedBuildings.length}):
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {gameState.placedBuildings.map(pb => {
                      const building = getBuildingById(pb.buildingId);
                      return building ? (
                        <div
                          key={pb.id}
                          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm cursor-pointer transition-all ${
                            selectedPlacedBuilding?.id === pb.id
                              ? 'bg-green-100 ring-2 ring-green-400'
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                          onClick={() => handlePlacedBuildingClick(pb)}
                        >
                          <span>{building.icon}</span>
                          <span className="font-medium">{building.name}</span>
                          {pb.level > 1 && (
                            <span className="text-xs text-yellow-600">Lv.{pb.level}</span>
                          )}
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <IslandExpansion
              unlockedAreas={gameState.unlockedAreas}
              maxAreas={GRID_SIZE}
              islandLevel={gameState.islandLevel}
              canAfford={canAfford}
              getResourceAmount={getResourceAmount}
              onExpand={expandIsland}
            />

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="flex border-b">
                <button
                  className={`tab-button flex-1 ${activeTab === 'build' ? 'active' : ''}`}
                  onClick={() => setActiveTab('build')}
                >
                  🏗️ 建造
                </button>
                <button
                  className={`tab-button flex-1 ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => setActiveTab('orders')}
                >
                  📋 任务
                </button>
                <button
                  className={`tab-button flex-1 ${activeTab === 'info' ? 'active' : ''}`}
                  onClick={() => setActiveTab('info')}
                >
                  ℹ️ 统计
                </button>
              </div>
              
              <div className="p-4 max-h-96 overflow-y-auto">
                {activeTab === 'build' && (
                  <BuildingShop
                    buildings={gameState.buildings}
                    selectedBuilding={selectedBuilding}
                    canAfford={canAfford}
                    getResourceAmount={getResourceAmount}
                    onSelectBuilding={setSelectedBuilding}
                  />
                )}
                
                {activeTab === 'orders' && (
                  <OrderList
                    orders={gameState.orders}
                    getResourceAmount={getResourceAmount}
                  />
                )}
                
                {activeTab === 'info' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800">📊 游戏统计</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">岛屿等级:</span>
                        <span className="font-bold text-green-600">Lv.{gameState.islandLevel}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">已建造建筑:</span>
                        <span className="font-bold text-blue-600">{gameState.placedBuildings.length}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">已解锁建筑:</span>
                        <span className="font-bold text-purple-600">
                          {gameState.buildings.filter(b => b.unlocked).length}/{gameState.buildings.length}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">已完成任务:</span>
                        <span className="font-bold text-yellow-600">
                          {gameState.orders.filter(o => o.completed).length}/{gameState.orders.length}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">存储容量:</span>
                        <span className="font-bold text-orange-600">{getStorageCapacity()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">游戏时间:</span>
                        <span className="font-bold text-pink-600">
                          {formatPlayTime(gameState.totalPlayTime)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">💡 游戏提示</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• 建造锯木厂、采石场和农场来自动生产资源</li>
                        <li>• 建造仓库来增加存储容量</li>
                        <li>• 完成任务订单获得丰厚奖励</li>
                        <li>• 积累足够资源可以解锁新建筑</li>
                        <li>• 升级建筑可以提高产出效率</li>
                        <li>• 扩展岛屿可以获得更多建造空间</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedPlacedBuilding && (
        <BuildingDetail
          placedBuilding={selectedPlacedBuilding}
          building={getBuildingById(selectedPlacedBuilding.buildingId)}
          canAfford={canAfford}
          getResourceAmount={getResourceAmount}
          onUpgrade={handleUpgrade}
          onRemove={handleRemove}
          onClose={() => setSelectedPlacedBuilding(null)}
        />
      )}
    </div>
  );
}

export default App;
