import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { getPaletteGroups } from './theme/defaultTheme';
import { Sidebar } from './components/Sidebar';
import { PreviewContainer } from './components/PreviewContainer';
import { GithubRibbon } from './components/GithubRibbon';
import { CompanyLogo } from './components/CompanyLogo';
import { DownloadButton } from './components/DownloadButton';

const ThemeEditorContent: React.FC = () => {
  const { theme, updateColor } = useTheme();
  const paletteGroups = getPaletteGroups(theme);

  const handleColorChange = (groupName: string, key: string, color: string) => {
    updateColor(groupName, key, color);
  };

  return (
    <Box h="100vh" overflow="hidden">
      <Flex h="100%">
        <Sidebar
          paletteGroups={paletteGroups}
          onColorChange={handleColorChange}
        />
        <PreviewContainer theme={theme} />
      </Flex>
      <GithubRibbon />
      <CompanyLogo />
      <DownloadButton theme={theme} />
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<ThemeEditorContent />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;
