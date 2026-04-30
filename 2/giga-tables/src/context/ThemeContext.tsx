import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { ThemeConfig, GigaTablesContextType } from '../types';

const lightTheme: ThemeConfig = {
  primary: '#0ea5e9',
  secondary: '#6b7280',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  text: '#111827',
  textSecondary: '#6b7280',
  background: '#ffffff',
  backgroundSecondary: '#f9fafb',
  border: '#e5e7eb',
};

const darkTheme: ThemeConfig = {
  primary: '#38bdf8',
  secondary: '#9ca3af',
  success: '#4ade80',
  warning: '#fbbf24',
  danger: '#f87171',
  info: '#60a5fa',
  text: '#f9fafb',
  textSecondary: '#9ca3af',
  background: '#111827',
  backgroundSecondary: '#1f2937',
  border: '#374151',
};

const defaultContextValue: GigaTablesContextType = {
  theme: lightTheme,
  setTheme: () => {},
  isDark: false,
};

const ThemeContext = createContext<GigaTablesContextType>(defaultContextValue);

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: 'light' | 'dark' | ThemeConfig;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme = 'light' 
}) => {
  const [theme, setThemeState] = useState<ThemeConfig>(() => {
    if (typeof defaultTheme === 'object') {
      return { ...lightTheme, ...defaultTheme };
    }
    return defaultTheme === 'dark' ? darkTheme : lightTheme;
  });
  
  const [isDark, setIsDark] = useState(() => {
    if (typeof defaultTheme === 'object') {
      return false;
    }
    return defaultTheme === 'dark';
  });

  const setTheme = (newTheme: 'light' | 'dark' | ThemeConfig) => {
    if (typeof newTheme === 'object') {
      setThemeState({ ...lightTheme, ...newTheme });
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else if (newTheme === 'dark') {
      setThemeState(darkTheme);
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setThemeState(lightTheme);
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const value: GigaTablesContextType = {
    theme,
    setTheme,
    isDark,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
