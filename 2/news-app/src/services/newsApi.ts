import type { Source, Article, NewsApiResponse } from '../types';

// NewsAPI 密钥占位符. 
// 请替换为您的实际 API 密钥，可从 https://newsapi.org 获取
const API_KEY = 'YOUR_NEWSAPI_KEY_HERE';
const BASE_URL = 'https://newsapi.org/v2';

// 模拟数据，当没有真实 API 密钥时使用
const mockSources: Source[] = [
  { id: 'bbc-news', name: 'BBC News', description: 'BBC News provides trusted World and UK news', category: 'general', language: 'en', country: 'gb' },
  { id: 'cnn', name: 'CNN', description: 'Cable News Network', category: 'general', language: 'en', country: 'us' },
  { id: 'the-verge', name: 'The Verge', description: 'Technology news and culture', category: 'technology', language: 'en', country: 'us' },
  { id: 'techcrunch', name: 'TechCrunch', description: 'Startup and technology news', category: 'technology', language: 'en', country: 'us' },
  { id: 'reuters', name: 'Reuters', description: 'World news and financial information', category: 'general', language: 'en', country: 'us' },
  { id: 'associated-press', name: 'Associated Press', description: 'The Associated Press is an independent, not-for-profit news cooperative', category: 'general', language: 'en', country: 'us' },
  { id: 'bloomberg', name: 'Bloomberg', description: 'Business and market news', category: 'business', language: 'en', country: 'us' },
  { id: 'espn', name: 'ESPN', description: 'Sports news and scores', category: 'sports', language: 'en', country: 'us' },
];

const mockArticles: Article[] = [
  {
    source: { id: 'bbc-news', name: 'BBC News' },
    author: 'BBC News',
    title: 'Global Climate Summit Reaches Historic Agreement on Emissions Reduction',
    description: 'World leaders have agreed to ambitious new targets for reducing carbon emissions by 2030, marking a significant step forward in the fight against climate change.',
    url: 'https://www.bbc.com/news/climate-change-12345678',
    urlToImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=global%20climate%20summit%20world%20leaders%20meeting%20conference%20hall&image_size=landscape_16_9',
    publishedAt: new Date().toISOString(),
    content: 'The agreement includes commitments from over 190 countries...'
  },
  {
    source: { id: 'cnn', name: 'CNN' },
    author: 'CNN Tech',
    title: 'Major Tech Company Announces Revolutionary AI Assistant',
    description: 'A leading technology company has unveiled its latest artificial intelligence product that promises to transform how we interact with digital devices.',
    url: 'https://www.cnn.com/tech/ai-assistant-12345678',
    urlToImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=artificial%20intelligence%20ai%20assistant%20technology%20innovation&image_size=landscape_16_9',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    content: 'The new AI assistant features advanced natural language processing...'
  },
  {
    source: { id: 'the-verge', name: 'The Verge' },
    author: 'The Verge Staff',
    title: 'Next-Gen Smartphone Features Revolutionary Display Technology',
    description: 'The latest flagship smartphone introduces a groundbreaking display that offers unprecedented clarity and energy efficiency.',
    url: 'https://www.theverge.com/2024/smartphone-display-tech',
    urlToImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20smartphone%20futuristic%20display%20technology%20innovation&image_size=landscape_16_9',
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    content: 'This new display technology uses micro-LED with quantum dots...'
  },
  {
    source: { id: 'techcrunch', name: 'TechCrunch' },
    author: 'TechCrunch',
    title: 'Startup Raises Record Funding Round for Sustainable Energy Solutions',
    description: 'A promising clean energy startup has secured the largest ever Series A funding round for a company in the sustainable technology sector.',
    url: 'https://techcrunch.com/clean-energy-startup-funding',
    urlToImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=solar%20panels%20wind%20turbines%20clean%20energy%20sustainable%20technology&image_size=landscape_16_9',
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    content: 'The funding will be used to scale production of their innovative battery technology...'
  },
  {
    source: { id: 'reuters', name: 'Reuters' },
    author: 'Reuters',
    title: 'Global Markets React Positively to Economic Recovery Signs',
    description: 'Stock markets around the world showed significant gains as economic indicators suggest a strong recovery is underway.',
    url: 'https://www.reuters.com/markets/global-economy-recovery',
    urlToImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=stock%20market%20trading%20floor%20financial%20charts%20economic%20growth&image_size=landscape_16_9',
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    content: 'Major indices reached all-time highs following positive employment data...'
  },
  {
    source: { id: 'bloomberg', name: 'Bloomberg' },
    author: 'Bloomberg News',
    title: 'Central Banks Signal Potential Interest Rate Cuts in Coming Months',
    description: 'Several major central banks have indicated they may begin reducing interest rates as inflation shows signs of cooling.',
    url: 'https://www.bloomberg.com/economy/interest-rates',
    urlToImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=central%20bank%20building%20financial%20district%20money%20currency&image_size=landscape_16_9',
    publishedAt: new Date(Date.now() - 18000000).toISOString(),
    content: 'Analysts predict the first rate cuts could come as early as next quarter...'
  },
];

export const newsApiService = {
  async getSources(): Promise<Source[]> {
    if (API_KEY === 'YOUR_NEWSAPI_KEY_HERE') {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockSources), 500);
      });
    }

    try {
      const response = await fetch(`${BASE_URL}/top-headlines/sources?apiKey=${API_KEY}`);
      const data: NewsApiResponse = await response.json();
      
      if (data.status === 'ok' && data.sources) {
        return data.sources;
      }
      return mockSources;
    } catch (error) {
      console.error('Error fetching sources:', error);
      return mockSources;
    }
  },

  async getTopHeadlines(source?: string): Promise<Article[]> {
    if (API_KEY === 'YOUR_NEWSAPI_KEY_HERE') {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockArticles), 800);
      });
    }

    try {
      let url = `${BASE_URL}/top-headlines?apiKey=${API_KEY}`;
      
      if (source) {
        url += `&sources=${source}`;
      } else {
        url += '&country=us';
      }

      const response = await fetch(url);
      const data: NewsApiResponse = await response.json();
      
      if (data.status === 'ok' && data.articles) {
        return data.articles;
      }
      return mockArticles;
    } catch (error) {
      console.error('Error fetching articles:', error);
      return mockArticles;
    }
  },

  getMockSources(): Source[] {
    return mockSources;
  },

  getMockArticles(): Article[] {
    return mockArticles;
  }
};
