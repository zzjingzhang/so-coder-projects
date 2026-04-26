import type { StatCard } from '../types';
import './AdvancedStatistics.css';

const statsCards: StatCard[] = [
  {
    id: '1',
    title: 'Brand Recognition',
    description: 'Boost your brand recognition with each click. Generic links don\'t mean a thing. Branded links help instil confidence in your content.',
    icon: '/assets/icon-brand-recognition.svg',
  },
  {
    id: '2',
    title: 'Detailed Records',
    description: 'Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.',
    icon: '/assets/icon-detailed-records.svg',
  },
  {
    id: '3',
    title: 'Fully Customizable',
    description: 'Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.',
    icon: '/assets/icon-fully-customizable.svg',
  },
];

const AdvancedStatistics = () => {
  return (
    <section id="features" className="advanced-statistics">
      <div className="advanced-statistics-container">
        <div className="statistics-header">
          <h2 className="statistics-title">Advanced Statistics</h2>
          <p className="statistics-description">
            Track how your links are performing across the web with our advanced statistics dashboard.
          </p>
        </div>
        
        <div className="statistics-cards">
          {statsCards.map((card, index) => (
            <div 
              key={card.id} 
              className={`statistics-card ${index === 1 ? 'card-middle' : ''} ${index === 2 ? 'card-last' : ''}`}
            >
              <div className="card-icon">
                <img src={card.icon} alt={card.title} />
              </div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
            </div>
          ))}
          <div className="card-connector-line"></div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedStatistics;
