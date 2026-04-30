import React from 'react';
import { Calendar } from 'primereact/calendar';
import type { FormFieldProps } from '../../types';

export const DateField: React.FC<FormFieldProps> = ({ 
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
      <Calendar
        value={value instanceof Date ? value : undefined}
        onChange={(e) => onChange?.(e.value)}
        placeholder={config.placeholder}
        disabled={disabled || config.disabled}
        dateFormat={config.format || 'mm/dd/yy'}
        showIcon
        className={`w-full ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default DateField;
