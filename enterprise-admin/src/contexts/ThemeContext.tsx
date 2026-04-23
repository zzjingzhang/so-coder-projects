import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { ThemeConfig } from 'antd';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  themeConfig: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const themeConfig: ThemeConfig = useMemo(() => ({
    token: {
      colorPrimary: '#1677ff',
      borderRadius: 8,
    },
    algorithm: isDark ? undefined : undefined,
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
