import React from 'react';
import {
  Button,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import { ColorPalette } from '../types/theme';

interface DownloadButtonProps {
  theme: ColorPalette;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ theme }) => {
  const handleDownload = () => {
    const paletteKeys = {
      palette: {
        common: theme.common,
        background: theme.background,
        primary: theme.primary,
        secondary: theme.secondary,
        error: theme.error,
        text: theme.text,
      },
    };

    const dataStr = JSON.stringify(paletteKeys, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'theme-palette.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Tooltip label="下载主题配置" placement="left">
      <Button
        position="fixed"
        bottom={4}
        right={4}
        zIndex={9998}
        colorScheme="blue"
        size="lg"
        borderRadius="full"
        boxShadow="lg"
        onClick={handleDownload}
        _hover={{
          transform: 'scale(1.05)',
        }}
        transition="transform 0.2s ease"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </Button>
    </Tooltip>
  );
};
