import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const [smallText, setSmallText] = useLocalStorage('smallText', false);
  const [deleteConfirm, setDeleteConfirm] = useLocalStorage('deleteConfirm', true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    if (smallText) {
      document.body.classList.add('small-text');
    } else {
      document.body.classList.remove('small-text');
    }
  }, [smallText]);

  return (
    <SettingsContext.Provider
      value={{
        darkMode,
        setDarkMode,
        smallText,
        setSmallText,
        deleteConfirm,
        setDeleteConfirm,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}