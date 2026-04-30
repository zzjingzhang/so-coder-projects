import React from 'react';
import { RadioButton } from 'primereact/radiobutton';
import type { FormFieldProps } from '../../types';

export const RadioField: React.FC<FormFieldProps> = ({ 
  config, 
  value, 
  onChange, 
  error,
  disabled 
}) => {
  return (
    <div className={`giga-field ${config.className || ''}`}>
      <label className="giga-label block mb-2">
        {config.label}
        {config.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex flex-wrap gap-4">
        {config.options?.map((option) => (
          <label 
            key={option.value} 
            className="flex items-center cursor-pointer"
          >
            <RadioButton
              inputId={`${config.name}-${option.value}`}
              name={config.name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.value)}
              disabled={disabled || config.disabled}
              className="mr-2"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default RadioField;
