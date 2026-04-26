export type Language = 'en' | 'tr';

export interface Translation {
  nav: {
    about: string;
    experience: string;
    projects: string;
    skills: string;
    contact: string;
  };
  hero: {
    greeting: string;
    name: string;
    title: string;
    description: string;
    viewResume: string;
    downloadResume: string;
  };
  about: {
    title: string;
    content: string;
  };
  experience: {
    title: string;
    items: ExperienceItem[];
  };
  projects: {
    title: string;
    viewLink: string;
  };
  skills: {
    title: string;
  };
  contact: {
    title: string;
    name: string;
    email: string;
    message: string;
    send: string;
  };
  visitors: {
    total: string;
    today: string;
  };
  resume: {
    views: string;
    downloads: string;
  };
  notFound: {
    title: string;
    message: string;
    backHome: string;
  };
}

export interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  clicks: number;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Stats {
  totalVisitors: number;
  todayVisitors: number;
  resumeViews: {
    en: number;
    tr: number;
  };
  resumeDownloads: {
    en: number;
    tr: number;
  };
  projectClicks: Record<string, number>;
}
