import type { MorseCodeMap, DecodeMorseMap, MorseSettings } from '../types';

export const MORSE_CODE_MAP: MorseCodeMap = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
  'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
  'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
  'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
  'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
  'Z': '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  ' ': ' '
};

export const DECODE_MORSE_MAP: DecodeMorseMap = {
  '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E',
  '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J',
  '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O',
  '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T',
  '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y',
  '--..': 'Z',
  '-----': '0', '.----': '1', '..---': '2', '...--': '3', '....-': '4',
  '.....': '5', '-....': '6', '--...': '7', '---..': '8', '----.': '9',
  ' ': ' '
};

export const DEFAULT_SETTINGS: MorseSettings = {
  dotDuration: 200,
  dashDuration: 600,
  elementGap: 200,
  letterGap: 600,
  wordGap: 1400,
};

export const encodeToMorse = (text: string): string => {
  const upperText = text.toUpperCase();
  let result = '';
  
  for (let i = 0; i < upperText.length; i++) {
    const char = upperText[i];
    if (MORSE_CODE_MAP[char]) {
      if (char === ' ') {
        result += '  ';
      } else {
        result += MORSE_CODE_MAP[char];
        if (i < upperText.length - 1 && upperText[i + 1] !== ' ') {
          result += ' ';
        }
      }
    }
  }
  
  return result.trim();
};

export const decodeFromMorse = (morseCode: string): string => {
  if (!morseCode.trim()) return '';
  
  const words = morseCode.split(/\s{3,}/);
  return words.map(word => {
    const letters = word.split(/\s+/);
    return letters.map(letter => DECODE_MORSE_MAP[letter] || '?').join('');
  }).join(' ');
};

export const isDot = (duration: number, settings: MorseSettings): boolean => {
  return duration <= settings.dotDuration * 1.5;
};

export const isDash = (duration: number, settings: MorseSettings): boolean => {
  return duration > settings.dotDuration * 1.5;
};
