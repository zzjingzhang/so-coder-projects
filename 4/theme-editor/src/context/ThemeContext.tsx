import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ColorPalette } from '../types/theme';
import { defaultTheme } from '../theme/defaultTheme';

interface ThemeContextType {
  theme: ColorPalette;
  updateColor: (group: string, key: string, color: string) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ColorPalette>(defaultTheme);

  const updateColor = (group: string, key: string, color: string) => {
    setTheme(prev => ({
      ...prev,
      [group]: {
        ...prev[group as keyof ColorPalette],
        [key]: color,
      },
    }));
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateColor, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
