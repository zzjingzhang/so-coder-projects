import { Component } from '@angular/core';

interface GraffitiStyle {
  name: string;
  value: string;
}

interface BackgroundStyle {
  name: string;
  value: string;
}

interface ColorOption {
  name: string;
  value: string;
}

@Component({
  selector: 'app-graffiti-generator',
  standalone: false,
  templateUrl: './graffiti-generator.html',
  styleUrl: './graffiti-generator.css',
})
export class GraffitiGenerator {
  text: string = 'GRAFFITI';
  fontSize: number = 120;
  letterSpacing: number = 10;
  textColor: string = '#FF6B6B';
  textStrokeColor: string = '#000000';
  textFillColor: string = '#FFE66D';
  backgroundColor: string = '#4ECDC4';
  showDrips: boolean = true;
  showOutline: boolean = true;
  showFill: boolean = true;
  selectedStyle: string = 'bubble';
  selectedBackground: string = 'brick';
  isGenerating: boolean = false;

  graffitiStyles: GraffitiStyle[] = [
    { name: '气泡字母', value: 'bubble' },
    { name: '街头涂鸦', value: 'street' },
    { name: '霓虹风格', value: 'neon' },
    { name: '复古风格', value: 'vintage' },
  ];

  backgroundStyles: BackgroundStyle[] = [
    { name: '砖墙', value: 'brick' },
    { name: '混凝土', value: 'concrete' },
    { name: '城市夜景', value: 'city' },
    { name: '纯色背景', value: 'solid' },
  ];

  colorOptions: ColorOption[] = [
    { name: '霓虹粉', value: '#FF6B6B' },
    { name: '柠檬黄', value: '#FFE66D' },
    { name: '薄荷绿', value: '#4ECDC4' },
    { name: '天空蓝', value: '#45B7D1' },
    { name: '活力橙', value: '#FFA07A' },
    { name: '神秘紫', value: '#9B59B6' },
  ];

  get graffitiClasses(): string {
    const classes = ['graffiti-text'];
    classes.push(`style-${this.selectedStyle}`);
    if (this.showOutline) classes.push('with-outline');
    if (this.showFill) classes.push('with-fill');
    if (this.showDrips) classes.push('with-drips');
    return classes.join(' ');
  }

  get backgroundClasses(): string {
    const classes = ['graffiti-container', 'preview-container'];
    classes.push(`bg-${this.selectedBackground}`);
    return classes.join(' ');
  }

  generateGraffiti(): void {
    this.isGenerating = true;
    setTimeout(() => {
      this.isGenerating = false;
    }, 500);
  }

  randomize(): void {
    const randomStyleIndex = Math.floor(Math.random() * this.graffitiStyles.length);
    const randomBackgroundIndex = Math.floor(Math.random() * this.backgroundStyles.length);
    const randomColorIndex = Math.floor(Math.random() * this.colorOptions.length);

    this.selectedStyle = this.graffitiStyles[randomStyleIndex].value;
    this.selectedBackground = this.backgroundStyles[randomBackgroundIndex].value;
    this.textColor = this.colorOptions[randomColorIndex].value;
  }

  reset(): void {
    this.text = 'GRAFFITI';
    this.fontSize = 120;
    this.letterSpacing = 10;
    this.textColor = '#FF6B6B';
    this.textStrokeColor = '#000000';
    this.textFillColor = '#FFE66D';
    this.backgroundColor = '#4ECDC4';
    this.showDrips = true;
    this.showOutline = true;
    this.showFill = true;
    this.selectedStyle = 'bubble';
    this.selectedBackground = 'brick';
  }

  getStyleName(styleValue: string): string {
    const style = this.graffitiStyles.find(s => s.value === styleValue);
    return style ? style.name : styleValue;
  }

  getBackgroundName(backgroundValue: string): string {
    const bg = this.backgroundStyles.find(b => b.value === backgroundValue);
    return bg ? bg.name : backgroundValue;
  }
}
