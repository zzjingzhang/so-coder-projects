import { Component, Output, EventEmitter } from '@angular/core';
import { Trait } from '../../services/genetics.service';

interface PresetTrait {
  name: string;
  dominant: { name: string; color: string };
  recessive: { name: string; color: string };
  allele: string;
}

@Component({
  selector: 'app-trait-upload',
  templateUrl: './trait-upload.component.html',
  standalone: false,
  styleUrl: './trait-upload.component.css'
})
export class TraitUploadComponent {
  @Output() traitsSelected = new EventEmitter<{ dominant: Trait; recessive: Trait }>();
  @Output() backStep = new EventEmitter<void>();

  usePreset = true;
  selectedPresetIndex = 0;

  dominantTrait: Trait | null = null;
  recessiveTrait: Trait | null = null;

  dominantAllele = 'P';
  recessiveAllele = 'p';

  dominantName = '紫色花';
  recessiveName = '白色花';

  message: string | null = null;
  messageType: 'success' | 'error' | null = null;

  presets: PresetTrait[] = [
    {
      name: '豌豆花色',
      dominant: { name: '紫色花', color: '#8B5CF6' },
      recessive: { name: '白色花', color: '#F3F4F6' },
      allele: 'P'
    },
    {
      name: '豌豆种子形状',
      dominant: { name: '圆形种子', color: '#10B981' },
      recessive: { name: '皱缩种子', color: '#F59E0B' },
      allele: 'R'
    },
    {
      name: '豌豆种子颜色',
      dominant: { name: '黄色种子', color: '#FBBF24' },
      recessive: { name: '绿色种子', color: '#22C55E' },
      allele: 'Y'
    },
    {
      name: '豌豆豆荚形状',
      dominant: { name: '饱满豆荚', color: '#06B6D4' },
      recessive: { name: '缢缩豆荚', color: '#EF4444' },
      allele: 'I'
    }
  ];

  dominantDragOver = false;
  recessiveDragOver = false;

  constructor() {}

  showMessage(text: string, type: 'success' | 'error'): void {
    this.message = text;
    this.messageType = type;
    setTimeout(() => {
      this.message = null;
      this.messageType = null;
    }, 3000);
  }

  selectPreset(index: number): void {
    this.selectedPresetIndex = index;
    const preset = this.presets[index];
    this.dominantAllele = preset.allele;
    this.recessiveAllele = preset.allele.toLowerCase();
    this.dominantName = preset.dominant.name;
    this.recessiveName = preset.recessive.name;
  }

  onDominantDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dominantDragOver = true;
  }

  onDominantDragLeave(): void {
    this.dominantDragOver = false;
  }

  onDominantDrop(event: DragEvent): void {
    event.preventDefault();
    this.dominantDragOver = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFileUpload(files[0], 'dominant');
    }
  }

  onRecessiveDragOver(event: DragEvent): void {
    event.preventDefault();
    this.recessiveDragOver = true;
  }

  onRecessiveDragLeave(): void {
    this.recessiveDragOver = false;
  }

  onRecessiveDrop(event: DragEvent): void {
    event.preventDefault();
    this.recessiveDragOver = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFileUpload(files[0], 'recessive');
    }
  }

  onDominantFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.handleFileUpload(file, 'dominant');
    }
  }

  onRecessiveFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.handleFileUpload(file, 'recessive');
    }
  }

  private handleFileUpload(file: File, type: 'dominant' | 'recessive'): void {
    if (!file.type.startsWith('image/')) {
      this.showMessage('请上传图片文件', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.showMessage('图片大小不能超过5MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      
      if (type === 'dominant') {
        this.dominantTrait = {
          id: 'dominant-' + Date.now(),
          name: this.dominantName,
          imageUrl: imageUrl,
          allele: this.dominantAllele.toUpperCase(),
          type: 'dominant'
        };
      } else {
        this.recessiveTrait = {
          id: 'recessive-' + Date.now(),
          name: this.recessiveName,
          imageUrl: imageUrl,
          allele: this.recessiveAllele.toLowerCase(),
          type: 'recessive'
        };
      }
      
      this.showMessage(`${type === 'dominant' ? '显性' : '隐性'}性状图片上传成功`, 'success');
    };
    reader.readAsDataURL(file);
  }

  generateColorImage(color: string, size: number = 200): string {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, size, size);
      ctx.strokeStyle = '#d1d5db';
      ctx.lineWidth = 4;
      ctx.strokeRect(2, 2, size - 4, size - 4);
    }
    return canvas.toDataURL();
  }

  getSelectedPreset(): PresetTrait {
    return this.presets[this.selectedPresetIndex];
  }

  canProceed(): boolean {
    if (this.usePreset) {
      return true;
    }
    return this.dominantTrait !== null && this.recessiveTrait !== null;
  }

  onConfirm(): void {
    let dominant: Trait;
    let recessive: Trait;

    if (this.usePreset) {
      const preset = this.getSelectedPreset();
      dominant = {
        id: 'dominant-preset',
        name: preset.dominant.name,
        imageUrl: this.generateColorImage(preset.dominant.color),
        allele: preset.allele.toUpperCase(),
        type: 'dominant'
      };
      recessive = {
        id: 'recessive-preset',
        name: preset.recessive.name,
        imageUrl: this.generateColorImage(preset.recessive.color),
        allele: preset.allele.toLowerCase(),
        type: 'recessive'
      };
    } else {
      if (!this.dominantTrait || !this.recessiveTrait) {
        this.showMessage('请先上传显性和隐性性状图片', 'error');
        return;
      }
      
      dominant = {
        ...this.dominantTrait,
        name: this.dominantName,
        allele: this.dominantAllele.toUpperCase()
      };
      recessive = {
        ...this.recessiveTrait,
        name: this.recessiveName,
        allele: this.recessiveAllele.toLowerCase()
      };
    }

    this.traitsSelected.emit({ dominant, recessive });
    this.showMessage('性状选择完成，开始杂交模拟！', 'success');
  }

  clearDominant(): void {
    this.dominantTrait = null;
  }

  clearRecessive(): void {
    this.recessiveTrait = null;
  }

  triggerDominantInput(): void {
    const input = document.querySelector('#dominantFileInput') as HTMLInputElement;
    if (input) {
      input.click();
    }
  }

  triggerRecessiveInput(): void {
    const input = document.querySelector('#recessiveFileInput') as HTMLInputElement;
    if (input) {
      input.click();
    }
  }

  onBack(): void {
    this.backStep.emit();
  }
}
