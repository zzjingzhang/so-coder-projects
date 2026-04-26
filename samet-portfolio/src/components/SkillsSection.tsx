import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { skills } from '../data/skills';

const SkillsSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(skills.map(s => s.category)))];

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      'Languages': 'from-blue-500 to-blue-400',
      'Frontend': 'from-purple-500 to-purple-400',
      'Backend': 'from-pink-500 to-pink-400',
      'Database': 'from-green-500 to-green-400',
      'Cloud': 'from-yellow-500 to-yellow-400',
      'DevOps': 'from-red-500 to-red-400',
      'Tools': 'from-indigo-500 to-indigo-400'
    };
    return colors[category] || 'from-blue-500 to-purple-500';
  };

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {t.skills.title}
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white/50 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-black/10 dark:border-white/10 hover:bg-white/70 dark:hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="group p-6 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl hover:bg-white/90 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-900 dark:text-white font-medium">{skill.name}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
              </div>
              
              {/* Progress Bar */}
              <div className="h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getCategoryColor(skill.category)} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>

              {/* Category Badge */}
              <div className="mt-4">
                <span className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider">
                  {skill.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
