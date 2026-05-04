import { HStack, Button, Text, VStack, Icon, useColorModeValue } from '@chakra-ui/react';
import type { Difficulty } from '../types';

interface DifficultySelectorProps {
  value: Difficulty;
  onChange: (value: Difficulty) => void;
  disabled: boolean;
}

const difficultyOptions: { 
  value: Difficulty; 
  label: string; 
  activeBg: string;
  activeColor: string;
  hoverBg: string;
  icon: JSX.Element;
}[] = [
  {
    value: 'easy',
    label: '初级',
    activeBg: '#10b981',
    activeColor: 'white',
    hoverBg: '#059669',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    value: 'medium',
    label: '中级',
    activeBg: '#3b82f6',
    activeColor: 'white',
    hoverBg: '#2563eb',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 0h.008v.008H12V12.75Zm0 0h-.008v.008H12V12.75Zm-.75-3.75h.008v.008h-.008V9Zm.75 0h.008v.008H12V9Zm1.5 0h.008v.008h-.008V9Zm-3 0h.008v.008h-.008V9Zm4.5 0h.008v.008h-.008V9ZM12 15h.008v.008H12V15Zm0 0h-.008v.008H12V15Zm3 0h.008v.008h-.008V15Zm-1.5 0h.008v.008h-.008V15Zm-4.5 0h.008v.008h-.008V15ZM9 15h.008v.008H9V15Zm1.5 0h.008v.008h-.008V15Zm6 0h.008v.008h-.008V15ZM12 18h.008v.008H12V18Zm0 0h-.008v.008H12V18Zm3 0h.008v.008h-.008V18Zm-1.5 0h.008v.008h-.008V18Zm-4.5 0h.008v.008h-.008V18ZM9 18h.008v.008H9V18Zm1.5 0h.008v.008h-.008V18Zm6 0h.008v.008h-.008V18ZM4.5 9.75h15M4.5 15.75h15M5.25 5.25V19.5M18.75 5.25V19.5" />
      </svg>
    ),
  },
  {
    value: 'hard',
    label: '高级',
    activeBg: '#f97316',
    activeColor: 'white',
    hoverBg: '#ea580c',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.412 15.655 9.75 21.75l3.745-6.012L6.75 5.25l5.166 3.745L15.656 3l-2.016 7.019L21.75 11.412l-6.011 2.243Z" />
      </svg>
    ),
  },
  {
    value: 'expert',
    label: '特级',
    activeBg: '#ef4444',
    activeColor: 'white',
    hoverBg: '#dc2626',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
    ),
  },
];

export function DifficultySelector({ value, onChange, disabled }: DifficultySelectorProps) {
  return (
    <VStack spacing={4} align="stretch" w="100%">
      <Text 
        fontSize="lg" 
        fontWeight="bold" 
        color="white" 
        textAlign="center"
        textShadow="0 2px 4px rgba(0,0,0,0.2)"
      >
        难度选择
      </Text>
      <HStack spacing={3} justify="center" wrap="wrap" w="100%">
        {difficultyOptions.map((option) => {
          const isActive = value === option.value;
          return (
            <Button
              key={option.value}
              leftIcon={<Icon boxSize={5}>{option.icon}</Icon>}
              onClick={() => onChange(option.value)}
              size="md"
              disabled={disabled}
              bg={isActive ? option.activeBg : 'rgba(255,255,255,0.15)'}
              color={isActive ? option.activeColor : 'white'}
              border={isActive ? 'none' : '2px solid rgba(255,255,255,0.4)'}
              borderRadius="xl"
              _hover={{
                bg: isActive ? option.hoverBg : 'rgba(255,255,255,0.25)',
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
                {option.label}
              </Text>
            </Button>
          );
        })}
      </HStack>
    </VStack>
  );
}
