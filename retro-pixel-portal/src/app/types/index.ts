export interface RetroLink {
  id: number;
  title: string;
  url: string;
  description: string;
  category: LinkCategory;
  visits: number;
  createdYear: number;
}

export type LinkCategory = 
  | 'games' 
  | 'music' 
  | 'art' 
  | 'tech' 
  | 'social' 
  | 'humor' 
  | 'personal'
  | 'forum';

export interface GuestbookEntry {
  id: number;
  name: string;
  email?: string;
  message: string;
  timestamp: Date;
  website?: string;
}

export interface CounterItem {
  id: number;
  title: string;
  value: number;
}

export interface VisitorCounter {
  id: number;
  name: string;
  count: number;
}
