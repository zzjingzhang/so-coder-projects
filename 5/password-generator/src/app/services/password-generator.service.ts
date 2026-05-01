import { Injectable } from '@angular/core';

export type CharacterSetType = 'readable' | 'pronounceable' | 'all';

@Injectable({
  providedIn: 'root'
})
export class PasswordGeneratorService {
  private readonly lowercase = 'abcdefghijklmnopqrstuvwxyz';
  private readonly uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private readonly numbers = '0123456789';
  private readonly symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  private readonly readableLowercase = 'abcdefghjkmnpqrstuvwxyz';
  private readonly readableUppercase = 'ABCDEFGHJKMNPQRSTUVWXYZ';
  private readonly readableNumbers = '23456789';
  private readonly readableSymbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  generatePassword(length: number, characterSetType: CharacterSetType): string {
    const characterSet = this.getCharacterSet(characterSetType);
    let password = '';
    
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      const randomIndex = array[i] % characterSet.length;
      password += characterSet[randomIndex];
    }
    
    return password;
  }

  getCharacterSet(type: CharacterSetType): string {
    switch (type) {
      case 'readable':
        return this.readableLowercase + this.readableUppercase + this.readableNumbers + this.readableSymbols;
      case 'pronounceable':
        return this.lowercase + this.uppercase;
      case 'all':
        return this.lowercase + this.uppercase + this.numbers + this.symbols;
      default:
        return this.lowercase + this.uppercase + this.numbers + this.symbols;
    }
  }

  calculateStrength(length: number): { score: number; label: string; colorClass: string } {
    if (length < 8) {
      return { score: 25, label: 'Weak', colorClass: 'bg-red-500' };
    } else if (length < 12) {
      return { score: 50, label: 'Fair', colorClass: 'bg-yellow-500' };
    } else if (length < 16) {
      return { score: 75, label: 'Strong', colorClass: 'bg-blue-500' };
    } else {
      return { score: 100, label: 'Very Strong', colorClass: 'bg-green-500' };
    }
  }

  getCharacterSetDescription(type: CharacterSetType): string {
    switch (type) {
      case 'readable':
        return '排除容易混淆的字符（如 0、O、l、1、I），提高可读性';
      case 'pronounceable':
        return '仅包含大小写字母，适合需要口头传达的场景';
      case 'all':
        return '包含所有字母、数字和特殊符号，安全性最高';
      default:
        return '';
    }
  }
}
