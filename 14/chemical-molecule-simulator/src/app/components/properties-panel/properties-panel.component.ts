import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AnimationService, AnimationState } from '../../services/animation.service';
import { Molecule } from '../../models/molecule.model';
import { Atom } from '../../models/atom.model';
import { Bond } from '../../models/bond.model';

@Component({
  selector: 'app-properties-panel',
  templateUrl: './properties-panel.component.html',
  styleUrls: ['./properties-panel.component.css'],
  standalone: false
})
export class PropertiesPanelComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  currentMolecule: Molecule | null = null;
  animationState: AnimationState | null = null;
  selectedAtom: Atom | null = null;
  selectedBond: Bond | null = null;

  constructor(private animationService: AnimationService) { }

  ngOnInit(): void {
    this.animationService.molecule$
      .pipe(takeUntil(this.destroy$))
      .subscribe(molecule => {
        this.currentMolecule = molecule;
        this.selectedAtom = null;
        this.selectedBond = null;
      });

    this.animationService.animationState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.animationState = state;
      });
  }

  onVibrationSpeedChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = parseFloat(target.value);
    if (!isNaN(value)) {
      this.animationService.setVibrationSpeed(value);
    }
  }

  onRotationSpeedChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = parseFloat(target.value);
    if (!isNaN(value)) {
      this.animationService.setRotationSpeed(value);
    }
  }

  onVibrationAmplitudeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = parseFloat(target.value);
    if (!isNaN(value)) {
      this.animationService.setVibrationAmplitude(value);
    }
  }

  selectAtom(atom: Atom): void {
    this.selectedAtom = atom;
    this.selectedBond = null;
  }

  selectBond(bond: Bond): void {
    this.selectedBond = bond;
    this.selectedAtom = null;
  }

  getBondTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      'single': '单键',
      'double': '双键',
      'triple': '三键'
    };
    return labels[type] || type;
  }

  getAtomSymbol(atomId: string): string {
    if (!this.currentMolecule) return '';
    const atom = this.currentMolecule.atoms.find(a => a.id === atomId);
    return atom ? atom.symbol : '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
