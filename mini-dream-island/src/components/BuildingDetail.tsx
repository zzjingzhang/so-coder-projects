import type { PlacedBuilding, Building } from '../types';

interface BuildingDetailProps {
  placedBuilding: PlacedBuilding;
  building: Building | undefined;
  canAfford: (costs: { resourceId: string; amount: number }[]) => boolean;
  getResourceAmount: (resourceId: string) => number;
  onUpgrade: () => void;
  onRemove: () => void;
  onClose: () => void;
}

export const BuildingDetail = ({
  placedBuilding,
  building,
  canAfford,
  getResourceAmount,
  onUpgrade,
  onRemove,
  onClose,
}: BuildingDetailProps) => {
  if (!building) return null;

  const upgradeCost = building.cost.map(cost => ({
    ...cost,
    amount: Math.floor(cost.amount * (1 + placedBuilding.level * 0.5)),
  }));

  const canUpgrade = canAfford(upgradeCost);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="bg-gradient-to-r from-green-400 to-green-600 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{building.icon}</span>
              <div>
                <h3 className="text-xl font-bold text-white">{building.name}</h3>
                <span className="text-green-100 text-sm">等级 {placedBuilding.level}</span>
              </div>
            </div>
            <button
              className="text-white hover:text-green-200 text-2xl"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <p className="text-gray-600">{building.description}</p>
          
          {building.production && (
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-sm font-semibold text-green-800 mb-1">
                ⚡ 产出效率:
              </p>
              <p className="text-green-700">
                每 {building.production.interval / 1000} 秒产出 {building.production.amount * placedBuilding.level} 个
                {building.production.resourceId === 'wood' ? '🪵木头' :
                 building.production.resourceId === 'stone' ? '🪨石头' :
                 building.production.resourceId === 'food' ? '🍎食物' : '💰金币'}
              </p>
            </div>
          )}
          
          {building.storage && (
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-sm font-semibold text-blue-800 mb-1">
                📦 存储加成:
              </p>
              <p className="text-blue-700">
                +{building.storage.capacity * placedBuilding.level} 存储容量
              </p>
            </div>
          )}
          
          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-800 mb-2">⬆️ 升级费用</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {upgradeCost.map((cost, index) => {
                const hasEnough = getResourceAmount(cost.resourceId) >= cost.amount;
                return (
                  <span
                    key={index}
                    className={`text-sm px-3 py-1 rounded-lg ${
                      hasEnough ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {cost.resourceId === 'wood' && '🪵'}
                    {cost.resourceId === 'stone' && '🪨'}
                    {cost.resourceId === 'food' && '🍎'}
                    {cost.resourceId === 'gold' && '💰'}
                    {Math.floor(getResourceAmount(cost.resourceId))}/{cost.amount}
                  </span>
                );
              })}
            </div>
            
            <div className="flex gap-3">
              <button
                className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                  canUpgrade
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                onClick={onUpgrade}
                disabled={!canUpgrade}
              >
                升级
              </button>
              <button
                className="flex-1 py-2 rounded-lg font-semibold bg-red-100 text-red-600 hover:bg-red-200 transition-all"
                onClick={onRemove}
              >
                拆除 (返还50%)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
