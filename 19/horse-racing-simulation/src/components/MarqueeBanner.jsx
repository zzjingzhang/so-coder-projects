import { Box, Button, Flex } from '@chakra-ui/react';

const MarqueeBanner = ({ messages, isVisible, onToggle }) => {
  const displayMessages = messages.length > 0 
    ? messages 
    : ['欢迎来到齐王与田忌赛马模拟器！', '选择出马顺序，体验经典的博弈智慧', '田忌赛马的故事告诉我们：策略比实力更重要！'];

  return (
    <Box
      bg="#8b4513"
      color="white"
      overflow="hidden"
      position="relative"
      transition="all 0.3s ease"
      maxH={isVisible ? '60px' : '0'}
      opacity={isVisible ? 1 : 0}
    >
      <Flex justify="space-between" align="center" px={4} py={2}>
        <Box flex="1" overflow="hidden">
          <Box className="marquee-text">
            {displayMessages.map((msg, idx) => (
              <Box as="span" mx={8} key={idx}>
                {msg}
              </Box>
            ))}
            {displayMessages.map((msg, idx) => (
              <Box as="span" mx={8} key={`duplicate-${idx}`}>
                {msg}
              </Box>
            ))}
          </Box>
        </Box>
        <Button
          size="sm"
          bg="rgba(255,255,255,0.2)"
          color="white"
          _hover={{ bg: 'rgba(255,255,255,0.3)' }}
          onClick={onToggle}
          ml={4}
        >
          {isVisible ? '隐藏' : '显示'}
        </Button>
      </Flex>
    </Box>
  );
};

export default MarqueeBanner;
