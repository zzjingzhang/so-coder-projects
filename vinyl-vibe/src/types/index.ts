export interface Product {
  id: number;
  name: string;
  artist: string;
  price: number;
  rating: number;
  reviews: number;
  tag?: string;
  category: string;
  image: string;
}

export interface Announcement {
  id: number;
  text: string;
  type: 'promo' | 'new' | 'info';
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

export interface FooterLink {
  id: string;
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}
