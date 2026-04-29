import { Box, Flex, Heading, IconButton, Tooltip, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { HamburgerIcon, SunIcon, MoonIcon } from '@chakra-ui/icons'

export const Header = ({ onToggleSidebar, ...props }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      as="header"
      bg={bgColor}
      borderBottomWidth="1px"
      borderColor={borderColor}
      px={{ base: 4, md: 6 }}
      py={4}
      position="sticky"
      top={0}
      zIndex="sticky"
      {...props}
    >
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={4}>
          <Tooltip label="切换侧边栏 (Ctrl/Cmd + B)" aria-label="Toggle sidebar">
            <IconButton
              icon={<HamburgerIcon />}
              variant="ghost"
              aria-label="Toggle sidebar"
              onClick={onToggleSidebar}
              display={{ base: 'flex', lg: 'none' }}
            />
          </Tooltip>
          <Heading as="h1" size="md">
            📱 NumberVerify
          </Heading>
        </Flex>
        <Flex align="center" gap={2}>
          <Tooltip label={colorMode === 'light' ? '切换深色模式' : '切换浅色模式'}>
            <IconButton
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              variant="ghost"
              aria-label="Toggle color mode"
              onClick={toggleColorMode}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </Box>
  )
}
