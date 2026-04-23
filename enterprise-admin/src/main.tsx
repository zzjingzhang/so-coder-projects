import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider, App as AntApp } from 'antd';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import AppRouter from './router';
import './index.css';

const RootComponent: React.FC = () => {
  const { themeConfig } = useTheme();
  
  return (
    <ConfigProvider theme={themeConfig}>
      <AntApp>
        <AppRouter />
      </AntApp>
    </ConfigProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RootComponent />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
