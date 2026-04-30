import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import type { FormFieldProps } from '../../types';

export const SelectField: React.FC<FormFieldProps> = ({ 
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
      <Dropdown
        value={value}
        onChange={(e) => onChange?.(e.value)}
        options={config.options || []}
        optionLabel="label"
        optionValue="value"
        placeholder={config.placeholder}
        disabled={disabled || config.disabled}
        className={`w-full ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default SelectField;
