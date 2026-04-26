import './BoostCTA.css';

const BoostCTA = () => {
  const handleGetStarted = () => {
    const urlShortenerSection = document.getElementById('url-shortener-form');
    if (urlShortenerSection) {
      urlShortenerSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="boost-cta">
      <div className="boost-cta-container">
        <h2 className="boost-title">Boost your links today</h2>
        <button className="boost-btn" onClick={handleGetStarted}>Get Started</button>
      </div>
    </section>
  );
};

export default BoostCTA;
