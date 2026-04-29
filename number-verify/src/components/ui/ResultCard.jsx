import { Box, Flex, Text, Badge, Heading, SimpleGrid, Divider, useColorModeValue } from '@chakra-ui/react'
import { StatusIcon } from './StatusIcon'
import { STATUS_LABELS } from '../../constants/status'

const AnswerLikelihoodBar = ({ likelihood }) => {
  const color = likelihood >= 0.8 ? 'valid.500' : likelihood >= 0.5 ? 'warning.500' : 'invalid.500'
  const label = likelihood >= 0.8 ? '高' : likelihood >= 0.5 ? '中' : '低'
  const labelColor = useColorModeValue('gray.600', 'gray.400')
  const barBg = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box>
      <Flex justify="space-between" mb={1}>
        <Text fontSize="sm" color={labelColor}>
          应答可能性
        </Text>
        <Text fontSize="sm" fontWeight="medium" color={color}>
          {label} ({Math.round(likelihood * 100)}%)
        </Text>
      </Flex>
      <Box w="full" h="2" bg={barBg} rounded="full" overflow="hidden">
        <Box w={`${likelihood * 100}%`} h="full" bg={color} transition="width 0.5s ease" />
      </Box>
    </Box>
  )
}

const InfoRow = ({ label, value, isAvailable = true }) => {
  if (!isAvailable || value === null || value === undefined) {
    return null
  }

  const labelColor = useColorModeValue('gray.500', 'gray.400')
  const valueColor = useColorModeValue('gray.800', 'gray.200')

  return (
    <Flex justify="space-between" align="center" py={2}>
      <Text fontSize="sm" color={labelColor}>
        {label}
      </Text>
      <Text fontSize="sm" fontWeight="medium" color={valueColor}>
        {value}
      </Text>
    </Flex>
  )
}

export const ResultCard = ({ result, ...props }) => {
  const emptyBorderColor = useColorModeValue('gray.200', 'gray.600')
  const emptyBgColor = useColorModeValue('gray.50', 'gray.800')
  const emptyTextColor = useColorModeValue('gray.500', 'gray.400')
  const numberColor = useColorModeValue('gray.800', 'gray.200')
  const ownerInfoColor = useColorModeValue('gray.700', 'gray.300')
  const timestampColor = useColorModeValue('gray.400', 'gray.500')

  if (!result) {
    return (
      <Box
        p={6}
        borderWidth="2px"
        borderStyle="dashed"
        borderColor={emptyBorderColor}
        rounded="xl"
        bg={emptyBgColor}
        textAlign="center"
        {...props}
      >
        <StatusIcon status="idle" size="xl" mb={4} />
        <Text color={emptyTextColor}>请输入电话号码进行验证</Text>
      </Box>
    )
  }

  const { status, isValid, fullNumber, carrier, location, answerLikelihood, ownerInfo, error, warning } = result

  return (
    <Box
      p={6}
      borderWidth="2px"
      borderColor={isValid ? (status === 'warning' ? 'warning.300' : 'valid.300') : 'invalid.300'}
      rounded="xl"
      bg={isValid ? (status === 'warning' ? 'warning.50' : 'valid.50') : 'invalid.50'}
      {...props}
    >
      <Flex align="center" gap={3} mb={4}>
        <StatusIcon status={status} size="lg" />
        <Box>
          <Flex align="center" gap={2}>
            <Heading size="md">{STATUS_LABELS[status] || '未知'}</Heading>
            <Badge
              colorScheme={isValid ? (status === 'warning' ? 'yellow' : 'green') : 'red'}
              fontSize="xs"
            >
              {isValid ? '有效号码' : '无效号码'}
            </Badge>
          </Flex>
          <Text fontSize="lg" fontWeight="bold" color={numberColor}>
            {fullNumber}
          </Text>
        </Box>
      </Flex>

      {error && (
        <Box mb={4} p={3} bg="invalid.100" rounded="md" borderLeftWidth="4px" borderLeftColor="invalid.500">
          <Text fontSize="sm" color="invalid.700" fontWeight="medium">
            {error}
          </Text>
        </Box>
      )}

      {warning && (
        <Box mb={4} p={3} bg="warning.100" rounded="md" borderLeftWidth="4px" borderLeftColor="warning.500">
          <Text fontSize="sm" color="warning.700" fontWeight="medium">
            ⚠️ {warning}
          </Text>
        </Box>
      )}

      <Divider my={4} />

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <Box>
          <InfoRow label="运营商" value={carrier} />
          <InfoRow label="归属地" value={location} />
        </Box>
        <Box>
          <AnswerLikelihoodBar likelihood={answerLikelihood} />
        </Box>
      </SimpleGrid>

      {ownerInfo && (
        <>
          <Divider my={4} />
          <Box>
            <Text fontSize="sm" fontWeight="medium" color={ownerInfoColor} mb={2}>
              所有者信息
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
              <InfoRow label="姓名" value={ownerInfo.name} isAvailable={!!ownerInfo.name} />
              <InfoRow label="邮箱" value={ownerInfo.email} isAvailable={!!ownerInfo.email} />
              <InfoRow
                label="最后活跃"
                value={ownerInfo.lastActive}
                isAvailable={!!ownerInfo.lastActive}
              />
            </SimpleGrid>
          </Box>
        </>
      )}

      <Divider my={4} />
      <Text fontSize="xs" color={timestampColor}>
        验证时间: {new Date(result.timestamp).toLocaleString('zh-CN')}
      </Text>
    </Box>
  )
}
