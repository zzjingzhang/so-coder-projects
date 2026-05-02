export interface DailyForecast {
  date: Date;
  dayName: string;
  highTemp: number;
  lowTemp: number;
  condition: WeatherCondition;
  description: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
}

export interface HourlyForecast {
  time: string;
  hour: number;
  temperature: number;
  condition: WeatherCondition;
  description: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  feelsLike: number;
}

export type WeatherCondition = 
  | 'sunny' 
  | 'partly-cloudy' 
  | 'cloudy' 
  | 'rainy' 
  | 'stormy' 
  | 'snowy' 
  | 'night-clear' 
  | 'night-cloudy';

export interface WeatherIcons {
  [key: string]: string;
}

export const weatherIcons: WeatherIcons = {
  'sunny': 'wb_sunny',
  'partly-cloudy': 'partly_cloudy_day',
  'cloudy': 'cloud',
  'rainy': 'grain',
  'stormy': 'thunderstorm',
  'snowy': 'ac_unit',
  'night-clear': 'nights_stay',
  'night-cloudy': 'cloud'
};

export const weatherGradients: { [key: string]: string } = {
  'sunny': 'from-yellow-400 to-orange-500',
  'partly-cloudy': 'from-blue-300 to-blue-500',
  'cloudy': 'from-gray-400 to-gray-600',
  'rainy': 'from-blue-500 to-blue-700',
  'stormy': 'from-gray-600 to-gray-800',
  'snowy': 'from-blue-200 to-blue-400',
  'night-clear': 'from-indigo-800 to-purple-900',
  'night-cloudy': 'from-gray-700 to-gray-900'
};
