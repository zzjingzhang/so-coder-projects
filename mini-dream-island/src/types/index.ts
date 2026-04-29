export interface Resource {
  id: string;
  name: string;
  icon: string;
  amount: number;
}

export interface Building {
  id: string;
  name: string;
  description: string;
  icon: string;
  cost: { resourceId: string; amount: number }[];
  production?: { resourceId: string; amount: number; interval: number };
  storage?: { resourceId: string; capacity: number };
  unlockCondition?: { resourceId: string; amount: number };
  unlocked: boolean;
}

export interface PlacedBuilding {
  id: string;
  buildingId: string;
  position: { x: number; y: number };
  level: number;
  lastProduction: number;
}

export interface Order {
  id: string;
  name: string;
  description: string;
  requirements: { resourceId: string; amount: number }[];
  rewards: { resourceId: string; amount: number }[];
  timeLimit?: number;
  completed: boolean;
}

export interface GameState {
  resources: Resource[];
  buildings: Building[];
  placedBuildings: PlacedBuilding[];
  orders: Order[];
  villagers: number;
  islandLevel: number;
  unlockedAreas: number;
  totalPlayTime: number;
}
