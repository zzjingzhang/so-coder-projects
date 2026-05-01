export interface Review {
  id: number;
  doctorId: number;
  patientName: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  helpful: number;
}
