import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Stats, Language } from '../types';

const getInitialStats = (): Stats => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('portfolio-stats');
    if (saved) {
      return JSON.parse(saved);
    }
  }
  return {
    totalVisitors: 0,
    todayVisitors: 0,
    resumeViews: { en: 0, tr: 0 },
    resumeDownloads: { en: 0, tr: 0 },
    projectClicks: {}
  };
};

interface StatsContextType {
  stats: Stats;
  incrementVisitor: () => void;
  incrementResumeView: (lang: Language) => void;
  incrementResumeDownload: (lang: Language) => void;
  incrementProjectClick: (projectId: string) => void;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const StatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<Stats>(getInitialStats);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-stats', JSON.stringify(stats));
    }
  }, [stats]);

  const incrementVisitor = useCallback(() => {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('portfolio-last-visit');
    
    setStats(prev => {
      const newStats = { ...prev };
      newStats.totalVisitors += 1;
      
      if (lastVisit !== today) {
        newStats.todayVisitors += 1;
        localStorage.setItem('portfolio-last-visit', today);
      }
      
      return newStats;
    });
  }, []);

  const incrementResumeView = useCallback((lang: Language) => {
    setStats(prev => ({
      ...prev,
      resumeViews: {
        ...prev.resumeViews,
        [lang]: prev.resumeViews[lang] + 1
      }
    }));
  }, []);

  const incrementResumeDownload = useCallback((lang: Language) => {
    setStats(prev => ({
      ...prev,
      resumeDownloads: {
        ...prev.resumeDownloads,
        [lang]: prev.resumeDownloads[lang] + 1
      }
    }));
  }, []);

  const incrementProjectClick = useCallback((projectId: string) => {
    setStats(prev => ({
      ...prev,
      projectClicks: {
        ...prev.projectClicks,
        [projectId]: (prev.projectClicks[projectId] || 0) + 1
      }
    }));
  }, []);

  return (
    <StatsContext.Provider 
      value={{ 
        stats, 
        incrementVisitor, 
        incrementResumeView, 
        incrementResumeDownload, 
        incrementProjectClick 
      }}
    >
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => {
  const context = useContext(StatsContext);
  if (context === undefined) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
};
