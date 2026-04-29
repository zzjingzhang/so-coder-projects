interface IslandExpansionProps {
  unlockedAreas: number;
  maxAreas: number;
  islandLevel: number;
  canAfford: (costs: { resourceId: string; amount: number }[]) => boolean;
  getResourceAmount: (resourceId: string) => number;
  onExpand: () => void;
}

export const IslandExpansion = ({
  unlockedAreas,
  maxAreas,
  islandLevel,
  canAfford,
  getResourceAmount,
  onExpand,
}: IslandExpansionProps) => {
  const expandCost = [
    { resourceId: 'gold', amount: unlockedAreas * 100 },
    { resourceId: 'wood', amount: unlockedAreas * 50 },
    { resourceId: 'stone', amount: unlockedAreas * 50 },
  ];

  const canExpand = canAfford(expandCost) && unlockedAreas < maxAreas;
  const isMaxLevel = unlockedAreas >= maxAreas;

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h3 className="text-lg font-bold text-gray-800 mb-3">🏝️ 岛屿信息</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">岛屿等级:</span>
          <span className="font-bold text-green-600">Lv.{islandLevel}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">已解锁区域:</span>
          <span className="font-bold text-blue-600">{unlockedAreas} x {unlockedAreas}</span>
        </div>
        
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(unlockedAreas / maxAreas) * 100}%` }}
          />
        </div>
        
        {!isMaxLevel && (
          <>
            <div className="pt-2">
              <p className="text-sm font-semibold text-gray-500 mb-2">扩展费用:</p>
              <div className="flex flex-wrap gap-2">
                {expandCost.map((cost, index) => {
                  const hasEnough = getResourceAmount(cost.resourceId) >= cost.amount;
                  return (
                    <span
                      key={index}
                      className={`text-xs px-2 py-1 rounded ${
                        hasEnough ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {cost.resourceId === 'wood' && '🪵'}
                      {cost.resourceId === 'stone' && '🪨'}
                      {cost.resourceId === 'gold' && '💰'}
                      {Math.floor(getResourceAmount(cost.resourceId))}/{cost.amount}
                    </span>
                  );
                })}
              </div>
            </div>
            
            <button
              className={`w-full py-2 rounded-lg font-semibold transition-all ${
                canExpand
                  ? 'bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              onClick={onExpand}
              disabled={!canExpand}
            >
              🏝️ 扩展岛屿
            </button>
          </>
        )}
        
        {isMaxLevel && (
          <div className="text-center py-2 bg-yellow-50 rounded-lg">
            <p className="text-yellow-700 font-semibold">🎉 岛屿已达到最大规模！</p>
          </div>
        )}
      </div>
    </div>
  );
};
