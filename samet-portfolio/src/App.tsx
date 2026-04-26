import { useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { StatsProvider, useStats } from './contexts/StatsContext';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import './App.css';

const PortfolioContent: React.FC = () => {
  const { incrementVisitor } = useStats();

  useEffect(() => {
    // Increment visitor count on initial load
    const hasVisitedToday = sessionStorage.getItem('hasVisitedToday');
    if (!hasVisitedToday) {
      incrementVisitor();
      sessionStorage.setItem('hasVisitedToday', 'true');
    }
  }, [incrementVisitor]);

  return (
    <div className="min-h-screen">
      {/* Animated Background */}
      <div className="bg-animated">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <StatsProvider>
          <PortfolioContent />
        </StatsProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
