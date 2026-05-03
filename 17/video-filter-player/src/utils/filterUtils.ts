import type { FilterState } from '../types/filter';
import { FILTERS } from '../types/filter';

export const generateFilterString = (filterState: FilterState): string => {
  const filterParts: string[] = [];
  
  FILTERS.forEach((filter) => {
    const value = filterState[filter.id];
    if (value !== undefined) {
      if (filter.id === 'hue-rotate') {
        filterParts.push(`hue-rotate(${value}${filter.unit})`);
      } else {
        filterParts.push(`${filter.id}(${value}${filter.unit})`);
      }
    }
  });
  
  return filterParts.join(' ');
};
