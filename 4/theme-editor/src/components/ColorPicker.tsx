import React, { useState, useRef, useEffect } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Box,
  Text,
  Input,
  VStack,
} from '@chakra-ui/react';

interface ColorPickerProps {
  color: string;
  label: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, label, onChange }) => {
  const [localColor, setLocalColor] = useState(color);
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setLocalColor(color);
  }, [color]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setLocalColor(newColor);
    onChange(newColor);
  };

  const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.startsWith('#')) {
      value = '#' + value;
    }
    if (value.length <= 7) {
      setLocalColor(value);
      if (value.length === 7) {
        onChange(value);
      }
    }
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      placement="right"
    >
      <PopoverTrigger>
        <Box
          ref={triggerRef as any}
          display="flex"
          alignItems="center"
          gap={3}
          cursor="pointer"
          p={2}
          borderRadius="md"
          _hover={{ bg: 'gray.100' }}
          transition="background 0.2s"
        >
          <Box
            w={8}
            h={8}
            borderRadius="full"
            bg={localColor}
            boxShadow="0 0 0 2px #fff, 0 0 0 4px rgba(0,0,0,0.1)"
          />
          <VStack align="flex-start" spacing={0}>
            <Text fontSize="sm" fontWeight="medium" color="gray.800">
              {label}
            </Text>
            <Text fontSize="xs" color="gray.500" fontFamily="mono">
              {localColor}
            </Text>
          </VStack>
        </Box>
      </PopoverTrigger>
      <PopoverContent w={64}>
        <PopoverBody p={4}>
          <VStack spacing={4} align="stretch">
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                颜色选择器
              </Text>
              <Input
                type="color"
                value={localColor}
                onChange={handleColorChange}
                w="100%"
                h={40}
                cursor="pointer"
                border="none"
                p={0}
              />
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                HEX 值
              </Text>
              <Input
                type="text"
                value={localColor}
                onChange={handleHexInput}
                fontFamily="mono"
                textAlign="center"
              />
            </Box>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
