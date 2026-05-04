import { Box, Flex, NativeSelect, Button, VStack, HStack, Text, Heading } from '@chakra-ui/react';
import { HORSE_LEVELS, HORSE_NAMES } from '../utils/gameLogic';

const horseOptions = [
  { value: HORSE_LEVELS.SUPERIOR, label: HORSE_NAMES[HORSE_LEVELS.SUPERIOR] },
  { value: HORSE_LEVELS.MEDIUM, label: HORSE_NAMES[HORSE_LEVELS.MEDIUM] },
  { value: HORSE_LEVELS.INFERIOR, label: HORSE_NAMES[HORSE_LEVELS.INFERIOR] },
];

const ControlPanel = ({
  kingOrder,
  tianyiOrder,
  onKingOrderChange,
  onTianyiOrderChange,
  onStartRace,
  onReset,
  onAnalyze,
  canStart,
  isRacing,
  currentRound,
}) => {
  const handleSelectChange = (owner, roundIndex, value) => {
    if (owner === 'king') {
      const newOrder = [...kingOrder];
      newOrder[roundIndex] = value;
      onKingOrderChange(newOrder);
    } else {
      const newOrder = [...tianyiOrder];
      newOrder[roundIndex] = value;
      onTianyiOrderChange(newOrder);
    }
  };

  const getAvailableOptions = (owner, roundIndex) => {
    const currentOrder = owner === 'king' ? kingOrder : tianyiOrder;
    const usedHorses = currentOrder.filter((_, idx) => idx !== roundIndex);
    return horseOptions.filter(opt => !usedHorses.includes(opt.value));
  };

  return (
    <VStack gap={6} align="stretch">
      <Flex 
        direction={['column', 'column', 'row']} 
        gap={6} 
        justify="space-between"
      >
        <Box 
          flex="1" 
          p={4} 
          bg="white" 
          borderRadius="md" 
          boxShadow="sm"
          border="2px solid"
          borderColor="gray.200"
        >
          <Heading as="h3" size="md" mb={4} color="#8b4513" textAlign="center">
            齐王出马顺序
          </Heading>
          <VStack gap={3}>
            {[0, 1, 2].map((roundIndex) => (
              <HStack key={roundIndex} w="100%" justify="space-between">
                <Text fontSize="sm" fontWeight="bold" w="80px">
                  第 {roundIndex + 1} 场:
                </Text>
                <NativeSelect.Root size="sm" flex="1">
                  <NativeSelect.Field
                    value={kingOrder[roundIndex] || ''}
                    onChange={(e) => handleSelectChange('king', roundIndex, e.target.value)}
                    disabled={isRacing || currentRound > roundIndex}
                    placeholder="选择马匹"
                    borderColor="#8b4513"
                    css={{
                      '&:hover': { borderColor: '#a0522d' },
                      '&:focus': { borderColor: '#8b4513', boxShadow: '0 0 0 1px #8b4513' },
                    }}
                  >
                    {getAvailableOptions('king', roundIndex).map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </HStack>
            ))}
          </VStack>
        </Box>

        <Box 
          flex="1" 
          p={4} 
          bg="white" 
          borderRadius="md" 
          boxShadow="sm"
          border="2px solid"
          borderColor="gray.200"
        >
          <Heading as="h3" size="md" mb={4} color="#8b4513" textAlign="center">
            田忌出马顺序
          </Heading>
          <VStack gap={3}>
            {[0, 1, 2].map((roundIndex) => (
              <HStack key={roundIndex} w="100%" justify="space-between">
                <Text fontSize="sm" fontWeight="bold" w="80px">
                  第 {roundIndex + 1} 场:
                </Text>
                <NativeSelect.Root size="sm" flex="1">
                  <NativeSelect.Field
                    value={tianyiOrder[roundIndex] || ''}
                    onChange={(e) => handleSelectChange('tianyi', roundIndex, e.target.value)}
                    disabled={isRacing || currentRound > roundIndex}
                    placeholder="选择马匹"
                    borderColor="#8b4513"
                    css={{
                      '&:hover': { borderColor: '#a0522d' },
                      '&:focus': { borderColor: '#8b4513', boxShadow: '0 0 0 1px #8b4513' },
                    }}
                  >
                    {getAvailableOptions('tianyi', roundIndex).map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </HStack>
            ))}
          </VStack>
        </Box>
      </Flex>

      <Flex 
        direction={['column', 'row']} 
        gap={3} 
        justify="center"
        flexWrap="wrap"
      >
        <Button
          colorPalette="orange"
          bg="#8b4513"
          _hover={{ bg: '#a0522d' }}
          _active={{ bg: '#6b3410' }}
          onClick={onStartRace}
          disabled={!canStart || isRacing || currentRound >= 3}
          size="md"
          fontWeight="bold"
        >
          {currentRound >= 3 ? '比赛结束' : isRacing ? '比赛中...' : '开始比赛'}
        </Button>

        <Button
          colorPalette="blue"
          onClick={onAnalyze}
          disabled={isRacing}
          size="md"
          fontWeight="bold"
        >
          分析策略
        </Button>

        <Button
          colorPalette="gray"
          onClick={onReset}
          size="md"
          fontWeight="bold"
        >
          重置比赛
        </Button>
      </Flex>
    </VStack>
  );
};

export default ControlPanel;
