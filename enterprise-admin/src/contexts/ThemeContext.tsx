import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { theme } from 'antd';

const { defaultAlgorithm, darkAlgorithm } = theme;

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  themeConfig: {
    token?: {
      colorPrimary?: string;
      borderRadius?: number;
    };
    algorithm?: typeof defaultAlgorithm | typeof darkAlgorithm | (typeof defaultAlgorithm | typeof darkAlgorithm)[];
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const themeConfig = useMemo(() => ({
    token: {
      colorPrimary: '#1677ff',
      borderRadius: 8,
    },
    algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
  }), [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, themeConfig }}>
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
