import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RingSizeService } from '../services/ring-size.service';
import { ConvertedSizes, MeasurementSystem, SYSTEM_LABELS } from '../models/ring-size.model';

interface DropdownOption {
  label: string;
  value: string;
}

interface InputMode {
  id: 'circumference' | 'diameter' | 'size';
  label: string;
  icon: string;
}

@Component({
  selector: 'app-ring-sizer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SelectModule,
    InputNumberModule,
    CardModule,
    ButtonModule,
    DividerModule
  ],
  templateUrl: './ring-sizer.component.html',
  styleUrls: ['./ring-sizer.component.css']
})
export class RingSizerComponent implements OnInit {

  inputMode: 'circumference' | 'diameter' | 'size' = 'circumference';
  inputModes: InputMode[] = [
    { id: 'circumference', label: 'Circumference', icon: 'pi pi-circle-on' },
    { id: 'diameter', label: 'Diameter', icon: 'pi pi-circle-fill' },
    { id: 'size', label: 'Known Size', icon: 'pi pi-star' }
  ];

  selectedSystem: MeasurementSystem = 'us';
  systems: MeasurementSystem[] = ['us', 'uk', 'europe', 'japan', 'china'];
  systemOptions: DropdownOption[] = [];

  circumference: number = 52;
  diameter: number = 16.56;
  selectedSize: string = '7';
  availableSizes: DropdownOption[] = [];

  convertedSizes: ConvertedSizes | null = null;
  previewInnerRadius: number = 24.84;
  previewOuterRadius: number = 32.84;

  constructor(private ringSizeService: RingSizeService) { }

  ngOnInit(): void {
    this.systemOptions = this.systems.map(system => ({
      label: SYSTEM_LABELS[system],
      value: system
    }));
    
    this.updateAvailableSizes();
    this.updateConvertedSizes();
  }

  setInputMode(mode: 'circumference' | 'diameter' | 'size'): void {
    this.inputMode = mode;
  }

  onSystemChange(): void {
    this.updateAvailableSizes();
    if (this.inputMode === 'size') {
      this.updateConvertedSizes();
    }
  }

  onCircumferenceChange(): void {
    if (this.inputMode === 'circumference') {
      this.diameter = this.ringSizeService.circumferenceToDiameter(this.circumference);
      this.updateConvertedSizes();
    }
  }

  onDiameterChange(): void {
    if (this.inputMode === 'diameter') {
      this.circumference = this.ringSizeService.diameterToCircumference(this.diameter);
      this.updateConvertedSizes();
    }
  }

  onSizeChange(): void {
    if (this.inputMode === 'size') {
      const entry = this.ringSizeService.findEntryBySize(this.selectedSystem, this.selectedSize);
      if (entry) {
        this.circumference = entry.circumference;
        this.diameter = entry.diameter;
      }
      this.updateConvertedSizes();
    }
  }

  private updateAvailableSizes(): void {
    const sizes = this.ringSizeService.getAvailableSizes(this.selectedSystem);
    this.availableSizes = sizes.map(size => ({
      label: size,
      value: size
    }));
    
    if (this.availableSizes.length > 0) {
      const size7Index = this.availableSizes.findIndex(s => s.value === '7' || s.value === 'M' || s.value === '52' || s.value === '13' || s.value === '11');
      this.selectedSize = size7Index >= 0 ? this.availableSizes[size7Index].value : this.availableSizes[0].value;
    }
  }

  private updateConvertedSizes(): void {
    let result: ConvertedSizes | null = null;

    switch (this.inputMode) {
      case 'circumference':
        result = this.ringSizeService.convertByCircumference(this.circumference);
        break;
      case 'diameter':
        result = this.ringSizeService.convertByDiameter(this.diameter);
        break;
      case 'size':
        result = this.ringSizeService.convertBySize(this.selectedSystem, this.selectedSize);
        break;
    }

    if (result) {
      this.convertedSizes = result;
      this.updatePreview();
    }
  }

  private updatePreview(): void {
    if (this.convertedSizes) {
      const preview = this.ringSizeService.getEntryForPreview(this.convertedSizes.circumference);
      this.previewInnerRadius = preview.innerRadius;
      this.previewOuterRadius = preview.outerRadius;
    }
  }

  getSystemLabel(system: MeasurementSystem): string {
    return SYSTEM_LABELS[system];
  }

  getSizeValue(system: MeasurementSystem): string | number | null {
    if (!this.convertedSizes) return null;
    return this.convertedSizes[system];
  }

  getSystemColor(system: MeasurementSystem): string {
    const colors: Record<MeasurementSystem, string> = {
      us: 'bg-gradient-to-r from-blue-500 to-blue-600',
      uk: 'bg-gradient-to-r from-red-500 to-red-600',
      europe: 'bg-gradient-to-r from-green-500 to-green-600',
      japan: 'bg-gradient-to-r from-pink-500 to-pink-600',
      china: 'bg-gradient-to-r from-purple-500 to-purple-600'
    };
    return colors[system];
  }
}
