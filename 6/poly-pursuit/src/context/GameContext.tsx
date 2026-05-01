import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { GameState, GameSettings, GameContextType } from '../types/game';

const initialGameState: GameState = {
  currentLevel: 1,
  totalScore: 0,
  totalEnergy: 0,
  collectedRelics: [],
  unlockedLevels: [1],
  playerSkins: ['default'],
  isPaused: false,
  isGameOver: false,
  isVictory: false,
  gameTime: 0,
};

const initialSettings: GameSettings = {
  soundEnabled: true,
  musicEnabled: true,
  difficulty: 'normal',
  currentSkin: 'default',
};

const GameContext = createContext<GameContextType | undefined>(undefined);

const STORAGE_KEY = 'poly-pursuit-save';

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [settings, setSettings] = useState<GameSettings>(initialSettings);

  const updateGameState = (updates: Partial<GameState>) => {
    setGameState((prev) => ({ ...prev, ...updates }));
  };

  const updateSettings = (updates: Partial<GameSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const resetGame = () => {
    setGameState(initialGameState);
  };

  const saveGame = () => {
    const saveData = { gameState, settings };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
  };

  const loadGame = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.gameState) setGameState(parsed.gameState);
        if (parsed.settings) setSettings(parsed.settings);
      } catch (e) {
        console.error('Failed to load save data:', e);
      }
    }
  };

  useEffect(() => {
    loadGame();
  }, []);

  useEffect(() => {
    saveGame();
  }, [gameState, settings]);

  return (
    <GameContext.Provider
      value={{
        gameState,
        settings,
        updateGameState,
        updateSettings,
        resetGame,
        loadGame,
        saveGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
