import React, { useState, useCallback } from 'react';
import type { FormFieldProps } from '../types';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Checkbox } from 'primereact/checkbox';
import { RadioButton } from 'primereact/radiobutton';
import { Slider } from 'primereact/slider';
import { FileUpload } from 'primereact/fileupload';
import ReactQuill from 'react-quill';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['link', 'image'],
    ['clean']
  ],
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
];

export const FormField: React.FC<FormFieldProps> = ({
  config,
  value,
  onChange,
  error,
  disabled: externalDisabled,
}) => {
  const {
    name,
    label,
    type,
    required,
    placeholder,
    disabled,
    hidden,
    className = '',
    options = [],
    min,
    max,
    step,
    accept,
    multiple,
    maxLength,
    minLength,
    pattern,
  } = config;

  const [localValue, setLocalValue] = useState(value);

  const handleChange = useCallback((newValue: unknown) => {
    setLocalValue(newValue);
    onChange?.(newValue);
  }, [onChange]);

  const isDisabled = disabled || externalDisabled;

  if (hidden) {
    return <input type="hidden" name={name} value={String(value || '')} />;
  }

  const fieldClassName = `giga-field ${className}`;
  const labelClassName = `giga-label ${error ? 'text-red-500' : ''}`;

  const renderField = () => {
    const inputClassName = `giga-input ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`;

    switch (type) {
      case 'hidden':
        return null;

      case 'text':
      case 'email':
      case 'password':
        return (
          <InputText
            id={name}
            name={name}
            type={type}
            value={String(value || '')}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            disabled={isDisabled}
            required={required}
            maxLength={maxLength}
            minLength={minLength}
            pattern={pattern}
            className={inputClassName}
          />
        );

      case 'textarea':
        return (
          <InputTextarea
            id={name}
            name={name}
            value={String(value || '')}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            disabled={isDisabled}
            required={required}
            maxLength={maxLength}
            rows={5}
            autoResize
            className={`giga-textarea ${inputClassName}`}
          />
        );

      case 'richtext':
        return (
          <div className={`rich-text-editor ${isDisabled ? 'opacity-50' : ''}`}>
            <ReactQuill
              theme="snow"
              value={String(value || '')}
              onChange={handleChange}
              modules={modules}
              formats={formats}
              readOnly={isDisabled}
              placeholder={placeholder}
            />
          </div>
        );

      case 'number':
        return (
          <InputNumber
            id={name}
            name={name}
            value={Number(value) || 0}
            onValueChange={(e) => handleChange(e.value)}
            placeholder={placeholder}
            disabled={isDisabled}
            required={required}
            min={min}
            max={max}
            step={step}
            className={inputClassName}
          />
        );

      case 'range':
        return (
          <div className="range-field">
            <Slider
              id={name}
              value={Number(value) || 0}
              onChange={(e) => handleChange(e.value)}
              min={min || 0}
              max={max || 100}
              step={step || 1}
              disabled={isDisabled}
            />