export interface NavItem {
  label: string;
  href: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  colors: string[];
  features: string[];
  inStock: boolean;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface ColorOption {
  name: string;
  value: string;
}
