import React, { useState } from 'react';
import Header from '../components/Header';
import FilterPanel from '../components/FilterPanel';
import WeatherCard from '../components/WeatherCard';
import TemperatureChart from '../components/TemperatureChart';
import PrecipitationChart from '../components/PrecipitationChart';
import type { FilterState, WeatherData } from '../types';
import { weatherData } from '../data/mockData';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';

const Dashboard: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    selectedCity: 'beijing',
    timeRange: '24h',
  });

  const currentWeatherData: WeatherData = weatherData[filters.selectedCity];

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#3b82f6',
          borderRadius: 8,
        },
      }}
    >
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-10">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          <div className="mb-10">
            <WeatherCard data={currentWeatherData} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
            <div>
              <TemperatureChart
                data={currentWeatherData.temperatureData}
                cityName={currentWeatherData.city}
              />
            </div>
            <div>
              <PrecipitationChart
                data={currentWeatherData.precipitationData}
                cityName={currentWeatherData.city}
              />
            </div>
          </div>

          <footer className="pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            <p>© 2026 实时天气监控仪表盘 | 数据仅供展示</p>
          </footer>
        </main>
      </div>
    </ConfigProvider>
  );
};

export default Dashboard;
