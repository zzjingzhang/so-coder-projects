export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  rating: number;
  reviewCount: number;
  experience: number;
  education: string;
  languages: string[];
  insurance: string[];
  about: string;
  image: string;
  available: boolean;
  nextAvailable: string;
}
