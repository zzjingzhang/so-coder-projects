import React from 'react';
import { Card, Select, DatePicker } from 'antd';
import type { SelectProps } from 'antd';
import type { FilterState } from '../types';
import { cities, timeRanges } from '../data/mockData';
import dayjs from 'dayjs';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  const cityOptions: SelectProps['options'] = cities.map((city) => ({
    value: city.id,
    label: city.name,
  }));

  const timeRangeOptions: SelectProps['options'] = timeRanges.map((range) => ({
    value: range.value,
    label: range.label,
  }));

  const handleCityChange = (value: string) => {
    onFilterChange({
      ...filters,
      selectedCity: value,
    });
  };

  const handleTimeRangeChange = (value: string) => {
    onFilterChange({
      ...filters,
      timeRange: value,
    });
  };

  return (
    <Card className="shadow-md">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            选择城市
          </label>
          <Select
            style={{ width: '100%' }}
            value={filters.selectedCity}
            onChange={handleCityChange}
            options={cityOptions}
            size="large"
            placeholder="请选择城市"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            时间范围
          </label>
          <Select
            style={{ width: '100%' }}
            value={filters.timeRange}
            onChange={handleTimeRangeChange}
            options={timeRangeOptions}
            size="large"
            placeholder="请选择时间范围"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            选择日期
          </label>
          <DatePicker
            style={{ width: '100%' }}
            size="large"
            placeholder="选择日期"
            defaultValue={dayjs()}
            format="YYYY-MM-DD"
          />
        </div>
      </div>
    </Card>
  );
};

export default FilterPanel;
