import React from 'react';
import type { FormFieldProps } from '../../types';

export const RangeField: React.FC<FormFieldProps> = ({ 
  config, 
  value, 
  onChange, 
  error,
  disabled 
}) => {
  return (
    <div className={`giga-field ${config.className || ''}`}>
      <label className="giga-label">
        {config.label} ({value || 0})
        {config.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="range"
        value={value as number || 0}
        onChange={(e) => onChange?.(Number(e.target.value))}
        min={config.min || 0}
        max={config.max || 100}
        step={config.step || 1}
        disabled={disabled || config.disabled}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{config.min || 0}</span>
        <span>{config.max || 100}</span>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default RangeField;
