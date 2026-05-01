export enum WeatherCondition {
  CLEAR = 'clear',
  CLOUDY = 'cloudy',
  RAINY = 'rainy',
  FOGGY = 'foggy',
}

export interface TimeState {
  hour: number;
  isAutoPlay: boolean;
  speed: number;
}

export interface WeatherState {
  condition: WeatherCondition;
  rainIntensity: number;
  fogDensity: number;
  cloudCover: number;
}

export interface CameraState {
  position: {
    x: number;
    y: number;
    z: number;
  };
  target: {
    x: number;
    y: number;
    z: number;
  };
  fov: number;
}

export interface EnvironmentState {
  time: TimeState;
  weather: WeatherState;
  camera: CameraState;
}
