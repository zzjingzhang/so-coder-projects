export interface Atom {
  id: string;
  symbol: string;
  name: string;
  atomicNumber: number;
  color: string;
  radius: number;
  mass: number;
  x: number;
  y: number;
  z: number;
  velocityX: number;
  velocityY: number;
  velocityZ: number;
}

export const ELEMENTS: Record<string, { symbol: string; name: string; atomicNumber: number; color: string; radius: number; mass: number }> = {
  H: { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, color: '#FFFFFF', radius: 25, mass: 1.008 },
  C: { symbol: 'C', name: 'Carbon', atomicNumber: 6, color: '#333333', radius: 35, mass: 12.011 },
  N: { symbol: 'N', name: 'Nitrogen', atomicNumber: 7, color: '#3B82F6', radius: 32, mass: 14.007 },
  O: { symbol: 'O', name: 'Oxygen', atomicNumber: 8, color: '#EF4444', radius: 30, mass: 15.999 },
  F: { symbol: 'F', name: 'Fluorine', atomicNumber: 9, color: '#10B981', radius: 28, mass: 18.998 },
  Cl: { symbol: 'Cl', name: 'Chlorine', atomicNumber: 17, color: '#22C55E', radius: 38, mass: 35.45 },
  Br: { symbol: 'Br', name: 'Bromine', atomicNumber: 35, color: '#A855F7', radius: 42, mass: 79.904 },
  I: { symbol: 'I', name: 'Iodine', atomicNumber: 53, color: '#6366F1', radius: 45, mass: 126.904 },
  S: { symbol: 'S', name: 'Sulfur', atomicNumber: 16, color: '#EAB308', radius: 36, mass: 32.06 },
  P: { symbol: 'P', name: 'Phosphorus', atomicNumber: 15, color: '#F97316', radius: 34, mass: 30.974 }
};
