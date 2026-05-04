export interface WaterQuality {
  date: string;
  temperature: number;
  ph: number;
  ammonia: number;
  nitrite: number;
  nitrate: number;
}

export interface FeedingSchedule {
  id: number;
  time: string;
  foodType: string;
  amount: string;
  tankId: number;
  completed: boolean;
}

export interface Fish {
  id: number;
  name: string;
  species: string;
  tankId: number;
  addedDate: string;
  healthStatus: 'healthy' | 'monitoring' | 'sick';
}

export interface Filter {
  id: number;
  name: string;
  type: string;
  tankId: number;
  status: 'running' | 'maintenance' | 'stopped';
  lastMaintenance: string;
  nextMaintenance: string;
  efficiency: number;
}

export interface Tank {
  id: number;
  name: string;
  volume: number;
  currentTemperature: number;
  targetTemperature: number;
  currentPh: number;
  targetPh: number;
  fishCount: number;
  lastWaterChange: string;
  nextWaterChange: string;
}
