export interface Room {
  id: number;
  name: string;
  type: 'meeting' | 'private' | 'open';
  capacity: number;
  pricePerHour: number;
  image: string;
  amenities: string[];
  description: string;
  isAvailable: boolean;
  nextAvailableTime?: string;
}
