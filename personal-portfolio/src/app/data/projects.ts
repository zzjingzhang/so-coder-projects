import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured online shopping platform with cart management, product filtering, and secure checkout process.',
    type: 'Web Application',
    technologies: ['Angular', 'Node.js', 'MongoDB', 'Express'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800&h=600',
    demoUrl: 'https://demo.example.com/ecommerce',
    githubUrl: 'https://github.com/username/ecommerce'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management tool with real-time updates, drag-and-drop functionality, and team features.',
    type: 'SaaS Product',
    technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=800&h=600',
    demoUrl: 'https://demo.example.com/taskapp',
    githubUrl: 'https://github.com/username/taskapp'
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'Beautiful weather application with 7-day forecast, location search, and interactive data visualizations.',
    type: 'API Integration',
    technologies: ['Vue.js', 'Chart.js', 'OpenWeather API'],
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&q=80&w=800&h=600',
    demoUrl: 'https://demo.example.com/weather',
    githubUrl: 'https://github.com/username/weather'
  },
  {
    id: 4,
    title: 'Social Media Analytics',
    description: 'Comprehensive analytics dashboard for social media metrics with customizable reports and insights.',
    type: 'Dashboard',
    technologies: ['Angular', 'D3.js', 'PostgreSQL', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=600',
    demoUrl: 'https://demo.example.com/analytics',
    githubUrl: 'https://github.com/username/analytics'
  },
  {
    id: 5,
    title: 'AI Chat Assistant',
    description: 'Intelligent chatbot powered by AI with natural language processing and context-aware responses.',
    type: 'AI/ML Project',
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'React'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=600',
    demoUrl: 'https://demo.example.com/chatbot',
    githubUrl: 'https://github.com/username/chatbot'
  },
  {
    id: 6,
    title: 'Fitness Tracker',
    description: 'Mobile-first fitness application with workout tracking, progress charts, and personalized recommendations.',
    type: 'Mobile Web App',
    technologies: ['React Native', 'Redux', 'Node.js', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800&h=600',
    demoUrl: 'https://demo.example.com/fitness',
    githubUrl: 'https://github.com/username/fitness'
  }
];
