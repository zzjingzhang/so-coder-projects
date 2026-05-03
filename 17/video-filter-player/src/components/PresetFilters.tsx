import React from 'react';
import { Box, Typography, Chip, Stack, Paper } from '@mui/material';
import type { FilterState } from '../types/filter';

interface PresetConfig {
  name: string;
  filters: FilterState;
  color: string;
}

interface PresetFiltersProps {
  onPresetSelect: (filters: FilterState) => void;
  currentFilters: FilterState;
}

const PRESETS: PresetConfig[] = [
  {
    name: '无滤镜',
    filters: {
      grayscale: 0,
      sepia: 0,
      blur: 0,
      brightness: 100,
      contrast: 100,
      saturate: 100,
      'hue-rotate': 0,
      invert: 0,
    },
    color: '#9e9e9e',
  },
  {
    name: '黑白电影',
    filters: {
      grayscale: 100,
      sepia: 0,
      blur: 0,
      brightness: 100,
      contrast: 120,
      saturate: 0,
      'hue-rotate': 0,
      invert: 0,
    },
    color: '#212121',
  },
  {
    name: '怀旧复古',
    filters: {
      grayscale: 0,
      sepia: 80,
      blur: 0,
      brightness: 110,
      contrast: 90,
      saturate: 80,
      'hue-rotate': 0,
      invert: 0,
    },
    color: '#8d6e63',
  },
  {
    name: '赛博朋克',
    filters: {
      grayscale: 0,
      sepia: 0,
      blur: 0,
      brightness: 110,
      contrast: 130,
      saturate: 180,
      'hue-rotate': 30,
      invert: 0,
    },
    color: '#7c4dff',
  },
  {
    name: '冷色调',
    filters: {
      grayscale: 0,
      sepia: 0,
      blur: 0,
      brightness: 95,
      contrast: 110,
      saturate: 90,
      'hue-rotate': 200,
      invert: 0,
    },
    color: '#0288d1',
  },
  {
    name: '暖色调',
    filters: {
      grayscale: 0,
      sepia: 30,
      blur: 0,
      brightness: 105,
      contrast: 105,
      saturate: 130,
      'hue-rotate': 0,
      invert: 0,
    },
    color: '#ff7043',
  },
  {
    name: '高对比',
    filters: {
      grayscale: 0,
      sepia: 0,
      blur: 0,
      brightness: 100,
      contrast: 180,
      saturate: 150,
      'hue-rotate': 0,
      invert: 0,
    },
    color: '#f44336',
  },
  {
    name: '梦幻模糊',
    filters: {
      grayscale: 0,
      sepia: 20,
      blur: 3,
      brightness: 110,
      contrast: 85,
      saturate: 120,
      'hue-rotate': 0,
      invert: 0,
    },
    color: '#e91e63',
  },
];

const PresetFilters: React.FC<PresetFiltersProps> = ({
  onPresetSelect,
  currentFilters,
}) => {
  const isPresetActive = (preset: PresetConfig): boolean => {
    return Object.entries(preset.filters).every(
      ([key, value]) => currentFilters[key] === value
    );
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" fontWeight="bold" color="text.primary" mb={2}>
        预设效果
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={1}>
        {PRESETS.map((preset) => {
          const isActive = isPresetActive(preset);
          return (
            <Chip
              key={preset.name}
              label={preset.name}
              onClick={() => onPresetSelect(preset.filters)}
              color={isActive ? 'primary' : 'default'}
              variant={isActive ? 'filled' : 'outlined'}
              sx={{
                px: 1,
                '& .MuiChip-label': {
                  px: 1.5,
                },
              }}
            />
          );
        })}
      </Stack>
    </Paper>
  );
};

export default PresetFilters;
