export type Theme = 'light' | 'dark';

export interface Address {
  id: string;
  province: string;
  city: string;
  district: string;
  street: string;
  detail: string;
  postalCode: string;
  fullAddress: string;
}

export interface AddressSuggestion {
  id: string;
  text: string;
  province: string;
  city: string;
  district: string;
  street?: string;
}

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export interface FormErrors {
  [key: string]: string | undefined;
  province?: string;
  city?: string;
  district?: string;
  street?: string;
  detail?: string;
  postalCode?: string;
}
