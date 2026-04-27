export const techIconMap: Record<string, { icon: string; color: string; bgColor: string }> = {
  'Angular': {
    icon: 'pi pi-code',
    color: '#DD0031',
    bgColor: '#FFF5F7'
  },
  'React': {
    icon: 'pi pi-react',
    color: '#61DAFB',
    bgColor: '#E8FBFF'
  },
  'React Native': {
    icon: 'pi pi-react',
    color: '#61DAFB',
    bgColor: '#E8FBFF'
  },
  'Vue.js': {
    icon: 'pi pi-code',
    color: '#4FC08D',
    bgColor: '#E8FFF3'
  },
  'TypeScript': {
    icon: 'pi pi-file-code',
    color: '#3178C6',
    bgColor: '#EBF3FF'
  },
  'JavaScript': {
    icon: 'pi pi-file-code',
    color: '#F7DF1E',
    bgColor: '#FFFDE8'
  },
  'Node.js': {
    icon: 'pi pi-server',
    color: '#339933',
    bgColor: '#E8FFF3'
  },
  'Express': {
    icon: 'pi pi-server',
    color: '#000000',
    bgColor: '#F5F5F5'
  },
  'FastAPI': {
    icon: 'pi pi-link',
    color: '#009688',
    bgColor: '#E8FFF9'
  },
  'MongoDB': {
    icon: 'pi pi-database',
    color: '#47A248',
    bgColor: '#E8FFF3'
  },
  'PostgreSQL': {
    icon: 'pi pi-database',
    color: '#336791',
    bgColor: '#EBF3FF'
  },
  'Firebase': {
    icon: 'pi pi-cloud',
    color: '#FFCA28',
    bgColor: '#FFFDE8'
  },
  'Tailwind CSS': {
    icon: 'pi pi-palette',
    color: '#06B6D4',
    bgColor: '#E8FBFF'
  },
  'Chart.js': {
    icon: 'pi pi-chart-line',
    color: '#FF6384',
    bgColor: '#FFF5F7'
  },
  'D3.js': {
    icon: 'pi pi-chart-bar',
    color: '#F9A03C',
    bgColor: '#FFF8EB'
  },
  'Redux': {
    icon: 'pi pi-sync',
    color: '#764ABC',
    bgColor: '#F5F0FF'
  },
  'Python': {
    icon: 'pi pi-code',
    color: '#3776AB',
    bgColor: '#EBF3FF'
  },
  'TensorFlow': {
    icon: 'pi pi-bolt',
    color: '#FF6F00',
    bgColor: '#FFF8EB'
  },
  'OpenWeather API': {
    icon: 'pi pi-cloud',
    color: '#EB6E4B',
    bgColor: '#FFF5F2'
  },
  'HTML/CSS': {
    icon: 'pi pi-palette',
    color: '#E34F26',
    bgColor: '#FFF5F2'
  },
  'Git': {
    icon: 'pi pi-git',
    color: '#F05032',
    bgColor: '#FFF5F2'
  },
  'Docker': {
    icon: 'pi pi-box',
    color: '#2496ED',
    bgColor: '#EBF3FF'
  },
  'AWS': {
    icon: 'pi pi-cloud',
    color: '#FF9900',
    bgColor: '#FFF8EB'
  },
  'GraphQL': {
    icon: 'pi pi-link',
    color: '#E10098',
    bgColor: '#FFF5FA'
  },
  'REST API': {
    icon: 'pi pi-link',
    color: '#6B7280',
    bgColor: '#F3F4F6'
  }
};

export const socialIconMap: Record<string, string> = {
  'GitHub': 'pi pi-github',
  'LinkedIn': 'pi pi-linkedin',
  'Twitter': 'pi pi-twitter',
  'X': 'pi pi-twitter',
  'Dribbble': 'pi pi-dribbble',
  'Instagram': 'pi pi-instagram',
  'Facebook': 'pi pi-facebook',
  'YouTube': 'pi pi-youtube',
  'TikTok': 'pi pi-video',
  'Email': 'pi pi-envelope'
};

export function getTechIcon(tech: string): { icon: string; color: string; bgColor: string } {
  const normalizedTech = Object.keys(techIconMap).find(
    key => key.toLowerCase() === tech.toLowerCase()
  );
  
  if (normalizedTech && techIconMap[normalizedTech]) {
    return techIconMap[normalizedTech];
  }
  
  return {
    icon: 'pi pi-code',
    color: '#6B7280',
    bgColor: '#F3F4F6'
  };
}

export function getSocialIcon(name: string): string {
  const normalizedName = Object.keys(socialIconMap).find(
    key => key.toLowerCase() === name.toLowerCase()
  );
  
  if (normalizedName && socialIconMap[normalizedName]) {
    return socialIconMap[normalizedName];
  }
  
  return 'pi pi-link';
}
