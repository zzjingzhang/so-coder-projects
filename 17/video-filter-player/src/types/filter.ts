export interface FilterConfig {
  id: string;
  name: string;
  icon: string;
  min: number;
  max: number;
  default: number;
  unit: string;
}

export interface FilterState {
  [filterId: string]: number;
}

export const FILTERS: FilterConfig[] = [
  {
    id: 'grayscale',
    name: '灰度',
    icon: 'invert_colors',
    min: 0,
    max: 100,
    default: 0,
    unit: '%',
  },
  {
    id: 'sepia',
    name: '怀旧',
    icon: 'filter_vintage',
    min: 0,
    max: 100,
    default: 0,
    unit: '%',
  },
  {
    id: 'blur',
    name: '模糊',
    icon: 'blur_on',
    min: 0,
    max: 10,
    default: 0,
    unit: 'px',
  },
  {
    id: 'brightness',
    name: '亮度',
    icon: 'light_mode',
    min: 0,
    max: 200,
    default: 100,
    unit: '%',
  },
  {
    id: 'contrast',
    name: '对比度',
    icon: 'contrast',
    min: 0,
    max: 200,
    default: 100,
    unit: '%',
  },
  {
    id: 'saturate',
    name: '饱和度',
    icon: 'palette',
    min: 0,
    max: 300,
    default: 100,
    unit: '%',
  },
  {
    id: 'hue-rotate',
    name: '色相',
    icon: 'color_lens',
    min: 0,
    max: 360,
    default: 0,
    unit: 'deg',
  },
  {
    id: 'invert',
    name: '反转',
    icon: 'invert_colors_on',
    min: 0,
    max: 100,
    default: 0,
    unit: '%',
  },
];

export const getDefaultFilterState = (): FilterState => {
  const state: FilterState = {};
  FILTERS.forEach((filter) => {
    state[filter.id] = filter.default;
  });
  return state;
};
