import React from 'react';
import { Card, Descriptions } from 'antd';
import type { WeatherData } from '../types';

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{data.city}</h2>
          <p className="text-gray-500 text-sm">天气状况：{data.description}</p>
        </div>
        <div className="text-right">
          <div className="text-5xl font-bold text-blue-600">
            {data.currentTemp}°C
          </div>
          <p className="text-gray-500 text-sm mt-1">当前温度</p>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100">
        <Descriptions column={2} size="small">
          <Descriptions.Item label="湿度">
            <span className="font-medium text-blue-600">{data.currentHumidity}%</span>
          </Descriptions.Item>
          <Descriptions.Item label="最后更新">
            <span className="text-gray-500 text-xs">{data.lastUpdate}</span>
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Card>
  );
};

export default WeatherCard;
