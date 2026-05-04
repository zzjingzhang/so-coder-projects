import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DnaService, SequenceData, MutationResult, MutationHistoryItem } from '../../services/dna.service';
import { MutationHistoryService } from '../../services/mutation-history.service';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';

interface ComparisonResult {
  dnaChanged: boolean;
  mrnaChanged: boolean;
  aminoAcidsChanged: boolean;
  isSilent: boolean;
  isFrameshift: boolean;
}

@Component({
  selector: 'app-simulator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
    TooltipModule
  ],
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css'],
  providers: [DnaService, MutationHistoryService]
})
export class SimulatorComponent implements OnInit {
  mutationForm: FormGroup;
  currentSequence: SequenceData | null = null;
  mutatedSequence: SequenceData | null = null;
  comparisonResult: ComparisonResult | null = null;
  history: MutationHistoryItem[] = [];
  selectedHistoryItem: MutationHistoryItem | null = null;
  showHistoryPanel = false;
  
  mutationTypes = [
    { value: 'substitution', label: '碱基替换' },
    { value: 'insertion', label: '碱基插入' },
    { value: 'deletion', label: '碱基缺失' }
  ];
  
  bases = ['A', 'T', 'G', 'C'];
  
  constructor(
    private fb: FormBuilder,
    private dnaService: DnaService,
    private mutationHistoryService: MutationHistoryService
  ) {
    this.mutationForm = this.fb.group({
      sequence: ['ATGAAGTTTGGCCAATGA', [Validators.required, Validators.pattern(/^[ATGCatgc]+$/)]],
      mutationType: ['substitution', Validators.required],
      position: [3, [Validators.required, Validators.min(0)]],
      newBase: ['C'],
      insertBase: ['A']
    });
  }

  ngOnInit(): void {
    this.processInitialSequence();
    this.history = this.mutationHistoryService.getHistory();
  }

  processInitialSequence(): void {
    const sequence = this.mutationForm.get('sequence')?.value.toUpperCase() || '';
    if (this.dnaService.validateSequence(sequence)) {
      this.currentSequence = this.dnaService.processSequence(sequence);
      this.mutatedSequence = null;
      this.comparisonResult = null;
    }
  }

  onSequenceChange(): void {
    this.processInitialSequence();
    this.updatePositionValidator();
  }

  updatePositionValidator(): void {
    const sequence = this.mutationForm.get('sequence')?.value || '';
    const maxPosition = this.mutationForm.get('mutationType')?.value === 'insertion' 
      ? sequence.length 
      : sequence.length - 1;
    
    const positionControl = this.mutationForm.get('position');
    if (positionControl) {
      positionControl.setValidators([
        Validators.required,
        Validators.min(0),
        Validators.max(maxPosition)
      ]);
      positionControl.updateValueAndValidity();
    }
  }

  onMutationTypeChange(): void {
    this.updatePositionValidator();
  }

  generateRandomSequence(): void {
    const randomSequence = this.dnaService.generateRandomSequence(24);
    this.mutationForm.patchValue({ sequence: randomSequence });
    this.processInitialSequence();
  }

  performMutation(): void {
    if (this.mutationForm.invalid || !this.currentSequence) {
      return;
    }

    const formValue = this.mutationForm.value;
    const originalSequence = formValue.sequence.toUpperCase();
    const mutationType = formValue.mutationType;
    const position = parseInt(formValue.position, 10);

    let mutationResult: MutationResult;
    let description: string;

    try {
      switch (mutationType) {
        case 'substitution':
          mutationResult = this.dnaService.substituteBase(
            originalSequence, 
            position, 
            formValue.newBase
          );
          description = `在位置 ${position} 将 ${mutationResult.originalBase} 替换为 ${mutationResult.newBase}`;
          break;
        case 'insertion':
          mutationResult = this.dnaService.insertBase(
            originalSequence, 
            position, 
            formValue.insertBase
          );
          description = `在位置 ${position} 插入 ${mutationResult.insertedBase}`;
          break;
        case 'deletion':
          mutationResult = this.dnaService.deleteBase(originalSequence, position);
          description = `在位置 ${position} 删除 ${mutationResult.deletedBase}`;
          break;
        default:
          return;
      }

      const highlightedPositions = this.getHighlightedPositions(mutationResult);
      
      this.mutatedSequence = this.dnaService.processSequence(
        mutationResult.mutatedSequence,
        highlightedPositions
      );

      this.comparisonResult = this.mutationHistoryService.compareSequences(
        this.currentSequence,
        this.mutatedSequence
      );

      this.mutationHistoryService.addHistoryItem(
        mutationType,
        position,
        description,
        { ...this.currentSequence, highlightedPositions: [] },
        this.mutatedSequence
      );

      this.history = this.mutationHistoryService.getHistory();

      this.mutationForm.patchValue({ 
        sequence: mutationResult.mutatedSequence 
      });
      this.currentSequence = this.dnaService.processSequence(mutationResult.mutatedSequence);

    } catch (error) {
      console.error('Mutation error:', error);
    }
  }

  private getHighlightedPositions(mutationResult: MutationResult): number[] {
    const positions: number[] = [];
    
    switch (mutationResult.mutationType) {
      case 'substitution':
        positions.push(mutationResult.position);
        break;
      case 'insertion':
        positions.push(mutationResult.position);
        break;
      case 'deletion':
        if (mutationResult.position < mutationResult.mutatedSequence.length) {
          positions.push(mutationResult.position);
        } else if (mutationResult.mutatedSequence.length > 0) {
          positions.push(mutationResult.mutatedSequence.length - 1);
        }
        break;
    }
    
    return positions;
  }

  resetToOriginal(): void {
    this.mutationForm.patchValue({ 
      sequence: 'ATGAAGTTTGGCCAATGA' 
    });
    this.processInitialSequence();
  }

  viewHistoryItem(item: MutationHistoryItem): void {
    this.selectedHistoryItem = item;
  }

  closeHistoryDetail(): void {
    this.selectedHistoryItem = null;
  }

  deleteHistoryItem(id: string): void {
    this.mutationHistoryService.deleteHistoryItem(id);
    this.history = this.mutationHistoryService.getHistory();
    if (this.selectedHistoryItem?.id === id) {
      this.selectedHistoryItem = null;
    }
  }

  clearHistory(): void {
    this.mutationHistoryService.clearHistory();
    this.history = [];
    this.selectedHistoryItem = null;
  }

  toggleHistoryPanel(): void {
    this.showHistoryPanel = !this.showHistoryPanel;
  }

  getBaseColor(base: string): string {
    const colors: Record<string, string> = {
      'A': 'bg-green-100 text-green-800',
      'T': 'bg-red-100 text-red-800',
      'G': 'bg-blue-100 text-blue-800',
      'C': 'bg-yellow-100 text-yellow-800',
      'U': 'bg-purple-100 text-purple-800'
    };
    return colors[base] || 'bg-gray-100 text-gray-800';
  }

  isHighlighted(index: number, highlightedPositions: number[]): boolean {
    return highlightedPositions.includes(index);
  }

  getAminoAcidColor(aminoAcid: string): string {
    if (aminoAcid === 'Met') return 'bg-emerald-100 text-emerald-800';
    if (aminoAcid === 'Stop') return 'bg-red-100 text-red-800';
    return 'bg-indigo-100 text-indigo-800';
  }

  getMutationTypeLabel(type: 'substitution' | 'insertion' | 'deletion'): string {
    return this.mutationHistoryService.getMutationTypeLabel(type);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  safeHighlightedPositions(sequence: SequenceData | null): number[] {
    return sequence?.highlightedPositions || [];
  }

  safeTemplateStrandLength(sequence: SequenceData | null | undefined): number {
    return sequence?.templateStrand?.length || 0;
  }

  safeAminoAcids(sequence: SequenceData | null | undefined): string[] {
    return sequence?.aminoAcids || [];
  }
}
