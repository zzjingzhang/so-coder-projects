import { useEffect, useState } from 'react';
import { Text, HStack, Icon } from '@chakra-ui/react';

interface TimerProps {
  isRunning: boolean;
  isPaused: boolean;
}

export function Timer({ isRunning, isPaused }: TimerProps) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isPaused]);

  useEffect(() => {
    if (!isRunning) {
      setTime(0);
    }
  }, [isRunning]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <HStack 
      spacing={2} 
      bg="whiteAlpha.200" 
      px={6} 
      py={3} 
      rounded="xl"
      backdropFilter="blur(10px)"
    >
      <Icon boxSize={6} color="white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </Icon>
      <Text 
        fontSize="2xl" 
        fontWeight="bold" 
        color="white"
        fontFamily="monospace"
      >
        {formatTime(time)}
      </Text>
    </HStack>
  );
}
