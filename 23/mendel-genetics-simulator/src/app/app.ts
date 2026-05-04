import { Component } from '@angular/core';
import { GeneticsService, Trait, GenerationResult } from './services/genetics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  currentStep = 0;
  steps = [
    { title: '学习知识', description: '了解孟德尔遗传定律的基本概念' },
    { title: '选择性状', description: '上传或选择显性和隐性性状' },
    { title: '模拟杂交', description: '进行P代、F1代和F2代杂交模拟' },
    { title: '查看结果', description: '分析基因型和表型比例' }
  ];

  dominantTrait: Trait | null = null;
  recessiveTrait: Trait | null = null;

  pGeneration: GenerationResult | null = null;
  f1Generation: GenerationResult | null = null;
  f2Generation: GenerationResult | null = null;

  showResults = false;

  constructor(private geneticsService: GeneticsService) {}

  onTraitsSelected(dominant: Trait, recessive: Trait): void {
    this.dominantTrait = dominant;
    this.recessiveTrait = recessive;
    this.geneticsService.setTraits(dominant, recessive);
  }

  onSimulationComplete(results: {
    pGeneration: GenerationResult;
    f1Generation: GenerationResult;
    f2Generation: GenerationResult;
  }): void {
    this.pGeneration = results.pGeneration;
    this.f1Generation = results.f1Generation;
    this.f2Generation = results.f2Generation;
    this.showResults = true;
    this.currentStep = 3;
  }

  goToStep(step: number): void {
    if (step <= this.currentStep + 1 || this.canGoToStep(step)) {
      this.currentStep = step;
    }
  }

  canGoToStep(step: number): boolean {
    if (step <= 1) return true;
    if (step === 2) return !!this.dominantTrait && !!this.recessiveTrait;
    if (step === 3) return this.showResults;
    return false;
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  resetSimulation(): void {
    this.currentStep = 0;
    this.dominantTrait = null;
    this.recessiveTrait = null;
    this.pGeneration = null;
    this.f1Generation = null;
    this.f2Generation = null;
    this.showResults = false;
  }
}
