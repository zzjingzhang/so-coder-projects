import { Injectable } from '@angular/core';
import { MutationHistoryItem, SequenceData } from './dna.service';

@Injectable({
  providedIn: 'root'
})
export class MutationHistoryService {
  private history: MutationHistoryItem[] = [];
  private currentId = 0;

  constructor() { }

  addHistoryItem(
    mutationType: 'substitution' | 'insertion' | 'deletion',
    position: number,
    description: string,
    before: SequenceData,
    after: SequenceData
  ): MutationHistoryItem {
    const item: MutationHistoryItem = {
      id: `mutation-${this.currentId++}`,
      timestamp: new Date(),
      mutationType,
      position,
      description,
      before,
      after
    };
    
    this.history.unshift(item);
    return item;
  }

  getHistory(): MutationHistoryItem[] {
    return [...this.history];
  }

  getHistoryItem(id: string): MutationHistoryItem | undefined {
    return this.history.find(item => item.id === id);
  }

  deleteHistoryItem(id: string): boolean {
    const index = this.history.findIndex(item => item.id === id);
    if (index !== -1) {
      this.history.splice(index, 1);
      return true;
    }
    return false;
  }

  clearHistory(): void {
    this.history = [];
  }

  exportHistory(): string {
    return JSON.stringify(this.history, null, 2);
  }

  getMutationTypeLabel(type: 'substitution' | 'insertion' | 'deletion'): string {
    const labels: Record<string, string> = {
      'substitution': '碱基替换',
      'insertion': '碱基插入',
      'deletion': '碱基缺失'
    };
    return labels[type] || type;
  }

  compareSequences(before: SequenceData, after: SequenceData): {
    dnaChanged: boolean;
    mrnaChanged: boolean;
    aminoAcidsChanged: boolean;
    isSilent: boolean;
    isFrameshift: boolean;
  } {
    const dnaChanged = before.templateStrand !== after.templateStrand;
    const mrnaChanged = before.mRNA !== after.mRNA;
    const aminoAcidsChanged = JSON.stringify(before.aminoAcids) !== JSON.stringify(after.aminoAcids);
    
    const isSilent = dnaChanged && !aminoAcidsChanged;
    
    const lengthDiff = after.templateStrand.length - before.templateStrand.length;
    const isFrameshift = Math.abs(lengthDiff) % 3 !== 0;
    
    return {
      dnaChanged,
      mrnaChanged,
      aminoAcidsChanged,
      isSilent,
      isFrameshift
    };
  }
}
