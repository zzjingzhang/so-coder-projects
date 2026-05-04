export interface OrbitalParameters {
  semiMajorAxis: number;
  eccentricity: number;
  inclination: number;
  trueAnomaly: number;
  argumentOfPeriapsis: number;
}

export interface SatelliteState {
  position: { x: number; y: number; z: number };
  velocity: { vx: number; vy: number; vz: number };
  distance: number;
  speed: number;
  trueAnomaly: number;
  time: number;
}

export interface OrbitData {
  period: number;
  periapsis: number;
  apoapsis: number;
  semiMajorAxis: number;
  eccentricity: number;
  meanSpeed: number;
  periapsisSpeed: number;
  apoapsisSpeed: number;
}

export interface PresetOrbit {
  name: string;
  description: string;
  semiMajorAxis: number;
  eccentricity: number;
  altitude: number;
}

export const PhysicalConstants = {
  G: 6.67430e-11,
  EARTH_MASS: 5.972e24,
  EARTH_RADIUS: 6371e3,
  MU: 3.986004418e14,
} as const;

export const PresetOrbits: PresetOrbit[] = [
  {
    name: '近地轨道 (LEO)',
    description: '距地面约 400 公里，国际空间站轨道',
    semiMajorAxis: 6771e3,
    eccentricity: 0.0001,
    altitude: 400,
  },
  {
    name: '中地轨道 (MEO)',
    description: '距地面约 20200 公里，GPS 卫星轨道',
    semiMajorAxis: 26571e3,
    eccentricity: 0.01,
    altitude: 20200,
  },
  {
    name: '地球同步轨道 (GEO)',
    description: '距地面约 35786 公里，通信卫星轨道',
    semiMajorAxis: 42164e3,
    eccentricity: 0.0,
    altitude: 35786,
  },
  {
    name: '高椭圆轨道 (HEO)',
    description: '高偏心率轨道，闪电通信卫星轨道',
    semiMajorAxis: 26571e3,
    eccentricity: 0.74,
    altitude: 500,
  },
];
