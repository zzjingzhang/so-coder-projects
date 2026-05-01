import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressBarModule } from 'primeng/progressbar';
import { PasswordGeneratorService, CharacterSetType } from '../../services/password-generator.service';

interface CharacterSetOption {
  value: CharacterSetType;
  label: string;
  description: string;
}

@Component({
  selector: 'app-password-generator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SliderModule,
    InputNumberModule,
    RadioButtonModule,
    ButtonModule,
    TooltipModule,
    ProgressBarModule
  ],
  templateUrl: './password-generator.component.html',
  styleUrl: './password-generator.component.scss'
})
export class PasswordGeneratorComponent implements OnInit {
  password: string = '';
  passwordLength: number = 12;
  minLength: number = 3;
  maxLength: number = 20;
  characterSetType: CharacterSetType = 'all';
  copied: boolean = false;
  generating: boolean = false;

  characterSetOptions: CharacterSetOption[] = [
    { value: 'readable', label: '易于阅读', description: '排除容易混淆的字符（如 0、O、l、1、I）' },
    { value: 'pronounceable', label: '易于说出', description: '仅限大小写字母，适合口头传达' },
    { value: 'all', label: '所有字符', description: '包含字母、数字和特殊符号' }
  ];

  constructor(private passwordGeneratorService: PasswordGeneratorService) {}

  ngOnInit(): void {
    this.generatePassword();
  }

  get strength() {
    return this.passwordGeneratorService.calculateStrength(this.passwordLength);
  }

  generatePassword(): void {
    this.generating = true;
    setTimeout(() => {
      this.password = this.passwordGeneratorService.generatePassword(
        this.passwordLength,
        this.characterSetType
      );
      this.generating = false;
      this.copied = false;
    }, 150);
  }

  async copyToClipboard(): Promise<void> {
    if (!this.password) return;

    try {
      await navigator.clipboard.writeText(this.password);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  getCharacterSetInfo(type: CharacterSetType): string {
    return this.passwordGeneratorService.getCharacterSetDescription(type);
  }
}
