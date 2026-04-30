import React from 'react';
import { Checkbox } from 'primereact/checkbox';
import type { FormFieldProps } from '../../types';

export const CheckboxField: React.FC<FormFieldProps> = ({ 
  config, 
  value, 
  onChange, 
  error,
  disabled 
}) => {
  return (
    <div className={`giga-field flex items-center ${config.className || ''}`}>
      <Checkbox
        checked={value as boolean || false}
        onChange={(e) => onChange?.(e.checked)}
        disabled={disabled || config.disabled}
        className="mr-2"
      />
      <label className="giga-label cursor-pointer">
        {config.label}
        {config.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {error && <p className="text-red-500 text-sm mt-1 w-full">{error}</p>}
    </div>
  );
};

export default CheckboxField;
