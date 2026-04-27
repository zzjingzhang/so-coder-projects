export interface Skill {
  id: number;
  name: string;
  icon: string;
  category: SkillCategory;
  level: number;
}

export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools' | 'other';

export interface Project {
  id: number;
  title: string;
  description: string;
  type: string;
  technologies: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
}

export interface NavItem {
  label: string;
  fragment: string;
}

export interface SocialLink {
  name: string;
  icon: string;
  url: string;
}
