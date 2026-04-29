import { Box, Container, Heading, Text, Button, Flex } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
  return (
    <Container maxW="7xl" py={16}>
      <Flex
        direction="column"
        align="center"
        justify="center"
        minH="50vh"
        textAlign="center"
      >
        <Heading size="4xl" mb={4} color="gray.300">
          404
        </Heading>
        <Heading size="xl" mb={4}>
          页面未找到
        </Heading>
        <Text color="gray.500" mb={8} maxW="md">
          您访问的页面不存在或已被移动。请检查URL是否正确，或返回首页。
        </Text>
        <Button as={Link} to="/" colorScheme="blue" size="lg">
          返回首页
        </Button>
      </Flex>
    </Container>
  )
}
