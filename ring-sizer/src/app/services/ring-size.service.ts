import { Injectable } from '@angular/core';
import { RING_SIZE_DATA, getMinCircumference, getMaxCircumference, getMinDiameter, getMaxDiameter, getAvailableSizes } from '../data/ring-size.data';
import { RingSizeEntry, ConvertedSizes, MeasurementSystem } from '../models/ring-size.model';

@Injectable({
  providedIn: 'root'
})
export class RingSizeService {

  constructor() { }

  getMinCircumference(): number {
    return getMinCircumference();
  }

  getMaxCircumference(): number {
    return getMaxCircumference();
  }

  getMinDiameter(): number {
    return getMinDiameter();
  }

  getMaxDiameter(): number {
    return getMaxDiameter();
  }

  getAvailableSizes(system: string): string[] {
    return getAvailableSizes(system);
  }

  findClosestEntry(circumference: number): RingSizeEntry {
    let closestEntry = RING_SIZE_DATA[0];
    let smallestDiff = Math.abs(circumference - closestEntry.circumference);

    for (const entry of RING_SIZE_DATA) {
      const diff = Math.abs(circumference - entry.circumference);
      if (diff < smallestDiff) {
        smallestDiff = diff;
        closestEntry = entry;
      }
    }

    return closestEntry;
  }

  findClosestEntryByDiameter(diameter: number): RingSizeEntry {
    let closestEntry = RING_SIZE_DATA[0];
    let smallestDiff = Math.abs(diameter - closestEntry.diameter);

    for (const entry of RING_SIZE_DATA) {
      const diff = Math.abs(diameter - entry.diameter);
      if (diff < smallestDiff) {
        smallestDiff = diff;
        closestEntry = entry;
      }
    }

    return closestEntry;
  }

  findEntryBySize(system: MeasurementSystem, size: string): RingSizeEntry | null {
    for (const entry of RING_SIZE_DATA) {
      const entrySize = entry[system];
      if (entrySize !== null && String(entrySize) === size) {
        return entry;
      }
    }
    return null;
  }

  convertByCircumference(circumference: number): ConvertedSizes {
    const entry = this.findClosestEntry(circumference);
    return this.entryToConvertedSizes(entry);
  }

  convertByDiameter(diameter: number): ConvertedSizes {
    const entry = this.findClosestEntryByDiameter(diameter);
    return this.entryToConvertedSizes(entry);
  }

  convertBySize(system: MeasurementSystem, size: string): ConvertedSizes | null {
    const entry = this.findEntryBySize(system, size);
    if (!entry) {
      return null;
    }
    return this.entryToConvertedSizes(entry);
  }

  private entryToConvertedSizes(entry: RingSizeEntry): ConvertedSizes {
    return {
      us: entry.us,
      uk: entry.uk,
      europe: entry.europe,
      japan: entry.japan,
      china: entry.china,
      circumference: entry.circumference,
      diameter: entry.diameter
    };
  }

  circumferenceToDiameter(circumference: number): number {
    return circumference / Math.PI;
  }

  diameterToCircumference(diameter: number): number {
    return diameter * Math.PI;
  }

  getAllData(): RingSizeEntry[] {
    return RING_SIZE_DATA;
  }

  getEntryForPreview(circumference: number): { innerRadius: number; outerRadius: number } {
    const diameter = this.circumferenceToDiameter(circumference);
    const innerRadius = (diameter / 2) * 3;
    const outerRadius = innerRadius + 8;
    return { innerRadius, outerRadius };
  }
}
