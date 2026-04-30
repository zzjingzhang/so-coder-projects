import React from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import type { FormFieldProps } from '../../types';

export const TextAreaField: React.FC<FormFieldProps> = ({ 
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
      <InputTextarea
        value={value as string || ''}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={config.placeholder}
        disabled={disabled || config.disabled}
        className={`w-full min-h-[100px] ${error ? 'border-red-500' : ''}`}
        maxLength={config.maxLength}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextAreaField;
