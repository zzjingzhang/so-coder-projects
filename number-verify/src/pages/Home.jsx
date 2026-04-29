import { Box, Container } from '@chakra-ui/react'
import { PhoneValidator } from '../components/PhoneValidator'

export const HomePage = () => {
  return (
    <Container maxW="7xl" py={8}>
      <PhoneValidator />
    </Container>
  )
}
