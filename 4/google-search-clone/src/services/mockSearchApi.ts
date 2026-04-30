import { generateMockResults } from '../data/mockData';
import type { SearchResponse } from '../types/search';

export const mockSearchApi = async (query: string): Promise<SearchResponse> => {
  const delay = Math.random() * 500 + 200;
  
  await new Promise(resolve => setTimeout(resolve, delay));
  
  const results = generateMockResults(query);
  const searchTime = parseFloat((delay / 1000).toFixed(3));
  const totalResults = Math.floor(Math.random() * 1000000) + 100000;

  return {
    results,
    totalResults,
    searchTime
  };
};
