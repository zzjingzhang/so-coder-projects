import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { HORSE_NAMES } from '../utils/gameLogic';

const HorseIcon = ({ color, level, position, isMoving }) => {
  const horseEmoji = {
    white: '🐎',
    black: '🏇',
  };

  const bgColor = color === 'white' ? 'bg-gray-100' : 'bg-gray-800';
  const textColor = color === 'white' ? 'text-gray-800' : 'text-white';
  const borderColor = color === 'white' ? 'border-gray-400' : 'border-gray-600';

  return (
    <Box
      position="absolute"
      left={`${position}%`}
      top="50%"
      transform="translateY(-50%)"
      transition={isMoving ? 'left 0.1s linear' : 'none'}
      zIndex="10"
    >
      <VStack gap={1} align="center">
        <Box fontSize={['2xl', '3xl', '4xl']}>
          {horseEmoji[color]}
        </Box>
        <Box
          className={`${bgColor} ${textColor} border ${borderColor} rounded px-2 py-1 text-xs font-bold`}
        >
          {HORSE_NAMES[level]}
        </Box>
      </VStack>
    </Box>
  );
};

const RaceTrack = ({ 
  currentRound, 
  kingHorse, 
  tianyiHorse, 
  isRacing, 
  kingPosition,
  tianyiPosition 
}) => {
  return (
    <Box w="100%" mb={6}>
      <Flex justify="space-between" mb={2} px={2}>
        <Text fontSize="sm" fontWeight="bold" color="gray.600">
          {currentRound > 0 ? `第 ${currentRound} 场比赛` : '准备开始'}
        </Text>
        {currentRound > 0 && (
          <Text fontSize="sm" color="gray.600">
            齐王: {kingHorse?.level && HORSE_NAMES[kingHorse.level]} vs 田忌: {tianyiHorse?.level && HORSE_NAMES[tianyiHorse.level]}
          </Text>
        )}
      </Flex>
      
      <Box
        position="relative"
        w="100%"
        h={['120px', '150px', '180px']}
        bg="#228b22"
        borderRadius="md"
        overflow="hidden"
        border="4px solid #8b4513"
      >
        <Box
          position="absolute"
          left="0"
          top="0"
          bottom="0"
          w="4px"
          bg="white"
          zIndex="5"
        >
          <Text
            position="absolute"
            left="8px"
            top="50%"
            transform="translateY(-50%)"
            color="white"
            fontSize="xs"
            fontWeight="bold"
            writingMode="vertical-rl"
          >
            起点
          </Text>
        </Box>
        
        <Box
          position="absolute"
          right="0"
          top="0"
          bottom="0"
          w="4px"
          bg="red.500"
          zIndex="5"
        >
          <Text
            position="absolute"
            right="8px"
            top="50%"
            transform="translateY(-50%)"
            color="white"
            fontSize="xs"
            fontWeight="bold"
            writingMode="vertical-rl"
          >
            终点
          </Text>
        </Box>
        
        <Box
          position="absolute"
          left="0"
          right="0"
          top="50%"
          h="2px"
          bg="rgba(255,255,255,0.3)"
          transform="translateY(-50%)"
        />
        
        {kingHorse && (
          <HorseIcon
            color="white"
            level={kingHorse.level}
            position={kingPosition}
            isMoving={isRacing}
          />
        )}
        
        {tianyiHorse && (
          <HorseIcon
            color="black"
            level={tianyiHorse.level}
            position={tianyiPosition}
            isMoving={isRacing}
          />
        )}
      </Box>
    </Box>
  );
};

export default RaceTrack;
