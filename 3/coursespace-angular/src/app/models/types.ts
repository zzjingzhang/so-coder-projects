export interface NavItem {
  id: string;
  label: string;
  href: string;
  fragment: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  progress: number;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  image: string;
  rating: number;
  ratingCount: number;
  price: number;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface Mentor {
  id: string;
  name: string;
  specialization: string;
  avatar: string;
  bio: string;
  company: string;
  companyLogo: string;
}

export interface SocialLink {
  id: string;
  name: string;
  icon: string;
  url: string;
}

export interface FooterLink {
  id: string;
  label: string;
  href: string;
}

export interface FooterColumn {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface CompanyInfo {
  name: string;
  logo: string;
  description: string;
  email: string;
  phone: string;
}
