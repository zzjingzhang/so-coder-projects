import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">More than just shorter links</h1>
          <p className="hero-description">
            Build your brand's recognition and get detailed insights on how your links are performing.
          </p>
          <button className="hero-cta-btn">Get Started</button>
        </div>
        <div className="hero-image">
          <img src="/assets/illustration-working.svg" alt="Working illustration" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
