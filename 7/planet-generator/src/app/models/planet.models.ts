export enum TerrainType {
  DEEP_OCEAN = 'deep_ocean',
  OCEAN = 'ocean',
  SHALLOW_WATER = 'shallow_water',
  BEACH = 'beach',
  DESERT = 'desert',
  GRASSLAND = 'grassland',
  FOREST = 'forest',
  MOUNTAIN = 'mountain',
  SNOW = 'snow',
  ICE = 'ice'
}

export interface TerrainColor {
  terrainType: TerrainType;
  color: number[];
  minHeight: number;
  maxHeight: number;
}

export interface PlanetParams {
  seed: number;
  radius: number;
  waterLevel: number;
  terrainRoughness: number;
  temperature: number;
  humidity: number;
  atmosphereDensity: number;
  atmosphereColor: number[];
  rotationSpeed: number;
}

export interface PlanetPixel {
  height: number;
  terrainType: TerrainType;
  color: number[];
  x: number;
  y: number;
}

export interface GeneratedPlanet {
  params: PlanetParams;
  pixels: PlanetPixel[];
  width: number;
  height: number;
}

export const DEFAULT_PLANET_PARAMS: PlanetParams = {
  seed: 42,
  radius: 150,
  waterLevel: 0.3,
  terrainRoughness: 1.0,
  temperature: 0.5,
  humidity: 0.5,
  atmosphereDensity: 0.3,
  atmosphereColor: [59, 130, 246],
  rotationSpeed: 30
};

export const TERRAIN_COLORS: TerrainColor[] = [
  { terrainType: TerrainType.DEEP_OCEAN, color: [12, 28, 58], minHeight: 0, maxHeight: 0.15 },
  { terrainType: TerrainType.OCEAN, color: [30, 58, 138], minHeight: 0.15, maxHeight: 0.25 },
  { terrainType: TerrainType.SHALLOW_WATER, color: [56, 189, 248], minHeight: 0.25, maxHeight: 0.3 },
  { terrainType: TerrainType.BEACH, color: [250, 240, 160], minHeight: 0.3, maxHeight: 0.33 },
  { terrainType: TerrainType.GRASSLAND, color: [5, 150, 105], minHeight: 0.33, maxHeight: 0.5 },
  { terrainType: TerrainType.FOREST, color: [21, 128, 61], minHeight: 0.5, maxHeight: 0.7 },
  { terrainType: TerrainType.MOUNTAIN, color: [120, 113, 108], minHeight: 0.7, maxHeight: 0.85 },
  { terrainType: TerrainType.SNOW, color: [248, 250, 252], minHeight: 0.85, maxHeight: 0.95 },
  { terrainType: TerrainType.ICE, color: [224, 242, 254], minHeight: 0.95, maxHeight: 1.0 }
];

export const DESERT_TERRAIN_COLORS: TerrainColor[] = [
  { terrainType: TerrainType.DEEP_OCEAN, color: [12, 28, 58], minHeight: 0, maxHeight: 0.15 },
  { terrainType: TerrainType.OCEAN, color: [30, 58, 138], minHeight: 0.15, maxHeight: 0.25 },
  { terrainType: TerrainType.SHALLOW_WATER, color: [56, 189, 248], minHeight: 0.25, maxHeight: 0.3 },
  { terrainType: TerrainType.BEACH, color: [250, 240, 160], minHeight: 0.3, maxHeight: 0.33 },
  { terrainType: TerrainType.DESERT, color: [217, 119, 6], minHeight: 0.33, maxHeight: 0.7 },
  { terrainType: TerrainType.MOUNTAIN, color: [120, 113, 108], minHeight: 0.7, maxHeight: 0.85 },
  { terrainType: TerrainType.SNOW, color: [248, 250, 252], minHeight: 0.85, maxHeight: 0.95 },
  { terrainType: TerrainType.ICE, color: [224, 242, 254], minHeight: 0.95, maxHeight: 1.0 }
];

export const ICE_TERRAIN_COLORS: TerrainColor[] = [
  { terrainType: TerrainType.DEEP_OCEAN, color: [30, 41, 59], minHeight: 0, maxHeight: 0.15 },
  { terrainType: TerrainType.OCEAN, color: [51, 65, 85], minHeight: 0.15, maxHeight: 0.25 },
  { terrainType: TerrainType.SHALLOW_WATER, color: [71, 85, 105], minHeight: 0.25, maxHeight: 0.3 },
  { terrainType: TerrainType.ICE, color: [224, 242, 254], minHeight: 0.3, maxHeight: 0.7 },
  { terrainType: TerrainType.MOUNTAIN, color: [148, 163, 184], minHeight: 0.7, maxHeight: 0.85 },
  { terrainType: TerrainType.SNOW, color: [248, 250, 252], minHeight: 0.85, maxHeight: 1.0 }
];
