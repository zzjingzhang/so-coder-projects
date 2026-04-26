import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UrlShortener from './components/UrlShortener';
import AdvancedStatistics from './components/AdvancedStatistics';
import BoostCTA from './components/BoostCTA';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <UrlShortener />
        <AdvancedStatistics />
        <BoostCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
