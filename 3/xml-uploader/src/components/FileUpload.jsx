import React, { useState, useRef, useCallback } from 'react';
import { Paper, Typography, Box, IconButton } from '@mui/material';

const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="48"
    viewBox="0 -960 960 960"
    width="48"
    fill="currentColor"
  >
    <path d="M440-320v-168L304-352l-56-56 232-232 232 232-56 56-136-136v168h-80ZM160-160q-33 0-56.5-23.5T80-240v-120h80v120h640v-120h80v120q0 33-23.5 56.5T800-160H160Z" />
  </svg>
);

const FileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="48"
    viewBox="0 -960 960 960"
    width="48"
    fill="currentColor"
  >
    <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
  </svg>
);

const FileUpload = ({ onFilesSelected }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const isValidXmlFile = (file) => {
    if (file.type === 'text/xml' || file.type === 'application/xml') {
      return true;
    }
    if (file.name.toLowerCase().endsWith('.xml')) {
      return true;
    }
    return false;
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const validFiles = Array.from(files).filter(isValidXmlFile);
      if (validFiles.length > 0) {
        const dt = new DataTransfer();
        validFiles.forEach(file => dt.items.add(file));
        onFilesSelected(dt.files);
      }
    }
  }, [onFilesSelected]);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const validFiles = Array.from(files).filter(isValidXmlFile);
      if (validFiles.length > 0) {
        const dt = new DataTransfer();
        validFiles.forEach(file => dt.items.add(file));
        onFilesSelected(dt.files);
      }
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onFilesSelected]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  }, [handleClick]);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 2,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backgroundColor: isDragOver ? 'primary.light' : 'background.paper',
        border: isDragOver ? '2px dashed' : '2px dashed',
        borderColor: isDragOver ? 'primary.main' : 'divider',
        '&:hover': {
          backgroundColor: 'action.hover',
          borderColor: 'primary.main',
        },
      }}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label="点击或拖拽上传 XML 文件"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".xml,text/xml,application/xml"
        multiple
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <IconButton
          sx={{
            fontSize: 64,
            width: 80,
            height: 80,
            color: isDragOver ? 'primary.main' : 'text.secondary',
            transition: 'all 0.3s ease',
            transform: isDragOver ? 'scale(1.1)' : 'scale(1)',
          }}
          disableRipple
        >
          {isDragOver ? <UploadIcon /> : <FileIcon />}
        </IconButton>
        <Typography variant="h6" color="text.primary" fontWeight="medium">
          {isDragOver ? '松开以选择文件' : '拖拽 XML 文件到此处'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          或点击选择文件 (仅支持 XML 文件)
        </Typography>
        <Typography variant="caption" color="text.secondary">
          按 Enter 键也可触发文件选择
        </Typography>
      </Box>
    </Paper>
  );
};

export default FileUpload;
