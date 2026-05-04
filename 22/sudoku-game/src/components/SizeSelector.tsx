import { HStack, Button, Text, VStack, Icon } from '@chakra-ui/react';

interface SizeSelectorProps {
  value: number;
  onChange: (value: number) => void;
  disabled: boolean;
}

const sizeOptions = [4, 6, 9];

export function SizeSelector({ value, onChange, disabled }: SizeSelectorProps) {
  const getSizeLabel = (size: number) => {
    if (size === 4) return '4×4';
    if (size === 6) return '6×6';
    if (size === 9) return '9×9';
    return `${size}×${size}`;
  };

  const getSizeIcon = (size: number) => {
    if (size === 4) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h4.5M3.75 14.25h4.5M15.75 9.75h4.5M15.75 14.25h4.5M9.75 3.75v4.5M9.75 15.75v4.5M14.25 3.75v4.5M14.25 15.75v4.5M9.75 9.75v4.5M3.75 9.75v4.5M15.75 9.75v4.5M9.75 9.75h4.5M3.75 9.75h4.5M15.75 9.75h4.5M9.75 3.75h4.5M9.75 15.75h4.5" />
        </svg>
      );
    }
    if (size === 6) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5h1.5M6 10.5h1.5M9 10.5h1.5M12 10.5h1.5M15 10.5h1.5M18 10.5h1.5M3 13.5h1.5M6 13.5h1.5M9 13.5h1.5M12 13.5h1.5M15 13.5h1.5M18 13.5h1.5M10.5 3v1.5M10.5 6v1.5M13.5 3v1.5M13.5 6v1.5M10.5 16.5v1.5M10.5 19.5v1.5M13.5 16.5v1.5M13.5 19.5v1.5" />
        </svg>
      );
    }
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5M6.75 3.75v16.5M12 3.75v16.5M17.25 3.75v16.5" />
      </svg>
    );
  };

  return (
    <VStack spacing={4} align="stretch" w="100%">
      <Text 
        fontSize="lg" 
        fontWeight="bold" 
        color="white" 
        textAlign="center"
        textShadow="0 2px 4px rgba(0,0,0,0.2)"
      >
        数独大小
      </Text>
      <HStack spacing={3} justify="center" wrap="wrap" w="100%">
        {sizeOptions.map((size) => {
          const isActive = value === size;
          return (
            <Button
              key={size}
              leftIcon={<Icon boxSize={5}>{getSizeIcon(size)}</Icon>}
              onClick={() => onChange(size)}
              size="md"
              disabled={disabled}
              bg={isActive ? '#8b5cf6' : 'rgba(255,255,255,0.15)'}
              color="white"
              border={isActive ? 'none' : '2px solid rgba(255,255,255,0.4)'}
              borderRadius="xl"
              _hover={{
                bg: isActive ? '#7c3aed' : 'rgba(255,255,255,0.25)',
                transform: 'scale(1.05)',
                boxShadow: 'lg',
              }}
              _active={{
                transform: 'scale(0.98)',
              }}
              transition="all 0.2s ease"
              fontWeight="bold"
              px={6}
              py={2}
              minW="100px"
              h="auto"
              minH="48px"
            >
              <Text fontSize="md" fontWeight="bold">
                {getSizeLabel(size)}
              </Text>
            </Button>
          );
        })}
      </HStack>
    </VStack>
  );
}
