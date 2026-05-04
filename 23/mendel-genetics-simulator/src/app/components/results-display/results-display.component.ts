import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Trait, GenerationResult, Offspring } from '../../services/genetics.service';

interface RatioItem {
  label: string;
  value: number;
  color: string;
  genotype?: string;
}

@Component({
  selector: 'app-results-display',
  templateUrl: './results-display.component.html',
  standalone: false,
  styleUrl: './results-display.component.css'
})
export class ResultsDisplayComponent {
  @Input() pGeneration!: GenerationResult | null;
  @Input() f1Generation!: GenerationResult | null;
  @Input() f2Generation!: GenerationResult | null;
  @Input() dominantTrait!: Trait | null;
  @Input() recessiveTrait!: Trait | null;
  @Output() backStep = new EventEmitter<void>();
  @Output() resetSimulation = new EventEmitter<void>();

  activeTab = 0;

  tabs = [
    { title: '遗传概览', icon: '📊' },
    { title: '基因型比例', icon: '🧬' },
    { title: '表型比例', icon: '🌸' },
    { title: '知识总结', icon: '📚' }
  ];

  selectTab(index: number): void {
    this.activeTab = index;
  }

  getAlleleLetter(): string {
    return this.dominantTrait?.allele || 'P';
  }

  getLowerAlleleLetter(): string {
    return this.recessiveTrait?.allele || 'p';
  }

  getGenotypeRatioItems(): RatioItem[] {
    if (!this.f2Generation) return [];
    
    const ratio = this.f2Generation.genotypeRatio;
    const items: RatioItem[] = [];
    const letter = this.getAlleleLetter();
    const lowerLetter = this.getLowerAlleleLetter();
    
    const genotypes = [`${letter}${letter}`, `${letter}${lowerLetter}`, `${lowerLetter}${lowerLetter}`];
    const colors = ['#1890ff', '#13c2c2', '#fa8c16'];
    const labels = ['纯合显性', '杂合子', '纯合隐性'];
    
    genotypes.forEach((genotype, index) => {
      const count = ratio[genotype] || 0;
      if (count > 0) {
        items.push({
          label: labels[index],
          value: count,
          color: colors[index],
          genotype: genotype
        });
      }
    });
    
    return items;
  }

  getPhenotypeRatioItems(): RatioItem[] {
    if (!this.f2Generation) return [];
    
    const ratio = this.f2Generation.phenotypeRatio;
    return [
      {
        label: this.dominantTrait?.name || '显性性状',
        value: ratio.dominant,
        color: '#1890ff'
      },
      {
        label: this.recessiveTrait?.name || '隐性性状',
        value: ratio.recessive,
        color: '#fa8c16'
      }
    ];
  }

  getGenotypeRatioPercentage(): { [key: string]: number } {
    const items = this.getGenotypeRatioItems();
    const total = items.reduce((sum, item) => sum + item.value, 0);
    const result: { [key: string]: number } = {};
    
    items.forEach(item => {
      if (item.genotype) {
        result[item.genotype] = total > 0 ? (item.value / total) * 100 : 0;
      }
    });
    
    return result;
  }

  getPhenotypeRatioPercentage(): { dominant: number; recessive: number } {
    if (!this.f2Generation) return { dominant: 0, recessive: 0 };
    
    const ratio = this.f2Generation.phenotypeRatio;
    const total = ratio.dominant + ratio.recessive;
    
    return {
      dominant: total > 0 ? (ratio.dominant / total) * 100 : 0,
      recessive: total > 0 ? (ratio.recessive / total) * 100 : 0
    };
  }

  getF2OffspringWithImages(): (Offspring & { imageUrl?: string })[] {
    if (!this.f2Generation) return [];
    
    return this.f2Generation.offspring.map(offspring => {
      return {
        ...offspring,
        imageUrl: offspring.isDominant 
          ? this.dominantTrait?.imageUrl 
          : this.recessiveTrait?.imageUrl
      };
    });
  }

  getTraitColor(isDominant: boolean): string {
    if (isDominant) {
      return '#8B5CF6';
    }
    return '#F3F4F6';
  }

  getTraitTextColor(isDominant: boolean): string {
    if (isDominant) {
      return 'white';
    }
    return '#1f2937';
  }

  formatPercentage(value: number): string {
    return value.toFixed(1) + '%';
  }

  onReset(): void {
    this.resetSimulation.emit();
  }

  onBack(): void {
    this.backStep.emit();
  }
}
