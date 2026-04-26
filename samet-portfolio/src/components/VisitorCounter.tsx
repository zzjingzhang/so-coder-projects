import React from 'react';
import { useStats } from '../contexts/StatsContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Users, Eye } from 'lucide-react';

const VisitorCounter: React.FC = () => {
  const { stats } = useStats();
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
        <Users size={16} className="text-blue-400" />
        <span className="text-gray-200">
          {t.visitors.total}: <span className="font-semibold text-white">{stats.totalVisitors.toLocaleString()}</span>
        </span>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
        <Eye size={16} className="text-green-400" />
        <span className="text-gray-200">
          {t.visitors.today}: <span className="font-semibold text-white">{stats.todayVisitors.toLocaleString()}</span>
        </span>
      </div>
    </div>
  );
};

export default VisitorCounter;
