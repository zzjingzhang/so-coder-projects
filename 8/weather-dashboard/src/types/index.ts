export interface City {
  id: string;
  name: string;
}

export interface TemperatureData {
  time: string;
  temperature: number;
  humidity: number;
}

export interface PrecipitationData {
  name: string;
  value: number;
  color: string;
}

export interface WeatherData {
  city: string;
  temperatureData: TemperatureData[];
  precipitationData: PrecipitationData[];
  currentTemp: number;
  currentHumidity: number;
  description: string;
  lastUpdate: string;
}

export interface FilterState {
  selectedCity: string;
  timeRange: string;
}

export interface TimeRange {
  value: string;
  label: string;
}
