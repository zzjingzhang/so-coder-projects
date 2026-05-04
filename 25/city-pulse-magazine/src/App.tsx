import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import CategoryPage from './pages/CategoryPage';
import AboutPage from './pages/AboutPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-dark-bg">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/article/:id" element={<ArticleDetailPage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center bg-dark-bg">
                  <div className="text-center">
                    <h1 className="text-6xl sm:text-8xl font-bold font-display mb-4">
                      <span className="text-neon-pink text-shadow-neon-pink">4</span>
                      <span className="text-white">0</span>
                      <span className="text-neon-blue text-shadow-neon-blue">4</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-8">页面未找到</p>
                    <a
                      href="/"
                      className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold rounded-lg transition-all duration-300"
                      style={{
                        backgroundColor: '#ff00ff',
                        color: '#000000',
                      }}
                    >
                      返回首页
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
