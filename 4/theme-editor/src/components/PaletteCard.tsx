import React from 'react';
import { Box, Text, VStack, Card, CardHeader, CardBody } from '@chakra-ui/react';
import { PaletteGroup } from '../types/theme';
import { ColorPicker } from './ColorPicker';

interface PaletteCardProps {
  group: PaletteGroup;
  onColorChange: (groupName: string, key: string, color: string) => void;
}

export const PaletteCard: React.FC<PaletteCardProps> = ({ group, onColorChange }) => {
  return (
    <Card variant="elevated" w="100%" borderRadius="lg" overflow="hidden">
      <CardHeader 
        bg="gray.50" 
        borderBottom="1px" 
        borderColor="gray.200" 
        py={3}
        px={4}
      >
        <Text fontSize="md" fontWeight="semibold" color="gray.700">
          {group.label}
        </Text>
      </CardHeader>
      <CardBody p={3}>
        <VStack spacing={1} align="stretch">
          {group.fields.map((field) => (
            <ColorPicker
              key={field.key}
              color={field.color}
              label={field.label}
              onChange={(color) => onColorChange(group.name, field.key, color)}
            />
          ))}
        </VStack>
      </CardBody>
    </Card>
  );
};
