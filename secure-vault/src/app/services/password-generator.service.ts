import { Injectable } from '@angular/core';
import { PasswordGeneratorOptions } from '../types';

@Injectable({
  providedIn: 'root'
})
export class PasswordGeneratorService {
  
  private readonly lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  private readonly uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private readonly numberChars = '0123456789';
  private readonly symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  private readonly ambiguousChars = '0O1lI';
  
  generatePassword(options: PasswordGeneratorOptions): string {
    let charset = '';
    let password = '';
    let guaranteedChars = '';
    
    if (options.includeLowercase) {
      let lowerChars = this.lowercaseChars;
      if (options.excludeAmbiguous) {
        lowerChars = lowerChars.split('').filter(c => !this.ambiguousChars.includes(c)).join('');
      }
      charset += lowerChars;
      guaranteedChars += this.getRandomChar(lowerChars);
    }
    
    if (options.includeUppercase) {
      let upperChars = this.uppercaseChars;
      if (options.excludeAmbiguous) {
        upperChars = upperChars.split('').filter(c => !this.ambiguousChars.includes(c)).join('');
      }
      charset += upperChars;
      guaranteedChars += this.getRandomChar(upperChars);
    }
    
    if (options.includeNumbers) {
      let numChars = this.numberChars;
      if (options.excludeAmbiguous) {
        numChars = numChars.split('').filter(c => !this.ambiguousChars.includes(c)).join('');
      }
      charset += numChars;
      guaranteedChars += this.getRandomChar(numChars);
    }
    
    if (options.includeSymbols) {
      charset += this.symbolChars;
      guaranteedChars += this.getRandomChar(this.symbolChars);
    }
    
    if (charset.length === 0) {
      return '';
    }
    
    const remainingLength = Math.max(0, options.length - guaranteedChars.length);
    
    for (let i = 0; i < remainingLength; i++) {
      password += this.getRandomChar(charset);
    }
    
    password += guaranteedChars;
    
    return this.shuffleString(password);
  }
  
  private getRandomChar(charset: string): string {
    const randomBytes = new Uint8Array(1);
    crypto.getRandomValues(randomBytes);
    const randomIndex = randomBytes[0] % charset.length;
    return charset[randomIndex];
  }
  
  private shuffleString(str: string): string {
    const array = str.split('');
    for (let i = array.length - 1; i > 0; i--) {
      const randomBytes = new Uint8Array(1);
      crypto.getRandomValues(randomBytes);
      const j = randomBytes[0] % (i + 1);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
  }
  
  getDefaultOptions(): PasswordGeneratorOptions {
    return {
      length: 16,
      includeLowercase: true,
      includeUppercase: true,
      includeNumbers: true,
      includeSymbols: true,
      excludeAmbiguous: false
    };
  }
}
