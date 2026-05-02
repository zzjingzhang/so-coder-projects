import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AnimationService, AnimationState } from '../../services/animation.service';
import { PRESET_MOLECULES, Molecule } from '../../models/molecule.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  standalone: false
})
export class ToolbarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  presetMolecules = PRESET_MOLECULES;
  selectedMoleculeId: string = 'water';
  animationState: AnimationState | null = null;

  constructor(private animationService: AnimationService) { }

  ngOnInit(): void {
    this.animationService.animationState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.animationState = state;
      });

    const defaultMolecule = PRESET_MOLECULES.find(m => m.id === 'water');
    if (defaultMolecule) {
      this.animationService.setMolecule(defaultMolecule);
    }
  }

  onMoleculeChange(moleculeId: string): void {
    const molecule = PRESET_MOLECULES.find(m => m.id === moleculeId);
    if (molecule) {
      this.animationService.setMolecule(molecule);
    }
  }

  togglePlay(): void {
    this.animationService.togglePlay();
  }

  reset(): void {
    this.animationService.reset();
  }

  toggleVibration(): void {
    if (this.animationState) {
      this.animationService.setVibrationEnabled(!this.animationState.vibrationEnabled);
    }
  }

  toggleRotation(): void {
    if (this.animationState) {
      this.animationService.setRotationEnabled(!this.animationState.rotationEnabled);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
