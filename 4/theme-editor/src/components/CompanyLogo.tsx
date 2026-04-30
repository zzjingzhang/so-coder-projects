import React from 'react';
import { Box, Text, Link } from '@chakra-ui/react';

export const CompanyLogo: React.FC = () => {
  return (
    <Link
      href="https://example.com"
      isExternal
      textDecoration="none"
      _hover={{ textDecoration: 'none' }}
    >
      <Box
        position="fixed"
        bottom={4}
        left={4}
        zIndex={9998}
        bg="white"
        borderRadius="lg"
        boxShadow="lg"
        p={3}
        display="flex"
        alignItems="center"
        gap={2}
        transition="transform 0.2s ease"
        _hover={{
          transform: 'scale(1.05)',
        }}
      >
        <Box
          w={8}
          h={8}
          borderRadius="md"
          bgGradient="linear(to-r, blue.500, purple.500)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          fontWeight="bold"
          fontSize="lg"
        >
          T
        </Box>
        <Text fontSize="sm" fontWeight="medium" color="gray.700">
          Theme Studio
        </Text>
      </Box>
    </Link>
  );
};
