import type { Building } from '../types';

interface BuildingShopProps {
  buildings: Building[];
  selectedBuilding: Building | null;
  canAfford: (costs: { resourceId: string; amount: number }[]) => boolean;
  getResourceAmount: (resourceId: string) => number;
  onSelectBuilding: (building: Building | null) => void;
}

export const BuildingShop = ({
  buildings,
  selectedBuilding,
  canAfford,
  getResourceAmount,
  onSelectBuilding,
}: BuildingShopProps) => {
  const unlockedBuildings = buildings.filter(b => b.unlocked);
  const lockedBuildings = buildings.filter(b => !b.unlocked);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-4">🏗️ 建筑商店</h3>
      
      {selectedBuilding && (
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedBuilding.icon}</span>
              <div>
                <h4 className="font-bold text-gray-800">{selectedBuilding.name}</h4>
                <p className="text-sm text-gray-600">点击地图空位放置建筑</p>
              </div>
            </div>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
              onClick={() => onSelectBuilding(null)}
            >
              取消
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-600">可用建筑</h4>
        {unlockedBuildings.map(building => {
          const affordable = canAfford(building.cost);
          const isSelected = selectedBuilding?.id === building.id;

          return (
            <div
              key={building.id}
              className={`building-card cursor-pointer transition-all ${
                isSelected ? 'ring-2 ring-green-500' : ''
              } ${!affordable ? 'opacity-60' : ''}`}
              onClick={() => onSelectBuilding(isSelected ? null : building)}
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{building.icon}</span>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">{building.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{building.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {building.cost.map((cost, index) => {
                      const resourceAmount = getResourceAmount(cost.resourceId);
                      const hasEnough = resourceAmount >= cost.amount;
                      return (
                        <span
                          key={index}
                          className={`text-xs px-2 py-1 rounded ${
                            hasEnough ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {cost.resourceId === 'wood' && '🪵'}
                          {cost.resourceId === 'stone' && '🪨'}
                          {cost.resourceId === 'food' && '🍎'}
                          {cost.resourceId === 'gold' && '💰'}
                          {Math.floor(resourceAmount)}/{cost.amount}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {lockedBuildings.length > 0 && (
        <div className="space-y-3 mt-6">
          <h4 className="text-sm font-semibold text-gray-500">🔒 待解锁建筑</h4>
          {lockedBuildings.map(building => (
            <div
              key={building.id}
              className="building-card opacity-50 cursor-not-allowed"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl grayscale">{building.icon}</span>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">{building.name}</h4>
                  <p className="text-sm text-gray-500">{building.description}</p>
                  {building.unlockCondition && (
                    <p className="text-xs text-orange-600 mt-1">
                      解锁条件: 拥有 {building.unlockCondition.amount} 
                      {building.unlockCondition.resourceId === 'gold' ? '💰金币' : 
                       building.unlockCondition.resourceId === 'wood' ? '🪵木头' :
                       building.unlockCondition.resourceId === 'stone' ? '🪨石头' : '🍎食物'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
