import { Injectable } from '@angular/core';

export interface Trait {
  id: string;
  name: string;
  imageUrl: string;
  allele: string;
  type: 'dominant' | 'recessive';
}

export interface Genotype {
  alleles: [string, string];
  phenotype: string;
  isDominant: boolean;
}

export interface Offspring {
  genotype: string;
  phenotype: string;
  isDominant: boolean;
}

export interface GenerationResult {
  generation: 'P' | 'F1' | 'F2';
  offspring: Offspring[];
  genotypeRatio: { [key: string]: number };
  phenotypeRatio: { dominant: number; recessive: number };
}

@Injectable({
  providedIn: 'root'
})
export class GeneticsService {
  dominantTrait: Trait | null = null;
  recessiveTrait: Trait | null = null;

  constructor() {}

  setTraits(dominant: Trait, recessive: Trait): void {
    this.dominantTrait = dominant;
    this.recessiveTrait = recessive;
  }

  getDominantTrait(): Trait | null {
    return this.dominantTrait;
  }

  getRecessiveTrait(): Trait | null {
    return this.recessiveTrait;
  }

  createPureGenotype(isDominant: boolean): Genotype {
    const allele = isDominant 
      ? (this.dominantTrait?.allele || 'A') 
      : (this.recessiveTrait?.allele || 'a');
    const lowercaseAllele = isDominant ? allele.toLowerCase() : allele;
    
    return {
      alleles: [allele, allele],
      phenotype: isDominant ? '显性' : '隐性',
      isDominant: isDominant
    };
  }

  createHeterozygousGenotype(): Genotype {
    const dominantAllele = this.dominantTrait?.allele || 'A';
    const recessiveAllele = this.recessiveTrait?.allele || 'a';
    
    return {
      alleles: [dominantAllele, recessiveAllele.toLowerCase()],
      phenotype: '显性',
      isDominant: true
    };
  }

  cross(parent1: Genotype, parent2: Genotype): Offspring[] {
    const offspring: Offspring[] = [];
    
    for (const allele1 of parent1.alleles) {
      for (const allele2 of parent2.alleles) {
        const sortedAlleles = this.sortAlleles(allele1, allele2);
        const genotype = sortedAlleles.join('');
        const isDominant = this.isGenotypeDominant(sortedAlleles);
        
        offspring.push({
          genotype: genotype,
          phenotype: isDominant ? '显性' : '隐性',
          isDominant: isDominant
        });
      }
    }
    
    return offspring;
  }

  private sortAlleles(allele1: string, allele2: string): [string, string] {
    if (allele1 === allele1.toUpperCase()) {
      return [allele1, allele2];
    }
    if (allele2 === allele2.toUpperCase()) {
      return [allele2, allele1];
    }
    return allele1 <= allele2 ? [allele1, allele2] : [allele2, allele1];
  }

  private isGenotypeDominant(alleles: [string, string]): boolean {
    return alleles.some(a => a === a.toUpperCase());
  }

  calculateGenotypeRatio(offspring: Offspring[]): { [key: string]: number } {
    const ratio: { [key: string]: number } = {};
    
    for (const child of offspring) {
      ratio[child.genotype] = (ratio[child.genotype] || 0) + 1;
    }
    
    return ratio;
  }

  calculatePhenotypeRatio(offspring: Offspring[]): { dominant: number; recessive: number } {
    let dominant = 0;
    let recessive = 0;
    
    for (const child of offspring) {
      if (child.isDominant) {
        dominant++;
      } else {
        recessive++;
      }
    }
    
    return { dominant, recessive };
  }

  generatePGeneration(): GenerationResult {
    const dominantParent = this.createPureGenotype(true);
    const recessiveParent = this.createPureGenotype(false);
    
    const offspring: Offspring[] = [
      {
        genotype: dominantParent.alleles.join(''),
        phenotype: '显性',
        isDominant: true
      },
      {
        genotype: recessiveParent.alleles.join(''),
        phenotype: '隐性',
        isDominant: false
      }
    ];
    
    return {
      generation: 'P',
      offspring: offspring,
      genotypeRatio: this.calculateGenotypeRatio(offspring),
      phenotypeRatio: this.calculatePhenotypeRatio(offspring)
    };
  }

  generateF1Generation(): GenerationResult {
    const dominantParent = this.createPureGenotype(true);
    const recessiveParent = this.createPureGenotype(false);
    
    const offspring = this.cross(dominantParent, recessiveParent);
    
    return {
      generation: 'F1',
      offspring: offspring,
      genotypeRatio: this.calculateGenotypeRatio(offspring),
      phenotypeRatio: this.calculatePhenotypeRatio(offspring)
    };
  }

  generateF2Generation(): GenerationResult {
    const heterozygous = this.createHeterozygousGenotype();
    
    const offspring = this.cross(heterozygous, heterozygous);
    
    return {
      generation: 'F2',
      offspring: offspring,
      genotypeRatio: this.calculateGenotypeRatio(offspring),
      phenotypeRatio: this.calculatePhenotypeRatio(offspring)
    };
  }

  generatePunnettSquare(parent1: Genotype, parent2: Genotype): Offspring[][] {
    const square: Offspring[][] = [];
    
    const alleles1 = parent1.alleles;
    const alleles2 = parent2.alleles;
    
    for (let i = 0; i < alleles1.length; i++) {
      square[i] = [];
      for (let j = 0; j < alleles2.length; j++) {
        const sortedAlleles = this.sortAlleles(alleles1[i], alleles2[j]);
        const genotype = sortedAlleles.join('');
        const isDominant = this.isGenotypeDominant(sortedAlleles);
        
        square[i][j] = {
          genotype: genotype,
          phenotype: isDominant ? '显性' : '隐性',
          isDominant: isDominant
        };
      }
    }
    
    return square;
  }
}
