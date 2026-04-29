import type { PlacedBuilding, Building } from '../types';
import { GRID_SIZE } from '../data/gameData';

interface IslandGridProps {
  placedBuildings: PlacedBuilding[];
  buildings: Building[];
  unlockedAreas: number;
  selectedBuilding: Building | null;
  selectedPlacedBuilding: PlacedBuilding | null;
  onCellClick: (position: { x: number; y: number }) => void;
  onPlacedBuildingClick: (placedBuilding: PlacedBuilding) => void;
}

export const IslandGrid = ({
  placedBuildings,
  buildings,
  unlockedAreas,
  selectedBuilding,
  selectedPlacedBuilding,
  onCellClick,
  onPlacedBuildingClick,
}: IslandGridProps) => {
  const getPlacedBuildingAt = (x: number, y: number) => {
    return placedBuildings.find(pb => pb.position.x === x && pb.position.y === y);
  };

  const getBuildingById = (id: string) => {
    return buildings.find(b => b.id === id);
  };

  const isCellLocked = (x: number, y: number) => {
    return x >= unlockedAreas || y >= unlockedAreas;
  };

  return (
    <div className="p-4">
      <div 
        className="island-grid"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 60px)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 60px)`,
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
          const x = index % GRID_SIZE;
          const y = Math.floor(index / GRID_SIZE);
          const placedBuilding = getPlacedBuildingAt(x, y);
          const building = placedBuilding ? getBuildingById(placedBuilding.buildingId) : null;
          const isLocked = isCellLocked(x, y);
          const isSelected = selectedPlacedBuilding?.id === placedBuilding?.id;
          const isPlacementMode = selectedBuilding !== null;

          return (
            <div
              key={`${x}-${y}`}
              className={`grid-cell 
                ${placedBuilding ? 'occupied' : ''} 
                ${isLocked ? 'locked' : ''} 
                ${isSelected ? 'ring-4 ring-yellow-400' : ''}
                ${isPlacementMode && !placedBuilding && !isLocked ? 'ring-2 ring-green-400 cursor-pointer' : ''}
              `}
              onClick={() => {
                if (isLocked) return;
                if (placedBuilding) {
                  onPlacedBuildingClick(placedBuilding);
                } else if (selectedBuilding) {
                  onCellClick({ x, y });
                }
              }}
            >
              {building && (
                <div className="relative">
                  <span className="text-3xl">{building.icon}</span>
                  {placedBuilding && placedBuilding.level > 1 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {placedBuilding.level}
                    </span>
                  )}
                </div>
              )}
              {isLocked && <span className="text-2xl opacity-50">🔒</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
