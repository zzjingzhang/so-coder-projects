import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Molecule {
  id: number;
  type: 'NO2' | 'N2O4';
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export interface ReactionState {
  temperature: number;
  no2Concentration: number;
  n2o4Concentration: number;
  equilibriumConstant: number;
  reactionQuotient: number;
  isForwardReaction: boolean;
  colorIntensity: number;
  molecules: Molecule[];
}

@Injectable({
  providedIn: 'root'
})
export class ChemicalEquilibriumService {
  private readonly STANDARD_TEMPERATURE = 298;
  private readonly MIN_TEMPERATURE = 200;
  private readonly MAX_TEMPERATURE = 500;
  private readonly INITIAL_NO2_MOLES = 100;
  private readonly CONTAINER_WIDTH = 800;
  private readonly CONTAINER_HEIGHT = 500;

  private stateSubject = new BehaviorSubject<ReactionState>(this.getInitialState());
  public state$ = this.stateSubject.asObservable();

  private getInitialState(): ReactionState {
    const initialNo2 = this.INITIAL_NO2_MOLES;
    const initialN2o4 = 0;
    const temperature = this.STANDARD_TEMPERATURE;
    const k = this.calculateEquilibriumConstant(temperature);

    return {
      temperature,
      no2Concentration: initialNo2,
      n2o4Concentration: initialN2o4,
      equilibriumConstant: k,
      reactionQuotient: this.calculateReactionQuotient(initialNo2, initialN2o4),
      isForwardReaction: true,
      colorIntensity: this.calculateColorIntensity(initialNo2, initialN2o4),
      molecules: this.createInitialMolecules()
    };
  }

  private createInitialMolecules(): Molecule[] {
    const molecules: Molecule[] = [];
    let id = 0;

    for (let i = 0; i < this.INITIAL_NO2_MOLES; i++) {
      molecules.push(this.createMolecule(id++, 'NO2'));
    }

    return molecules;
  }

  private createMolecule(id: number, type: 'NO2' | 'N2O4'): Molecule {
    const speed = this.getSpeedForTemperature(this.STANDARD_TEMPERATURE);
    const angle = Math.random() * 2 * Math.PI;
    return {
      id,
      type,
      x: Math.random() * (this.CONTAINER_WIDTH - 40) + 20,
      y: Math.random() * (this.CONTAINER_HEIGHT - 40) + 20,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: type === 'NO2' ? 8 : 12
    };
  }

  private getSpeedForTemperature(temperature: number): number {
    const minSpeed = 0.5;
    const maxSpeed = 5;
    const normalizedTemp = (temperature - this.MIN_TEMPERATURE) / (this.MAX_TEMPERATURE - this.MIN_TEMPERATURE);
    return minSpeed + normalizedTemp * (maxSpeed - minSpeed);
  }

  private calculateEquilibriumConstant(temperature: number): number {
    const deltaH = -57.2;
    const k298 = 210;
    const r = 8.314;

    const lnK = Math.log(k298) - (deltaH * 1000 / r) * (1 / temperature - 1 / this.STANDARD_TEMPERATURE);
    return Math.exp(lnK);
  }

  private calculateReactionQuotient(no2: number, n2o4: number): number {
    if (no2 < 2) return Infinity;
    return n2o4 / Math.pow(no2, 2);
  }

  private calculateColorIntensity(no2: number, n2o4: number): number {
    const total = no2 + n2o4 * 2;
    if (total === 0) return 0;
    return (no2 / total) * 100;
  }

  public setTemperature(temperature: number): void {
    const clampedTemp = Math.max(this.MIN_TEMPERATURE, Math.min(this.MAX_TEMPERATURE, temperature));
    const currentState = this.stateSubject.getValue();

    const k = this.calculateEquilibriumConstant(clampedTemp);
    const q = this.calculateReactionQuotient(currentState.no2Concentration, currentState.n2o4Concentration);
    const isForwardReaction = q > k;

    const updatedMolecules = currentState.molecules.map(mol => {
      const speed = this.getSpeedForTemperature(clampedTemp);
      const currentSpeed = Math.sqrt(mol.vx * mol.vx + mol.vy * mol.vy);
      if (currentSpeed === 0) return mol;
      const scale = speed / currentSpeed;
      return {
        ...mol,
        vx: mol.vx * scale,
        vy: mol.vy * scale
      };
    });

    this.stateSubject.next({
      ...currentState,
      temperature: clampedTemp,
      equilibriumConstant: k,
      reactionQuotient: q,
      isForwardReaction,
      colorIntensity: this.calculateColorIntensity(currentState.no2Concentration, currentState.n2o4Concentration),
      molecules: updatedMolecules
    });
  }

  public addNo2(amount: number): void {
    const currentState = this.stateSubject.getValue();
    const newNo2 = currentState.no2Concentration + amount;
    const k = currentState.equilibriumConstant;
    const q = this.calculateReactionQuotient(newNo2, currentState.n2o4Concentration);
    const isForwardReaction = q > k;

    const newMolecules = [...currentState.molecules];
    let nextId = Math.max(...newMolecules.map(m => m.id), 0) + 1;

    for (let i = 0; i < amount; i++) {
      newMolecules.push(this.createMolecule(nextId++, 'NO2'));
    }

    this.stateSubject.next({
      ...currentState,
      no2Concentration: newNo2,
      reactionQuotient: q,
      isForwardReaction,
      colorIntensity: this.calculateColorIntensity(newNo2, currentState.n2o4Concentration),
      molecules: newMolecules
    });
  }

  public addN2o4(amount: number): void {
    const currentState = this.stateSubject.getValue();
    const newN2o4 = currentState.n2o4Concentration + amount;
    const k = currentState.equilibriumConstant;
    const q = this.calculateReactionQuotient(currentState.no2Concentration, newN2o4);
    const isForwardReaction = q > k;

    const newMolecules = [...currentState.molecules];
    let nextId = Math.max(...newMolecules.map(m => m.id), 0) + 1;

    for (let i = 0; i < amount; i++) {
      newMolecules.push(this.createMolecule(nextId++, 'N2O4'));
    }

    this.stateSubject.next({
      ...currentState,
      n2o4Concentration: newN2o4,
      reactionQuotient: q,
      isForwardReaction,
      colorIntensity: this.calculateColorIntensity(currentState.no2Concentration, newN2o4),
      molecules: newMolecules
    });
  }

  public updateReaction(): void {
    const currentState = this.stateSubject.getValue();
    const { no2Concentration, n2o4Concentration, equilibriumConstant, reactionQuotient, isForwardReaction } = currentState;

    if (Math.abs(reactionQuotient - equilibriumConstant) < 0.001) {
      return;
    }

    const reactionRate = 0.05;
    let newNo2 = no2Concentration;
    let newN2o4 = n2o4Concentration;

    if (isForwardReaction && no2Concentration >= 2) {
      const no2ToConvert = Math.min(2, no2Concentration);
      newNo2 -= no2ToConvert * reactionRate * 10;
      newN2o4 += (no2ToConvert / 2) * reactionRate * 10;
    } else if (!isForwardReaction && n2o4Concentration >= 1) {
      const n2o4ToConvert = Math.min(1, n2o4Concentration);
      newN2o4 -= n2o4ToConvert * reactionRate * 10;
      newNo2 += n2o4ToConvert * 2 * reactionRate * 10;
    }

    newNo2 = Math.max(0, newNo2);
    newN2o4 = Math.max(0, newN2o4);

    const molecules = this.updateMoleculesForReaction(
      currentState.molecules,
      isForwardReaction,
      reactionRate
    );

    const newQ = this.calculateReactionQuotient(newNo2, newN2o4);
    const newIsForward = newQ > equilibriumConstant;

    this.stateSubject.next({
      ...currentState,
      no2Concentration: newNo2,
      n2o4Concentration: newN2o4,
      reactionQuotient: newQ,
      isForwardReaction: newIsForward,
      colorIntensity: this.calculateColorIntensity(newNo2, newN2o4),
      molecules
    });
  }

  private updateMoleculesForReaction(
    molecules: Molecule[],
    isForwardReaction: boolean,
    rate: number
  ): Molecule[] {
    if (Math.random() > rate * 2) {
      return this.updateMoleculePositions(molecules);
    }

    const no2Molecules = molecules.filter(m => m.type === 'NO2');
    const n2o4Molecules = molecules.filter(m => m.type === 'N2O4');

    if (isForwardReaction && no2Molecules.length >= 2) {
      const pair = this.findCollidingNo2Pair(no2Molecules);
      if (pair) {
        const newMolecules = molecules.filter(m => m.id !== pair[0].id && m.id !== pair[1].id);
        const newN2o4: Molecule = {
          id: Date.now(),
          type: 'N2O4',
          x: (pair[0].x + pair[1].x) / 2,
          y: (pair[0].y + pair[1].y) / 2,
          vx: (pair[0].vx + pair[1].vx) / 2,
          vy: (pair[0].vy + pair[1].vy) / 2,
          radius: 12
        };
        newMolecules.push(newN2o4);
        return this.updateMoleculePositions(newMolecules);
      }
    } else if (!isForwardReaction && n2o4Molecules.length >= 1) {
      const n2o4ToBreak = n2o4Molecules[Math.floor(Math.random() * n2o4Molecules.length)];
      const newMolecules = molecules.filter(m => m.id !== n2o4ToBreak.id);

      const speed = Math.sqrt(n2o4ToBreak.vx * n2o4ToBreak.vx + n2o4ToBreak.vy * n2o4ToBreak.vy);
      const angle1 = Math.random() * 2 * Math.PI;
      const angle2 = angle1 + Math.PI;

      newMolecules.push(
        {
          id: Date.now(),
          type: 'NO2',
          x: n2o4ToBreak.x - 5,
          y: n2o4ToBreak.y,
          vx: Math.cos(angle1) * speed,
          vy: Math.sin(angle1) * speed,
          radius: 8
        },
        {
          id: Date.now() + 1,
          type: 'NO2',
          x: n2o4ToBreak.x + 5,
          y: n2o4ToBreak.y,
          vx: Math.cos(angle2) * speed,
          vy: Math.sin(angle2) * speed,
          radius: 8
        }
      );
      return this.updateMoleculePositions(newMolecules);
    }

    return this.updateMoleculePositions(molecules);
  }

  private findCollidingNo2Pair(no2Molecules: Molecule[]): [Molecule, Molecule] | null {
    for (let i = 0; i < no2Molecules.length; i++) {
      for (let j = i + 1; j < no2Molecules.length; j++) {
        const dx = no2Molecules[i].x - no2Molecules[j].x;
        const dy = no2Molecules[i].y - no2Molecules[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 20) {
          return [no2Molecules[i], no2Molecules[j]];
        }
      }
    }
    return null;
  }

  private updateMoleculePositions(molecules: Molecule[]): Molecule[] {
    return molecules.map(mol => {
      let { x, y, vx, vy, radius } = mol;

      x += vx;
      y += vy;

      if (x - radius < 0 || x + radius > this.CONTAINER_WIDTH) {
        vx = -vx;
        x = Math.max(radius, Math.min(this.CONTAINER_WIDTH - radius, x));
      }
      if (y - radius < 0 || y + radius > this.CONTAINER_HEIGHT) {
        vy = -vy;
        y = Math.max(radius, Math.min(this.CONTAINER_HEIGHT - radius, y));
      }

      return { ...mol, x, y, vx, vy };
    });
  }

  public reset(): void {
    this.stateSubject.next(this.getInitialState());
  }

  public getContainerDimensions(): { width: number; height: number } {
    return { width: this.CONTAINER_WIDTH, height: this.CONTAINER_HEIGHT };
  }
}
