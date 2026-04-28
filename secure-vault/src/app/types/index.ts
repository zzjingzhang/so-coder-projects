export interface PasswordEntry {
  id: string;
  title: string;
  username: string;
  password: string;
  website?: string;
  notes?: string;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  lastUsed?: Date;
  strength: PasswordStrength;
}

export interface PasswordStrength {
  score: number;
  level: 'weak' | 'medium' | 'strong' | 'very-strong';
  details: {
    hasLowerCase: boolean;
    hasUpperCase: boolean;
    hasNumbers: boolean;
    hasSymbols: boolean;
    length: number;
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  count?: number;
}

export interface PasswordGeneratorOptions {
  length: number;
  includeLowercase: boolean;
  includeUppercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeAmbiguous: boolean;
}

export interface SearchFilter {
  query: string;
  categories: string[];
  tags: string[];
}
