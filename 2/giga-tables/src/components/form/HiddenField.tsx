import React from 'react';
import type { FormFieldProps } from '../../types';

export const HiddenField: React.FC<FormFieldProps> = ({ 
  config, 
  value 
}) => {
  return (
    <input
      type="hidden"
      name={config.name}
      value={value as string || ''}
    />
  );
};

export default HiddenField;
