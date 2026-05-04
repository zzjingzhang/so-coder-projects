export interface MorseCodeMap {
  [key: string]: string;
}

export interface DecodeMorseMap {
  [key: string]: string;
}

export interface MorseSettings {
  dotDuration: number;
  dashDuration: number;
  elementGap: number;
  letterGap: number;
  wordGap: number;
}

export type Mode = 'simple' | 'telegraph';
