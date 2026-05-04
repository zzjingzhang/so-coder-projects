import { Injectable } from '@angular/core';

export interface MutationResult {
  originalSequence: string;
  mutatedSequence: string;
  mutationType: 'substitution' | 'insertion' | 'deletion';
  position: number;
  originalBase?: string;
  newBase?: string;
  insertedBase?: string;
  deletedBase?: string;
}

export interface SequenceData {
  templateStrand: string;
  codingStrand: string;
  mRNA: string;
  aminoAcids: string[];
  highlightedPositions: number[];
}

export interface MutationHistoryItem {
  id: string;
  timestamp: Date;
  mutationType: 'substitution' | 'insertion' | 'deletion';
  position: number;
  description: string;
  before: SequenceData;
  after: SequenceData;
}

@Injectable({
  providedIn: 'root'
})
export class DnaService {
  private readonly complementMap: Record<string, string> = {
    'A': 'T',
    'T': 'A',
    'G': 'C',
    'C': 'G'
  };

  private readonly codonTable: Record<string, string> = {
    'UUU': 'Phe', 'UUC': 'Phe', 'UUA': 'Leu', 'UUG': 'Leu',
    'UCU': 'Ser', 'UCC': 'Ser', 'UCA': 'Ser', 'UCG': 'Ser',
    'UAU': 'Tyr', 'UAC': 'Tyr', 'UAA': 'Stop', 'UAG': 'Stop',
    'UGU': 'Cys', 'UGC': 'Cys', 'UGA': 'Stop', 'UGG': 'Trp',
    'CUU': 'Leu', 'CUC': 'Leu', 'CUA': 'Leu', 'CUG': 'Leu',
    'CCU': 'Pro', 'CCC': 'Pro', 'CCA': 'Pro', 'CCG': 'Pro',
    'CAU': 'His', 'CAC': 'His', 'CAA': 'Gln', 'CAG': 'Gln',
    'CGU': 'Arg', 'CGC': 'Arg', 'CGA': 'Arg', 'CGG': 'Arg',
    'AUU': 'Ile', 'AUC': 'Ile', 'AUA': 'Ile', 'AUG': 'Met',
    'ACU': 'Thr', 'ACC': 'Thr', 'ACA': 'Thr', 'ACG': 'Thr',
    'AAU': 'Asn', 'AAC': 'Asn', 'AAA': 'Lys', 'AAG': 'Lys',
    'AGU': 'Ser', 'AGC': 'Ser', 'AGA': 'Arg', 'AGG': 'Arg',
    'GUU': 'Val', 'GUC': 'Val', 'GUA': 'Val', 'GUG': 'Val',
    'GCU': 'Ala', 'GCC': 'Ala', 'GCA': 'Ala', 'GCG': 'Ala',
    'GAU': 'Asp', 'GAC': 'Asp', 'GAA': 'Glu', 'GAG': 'Glu',
    'GGU': 'Gly', 'GGC': 'Gly', 'GGA': 'Gly', 'GGG': 'Gly'
  };

  constructor() { }

  getComplement(base: string): string {
    return this.complementMap[base] || base;
  }

  getCodingStrand(templateStrand: string): string {
    return templateStrand
      .split('')
      .map(base => this.getComplement(base))
      .join('');
  }

  transcribeToMRNA(templateStrand: string): string {
    return templateStrand
      .split('')
      .map(base => {
        const complement = this.getComplement(base);
        return complement === 'T' ? 'U' : complement;
      })
      .join('');
  }

  translateToAminoAcids(mRNA: string): string[] {
    const aminoAcids: string[] = [];
    
    for (let i = 0; i + 3 <= mRNA.length; i += 3) {
      const codon = mRNA.substring(i, i + 3);
      const aminoAcid = this.codonTable[codon];
      
      if (aminoAcid === 'Stop') {
        break;
      }
      
      if (aminoAcid) {
        aminoAcids.push(aminoAcid);
      }
    }
    
    return aminoAcids;
  }

  processSequence(templateStrand: string, highlightedPositions: number[] = []): SequenceData {
    const codingStrand = this.getCodingStrand(templateStrand);
    const mRNA = this.transcribeToMRNA(templateStrand);
    const aminoAcids = this.translateToAminoAcids(mRNA);
    
    return {
      templateStrand,
      codingStrand,
      mRNA,
      aminoAcids,
      highlightedPositions
    };
  }

  substituteBase(sequence: string, position: number, newBase: string): MutationResult {
    if (position < 0 || position >= sequence.length) {
      throw new Error('Position out of range');
    }
    
    const originalBase = sequence[position];
    const mutatedSequence = sequence.substring(0, position) + newBase + sequence.substring(position + 1);
    
    return {
      originalSequence: sequence,
      mutatedSequence,
      mutationType: 'substitution',
      position,
      originalBase,
      newBase
    };
  }

  insertBase(sequence: string, position: number, base: string): MutationResult {
    if (position < 0 || position > sequence.length) {
      throw new Error('Position out of range');
    }
    
    const mutatedSequence = sequence.substring(0, position) + base + sequence.substring(position);
    
    return {
      originalSequence: sequence,
      mutatedSequence,
      mutationType: 'insertion',
      position,
      insertedBase: base
    };
  }

  deleteBase(sequence: string, position: number): MutationResult {
    if (position < 0 || position >= sequence.length) {
      throw new Error('Position out of range');
    }
    
    const deletedBase = sequence[position];
    const mutatedSequence = sequence.substring(0, position) + sequence.substring(position + 1);
    
    return {
      originalSequence: sequence,
      mutatedSequence,
      mutationType: 'deletion',
      position,
      deletedBase
    };
  }

  validateSequence(sequence: string): boolean {
    const validBases = ['A', 'T', 'G', 'C'];
    return sequence.toUpperCase().split('').every(base => validBases.includes(base));
  }

  generateRandomSequence(length: number): string {
    const bases = ['A', 'T', 'G', 'C'];
    let sequence = '';
    
    for (let i = 0; i < length; i++) {
      sequence += bases[Math.floor(Math.random() * bases.length)];
    }
    
    return sequence;
  }
}
