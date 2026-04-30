import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  ButtonGroup,
  Button,
  IconButton,
  HStack,
  Text,
} from '@chakra-ui/react';
import { ColorPalette } from '../types/theme';
import { PreviewComponents } from './PreviewComponents';

interface PreviewContainerProps {
  theme: ColorPalette;
}

type ViewMode = 'desktop' | 'mobile';

export const PreviewContainer: React.FC<PreviewContainerProps> = ({ theme }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');

  const isMobile = viewMode === 'mobile';

  return (
    <Box flex="1" overflow="hidden" display="flex" flexDirection="column">
      <Flex
        justify="space-between"
        align="center"
        p={4}
        bg="white"
        borderBottom="1px"
        borderColor="gray.200"
      >
        <Heading size="md" color="gray.700">
          预览区域
        </Heading>
        <HStack spacing={2}>
          <Text fontSize="sm" color="gray.500">
            视图模式:
          </Text>
          <ButtonGroup size="sm" isAttached variant="outline">
            <Button
              onClick={() => setViewMode('desktop')}
              bg={!isMobile ? theme.primary.main : 'white'}
              color={!isMobile ? theme.primary.contrastText : 'gray.700'}
              borderColor={!isMobile ? theme.primary.main : 'gray.200'}
              _hover={{
                bg: !isMobile ? theme.primary.dark : 'gray.50',
              }}
            >
              桌面
            </Button>
            <Button
              onClick={() => setViewMode('mobile')}
              bg={isMobile ? theme.primary.main : 'white'}
              color={isMobile ? theme.primary.contrastText : 'gray.700'}
              borderColor={isMobile ? theme.primary.main : 'gray.200'}
              _hover={{
                bg: isMobile ? theme.primary.dark : 'gray.50',
              }}
            >
              移动
            </Button>
          </ButtonGroup>
        </HStack>
      </Flex>
      
      <Box
        flex="1"
        overflow="auto"
        p={6}
        bg="gray.100"
        display="flex"
        justify="center"
        align="flex-start"
      >
        <Box
          maxW={isMobile ? '350px' : '100%'}
          maxH={isMobile ? '650px' : 'none'}
          w="100%"
          minH={isMobile ? '650px' : 'auto'}
          overflow={isMobile ? 'auto' : 'visible'}
          boxShadow="lg"
          borderRadius={isMobile ? '2xl' : 'lg'}
          bg="white"
          position="relative"
          transition="all 0.3s ease"
          sx={
            isMobile
              ? {
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '120px',
                    height: '24px',
                    bg: 'black',
                    borderRadius: 'full',
                    zIndex: 10,
                  },
                  paddingTop: '40px',
                }
              : {}
          }
        >
          <PreviewComponents theme={theme} />
        </Box>
      </Box>
    </Box>
  );
};
