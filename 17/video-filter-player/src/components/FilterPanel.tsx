import React from 'react';
import {
  Box,
  Typography,
  Slider,
  IconButton,
  Chip,
  Stack,
  Tooltip,
} from '@mui/material';
import {
  InvertColors,
  FilterVintage,
  BlurOn,
  LightMode,
  Contrast,
  Palette,
  ColorLens,
  Refresh,
} from '@mui/icons-material';
import type { FilterState, FilterConfig } from '../types/filter';
import { FILTERS, getDefaultFilterState } from '../types/filter';

interface FilterPanelProps {
  filterState: FilterState;
  onFilterChange: (filterId: string, value: number) => void;
  onReset: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  'invert_colors': <InvertColors />,
  'filter_vintage': <FilterVintage />,
  'blur_on': <BlurOn />,
  'light_mode': <LightMode />,
  'contrast': <Contrast />,
  'palette': <Palette />,
  'color_lens': <ColorLens />,
  'invert_colors_on': <InvertColors />,
};

const getFilterIcon = (filter: FilterConfig): React.ReactNode => {
  return iconMap[filter.icon] || <InvertColors />;
};

const FilterPanel: React.FC<FilterPanelProps> = ({
  filterState,
  onFilterChange,
  onReset,
}) => {
  const hasActiveFilters = Object.entries(filterState).some(
    ([id, value]) => {
      const filter = FILTERS.find((f) => f.id === id);
      return filter && value !== filter.default;
    }
  );

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        p: 3,
        boxShadow: 2,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" fontWeight="bold" color="text.primary">
          滤镜效果
        </Typography>
        <Tooltip title="重置所有滤镜">
          <span>
            <IconButton
              onClick={onReset}
              disabled={!hasActiveFilters}
              color="primary"
              size="small"
            >
              <Refresh />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>

      <Stack spacing={3}>
        {FILTERS.map((filter) => {
          const value = filterState[filter.id] ?? filter.default;
          const isDefault = value === filter.default;

          return (
            <Box key={filter.id}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Chip
                    icon={getFilterIcon(filter)}
                    label={filter.name}
                    size="small"
                    color={isDefault ? 'default' : 'primary'}
                    variant={isDefault ? 'outlined' : 'filled'}
                  />
                </Stack>
                <Typography variant="body2" color="text.secondary" fontWeight="medium">
                  {value}{filter.unit}
                </Typography>
              </Stack>
              <Slider
                value={value}
                min={filter.min}
                max={filter.max}
                onChange={(_, newValue) => {
                  onFilterChange(filter.id, newValue as number);
                }}
                size="small"
                sx={{
                  '& .MuiSlider-thumb': {
                    width: 16,
                    height: 16,
                  },
                }}
              />
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default FilterPanel;
