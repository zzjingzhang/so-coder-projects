import React from 'react';
import { Box, Link } from '@chakra-ui/react';

export const GithubRibbon: React.FC = () => {
  return (
    <Box
      position="fixed"
      top={0}
      right={0}
      zIndex={9999}
      w="150px"
      h="150px"
      overflow="hidden"
      pointerEvents="none"
    >
      <Link
        href="https://github.com"
        isExternal
        display="block"
        position="absolute"
        top="-40px"
        right="-40px"
        w="200px"
        py="8px"
        bg="gray.800"
        color="white"
        fontSize="12px"
        fontWeight="bold"
        textAlign="center"
        textTransform="uppercase"
        letterSpacing="1px"
        transform="rotate(45deg)"
        textDecoration="none"
        _hover={{
          bg: 'gray.700',
          textDecoration: 'none',
        }}
        pointerEvents="auto"
        boxShadow="0 2px 5px rgba(0,0,0,0.3)"
      >
        View on GitHub
      </Link>
    </Box>
  );
};
