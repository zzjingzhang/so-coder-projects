import { useState, useCallback, useEffect, useRef } from 'react';
import type { GameState, PlacedBuilding, Building } from '../types';
import { initialResources, initialBuildings, initialOrders, GRID_SIZE, BASE_STORAGE_CAPACITY } from '../data/gameData';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    resources: initialResources,
    buildings: initialBuildings,
    placedBuildings: [],
    orders: initialOrders,
    villagers: 1,
    islandLevel: 1,
    unlockedAreas: 6,
    totalPlayTime: 0,
  });

  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [selectedPlacedBuilding, setSelectedPlacedBuilding] = useState<PlacedBuilding | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const gameLoopRef = useRef<number | null>(null);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  const getResourceAmount = useCallback((resourceId: string) => {
    return gameState.resources.find(r => r.id === resourceId)?.amount || 0;
  }, [gameState.resources]);

  const getStorageCapacity = useCallback(() => {
    let capacity = BASE_STORAGE_CAPACITY;
    gameState.placedBuildings.forEach(placed => {
      const building = gameState.buildings.find(b => b.id === placed.buildingId);
      if (building?.storage) {
        capacity += building.storage.capacity * placed.level;
      }
    });
    return capacity;
  }, [gameState.placedBuildings, gameState.buildings]);

  const canAfford = useCallback((costs: { resourceId: string; amount: number }[]) => {
    return costs.every(cost => getResourceAmount(cost.resourceId) >= cost.amount);
  }, [getResourceAmount]);

  const spendResources = useCallback((costs: { resourceId: string; amount: number }[]) => {
    setGameState(prev => ({
      ...prev,
      resources: prev.resources.map(resource => {
        const cost = costs.find(c => c.resourceId === resource.id);
        if (cost) {
          return { ...resource, amount: Math.max(0, resource.amount - cost.amount) };
        }
        return resource;
      }),
    }));
  }, []);

  const addResources = useCallback((gains: { resourceId: string; amount: number }[]) => {
    const capacity = getStorageCapacity();
    setGameState(prev => ({
      ...prev,
      resources: prev.resources.map(resource => {
        const gain = gains.find(g => g.resourceId === resource.id);
        if (gain) {
          return { ...resource, amount: Math.min(capacity, resource.amount + gain.amount) };
        }
        return resource;
      }),
    }));
  }, [getStorageCapacity]);

  const unlockBuildings = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      buildings: prev.buildings.map(building => {
        if (!building.unlocked && building.unlockCondition) {
          const resourceAmount = getResourceAmount(building.unlockCondition.resourceId);
          if (resourceAmount >= building.unlockCondition.amount) {
            showToast(`🎉 新建筑解锁：${building.name}！`);
            return { ...building, unlocked: true };
          }
        }
        return building;
      }),
    }));
  }, [getResourceAmount, showToast]);

  const checkOrders = useCallback(() => {
    setGameState(prev => {
      const newOrders = prev.orders.map(order => {
        if (order.completed) return order;
        
        const canComplete = order.requirements.every(req => 
          getResourceAmount(req.resourceId) >= req.amount
        );
        
        if (canComplete) {
          addResources(order.rewards);
          showToast(`✅ 订单完成：${order.name}！获得奖励！`);
          return { ...order, completed: true };
        }
        return order;
      });
      
      return { ...prev, orders: newOrders };
    });
  }, [getResourceAmount, addResources, showToast]);

  const placeBuilding = useCallback((position: { x: number; y: number }) => {
    if (!selectedBuilding) return;
    
    const isOccupied = gameState.placedBuildings.some(
      pb => pb.position.x === position.x && pb.position.y === position.y
    );
    
    if (isOccupied) {
      showToast('❌ 这个位置已经有建筑了！');
      return;
    }
    
    if (position.x >= gameState.unlockedAreas || position.y >= gameState.unlockedAreas) {
      showToast('🔒 这个区域还未解锁！');
      return;
    }
    
    if (!canAfford(selectedBuilding.cost)) {
      showToast('❌ 资源不足！');
      return;
    }
    
    spendResources(selectedBuilding.cost);
    
    const newPlacedBuilding: PlacedBuilding = {
      id: `placed_${Date.now()}`,
      buildingId: selectedBuilding.id,
      position,
      level: 1,
      lastProduction: Date.now(),
    };
    
    setGameState(prev => ({
      ...prev,
      placedBuildings: [...prev.placedBuildings, newPlacedBuilding],
    }));
    
    showToast(`🏗️ 建造成功：${selectedBuilding.name}！`);
    setSelectedBuilding(null);
  }, [selectedBuilding, gameState.placedBuildings, gameState.unlockedAreas, canAfford, spendResources, showToast]);

  const upgradeBuilding = useCallback((placedBuilding: PlacedBuilding) => {
    const building = gameState.buildings.find(b => b.id === placedBuilding.buildingId);
    if (!building) return;
    
    const upgradeCost = building.cost.map(cost => ({
      ...cost,
      amount: Math.floor(cost.amount * (1 + placedBuilding.level * 0.5)),
    }));
    
    if (!canAfford(upgradeCost)) {
      showToast('❌ 资源不足，无法升级！');
      return;
    }
    
    spendResources(upgradeCost);
    
    setGameState(prev => ({
      ...prev,
      placedBuildings: prev.placedBuildings.map(pb => 
        pb.id === placedBuilding.id 
          ? { ...pb, level: pb.level + 1 }
          : pb
      ),
    }));
    
    showToast(`⬆️ 升级成功：${building.name} 等级 ${placedBuilding.level + 1}！`);
    setSelectedPlacedBuilding(null);
  }, [gameState.buildings, canAfford, spendResources, showToast]);

  const removeBuilding = useCallback((placedBuilding: PlacedBuilding) => {
    const building = gameState.buildings.find(b => b.id === placedBuilding.buildingId);
    if (!building) return;
    
    const refund = building.cost.map(cost => ({
      ...cost,
      amount: Math.floor(cost.amount * placedBuilding.level * 0.5),
    }));
    
    addResources(refund);
    
    setGameState(prev => ({
      ...prev,
      placedBuildings: prev.placedBuildings.filter(pb => pb.id !== placedBuilding.id),
    }));
    
    showToast(`🗑️ 拆除建筑：${building.name}，返还50%资源`);
    setSelectedPlacedBuilding(null);
  }, [gameState.buildings, addResources, showToast]);

  const expandIsland = useCallback(() => {
    const expandCost = [
      { resourceId: 'gold', amount: gameState.unlockedAreas * 100 },
      { resourceId: 'wood', amount: gameState.unlockedAreas * 50 },
      { resourceId: 'stone', amount: gameState.unlockedAreas * 50 },
    ];
    
    if (!canAfford(expandCost)) {
      showToast('❌ 资源不足，无法扩展岛屿！');
      return;
    }
    
    if (gameState.unlockedAreas >= GRID_SIZE) {
      showToast('🏝️ 岛屿已达到最大规模！');
      return;
    }
    
    spendResources(expandCost);
    
    setGameState(prev => ({
      ...prev,
      unlockedAreas: Math.min(GRID_SIZE, prev.unlockedAreas + 1),
      islandLevel: prev.islandLevel + 1,
    }));
    
    showToast(`🏝️ 岛屿扩展成功！新区域已解锁！`);
  }, [gameState.unlockedAreas, canAfford, spendResources, showToast]);

  useEffect(() => {
    gameLoopRef.current = setInterval(() => {
      setGameState(prev => {
        const now = Date.now();
        const newResources = [...prev.resources];
        const capacity = BASE_STORAGE_CAPACITY + prev.placedBuildings.reduce((total, placed) => {
          const building = prev.buildings.find(b => b.id === placed.buildingId);
          if (building?.storage) {
            return total + building.storage.capacity * placed.level;
          }
          return total;
        }, 0);
        
        const villageHallCount = prev.placedBuildings.filter(pb => pb.buildingId === 'village_hall').length;
        const productionBonus = 1 + villageHallCount * 0.1;
        
        prev.placedBuildings.forEach(placed => {
          const building = prev.buildings.find(b => b.id === placed.buildingId);
          
          if (building?.production) {
            const timeSinceLastProduction = now - placed.lastProduction;
            const productionCycles = Math.floor(timeSinceLastProduction / building.production.interval);
            
            if (productionCycles > 0) {
              const productionAmount = Math.floor(
                building.production.amount * placed.level * productionCycles * productionBonus
              );
              
              const resourceIndex = newResources.findIndex(r => r.id === building.production!.resourceId);
              if (resourceIndex !== -1) {
                newResources[resourceIndex] = {
                  ...newResources[resourceIndex],
                  amount: Math.min(capacity, newResources[resourceIndex].amount + productionAmount),
                };
              }
              
              placed.lastProduction = now - (timeSinceLastProduction % building.production.interval);
            }
          }
        });
        
        return {
          ...prev,
          resources: newResources,
          totalPlayTime: prev.totalPlayTime + 1,
        };
      });
      
      unlockBuildings();
      checkOrders();
    }, 1000);
    
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [unlockBuildings, checkOrders]);

  return {
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
  };
};
