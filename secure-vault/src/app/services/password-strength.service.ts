import { Injectable } from '@angular/core';
import { PasswordStrength } from '../types';

@Injectable({
  providedIn: 'root'
})
export class PasswordStrengthService {
  
  checkStrength(password: string): PasswordStrength {
    const details = {
      hasLowerCase: /[a-z]/.test(password),
      hasUpperCase: /[A-Z]/.test(password),
      hasNumbers: /[0-9]/.test(password),
      hasSymbols: /[^a-zA-Z0-9]/.test(password),
      length: password.length
    };
    
    let score = 0;
    
    if (details.length >= 8) score += 1;
    if (details.length >= 12) score += 1;
    if (details.length >= 16) score += 1;
    
    if (details.hasLowerCase) score += 1;
    if (details.hasUpperCase) score += 1;
    if (details.hasNumbers) score += 1;
    if (details.hasSymbols) score += 1;
    
    const hasAllTypes = details.hasLowerCase && details.hasUpperCase && details.hasNumbers && details.hasSymbols;
    if (hasAllTypes) score += 2;
    
    if (this.hasCommonPatterns(password)) score -= 2;
    
    score = Math.max(0, Math.min(10, score));
    
    let level: PasswordStrength['level'];
    if (score <= 3) {
      level = 'weak';
    } else if (score <= 5) {
      level = 'medium';
    } else if (score <= 7) {
      level = 'strong';
    } else {
      level = 'very-strong';
    }
    
    return {
      score,
      level,
      details
    };
  }
  
  private hasCommonPatterns(password: string): boolean {
    const commonPatterns = [
      /123456/,
      /password/i,
      /qwerty/i,
      /abc123/i,
      /admin/i,
      /letmein/i,
      /welcome/i,
      /monkey/i,
      /111111/,
      /iloveyou/i,
      /sunshine/i,
      /princess/i,
      /football/i,
      /charlie/i,
      /aa123456/,
      /donald/i,
      /qwerty123/,
      /zxcvbnm/,
      /000000/,
      /aaaaaa/,
      /123123/,
      /123456789/,
      /12345678/,
      /1234567/,
      /123456/,
      /12345/,
      /1234/,
      /123/,
      /0123456789/,
      /qazwsx/,
      /asdfgh/,
      /zxcvbn/,
      /1qaz2wsx/,
      /123qwe/,
      /qwe123/,
      /abcdef/,
      /654321/,
      /987654/,
      /superman/i,
      /batman/i,
      /trustno1/i,
      /dragon/i,
      /master/i,
      /hello/i,
      /freedom/i,
      /whatever/i,
      /qazwsxedc/
    ];
    
    return commonPatterns.some(pattern => pattern.test(password));
  }
  
  getStrengthColor(level: PasswordStrength['level']): string {
    switch (level) {
      case 'weak':
        return 'text-danger-500';
      case 'medium':
        return 'text-warning-500';
      case 'strong':
        return 'text-primary-500';
      case 'very-strong':
        return 'text-success-500';
      default:
        return 'text-gray-500';
    }
  }
  
  getStrengthBackgroundColor(level: PasswordStrength['level']): string {
    switch (level) {
      case 'weak':
        return 'bg-danger-500';
      case 'medium':
        return 'bg-warning-500';
      case 'strong':
        return 'bg-primary-500';
      case 'very-strong':
        return 'bg-success-500';
      default:
        return 'bg-gray-500';
    }
  }
  
  getStrengthLabel(level: PasswordStrength['level']): string {
    switch (level) {
      case 'weak':
        return '弱';
      case 'medium':
        return '中等';
      case 'strong':
        return '强';
      case 'very-strong':
        return '非常强';
      default:
        return '未知';
    }
  }
}
