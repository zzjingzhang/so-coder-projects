export interface Incense {
  id: string;
  name: string;
  type: string;
  origin: string;
  quality: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IncenseRecord {
  id: string;
  incenseId: string;
  incenseName: string;
  ritualName: string;
  ritualType: string;
  experience: string;
  temperature: number;
  humidity: number;
  startTime: Date;
  endTime: Date;
  duration: number;
  rating: number;
  notes: string;
  createdAt: Date;
}

export interface RitualType {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface IncenseType {
  id: string;
  name: string;
  description: string;
}

export interface Origin {
  id: string;
  name: string;
  region: string;
}
