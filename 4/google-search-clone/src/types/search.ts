export interface SearchResult {
  title: string;
  url: string;
  displayLink: string;
  snippet: string;
  thumbnail?: string;
}

export interface SearchResponse {
  results: SearchResult[];
  totalResults: number;
  searchTime: number;
}
