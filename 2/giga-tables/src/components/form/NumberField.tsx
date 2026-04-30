import React from 'react';
import { InputNumber } from 'primereact/inputnumber';
import type { FormFieldProps } from '../../types';

export const NumberField: React.FC<FormFieldProps> = ({ 
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
      <InputNumber
        value={value as number || undefined}
        onChange={(e) => onChange?.(e.value)}
        placeholder={config.placeholder}
        disabled={disabled || config.disabled}
        min={config.min}
        max={config.max}
        step={config.step}
        className={`w-full ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default NumberField;
