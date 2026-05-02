import { DailyForecast, HourlyForecast, WeatherCondition } from '../models/weather.model';

const conditions: WeatherCondition[] = ['sunny', 'partly-cloudy', 'cloudy', 'rainy', 'sunny', 'partly-cloudy'];
const hourConditions: WeatherCondition[] = ['sunny', 'sunny', 'partly-cloudy', 'partly-cloudy', 'cloudy', 'rainy', 'night-clear', 'night-cloudy'];

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDayName(index: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date().getDay();
  return days[(today + index) % 7];
}

function getDateFromNow(daysFromNow: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date;
}

function formatHour(hour: number): string {
  if (hour === 0) return '12 AM';
  if (hour < 12) return `${hour} AM`;
  if (hour === 12) return '12 PM';
  return `${hour - 12} PM`;
}

function getConditionForHour(hour: number): WeatherCondition {
  if (hour >= 6 && hour < 10) return 'sunny';
  if (hour >= 10 && hour < 14) return 'partly-cloudy';
  if (hour >= 14 && hour < 18) return 'cloudy';
  if (hour >= 18 && hour < 22) return 'partly-cloudy';
  return 'night-clear';
}

function getTempForHour(hour: number, baseTemp: number): number {
  if (hour >= 13 && hour <= 17) return baseTemp + getRandomInt(3, 5);
  if (hour >= 10 && hour <= 19) return baseTemp + getRandomInt(0, 3);
  if (hour >= 6 && hour <= 9) return baseTemp - getRandomInt(3, 5);
  return baseTemp - getRandomInt(5, 8);
}

export const mockDailyForecasts: DailyForecast[] = [
  {
    date: getDateFromNow(0),
    dayName: 'Today',
    highTemp: 28,
    lowTemp: 18,
    condition: 'sunny',
    description: 'Clear sky all day',
    humidity: 45,
    windSpeed: 12,
    precipitation: 0
  },
  {
    date: getDateFromNow(1),
    dayName: getDayName(1),
    highTemp: 26,
    lowTemp: 17,
    condition: 'partly-cloudy',
    description: 'Partly cloudy in the morning',
    humidity: 55,
    windSpeed: 15,
    precipitation: 10
  },
  {
    date: getDateFromNow(2),
    dayName: getDayName(2),
    highTemp: 24,
    lowTemp: 16,
    condition: 'cloudy',
    description: 'Overcast throughout the day',
    humidity: 65,
    windSpeed: 18,
    precipitation: 30
  },
  {
    date: getDateFromNow(3),
    dayName: getDayName(3),
    highTemp: 22,
    lowTemp: 15,
    condition: 'rainy',
    description: 'Light rain expected',
    humidity: 75,
    windSpeed: 20,
    precipitation: 80
  },
  {
    date: getDateFromNow(4),
    dayName: getDayName(4),
    highTemp: 25,
    lowTemp: 16,
    condition: 'partly-cloudy',
    description: 'Clearing up in the afternoon',
    humidity: 58,
    windSpeed: 14,
    precipitation: 20
  },
  {
    date: getDateFromNow(5),
    dayName: getDayName(5),
    highTemp: 27,
    lowTemp: 18,
    condition: 'sunny',
    description: 'Beautiful sunny day',
    humidity: 42,
    windSpeed: 10,
    precipitation: 0
  },
  {
    date: getDateFromNow(6),
    dayName: getDayName(6),
    highTemp: 29,
    lowTemp: 19,
    condition: 'sunny',
    description: 'Warm and sunny',
    humidity: 40,
    windSpeed: 8,
    precipitation: 5
  }
];

export const generateHourlyForecast = (baseTemp: number = 25): HourlyForecast[] => {
  const forecasts: HourlyForecast[] = [];
  
  for (let hour = 0; hour < 24; hour++) {
    const condition = getConditionForHour(hour);
    const temp = getTempForHour(hour, baseTemp);
    
    forecasts.push({
      time: formatHour(hour),
      hour: hour,
      temperature: temp,
      condition: condition,
      description: getDescriptionForCondition(condition),
      humidity: getHumidityForHour(hour),
      windSpeed: getWindForHour(hour),
      precipitation: getPrecipitationForCondition(condition),
      feelsLike: temp + getRandomInt(-2, 2)
    });
  }
  
  return forecasts;
};

function getDescriptionForCondition(condition: WeatherCondition): string {
  const descriptions: { [key in WeatherCondition]: string } = {
    'sunny': 'Clear sky',
    'partly-cloudy': 'Partly cloudy',
    'cloudy': 'Overcast',
    'rainy': 'Light rain',
    'stormy': 'Thunderstorm',
    'snowy': 'Snow',
    'night-clear': 'Clear night',
    'night-cloudy': 'Cloudy night'
  };
  return descriptions[condition];
}

function getHumidityForHour(hour: number): number {
  if (hour >= 0 && hour < 6) return getRandomInt(70, 80);
  if (hour >= 6 && hour < 12) return getRandomInt(55, 65);
  if (hour >= 12 && hour < 18) return getRandomInt(45, 55);
  return getRandomInt(60, 70);
}

function getWindForHour(hour: number): number {
  if (hour >= 10 && hour < 18) return getRandomInt(12, 20);
  return getRandomInt(5, 12);
}

function getPrecipitationForCondition(condition: WeatherCondition): number {
  const precipitation: { [key in WeatherCondition]: number } = {
    'sunny': 0,
    'partly-cloudy': 10,
    'cloudy': 30,
    'rainy': 80,
    'stormy': 90,
    'snowy': 60,
    'night-clear': 0,
    'night-cloudy': 20
  };
  return precipitation[condition];
}

export const mockHourlyForecasts: HourlyForecast[] = generateHourlyForecast(25);
