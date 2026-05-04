import { Button, HStack, Icon } from '@chakra-ui/react';
import type { GameStatus } from '../types';

interface ControlButtonsProps {
  status: GameStatus;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onEnd: () => void;
}

export function ControlButtons({
  status,
  onStart,
  onPause,
  onResume,
  onEnd,
}: ControlButtonsProps) {
  return (
    <HStack spacing={4} justify="center">
      {status === 'idle' && (
        <Button
          leftIcon={
            <Icon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
              </svg>
            </Icon>
          }
          colorScheme="green"
          size="lg"
          onClick={onStart}
          bg="linear-gradient(135deg, #10b981, #059669)"
          color="white"
          _hover={{ transform: 'scale(1.05)', bg: 'linear-gradient(135deg, #059669, #047857)' }}
          transition="all 0.2s"
          fontWeight="bold"
          px={8}
        >
          开始游戏
        </Button>
      )}

      {status === 'playing' && (
        <>
          <Button
            leftIcon={
              <Icon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                </svg>
              </Icon>
            }
            colorScheme="yellow"
            size="lg"
            onClick={onPause}
            bg="linear-gradient(135deg, #f59e0b, #d97706)"
            color="white"
            _hover={{ transform: 'scale(1.05)', bg: 'linear-gradient(135deg, #d97706, #b45309)' }}
            transition="all 0.2s"
            fontWeight="bold"
            px={6}
          >
            暂停
          </Button>
          <Button
            leftIcon={
              <Icon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75v-4.5Zm6 0a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75v-4.5Z" />
                </svg>
              </Icon>
            }
            colorScheme="red"
            size="lg"
            onClick={onEnd}
            bg="linear-gradient(135deg, #ef4444, #dc2626)"
            color="white"
            _hover={{ transform: 'scale(1.05)', bg: 'linear-gradient(135deg, #dc2626, #b91c1c)' }}
            transition="all 0.2s"
            fontWeight="bold"
            px={6}
          >
            结束
          </Button>
        </>
      )}

      {status === 'paused' && (
        <>
          <Button
            leftIcon={
              <Icon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
              </Icon>
            }
            colorScheme="green"
            size="lg"
            onClick={onResume}
            bg="linear-gradient(135deg, #10b981, #059669)"
            color="white"
            _hover={{ transform: 'scale(1.05)', bg: 'linear-gradient(135deg, #059669, #047857)' }}
            transition="all 0.2s"
            fontWeight="bold"
            px={6}
          >
            继续
          </Button>
          <Button
            leftIcon={
              <Icon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75v-4.5Zm6 0a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75v-4.5Z" />
                </svg>
              </Icon>
            }
            colorScheme="red"
            size="lg"
            onClick={onEnd}
            bg="linear-gradient(135deg, #ef4444, #dc2626)"
            color="white"
            _hover={{ transform: 'scale(1.05)', bg: 'linear-gradient(135deg, #dc2626, #b91c1c)' }}
            transition="all 0.2s"
            fontWeight="bold"
            px={6}
          >
            结束
          </Button>
        </>
      )}

      {status === 'won' && (
        <Button
          leftIcon={
            <Icon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
              </svg>
            </Icon>
          }
          colorScheme="purple"
          size="lg"
          onClick={onEnd}
          bg="linear-gradient(135deg, #8b5cf6, #7c3aed)"
          color="white"
          _hover={{ transform: 'scale(1.05)', bg: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
          transition="all 0.2s"
          fontWeight="bold"
          px={8}
        >
          再来一局
        </Button>
      )}
    </HStack>
  );
}
