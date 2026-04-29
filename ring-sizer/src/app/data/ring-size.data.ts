import { RingSizeEntry } from '../models/ring-size.model';

export const RING_SIZE_DATA: RingSizeEntry[] = [
  { circumference: 41.0, diameter: 13.05, us: '1', uk: 'A', europe: null, japan: 1, china: null },
  { circumference: 42.5, diameter: 13.53, us: '1.5', uk: 'B', europe: null, japan: 2, china: null },
  { circumference: 43.0, diameter: 13.69, us: '2', uk: 'C', europe: null, japan: 3, china: 1 },
  { circumference: 44.2, diameter: 14.07, us: '2.5', uk: 'D', europe: 44, japan: 4, china: 2 },
  { circumference: 45.0, diameter: 14.32, us: '3', uk: 'E', europe: 45, japan: 5, china: 3 },
  { circumference: 46.0, diameter: 14.64, us: '3.5', uk: 'F', europe: 46, japan: 6, china: 4 },
  { circumference: 47.0, diameter: 14.96, us: '4', uk: 'G', europe: 47, japan: 7, china: 5 },
  { circumference: 47.5, diameter: 15.12, us: '4.5', uk: 'H', europe: 47.5, japan: 8, china: 6 },
  { circumference: 48.0, diameter: 15.28, us: '5', uk: 'I', europe: 48, japan: 9, china: 7 },
  { circumference: 49.0, diameter: 15.60, us: '5.5', uk: 'J', europe: 49, japan: 10, china: 8 },
  { circumference: 50.0, diameter: 15.92, us: '6', uk: 'L', europe: 50, japan: 11, china: 9 },
  { circumference: 51.0, diameter: 16.24, us: '6.5', uk: 'M', europe: 51, japan: 12, china: 10 },
  { circumference: 52.0, diameter: 16.56, us: '7', uk: 'N', europe: 52, japan: 13, china: 11 },
  { circumference: 52.5, diameter: 16.72, us: '7.5', uk: 'O', europe: 52.5, japan: 14, china: 12 },
  { circumference: 53.0, diameter: 16.88, us: '8', uk: 'P', europe: 53, japan: 15, china: 13 },
  { circumference: 54.0, diameter: 17.20, us: '8.5', uk: 'Q', europe: 54, japan: 16, china: 14 },
  { circumference: 55.0, diameter: 17.52, us: '9', uk: 'R', europe: 55, japan: 17, china: 15 },
  { circumference: 56.0, diameter: 17.84, us: '9.5', uk: 'S', europe: 56, japan: 18, china: 16 },
  { circumference: 57.0, diameter: 18.16, us: '10', uk: 'T', europe: 57, japan: 19, china: 17 },
  { circumference: 57.5, diameter: 18.32, us: '10.5', uk: 'U', europe: 57.5, japan: 20, china: 18 },
  { circumference: 58.0, diameter: 18.48, us: '11', uk: 'V', europe: 58, japan: 21, china: 19 },
  { circumference: 59.0, diameter: 18.80, us: '11.5', uk: 'W', europe: 59, japan: 22, china: 20 },
  { circumference: 60.0, diameter: 19.12, us: '12', uk: 'X', europe: 60, japan: 23, china: 21 },
  { circumference: 61.0, diameter: 19.44, us: '12.5', uk: 'Y', europe: 61, japan: 24, china: 22 },
  { circumference: 62.0, diameter: 19.76, us: '13', uk: 'Z', europe: 62, japan: 25, china: 23 },
  { circumference: 63.0, diameter: 20.08, us: '13.5', uk: 'Z+1', europe: 63, japan: 26, china: 24 },
  { circumference: 64.0, diameter: 20.40, us: '14', uk: null, europe: 64, japan: 27, china: 25 },
  { circumference: 65.0, diameter: 20.72, us: '14.5', uk: null, europe: 65, japan: 28, china: 26 },
  { circumference: 66.0, diameter: 21.04, us: '15', uk: null, europe: 66, japan: 29, china: 27 },
  { circumference: 67.0, diameter: 21.36, us: '15.5', uk: null, europe: 67, japan: 30, china: 28 },
  { circumference: 68.0, diameter: 21.68, us: '16', uk: null, europe: 68, japan: null, china: 29 },
  { circumference: 69.0, diameter: 22.00, us: '16.5', uk: null, europe: 69, japan: null, china: 30 },
  { circumference: 70.0, diameter: 22.32, us: '17', uk: null, europe: 70, japan: null, china: null },
  { circumference: 71.0, diameter: 22.64, us: '17.5', uk: null, europe: 71, japan: null, china: null },
  { circumference: 72.0, diameter: 22.96, us: '18', uk: null, europe: 72, japan: null, china: null },
];

export function getMinCircumference(): number {
  return RING_SIZE_DATA[0].circumference;
}

export function getMaxCircumference(): number {
  return RING_SIZE_DATA[RING_SIZE_DATA.length - 1].circumference;
}

export function getMinDiameter(): number {
  return RING_SIZE_DATA[0].diameter;
}

export function getMaxDiameter(): number {
  return RING_SIZE_DATA[RING_SIZE_DATA.length - 1].diameter;
}

export function getAvailableSizes(system: string): string[] {
  const sizes = new Set<string>();
  
  for (const entry of RING_SIZE_DATA) {
    const size = entry[system as keyof RingSizeEntry];
    if (size !== null) {
      sizes.add(String(size));
    }
  }
  
  return Array.from(sizes);
}
