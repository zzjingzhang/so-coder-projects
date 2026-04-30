import React from 'react';
import type { FormFieldProps } from '../../types';
import { TextField } from './TextField';
import { TextAreaField } from './TextAreaField';
import { RichTextField } from './RichTextField';
import { NumberField } from './NumberField';
import { RangeField } from './RangeField';
import { DateField } from './DateField';
import { SelectField } from './SelectField';
import { MultiSelectField } from './MultiSelectField';
import { CheckboxField } from './CheckboxField';
import { FileField } from './FileField';
import { HiddenField } from './HiddenField';
import { RadioField } from './RadioField';

export const FormField: React.FC<FormFieldProps> = (props) => {
  const { config } = props;

  if (config.hidden) {
    return <HiddenField {...props} />;
  }

  switch (config.type) {
    case 'text':
    case 'email':
    case 'password':
      return <TextField {...props} />;
    case 'textarea':
      return <TextAreaField {...props} />;
    case 'richtext':
      return <RichTextField {...props} />;
    case 'number':
      return <NumberField {...props} />;
    case 'range':
      return <RangeField {...props} />;
    case 'date':
      return <DateField {...props} />;
    case 'select':
      return <SelectField {...props} />;
    case 'multiselect':
      return <MultiSelectField {...props} />;
    case 'checkbox':
      return <CheckboxField {...props} />;
    case 'radio':
      return <RadioField {...props} />;
    case 'file':
      return <FileField {...props} />;
    case 'hidden':
    default:
      return <HiddenField {...props} />;
  }
};

export default FormField;
