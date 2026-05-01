export interface Appointment {
  id?: number;
  doctorId: number;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  time: string;
  reason: string;
  insurance: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}
