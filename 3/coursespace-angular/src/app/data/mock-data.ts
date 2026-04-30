import {
  NavItem,
  Stat,
  Feature,
  Course,
  Testimonial,
  Mentor,
  SocialLink,
  FooterColumn,
  CompanyInfo
} from '../models/types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '/', fragment: 'hero' },
  { id: 'courses', label: 'Courses', href: '/', fragment: 'courses' },
  { id: 'testimonial', label: 'Testimonial', href: '/', fragment: 'testimonials' },
  { id: 'mentor', label: 'Mentor', href: '/', fragment: 'mentors' },
];

export const STATS: Stat[] = [
  { id: '1', value: '15K+', label: 'Students' },
  { id: '2', value: '500+', label: 'Quality Course' },
  { id: '3', value: '100+', label: 'Experience Mentors' },
];

export const FEATURES: Feature[] = [
  {
    id: '1',
    icon: 'book',
    title: 'Interactive Learning',
    description: 'Engage with interactive content and hands-on exercises designed for effective learning.',
    progress: 85
  },
  {
    id: '2',
    icon: 'user-check',
    title: 'Expert Instructors',
    description: 'Learn from industry experts with years of real-world experience.',
    progress: 92
  },
  {
    id: '3',
    icon: 'clock',
    title: 'Self-Paced Learning',
    description: 'Learn at your own pace with lifetime access to course materials.',
    progress: 78
  },
  {
    id: '4',
    icon: 'certificate',
    title: 'Certification',
    description: 'Earn recognized certificates to showcase your skills and boost your career.',
    progress: 88
  },
];

export const POPULAR_COURSES: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    instructor: 'Sarah Johnson',
    image: 'https://picsum.photos/seed/course1/400/250',
    rating: 4.8,
    ratingCount: 2340,
    price: 99,
    category: 'Development'
  },
  {
    id: '2',
    title: 'Advanced JavaScript Mastery',
    instructor: 'Michael Chen',
    image: 'https://picsum.photos/seed/course2/400/250',
    rating: 4.9,
    ratingCount: 1876,
    price: 79,
    category: 'JavaScript'
  },
  {
    id: '3',
    title: 'React & TypeScript for Beginners',
    instructor: 'Emma Wilson',
    image: 'https://picsum.photos/seed/course3/400/250',
    rating: 4.7,
    ratingCount: 3210,
    price: 89,
    category: 'React'
  },
  {
    id: '4',
    title: 'Python Data Science Essentials',
    instructor: 'David Brown',
    image: 'https://picsum.photos/seed/course4/400/250',
    rating: 4.6,
    ratingCount: 1543,
    price: 129,
    category: 'Data Science'
  },
  {
    id: '5',
    title: 'UI/UX Design Fundamentals',
    instructor: 'Lisa Park',
    image: 'https://picsum.photos/seed/course5/400/250',
    rating: 4.8,
    ratingCount: 987,
    price: 69,
    category: 'Design'
  },
  {
    id: '6',
    title: 'Node.js Backend Development',
    instructor: 'Alex Martinez',
    image: 'https://picsum.photos/seed/course6/400/250',
    rating: 4.7,
    ratingCount: 2156,
    price: 109,
    category: 'Backend'
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Jennifer Adams',
    position: 'Software Engineer at Google',
    avatar: 'https://picsum.photos/seed/user1/100/100',
    content: 'Coursespace transformed my career. The courses are comprehensive and the instructors are world-class. I landed my dream job within 3 months!',
    rating: 5
  },
  {
    id: '2',
    name: 'Robert Taylor',
    position: 'Full Stack Developer',
    avatar: 'https://picsum.photos/seed/user2/100/100',
    content: 'The self-paced learning format is perfect for working professionals. The quality of content is exceptional and the community support is amazing.',
    rating: 5
  },
  {
    id: '3',
    name: 'Maria Garcia',
    position: 'UX Designer at Apple',
    avatar: 'https://picsum.photos/seed/user3/100/100',
    content: 'From zero knowledge to professional designer - Coursespace made it possible. The practical projects helped build an impressive portfolio.',
    rating: 5
  },
  {
    id: '4',
    name: 'James Wilson',
    position: 'Data Analyst',
    avatar: 'https://picsum.photos/seed/user4/100/100',
    content: 'The data science courses here is top-notch. Real-world projects and excellent explanations made complex concepts easy to understand.',
    rating: 4
  },
];

export const MENTORS: Mentor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Full Stack Development',
    avatar: 'https://picsum.photos/seed/mentor1/200/200',
    bio: '15+ years of experience in software development. Former senior engineer at Microsoft.',
    company: 'Microsoft',
    companyLogo: 'https://picsum.photos/seed/logo1/80/30'
  },
  {
    id: '2',
    name: 'Michael Chen',
    specialization: 'JavaScript & React',
    avatar: 'https://picsum.photos/seed/mentor2/200/200',
    bio: 'Core contributor to open source projects. Author of multiple best-selling programming books.',
    company: 'Meta',
    companyLogo: 'https://picsum.photos/seed/logo2/80/30'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    specialization: 'Data Science & AI',
    avatar: 'https://picsum.photos/seed/mentor3/200/200',
    bio: 'PhD in Machine Learning. Research scientist with publications in top AI journals.',
    company: 'Google',
    companyLogo: 'https://picsum.photos/seed/logo3/80/30'
  },
  {
    id: '4',
    name: 'David Kim',
    specialization: 'UI/UX Design',
    avatar: 'https://picsum.photos/seed/mentor4/200/200',
    bio: 'Award-winning designer who has worked with Fortune 500 companies on product design.',
    company: 'Apple',
    companyLogo: 'https://picsum.photos/seed/logo4/80/30'
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { id: '1', name: 'Instagram', icon: 'instagram', url: '#' },
  { id: '2', name: 'YouTube', icon: 'youtube', url: '#' },
  { id: '3', name: 'Twitter', icon: 'twitter', url: '#' },
  { id: '4', name: 'Dribbble', icon: 'dribbble', url: '#' },
  { id: '5', name: 'GitHub', icon: 'github', url: '#' },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    id: 'courses',
    title: 'Course',
    links: [
      { id: '1', label: 'Web Development', href: '#' },
      { id: '2', label: 'Mobile Development', href: '#' },
      { id: '3', label: 'Data Science', href: '#' },
      { id: '4', label: 'UI/UX Design', href: '#' },
      { id: '5', label: 'Cloud Computing', href: '#' },
    ]
  },
  {
    id: 'menu',
    title: 'Menu',
    links: [
      { id: '1', label: 'About Us', href: '#' },
      { id: '2', label: 'Contact Us', href: '#' },
      { id: '3', label: 'Our Instructors', href: '#' },
      { id: '4', label: 'FAQs', href: '#' },
      { id: '5', label: 'Blog', href: '#' },
    ]
  },
  {
    id: 'about',
    title: 'About',
    links: [
      { id: '1', label: 'Privacy Policy', href: '#' },
      { id: '2', label: 'Terms of Service', href: '#' },
      { id: '3', label: 'Refund Policy', href: '#' },
      { id: '4', label: 'Careers', href: '#' },
      { id: '5', label: 'Press', href: '#' },
    ]
  },
];

export const COMPANY_INFO: CompanyInfo = {
  name: 'Coursespace',
  logo: 'Coursespace',
  description: 'Your gateway to knowledge. Learn from industry experts and advance your career with our comprehensive online courses.',
  email: 'support@coursespace.com',
  phone: '+1 (555) 123-4567'
};
