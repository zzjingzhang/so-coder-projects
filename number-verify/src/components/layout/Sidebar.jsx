import { useEffect } from 'react'
import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Text,
  IconButton,
  Tooltip,
  Flex,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { PhoneIcon, InfoIcon, SettingsIcon, QuestionOutlineIcon } from '@chakra-ui/icons'
import { useViewport } from '../../hooks/useViewport'
import { useToggleSidebar } from '../../hooks/useKeyboardShortcut'

const sidebarItems = [
  { id: 'verify', label: '号码验证', icon: PhoneIcon, description: '验证电话号码有效性' },
  { id: 'info', label: '关于我们', icon: InfoIcon, description: '了解更多' },
  { id: 'settings', label: '设置', icon: SettingsIcon, description: '应用设置' },
  { id: 'help', label: '帮助', icon: QuestionOutlineIcon, description: '获取帮助' },
]

export const Sidebar = ({ isOpen, onClose, onToggle, activeTab, onTabChange, ...props }) => {
  const { isMobile } = useViewport()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const hoverBg = useColorModeValue('gray.100', 'gray.700')
  const activeBg = useColorModeValue('blue.50', 'blue.900')
  const activeColor = useColorModeValue('blue.600', 'blue.400')
  const textColor = useColorModeValue('gray.700', 'gray.200')
  const headerColor = useColorModeValue('gray.800', 'white')

  useToggleSidebar(onToggle)

  const sidebarContent = (
    <VStack align="stretch" spacing={1}>
      {sidebarItems.map((item) => {
        const Icon = item.icon
        const isActive = activeTab === item.id
        
        return (
          <Tooltip key={item.id} label={item.description} placement="right" hasArrow>
            <Flex
              as="button"
              type="button"
              align="center"
              gap={3}
              px={4}
              py={3}
              rounded="md"
              bg={isActive ? activeBg : 'transparent'}
              color={isActive ? activeColor : textColor}
              fontWeight={isActive ? 'medium' : 'normal'}
              _hover={{ bg: isActive ? activeBg : hoverBg }}
              transition="all 0.2s"
              onClick={() => {
                onTabChange?.(item.id)
                if (isMobile) onClose()
              }}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon boxSize={5} />
              <Text fontSize="sm">{item.label}</Text>
            </Flex>
          </Tooltip>
        )
      })}
    </VStack>
  )

  if (isMobile) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent bg={bgColor}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" borderColor={borderColor}>
            导航菜单
          </DrawerHeader>
          <DrawerBody py={4}>{sidebarContent}</DrawerBody>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Box
      as="aside"
      w={isOpen ? '240px' : '0'}
      transition="width 0.3s ease"
      overflow="hidden"
      borderRightWidth={isOpen ? '1px' : '0'}
      borderColor={borderColor}
      bg={bgColor}
      flexShrink={0}
      {...props}
    >
      {isOpen && (
        <Box py={4} px={4}>
          {sidebarContent}
        </Box>
      )}
    </Box>
  )
}
