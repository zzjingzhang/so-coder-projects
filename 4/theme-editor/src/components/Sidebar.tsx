import React from 'react';
import { Box, VStack, Heading } from '@chakra-ui/react';
import { PaletteGroup } from '../types/theme';
import { PaletteCard } from './PaletteCard';

interface SidebarProps {
  paletteGroups: PaletteGroup[];
  onColorChange: (groupName: string, key: string, color: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ paletteGroups, onColorChange }) => {
  return (
    <Box
      w={{ base: '100%', lg: '360px' }}
      bg="white"
      borderRight="1px"
      borderColor="gray.200"
      overflowY="auto"
      h="100vh"
      position="sticky"
      top={0}
      p={4}
    >
      <Heading as="h1" size="lg" mb={6} color="gray.800">
        主题编辑器
      </Heading>
      <VStack spacing={4} align="stretch">
        {paletteGroups.map((group) => (
          <PaletteCard
            key={group.name}
            group={group}
            onColorChange={onColorChange}
          />
        ))}
      </VStack>
    </Box>
  );
};
