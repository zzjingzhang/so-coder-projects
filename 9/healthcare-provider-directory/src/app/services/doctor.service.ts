import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor.model';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private doctors: Doctor[] = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      hospital: 'City General Hospital',
      rating: 4.9,
      reviewCount: 124,
      experience: 15,
      education: 'Harvard Medical School',
      languages: ['English', 'Spanish'],
      insurance: ['Blue Cross', 'Aetna', 'UnitedHealthcare'],
      about: 'Dr. Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She specializes in preventive cardiology and heart failure management.',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20female%20doctor%20portrait%20in%20white%20coat%20medical%20office&image_size=square_hd',
      available: true,
      nextAvailable: '2026-05-05'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Neurology',
      hospital: 'Metro Medical Center',
      rating: 4.8,
      reviewCount: 89,
      experience: 12,
      education: 'Johns Hopkins University',
      languages: ['English', 'Mandarin'],
      insurance: ['Blue Cross', 'Medicare', 'Cigna'],
      about: 'Dr. Chen is a neurologist specializing in stroke prevention and treatment, as well as neurodegenerative diseases like Alzheimer\'s and Parkinson\'s.',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20male%20doctor%20portrait%20in%20white%20coat%20hospital%20setting&image_size=square_hd',
      available: true,
      nextAvailable: '2026-05-06'
    },
    {
      id: 3,
      name: 'Dr. Emily Williams',
      specialty: 'Pediatrics',
      hospital: 'Children\'s Health Center',
      rating: 4.9,
      reviewCount: 156,
      experience: 10,
      education: 'Stanford Medical School',
      languages: ['English', 'French'],
      insurance: ['Aetna', 'UnitedHealthcare', 'Kaiser Permanente'],
      about: 'Dr. Williams is a pediatrician dedicated to providing comprehensive healthcare for children from birth through adolescence. She has a special interest in child development and preventive care.',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20female%20pediatrician%20doctor%20portrait%20smiling&image_size=square_hd',
      available: true,
      nextAvailable: '2026-05-04'
    },
    {
      id: 4,
      name: 'Dr. Robert Taylor',
      specialty: 'Orthopedics',
      hospital: 'Joint Replacement Center',
      rating: 4.7,
      reviewCount: 78,
      experience: 18,
      education: 'Columbia University College of P&S',
      languages: ['English'],
      insurance: ['Blue Cross', 'Medicare', 'UnitedHealthcare'],
      about: 'Dr. Taylor is an orthopedic surgeon specializing in joint replacement and sports medicine. He has performed over 2,000 successful surgeries throughout his career.',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=experienced%20male%20orthopedic%20surgeon%20portrait&image_size=square_hd',
      available: false,
      nextAvailable: '2026-05-10'
    },
    {
      id: 5,
      name: 'Dr. Maria Garcia',
      specialty: 'Dermatology',
      hospital: 'Skin Health Institute',
      rating: 4.8,
      reviewCount: 92,
      experience: 8,
      education: 'University of California, San Francisco',
      languages: ['English', 'Spanish'],
      insurance: ['Aetna', 'Cigna', 'Kaiser Permanente'],
      about: 'Dr. Garcia is a dermatologist specializing in cosmetic and medical dermatology. She provides comprehensive skin care treatments including acne management, anti-aging procedures, and skin cancer screenings.',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20female%20dermatologist%20portrait&image_size=square_hd',
      available: true,
      nextAvailable: '2026-05-03'
    },
    {
      id: 6,
      name: 'Dr. James Wilson',
      specialty: 'General Surgery',
      hospital: 'City General Hospital',
      rating: 4.6,
      reviewCount: 65,
      experience: 14,
      education: 'University of Pennsylvania',
      languages: ['English'],
      insurance: ['Blue Cross', 'Medicare', 'UnitedHealthcare'],
      about: 'Dr. Wilson is a general surgeon with expertise in minimally invasive procedures. He performs a wide range of surgeries including gallbladder removal, hernia repair, and colon procedures.',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20male%20general%20surgeon%20portrait&image_size=square_hd',
      available: true,
      nextAvailable: '2026-05-07'
    }
  ];

  getDoctors(): Observable<Doctor[]> {
    return of(this.doctors);
  }

  getDoctorById(id: number): Observable<Doctor | undefined> {
    return of(this.doctors.find(doctor => doctor.id === id));
  }

  getSpecialties(): Observable<string[]> {
    const specialties = [...new Set(this.doctors.map(doctor => doctor.specialty))];
    return of(specialties);
  }

  getInsuranceProviders(): Observable<string[]> {
    const allInsurances = this.doctors.flatMap(doctor => doctor.insurance);
    const uniqueInsurances = [...new Set(allInsurances)];
    return of(uniqueInsurances);
  }

  searchDoctors(specialty?: string, insurance?: string, available?: boolean): Observable<Doctor[]> {
    let filteredDoctors = [...this.doctors];

    if (specialty) {
      filteredDoctors = filteredDoctors.filter(doctor => doctor.specialty === specialty);
    }

    if (insurance) {
      filteredDoctors = filteredDoctors.filter(doctor => doctor.insurance.includes(insurance));
    }

    if (available !== undefined) {
      filteredDoctors = filteredDoctors.filter(doctor => doctor.available === available);
    }

    return of(filteredDoctors);
  }
}
