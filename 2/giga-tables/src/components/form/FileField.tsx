import React, { useState } from 'react';
import { FileUpload } from 'primereact/fileupload';
import type { FormFieldProps } from '../../types';

export const FileField: React.FC<FormFieldProps> = ({ 
  config, 
  value, 
  onChange, 
  error,
  disabled 
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleUpload = (event: { files: File[] }) => {
    const uploadedFiles = event.files;
    setFiles(uploadedFiles);
    onChange?.(config.multiple ? uploadedFiles : uploadedFiles[0]);
  };

  const handleRemove = (event: { file: File }) => {
    const updatedFiles = files.filter(f => f.name !== event.file.name);
    setFiles(updatedFiles);
    onChange?.(config.multiple ? updatedFiles : null);
  };

  return (
    <div className={`giga-field ${config.className || ''}`}>
      <label className="giga-label">
        {config.label}
        {config.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <FileUpload
        mode="advanced"
        accept={config.accept}
        multiple={config.multiple}
        disabled={disabled || config.disabled}
        onSelect={handleUpload}
        onRemove={handleRemove}
        files={files}
        className={`w-full ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FileField;
