import type { City, WeatherData, TimeRange } from '../types';

export const cities: City[] = [
  { id: 'beijing', name: '北京' },
  { id: 'shanghai', name: '上海' },
  { id: 'guangzhou', name: '广州' },
  { id: 'shenzhen', name: '深圳' },
  { id: 'hangzhou', name: '杭州' },
  { id: 'chengdu', name: '成都' },
];

export const timeRanges: TimeRange[] = [
  { value: '24h', label: '过去24小时' },
  { value: '7d', label: '过去7天' },
  { value: '30d', label: '过去30天' },
];

const generateTemperatureData = (baseTemp: number, hours: number): WeatherData['temperatureData'] => {
  const data: WeatherData['temperatureData'] = [];
  const now = new Date();

  for (let i = hours - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hour = time.getHours();
    const tempVariation = Math.sin((hour - 6) * Math.PI / 12) * 8;
    const randomVariation = (Math.random() - 0.5) * 2;

    data.push({
      time: `${time.getMonth() + 1}/${time.getDate()} ${hour}:00`,
      temperature: Math.round((baseTemp + tempVariation + randomVariation) * 10) / 10,
      humidity: Math.round(40 + Math.random() * 40),
    });
  }

  return data;
};

export const weatherData: Record<string, WeatherData> = {
  beijing: {
    city: '北京',
    currentTemp: 22.5,
    currentHumidity: 45,
    description: '晴朗',
    lastUpdate: new Date().toLocaleString('zh-CN'),
    temperatureData: generateTemperatureData(22, 24),
    precipitationData: [
      { name: '晴天', value: 65, color: '#FFD700' },
      { name: '多云', value: 25, color: '#87CEEB' },
      { name: '小雨', value: 8, color: '#4169E1' },
      { name: '大雨', value: 2, color: '#000080' },
    ],
  },
  shanghai: {
    city: '上海',
    currentTemp: 26.8,
    currentHumidity: 78,
    description: '多云转小雨',
    lastUpdate: new Date().toLocaleString('zh-CN'),
    temperatureData: generateTemperatureData(26, 24),
    precipitationData: [
      { name: '晴天', value: 35, color: '#FFD700' },
      { name: '多云', value: 40, color: '#87CEEB' },
      { name: '小雨', value: 20, color: '#4169E1' },
      { name: '大雨', value: 5, color: '#000080' },
    ],
  },
  guangzhou: {
    city: '广州',
    currentTemp: 30.2,
    currentHumidity: 85,
    description: '雷阵雨',
    lastUpdate: new Date().toLocaleString('zh-CN'),
    temperatureData: generateTemperatureData(30, 24),
    precipitationData: [
      { name: '晴天', value: 15, color: '#FFD700' },
      { name: '多云', value: 25, color: '#87CEEB' },
      { name: '小雨', value: 40, color: '#4169E1' },
      { name: '大雨', value: 20, color: '#000080' },
    ],
  },
  shenzhen: {
    city: '深圳',
    currentTemp: 29.5,
    currentHumidity: 82,
    description: '阵雨',
    lastUpdate: new Date().toLocaleString('zh-CN'),
    temperatureData: generateTemperatureData(29, 24),
    precipitationData: [
      { name: '晴天', value: 20, color: '#FFD700' },
      { name: '多云', value: 30, color: '#87CEEB' },
      { name: '小雨', value: 35, color: '#4169E1' },
      { name: '大雨', value: 15, color: '#000080' },
    ],
  },
  hangzhou: {
    city: '杭州',
    currentTemp: 25.3,
    currentHumidity: 65,
    description: '阴转多云',
    lastUpdate: new Date().toLocaleString('zh-CN'),
    temperatureData: generateTemperatureData(25, 24),
    precipitationData: [
      { name: '晴天', value: 45, color: '#FFD700' },
      { name: '多云', value: 35, color: '#87CEEB' },
      { name: '小雨', value: 15, color: '#4169E1' },
      { name: '大雨', value: 5, color: '#000080' },
    ],
  },
  chengdu: {
    city: '成都',
    currentTemp: 23.8,
    currentHumidity: 70,
    description: '多云',
    lastUpdate: new Date().toLocaleString('zh-CN'),
    temperatureData: generateTemperatureData(23, 24),
    precipitationData: [
      { name: '晴天', value: 30, color: '#FFD700' },
      { name: '多云', value: 45, color: '#87CEEB' },
      { name: '小雨', value: 20, color: '#4169E1' },
      { name: '大雨', value: 5, color: '#000080' },
    ],
  },
};
