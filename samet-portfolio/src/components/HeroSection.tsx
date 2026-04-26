import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useStats } from '../contexts/StatsContext';
import { FileText, Download, Eye } from 'lucide-react';

const HeroSection: React.FC = () => {
  const { language, t } = useLanguage();
  const { stats, incrementResumeView, incrementResumeDownload } = useStats();
  const [showResume, setShowResume] = useState(false);

  const handleViewResume = () => {
    incrementResumeView(language);
    setShowResume(true);
  };

  const handleDownloadResume = () => {
    incrementResumeDownload(language);
    // Simulate download - in real app, this would download a PDF
    const link = document.createElement('a');
    link.href = '#';
    link.download = `Samet_Soysal_Resume_${language.toUpperCase()}.pdf`;
    // link.click(); // Uncomment in real app with actual PDF
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center md:text-left order-2 md:order-1">
            <p className="text-blue-500 text-lg mb-2 font-medium">
              {t.hero.greeting}
            </p>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {t.hero.name}
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-6 font-light">
              {t.hero.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
              {t.hero.description}
            </p>

            {/* Resume Buttons */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button
                onClick={handleViewResume}
                className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                <Eye size={20} />
                {t.hero.viewResume}
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  {stats.resumeViews[language]} {t.resume.views}
                </span>
              </button>
              <button
                onClick={handleDownloadResume}
                className="group flex items-center gap-2 px-6 py-3 bg-white/70 dark:bg-white/10 backdrop-blur-md border border-black/20 dark:border-white/20 rounded-full text-gray-900 dark:text-white font-medium hover:bg-white/90 dark:hover:bg-white/20 transition-all duration-300"
              >
                <Download size={20} />
                {t.hero.downloadResume}
                <span className="text-xs bg-black/10 dark:bg-white/20 px-2 py-0.5 rounded-full">
                  {stats.resumeDownloads[language]} {t.resume.downloads}
                </span>
              </button>
            </div>
          </div>

          {/* Right side - Profile Image / Glass Card */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              {/* Background glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-30"></div>
              
              {/* Main profile card */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden">
                {/* Gradient circle background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"></div>
                
                {/* Profile placeholder - using initials */}
                <div className="relative z-10 text-center">
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl">
                    <span className="text-6xl md:text-8xl font-bold text-white">SS</span>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500/50 rounded-full animate-pulse"></div>
                <div className="absolute bottom-8 left-4 w-6 h-6 bg-purple-500/50 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute top-1/3 left-6 w-4 h-4 bg-pink-500/50 rounded-full animate-pulse delay-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Modal */}
      {showResume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white/90 dark:bg-white/10 backdrop-blur-xl border border-black/20 dark:border-white/20 rounded-3xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-black/10 dark:border-white/10">
              <div className="flex items-center gap-3">
                <FileText className="text-blue-500" size={24} />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {language === 'en' ? 'Resume - Samet Soysal' : 'Özgeçmiş - Samet Soysal'}
                </h3>
              </div>
              <button
                onClick={() => setShowResume(false)}
                className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
              <div className="text-gray-900 dark:text-white space-y-8">
                {/* Personal Info */}
                <div>
                  <h4 className="text-2xl font-bold text-blue-500 mb-2">Samet Soysal</h4>
                  <p className="text-gray-700 dark:text-gray-300">Full Stack Developer</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    {language === 'en' 
                      ? 'Istanbul, Turkey | contact@sametsoysal.com | +90 555 123 4567'
                      : 'İstanbul, Türkiye | contact@sametsoysal.com | +90 555 123 4567'}
                  </p>
                </div>

                {/* Summary */}
                <div>
                  <h5 className="text-lg font-semibold text-purple-500 mb-2">
                    {language === 'en' ? 'Professional Summary' : 'Profesyonel Özet'}
                  </h5>
                  <p className="text-gray-700 dark:text-gray-300">
                    {language === 'en'
                      ? 'Experienced Full Stack Developer with 5+ years of expertise in building modern web applications. Proficient in React, TypeScript, Node.js, and cloud technologies. Passionate about creating elegant solutions to complex problems.'
                      : 'Modern web uygulamaları geliştirmede 5+ yıllık deneyime sahip deneyimli Full Stack Geliştirici. React, TypeScript, Node.js ve bulut teknolojilerinde uzman. Karmaşık sorunlara zarif çözümler üretmek için tutkulu.'}
                  </p>
                </div>

                {/* Experience */}
                <div>
                  <h5 className="text-lg font-semibold text-purple-500 mb-3">
                    {language === 'en' ? 'Experience' : 'Deneyim'}
                  </h5>
                  <div className="space-y-4">
                    {t.experience.items.map((item, index) => (
                      <div key={index} className="pl-4 border-l-2 border-blue-500/50">
                        <h6 className="font-semibold text-gray-900 dark:text-white">{item.position}</h6>
                        <p className="text-blue-500 text-sm">{item.company} | {item.period}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h5 className="text-lg font-semibold text-purple-500 mb-3">
                    {language === 'en' ? 'Skills' : 'Yetenekler'}
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Node.js', 'Python', 'Vue.js', 'Next.js', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Git'].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-black/10 dark:bg-white/10 rounded-full text-sm text-gray-700 dark:text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Download button in modal */}
                <div className="pt-4">
                  <button
                    onClick={handleDownloadResume}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium"
                  >
                    <Download size={20} />
                    {t.hero.downloadResume}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
