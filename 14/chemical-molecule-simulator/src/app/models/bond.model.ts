import { Atom } from './atom.model';

export type BondType = 'single' | 'double' | 'triple';

export interface Bond {
  id: string;
  atom1Id: string;
  atom2Id: string;
  type: BondType;
  bondLength: number;
  stiffness: number;
}

export interface BondAnimationState {
  currentLength: number;
  vibrationPhase: number;
  vibrationFrequency: number;
  vibrationAmplitude: number;
}
