import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Molecule } from '../models/molecule.model';
import { Atom } from '../models/atom.model';
import { Bond, BondAnimationState } from '../models/bond.model';

export interface AnimationState {
  isPlaying: boolean;
  vibrationEnabled: boolean;
  rotationEnabled: boolean;
  vibrationSpeed: number;
  rotationSpeed: number;
  vibrationAmplitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private animationFrameId: number | null = null;
  private lastTime: number = 0;
  
  private animationStateSubject = new BehaviorSubject<AnimationState>({
    isPlaying: true,
    vibrationEnabled: true,
    rotationEnabled: true,
    vibrationSpeed: 1,
    rotationSpeed: 1,
    vibrationAmplitude: 5
  });
  
  private moleculeSubject = new BehaviorSubject<Molecule | null>(null);
  private bondStatesSubject = new BehaviorSubject<Map<string, BondAnimationState>>(new Map());
  
  animationState$ = this.animationStateSubject.asObservable();
  molecule$ = this.moleculeSubject.asObservable();
  bondStates$ = this.bondStatesSubject.asObservable();

  constructor() { }

  setMolecule(molecule: Molecule): void {
    this.moleculeSubject.next({ ...molecule });
    this.initializeBondStates(molecule);
    
    const state = this.animationStateSubject.value;
    if (state.isPlaying && this.animationFrameId === null) {
      this.lastTime = performance.now();
      this.startAnimationLoop();
    }
  }

  private initializeBondStates(molecule: Molecule): void {
    const bondStates = new Map<string, BondAnimationState>();
    molecule.bonds.forEach(bond => {
      bondStates.set(bond.id, {
        currentLength: bond.bondLength,
        vibrationPhase: Math.random() * Math.PI * 2,
        vibrationFrequency: 2 + Math.random() * 3,
        vibrationAmplitude: 3 + Math.random() * 4
      });
    });
    this.bondStatesSubject.next(bondStates);
  }

  togglePlay(): void {
    const state = this.animationStateSubject.value;
    const newState = { ...state, isPlaying: !state.isPlaying };
    this.animationStateSubject.next(newState);
    
    if (newState.isPlaying) {
      this.lastTime = performance.now();
      this.startAnimationLoop();
    } else {
      this.stopAnimationLoop();
    }
  }

  play(): void {
    const state = this.animationStateSubject.value;
    if (!state.isPlaying) {
      this.animationStateSubject.next({ ...state, isPlaying: true });
      this.lastTime = performance.now();
      this.startAnimationLoop();
    }
  }

  pause(): void {
    const state = this.animationStateSubject.value;
    if (state.isPlaying) {
      this.animationStateSubject.next({ ...state, isPlaying: false });
      this.stopAnimationLoop();
    }
  }

  reset(): void {
    const molecule = this.moleculeSubject.value;
    if (molecule) {
      const resetMolecule = {
        ...molecule,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        atoms: molecule.atoms.map(atom => ({
          ...atom,
          velocityX: 0,
          velocityY: 0,
          velocityZ: 0
        }))
      };
      this.moleculeSubject.next(resetMolecule);
      this.initializeBondStates(resetMolecule);
    }
  }

  setVibrationEnabled(enabled: boolean): void {
    const state = this.animationStateSubject.value;
    this.animationStateSubject.next({ ...state, vibrationEnabled: enabled });
  }

  setRotationEnabled(enabled: boolean): void {
    const state = this.animationStateSubject.value;
    this.animationStateSubject.next({ ...state, rotationEnabled: enabled });
  }

  setVibrationSpeed(speed: number): void {
    const state = this.animationStateSubject.value;
    this.animationStateSubject.next({ ...state, vibrationSpeed: speed });
  }

  setRotationSpeed(speed: number): void {
    const state = this.animationStateSubject.value;
    this.animationStateSubject.next({ ...state, rotationSpeed: speed });
  }

  setVibrationAmplitude(amplitude: number): void {
    const state = this.animationStateSubject.value;
    this.animationStateSubject.next({ ...state, vibrationAmplitude: amplitude });
  }

  private startAnimationLoop(): void {
    this.animationFrameId = requestAnimationFrame((time) => this.animate(time));
  }

  private stopAnimationLoop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private animate(currentTime: number): void {
    const state = this.animationStateSubject.value;
    if (!state.isPlaying) return;

    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    const molecule = this.moleculeSubject.value;
    if (molecule) {
      const updatedMolecule = { ...molecule };
      
      if (state.rotationEnabled) {
        updatedMolecule.rotationY += state.rotationSpeed * deltaTime * 30;
        updatedMolecule.rotationX += state.rotationSpeed * deltaTime * 15;
      }

      if (state.vibrationEnabled) {
        const bondStates = new Map(this.bondStatesSubject.value);
        
        molecule.bonds.forEach(bond => {
          const bondState = bondStates.get(bond.id);
          if (bondState) {
            bondState.vibrationPhase += state.vibrationSpeed * deltaTime * bondState.vibrationFrequency;
            const vibration = Math.sin(bondState.vibrationPhase) * state.vibrationAmplitude;
            bondState.currentLength = bond.bondLength + vibration;
            bondStates.set(bond.id, bondState);
          }
        });
        
        this.bondStatesSubject.next(bondStates);
      }

      this.moleculeSubject.next(updatedMolecule);
    }

    this.animationFrameId = requestAnimationFrame((time) => this.animate(time));
  }

  ngOnDestroy(): void {
    this.stopAnimationLoop();
  }
}
