import React, { useState, useCallback } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Paper, List, ListItem, ListItemIcon, ListItemText, Chip, Divider } from '@mui/material';
import FileUpload from './components/FileUpload';
import './App.css';

const DescriptionIcon = ({ color = 'primary', sx = {} }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 -960 960 960"
    width="24"
    fill="currentColor"
    style={{ fontSize: sx.fontSize || 24, color: color === 'primary' ? '#1976d2' : 'inherit' }}
  >
    <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
  </svg>
);

const App = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFilesSelected = useCallback((files) => {
    const fileList = Array.from(files);
    console.log('收到文件选择事件:', fileList.map(f => f.name));
    
    setSelectedFiles(prev => [...prev, ...fileList]);
    
    fileList.forEach(file => {
      console.log(`文件名: ${file.name}, 大小: ${file.size} 字节, 类型: ${file.type}`);
    });
  }, []);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AppBar position="static" color="primary" elevation={4}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'medium' }}>
            XML 文件上传工具
          </Typography>
          {selectedFiles.length > 0 && (
            <Chip 
              label={`已选择 ${selectedFiles.length} 个文件`} 
              color="secondary" 
              sx={{ fontWeight: 'medium' }}
            />
          )}
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="md" sx={{ flex: 1, py: 8 }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={6}>
          <Box textAlign="center">
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="text.primary">
              上传您的 XML 文件
            </Typography>
            <Typography variant="body1" color="text.secondary">
