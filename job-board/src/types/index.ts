export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
    period: 'monthly' | 'yearly';
  };
  jobType: 'full-time' | 'part-time' | 'contract' | 'remote' | 'internship';
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  companySize: string;
  industry: string;
}

export interface FilterOptions {
  locations: string[];
  jobTypes: string[];
  salaryRanges: {
    label: string;
    min: number;
    max: number | null;
  }[];
}

export interface Filters {
  location: string;
  jobType: string;
  salaryRange: string;
  search: string;
}
