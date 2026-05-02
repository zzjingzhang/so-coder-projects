import type { FileNode, Skill, Project, Experience, Education, LAGRule } from '@/types'

export const fileSystem: FileNode[] = [
  {
    name: 'src',
    type: 'folder',
    path: '/src',
    children: [
      {
        name: 'views',
        type: 'folder',
        path: '/src/views',
        children: [
          { name: 'HomeView.vue', type: 'file', path: '/src/views/HomeView.vue' },
          { name: 'ResumeView.vue', type: 'file', path: '/src/views/ResumeView.vue' },
          { name: 'SkillsView.vue', type: 'file', path: '/src/views/SkillsView.vue' },
          { name: 'ProjectsView.vue', type: 'file', path: '/src/views/ProjectsView.vue' },
          { name: 'ContactView.vue', type: 'file', path: '/src/views/ContactView.vue' },
          { name: 'LAGView.vue', type: 'file', path: '/src/views/LAGView.vue' }
        ]
      },
      {
        name: 'components',
        type: 'folder',
        path: '/src/components',
        children: [
          { name: 'Sidebar.vue', type: 'file', path: '/src/components/Sidebar.vue' },
          { name: 'Toolbar.vue', type: 'file', path: '/src/components/Toolbar.vue' },
          { name: 'Terminal.vue', type: 'file', path: '/src/components/Terminal.vue' },
          { name: 'TabBar.vue', type: 'file', path: '/src/components/TabBar.vue' },
          { name: 'CodeEditor.vue', type: 'file', path: '/src/components/CodeEditor.vue' }
        ]
      },
      {
        name: 'router',
        type: 'folder',
        path: '/src/router',
        children: [
          { name: 'index.ts', type: 'file', path: '/src/router/index.ts' }
        ]
      },
      {
        name: 'types',
        type: 'folder',
        path: '/src/types',
        children: [
          { name: 'index.ts', type: 'file', path: '/src/types/index.ts' }
        ]
      },
      {
        name: 'utils',
        type: 'folder',
        path: '/src/utils',
        children: [
          { name: 'terminalCommands.ts', type: 'file', path: '/src/utils/terminalCommands.ts' },
          { name: 'lexerGenerator.ts', type: 'file', path: '/src/utils/lexerGenerator.ts' }
        ]
      },
      { name: 'App.vue', type: 'file', path: '/src/App.vue' },
      { name: 'main.ts', type: 'file', path: '/src/main.ts' },
      { name: 'style.css', type: 'file', path: '/src/style.css' }
    ]
  },
  {
    name: 'public',
    type: 'folder',
    path: '/public',
    children: [
      { name: 'favicon.svg', type: 'file', path: '/public/favicon.svg' },
      { name: 'icons.svg', type: 'file', path: '/public/icons.svg' }
    ]
  },
  { name: 'package.json', type: 'file', path: '/package.json' },
  { name: 'vite.config.ts', type: 'file', path: '/vite.config.ts' },
  { name: 'tsconfig.json', type: 'file', path: '/tsconfig.json' },
  { name: 'tailwind.config.js', type: 'file', path: '/tailwind.config.js' },
  { name: 'README.md', type: 'file', path: '/README.md' }
]

export const skills: Skill[] = [
  { name: 'Vue.js', level: 90, category: 'Frontend', icon: 'vue' },
  { name: 'React', level: 85, category: 'Frontend', icon: 'react' },
  { name: 'TypeScript', level: 88, category: 'Language', icon: 'ts' },
  { name: 'JavaScript', level: 92, category: 'Language', icon: 'js' },
  { name: 'Node.js', level: 80, category: 'Backend', icon: 'node' },
  { name: 'Python', level: 75, category: 'Language', icon: 'python' },
  { name: 'Tailwind CSS', level: 85, category: 'Frontend', icon: 'css' },
  { name: 'Docker', level: 70, category: 'DevOps', icon: 'docker' },
  { name: 'Git', level: 85, category: 'Tool', icon: 'git' },
  { name: 'PostgreSQL', level: 75, category: 'Database', icon: 'db' }
]

export const projects: Project[] = [
  {
    id: '1',
    name: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with Vue.js frontend and Node.js backend. Features include user authentication, product catalog, shopping cart, and payment integration.',
    technologies: ['Vue.js', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Docker'],
    github: 'https://github.com/example/ecommerce',
    link: 'https://ecommerce.example.com'
  },
  {
    id: '2',
    name: 'Task Management App',
    description: 'A modern task management application with real-time collaboration features. Built with React and Firebase for seamless team coordination.',
    technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS', 'Redux'],
    github: 'https://github.com/example/task-app',
    link: 'https://taskapp.example.com'
  },
  {
    id: '3',
    name: 'Lexical Analyzer Generator (LAG)',
    description: 'A powerful lexical analyzer generator that takes regular expression rules and generates a complete lexer. Supports custom token types and actions.',
    technologies: ['TypeScript', 'Vue.js', 'Regular Expressions', 'Finite Automata'],
    github: 'https://github.com/example/lag',
    link: 'https://lag.example.com'
  },
  {
    id: '4',
    name: 'Weather Dashboard',
    description: 'A beautiful weather dashboard that displays real-time weather data with interactive charts and forecasts. Integrates with multiple weather APIs.',
    technologies: ['Vue.js', 'Chart.js', 'OpenWeatherMap API', 'Tailwind CSS'],
    github: 'https://github.com/example/weather-dash',
    link: 'https://weather.example.com'
  }
]

export const experiences: Experience[] = [
  {
    company: 'TechCorp Inc.',
    position: 'Senior Frontend Developer',
    period: '2022 - Present',
    description: [
      'Lead development of company\'s flagship product using Vue.js 3 and TypeScript',
      'Mentored junior developers and conducted code reviews',
      'Optimized application performance, reducing load time by 40%',
      'Implemented CI/CD pipelines and automated testing workflows'
    ],
    technologies: ['Vue.js', 'TypeScript', 'Node.js', 'Docker', 'AWS']
  },
  {
    company: 'StartupXYZ',
    position: 'Full Stack Developer',
    period: '2020 - 2022',
    description: [
      'Developed and maintained multiple web applications using React and Node.js',
      'Designed and implemented RESTful APIs and database schemas',
      'Collaborated with product team to define features and user stories',
      'Integrated third-party services including payment gateways and analytics'
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL']
  },
  {
    company: 'Digital Agency',
    position: 'Junior Web Developer',
    period: '2018 - 2020',
    description: [
      'Built responsive websites for various clients using HTML, CSS, and JavaScript',
      'Maintained and updated existing client websites',
      'Collaborated with designers to implement pixel-perfect UI',
      'Learned modern frontend frameworks and best practices'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'WordPress']
  }
]

export const education: Education[] = [
  {
    school: 'University of Technology',
    degree: 'Bachelor of Computer Science',
    period: '2014 - 2018',
    description: 'Specialized in Software Engineering with focus on web technologies and algorithms. Graduated with honors.'
  },
  {
    school: 'Tech Academy',
    degree: 'Full Stack Web Development Bootcamp',
    period: '2017',
    description: 'Intensive 12-week program covering modern web development technologies including React, Node.js, and database design.'
  }
]

export const defaultLAGRules: LAGRule[] = [
  { name: 'KEYWORD', pattern: 'if|else|while|for|function|return|var|let|const', action: 'KEYWORD' },
  { name: 'IDENTIFIER', pattern: '[a-zA-Z_][a-zA-Z0-9_]*', action: 'IDENTIFIER' },
  { name: 'NUMBER', pattern: '\\d+(\\.\\d+)?', action: 'NUMBER' },
  { name: 'STRING', pattern: '"[^"]*"|\'[^\']*\'', action: 'STRING' },
  { name: 'OPERATOR', pattern: '\\+|-|\\*|/|=|==|!=|<|>|<=|>=', action: 'OPERATOR' },
  { name: 'WHITESPACE', pattern: '\\s+', action: 'SKIP' },
  { name: 'COMMENT', pattern: '//.*', action: 'SKIP' }
]

export const sampleCode = `function calculateSum(a, b) {
  // This is a comment
  let result = a + b;
  
  if (result > 10) {
    return result * 2;
  } else {
    return result;
  }
}

const x = 42;
const y = 3.14;
let message = "Hello, World!";
`
