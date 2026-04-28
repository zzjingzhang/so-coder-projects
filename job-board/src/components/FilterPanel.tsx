import React from 'react';
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
  Divider,
  Chip,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { FilterList, Clear } from '@mui/icons-material';
import type { Filters } from '../types';
import { filterOptions } from '../data/mockData';

interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onSearch: (value: string) => void;
  searchValue: string;
  resultCount: number;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onSearch,
  searchValue,
  resultCount,
}) => {
  const handleLocationChange = (event: SelectChangeEvent) => {
    onFilterChange({ ...filters, location: event.target.value });
  };

  const handleJobTypeChange = (event: SelectChangeEvent) => {
    onFilterChange({ ...filters, jobType: event.target.value });
  };

  const handleSalaryRangeChange = (event: SelectChangeEvent) => {
    onFilterChange({ ...filters, salaryRange: event.target.value });
  };

  const handleClearFilters = () => {
    onFilterChange({
      location: '全部',
      jobType: '全部',
      salaryRange: '全部',
      search: '',
    });
    onSearch('');
  };

  const hasActiveFilters =
    filters.location !== '全部' ||
    filters.jobType !== '全部' ||
    filters.salaryRange !== '全部' ||
    searchValue !== '';

  return (
    <Paper
      elevation={0}
      className="sticky top-4"
      sx={{
        borderRadius: '16px',
        border: '1px solid #e5e7eb',
        p: 4,
      }}
    >
      <Box className="flex items-center justify-between mb-6">
        <Box className="flex items-center gap-2">
          <FilterList sx={{ color: '#4f46e5' }} />
          <Typography variant="h6" className="font-bold text-gray-900">
            筛选条件
          </Typography>
        </Box>
        {hasActiveFilters && (
          <Button
            startIcon={<Clear sx={{ fontSize: 18 }} />}
            onClick={handleClearFilters}
            sx={{
              textTransform: 'none',
              color: '#6b7280',
              fontSize: '0.875rem',
              '&:hover': {
                backgroundColor: 'rgba(107, 114, 128, 0.1)',
              },
            }}
          >
            清除筛选
          </Button>
        )}
      </Box>

      <Box
        component="div"
        className="text-gray-600 mb-6"
        sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '0.875rem' }}
      >
        共找到
        <Chip
          label={resultCount}
          size="small"
          sx={{
            backgroundColor: '#eef2ff',
            color: '#4f46e5',
            fontWeight: 'bold',
            fontSize: '0.875rem',
          }}
        />
        个职位
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Box className="space-y-5">
        <FormControl fullWidth>
          <InputLabel
            sx={{
              fontSize: '0.875rem',
              '&.Mui-focused': {
                color: '#4f46e5',
              },
            }}
          >
            工作地点
          </InputLabel>
          <Select
            value={filters.location}
            label="工作地点"
            onChange={handleLocationChange}
            sx={{
              borderRadius: '10px',
              fontSize: '0.95rem',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e5e7eb',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d1d5db',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#4f46e5',
              },
            }}
          >
            {filterOptions.locations.map((location) => (
              <MenuItem key={location} value={location}>
                {location}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel
            sx={{
              fontSize: '0.875rem',
              '&.Mui-focused': {
                color: '#4f46e5',
              },
            }}
          >
            工作类型
          </InputLabel>
          <Select
            value={filters.jobType}
            label="工作类型"
            onChange={handleJobTypeChange}
            sx={{
              borderRadius: '10px',
              fontSize: '0.95rem',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e5e7eb',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d1d5db',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#4f46e5',
              },
            }}
          >
            {filterOptions.jobTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel
            sx={{
              fontSize: '0.875rem',
              '&.Mui-focused': {
                color: '#4f46e5',
              },
            }}
          >
            薪资范围
          </InputLabel>
          <Select
            value={filters.salaryRange}
            label="薪资范围"
            onChange={handleSalaryRangeChange}
            sx={{
              borderRadius: '10px',
              fontSize: '0.95rem',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e5e7eb',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d1d5db',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#4f46e5',
              },
            }}
          >
            {filterOptions.salaryRanges.map((range) => (
              <MenuItem key={range.label} value={range.label}>
                {range.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box className="mt-6 p-4 bg-gray-50 rounded-xl">
        <Typography variant="caption" className="text-gray-500">
          💡 提示：在上方搜索栏输入关键词可以进一步筛选职位标题和公司名称
        </Typography>
      </Box>
    </Paper>
  );
};

export default FilterPanel;
