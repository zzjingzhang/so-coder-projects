import './Pricing.css';

const Pricing = () => {
  const handleGetStarted = () => {
    const urlShortenerSection = document.getElementById('url-shortener-form');
    if (urlShortenerSection) {
      urlShortenerSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const plans = [
    {
      id: '1',
      name: 'Free',
      price: '$0',
      period: '/month',
      features: [
        '100 URL shortenings/month',
        'Basic analytics',
        'Standard support',
      ],
      isPopular: false,
    },
    {
      id: '2',
      name: 'Pro',
      price: '$19',
      period: '/month',
      features: [
        '10,000 URL shortenings/month',
        'Advanced analytics',
        'Custom branded domains',
        'Priority support',
      ],
      isPopular: true,
    },
    {
      id: '3',
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      features: [
        'Unlimited URL shortenings',
        'Full analytics suite',
        'Multiple custom domains',
        '24/7 dedicated support',
        'API access',
      ],
      isPopular: false,
    },
  ];

  return (
    <section id="pricing" className="pricing">
      <div className="pricing-container">
        <div className="pricing-header">
          <h2 className="pricing-title">Simple, transparent pricing</h2>
          <p className="pricing-description">
            No hidden fees. No long-term contracts. Choose the plan that fits your needs.
          </p>
        </div>
        
        <div className="pricing-cards">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`pricing-card ${plan.isPopular ? 'popular' : ''}`}
            >
              {plan.isPopular && (
                <div className="popular-badge">Most Popular</div>
              )}
              <div className="pricing-card-header">
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-price">
                  <span className="price">{plan.price}</span>
                  <span className="period">{plan.period}</span>
                </div>
              </div>
              
              <ul className="plan-features">
                {plan.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <span className="check-icon">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button 
                className={`plan-cta-btn ${plan.isPopular ? 'popular' : ''}`}
                onClick={handleGetStarted}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
