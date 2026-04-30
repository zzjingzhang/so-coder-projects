import { ColorPalette, PaletteGroup } from '../types/theme';

export const defaultTheme: ColorPalette = {
  common: {
    black: '#000000',
    white: '#FFFFFF',
  },
  background: {
    default: '#F5F5F5',
    paper: '#FFFFFF',
    surface: '#FAFAFA',
  },
  primary: {
    main: '#3B82F6',
    light: '#60A5FA',
    dark: '#2563EB',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#10B981',
    light: '#34D399',
    dark: '#059669',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#EF4444',
    light: '#F87171',
    dark: '#DC2626',
    contrastText: '#FFFFFF',
  },
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
    disabled: '#9CA3AF',
  },
};

export const getPaletteGroups = (theme: ColorPalette): PaletteGroup[] => {
  return [
    {
      name: 'common',
      label: '常见颜色',
      fields: [
        { key: 'black', label: '黑色', color: theme.common.black },
        { key: 'white', label: '白色', color: theme.common.white },
      ],
    },
    {
      name: 'background',
      label: '背景',
      fields: [
        { key: 'default', label: '默认', color: theme.background.default },
        { key: 'paper', label: '纸张', color: theme.background.paper },
        { key: 'surface', label: '表面', color: theme.background.surface },
      ],
    },
    {
      name: 'primary',
      label: '主要',
      fields: [
        { key: 'main', label: '主要', color: theme.primary.main },
        { key: 'light', label: '浅色', color: theme.primary.light },
        { key: 'dark', label: '深色', color: theme.primary.dark },
        { key: 'contrastText', label: '对比文本', color: theme.primary.contrastText },
      ],
    },
    {
      name: 'secondary',
      label: '次要',
      fields: [
        { key: 'main', label: '主要', color: theme.secondary.main },
        { key: 'light', label: '浅色', color: theme.secondary.light },
        { key: 'dark', label: '深色', color: theme.secondary.dark },
        { key: 'contrastText', label: '对比文本', color: theme.secondary.contrastText },
      ],
    },
    {
      name: 'error',
      label: '错误',
      fields: [
        { key: 'main', label: '主要', color: theme.error.main },
        { key: 'light', label: '浅色', color: theme.error.light },
        { key: 'dark', label: '深色', color: theme.error.dark },
        { key: 'contrastText', label: '对比文本', color: theme.error.contrastText },
      ],
    },
    {
      name: 'text',
      label: '文本',
      fields: [
        { key: 'primary', label: '主要', color: theme.text.primary },
        { key: 'secondary', label: '次要', color: theme.text.secondary },
        { key: 'disabled', label: '禁用', color: theme.text.disabled },
      ],
    },
  ];
};
