import { Box, Flex, Text, Link, useColorModeValue } from '@chakra-ui/react'

export const Footer = ({ ...props }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const textColor = useColorModeValue('gray.600', 'gray.400')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      as="footer"
      bg={bgColor}
      borderTopWidth="1px"
      borderColor={borderColor}
      px={{ base: 4, md: 6 }}
      py={4}
      mt="auto"
      {...props}
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'center', md: 'center' }}
        justify={{ base: 'center', md: 'space-between' }}
        gap={2}
      >
        <Text fontSize="sm" color={textColor}>
          © {new Date().getFullYear()} NumberVerify. 保留所有权利。
        </Text>
        <Flex gap={4}>
          <Link href="#" fontSize="sm" color={textColor} _hover={{ color: 'blue.500' }}>
            隐私政策
          </Link>
          <Link href="#" fontSize="sm" color={textColor} _hover={{ color: 'blue.500' }}>
            使用条款
          </Link>
          <Link href="#" fontSize="sm" color={textColor} _hover={{ color: 'blue.500' }}>
            联系我们
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}
