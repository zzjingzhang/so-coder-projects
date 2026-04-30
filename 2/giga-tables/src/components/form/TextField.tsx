import React from 'react';
import { InputText } from 'primereact/inputtext';
import type { FormFieldProps } from '../../types';

export const TextField: React.FC<FormFieldProps> = ({ 
  config, 
  value, 
  onChange, 
  error,
  disabled 
}) => {
  return (
    <div className={`giga-field ${config.className || ''}`}>
      <label className="giga-label">
        {config.label}
        {config.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <InputText
        value={value as string || ''}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={config.placeholder}
        disabled={disabled || config.disabled}
        className={`w-full ${error ? 'border-red-500' : ''}`}
        maxLength={config.maxLength}
        minLength={config.minLength}
        pattern={config.pattern}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextField;
