import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import type { FormFieldProps } from '../../types';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    ['clean']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet', 'indent',
  'link', 'image'
];

export const RichTextField: React.FC<FormFieldProps> = ({ 
  config, 
  value, 
  onChange, 
  error,
  disabled 
}) => {
  const quillRef = useRef<ReactQuill>(null);

  return (
    <div className={`giga-field ${config.className || ''}`}>
      <label className="giga-label">
        {config.label}
        {config.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <ReactQuill
        ref={quillRef}
        value={value as string || ''}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={config.placeholder}
        theme="snow"
        readOnly={disabled || config.disabled}
        className={error ? 'border-red-500' : ''}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default RichTextField;
