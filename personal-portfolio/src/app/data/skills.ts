import { Skill, SkillCategory } from '../types';

export const skills: Skill[] = [
  { id: 1, name: 'Angular', icon: 'pi pi-code', category: 'frontend', level: 90 },
  { id: 2, name: 'React', icon: 'pi pi-react', category: 'frontend', level: 85 },
  { id: 3, name: 'TypeScript', icon: 'pi pi-file-code', category: 'frontend', level: 90 },
  { id: 4, name: 'JavaScript', icon: 'pi pi-file-code', category: 'frontend', level: 95 },
  { id: 5, name: 'HTML/CSS', icon: 'pi pi-palette', category: 'frontend', level: 90 },
  { id: 6, name: 'Tailwind CSS', icon: 'pi pi-palette', category: 'frontend', level: 85 },
  { id: 7, name: 'Vue.js', icon: 'pi pi-code', category: 'frontend', level: 75 },
  
  { id: 8, name: 'Node.js', icon: 'pi pi-server', category: 'backend', level: 80 },
  { id: 9, name: 'Express.js', icon: 'pi pi-server', category: 'backend', level: 75 },
  { id: 10, name: 'Python', icon: 'pi pi-code', category: 'backend', level: 70 },
  { id: 11, name: 'REST API', icon: 'pi pi-link', category: 'backend', level: 85 },
  { id: 12, name: 'GraphQL', icon: 'pi pi-link', category: 'backend', level: 70 },
  
  { id: 13, name: 'PostgreSQL', icon: 'pi pi-database', category: 'database', level: 75 },
  { id: 14, name: 'MongoDB', icon: 'pi pi-database', category: 'database', level: 70 },
  { id: 15, name: 'MySQL', icon: 'pi pi-database', category: 'database', level: 75 },
  { id: 16, name: 'Redis', icon: 'pi pi-database', category: 'database', level: 65 },
  
  { id: 17, name: 'Git', icon: 'pi pi-git', category: 'tools', level: 90 },
  { id: 18, name: 'Docker', icon: 'pi pi-box', category: 'tools', level: 70 },
  { id: 19, name: 'AWS', icon: 'pi pi-cloud', category: 'tools', level: 65 },
  { id: 20, name: 'Figma', icon: 'pi pi-pencil', category: 'tools', level: 75 },
  { id: 21, name: 'VS Code', icon: 'pi pi-code', category: 'tools', level: 95 },
  
  { id: 22, name: 'Problem Solving', icon: 'pi pi-lightbulb', category: 'other', level: 90 },
  { id: 23, name: 'Team Work', icon: 'pi pi-users', category: 'other', level: 85 },
  { id: 24, name: 'Communication', icon: 'pi pi-comments', category: 'other', level: 80 },
];

export const skillCategories: { value: SkillCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Skills' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'database', label: 'Database' },
  { value: 'tools', label: 'Tools' },
  { value: 'other', label: 'Other' },
];
