import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { 
  Trait, 
  GenerationResult, 
  Offspring,
  GeneticsService 
} from '../../services/genetics.service';

interface AnimationStep {
  label: string;
  description: string;
  showPunnett: boolean;
  delay: number;
}

@Component({
  selector: 'app-hybrid-simulation',
  templateUrl: './hybrid-simulation.component.html',
  standalone: false,
  styleUrl: './hybrid-simulation.component.css'
})
export class HybridSimulationComponent implements OnInit {
  @Input() dominantTrait: Trait | null = null;
  @Input() recessiveTrait: Trait | null = null;
  @Output() simulationComplete = new EventEmitter<{
    pGeneration: GenerationResult;
    f1Generation: GenerationResult;
    f2Generation: GenerationResult;
  }>();
  @Output() backStep = new EventEmitter<void>();

  currentPhase = 0;
  phases = [
    { title: 'P代杂交', description: '纯合显性 × 纯合隐性' },
    { title: 'F1代自交', description: '杂合子自交' },
    { title: '结果分析', description: '查看遗传比例' }
  ];

  isAnimating = false;
  animationStep = 0;

  pGeneration: GenerationResult | null = null;
  f1Generation: GenerationResult | null = null;
  f2Generation: GenerationResult | null = null;

  pPunnettSquare: Offspring[][] | null = null;
  f1PunnettSquare: Offspring[][] | null = null;

  showPCross = false;
  showF1Cross = false;
  showF2Cross = false;

  message: string | null = null;
  messageType: 'success' | 'error' | null = null;

  animationSteps: AnimationStep[] = [
    { label: '选择亲本', description: '选择纯合显性（PP）和纯合隐性（pp）亲本', showPunnett: false, delay: 1000 },
    { label: '形成配子', description: '等位基因分离，每个配子只含一个基因', showPunnett: false, delay: 1500 },
    { label: '随机结合', description: '配子随机结合，形成受精卵', showPunnett: true, delay: 2000 },
    { label: '观察结果', description: 'F1代全部为杂合子（Pp），表现显性性状', showPunnett: true, delay: 1500 }
  ];

  f1AnimationSteps: AnimationStep[] = [
    { label: 'F1代基因型', description: 'F1代为杂合子（Pp）', showPunnett: false, delay: 1000 },
    { label: '形成配子', description: '等位基因分离，产生P和p两种配子', showPunnett: false, delay: 1500 },
    { label: '随机结合', description: '配子随机结合，形成F2代', showPunnett: true, delay: 2000 },
    { label: '观察分离', description: 'F2代出现性状分离，比例为3:1', showPunnett: true, delay: 1500 }
  ];

  constructor(
    private geneticsService: GeneticsService
  ) {}

  ngOnInit(): void {
    if (this.dominantTrait && this.recessiveTrait) {
      this.geneticsService.setTraits(this.dominantTrait, this.recessiveTrait);
    }
  }

  showMessage(text: string, type: 'success' | 'error'): void {
    this.message = text;
    this.messageType = type;
    setTimeout(() => {
      this.message = null;
      this.messageType = null;
    }, 3000);
  }

  getAlleleLetter(): string {
    return this.dominantTrait?.allele || 'P';
  }

  getLowerAlleleLetter(): string {
    return this.recessiveTrait?.allele || 'p';
  }

  async startPCrossAnimation(): Promise<void> {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    this.animationStep = 0;
    this.showPCross = false;
    this.pPunnettSquare = null;

    for (let i = 0; i < this.animationSteps.length; i++) {
      this.animationStep = i;
      
      if (this.animationSteps[i].showPunnett && !this.pPunnettSquare) {
        const dominantParent = this.geneticsService.createPureGenotype(true);
        const recessiveParent = this.geneticsService.createPureGenotype(false);
        this.pPunnettSquare = this.geneticsService.generatePunnettSquare(dominantParent, recessiveParent);
      }
      
      await this.delay(this.animationSteps[i].delay);
    }

    this.showPCross = true;
    this.pGeneration = this.geneticsService.generatePGeneration();
    this.f1Generation = this.geneticsService.generateF1Generation();
    
    this.isAnimating = false;
    this.showMessage('P代杂交完成！F1代全部为显性性状', 'success');
  }

  async startF1CrossAnimation(): Promise<void> {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    this.animationStep = 0;
    this.showF1Cross = false;
    this.f1PunnettSquare = null;

    for (let i = 0; i < this.f1AnimationSteps.length; i++) {
      this.animationStep = i;
      
      if (this.f1AnimationSteps[i].showPunnett && !this.f1PunnettSquare) {
        const heterozygous = this.geneticsService.createHeterozygousGenotype();
        this.f1PunnettSquare = this.geneticsService.generatePunnettSquare(heterozygous, heterozygous);
      }
      
      await this.delay(this.f1AnimationSteps[i].delay);
    }

    this.showF1Cross = true;
    this.f2Generation = this.geneticsService.generateF2Generation();
    
    this.isAnimating = false;
    this.showMessage('F1代自交完成！观察F2代的性状分离', 'success');
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  goToPhase(phase: number): void {
    if (phase <= this.currentPhase + 1 || this.canGoToPhase(phase)) {
      this.currentPhase = phase;
      this.animationStep = 0;
    }
  }

  canGoToPhase(phase: number): boolean {
    if (phase === 0) return true;
    if (phase === 1) return !!this.f1Generation;
    if (phase === 2) return !!this.f2Generation;
    return false;
  }

  canProceed(): boolean {
    return !!this.f2Generation;
  }

  getCurrentAnimationSteps(): AnimationStep[] {
    if (this.currentPhase === 0) {
      return this.animationSteps;
    }
    return this.f1AnimationSteps;
  }

  getPhenotypeColor(isDominant: boolean): string {
    if (isDominant) {
      return this.dominantTrait?.type === 'dominant' ? '#8B5CF6' : '#10B981';
    }
    return this.recessiveTrait?.type === 'recessive' ? '#F3F4F6' : '#F59E0B';
  }

  getGenotypeDisplay(genotype: string): string {
    return genotype;
  }

  onComplete(): void {
    if (this.pGeneration && this.f1Generation && this.f2Generation) {
      this.simulationComplete.emit({
        pGeneration: this.pGeneration,
        f1Generation: this.f1Generation,
        f2Generation: this.f2Generation
      });
      this.showMessage('杂交模拟完成！查看详细结果分析', 'success');
    }
  }

  resetSimulation(): void {
    this.currentPhase = 0;
    this.pGeneration = null;
    this.f1Generation = null;
    this.f2Generation = null;
    this.pPunnettSquare = null;
    this.f1PunnettSquare = null;
    this.showPCross = false;
    this.showF1Cross = false;
    this.showF2Cross = false;
    this.isAnimating = false;
    this.animationStep = 0;
  }

  onBack(): void {
    this.backStep.emit();
  }
}
