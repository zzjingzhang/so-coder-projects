import { useState, useEffect } from 'react'
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Select,
  Button,
  VStack,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Card,
  CardHeader,
  CardBody,
  useColorModeValue,
  InputGroup,
  InputLeftAddon,
  FormControl,
  FormLabel,
  FormHelperText,
  Spinner,
  Divider,
  Tag,
  TagLabel,
  Wrap,
  WrapItem,
  IconButton,
  Tooltip,
  SimpleGrid,
} from '@chakra-ui/react'
import { SearchIcon, CopyIcon, RepeatIcon, CloseIcon } from '@chakra-ui/icons'
import { ResultCard } from './ui/ResultCard'
import { countries, getCountryByCode } from '../constants/countries'
import { usePhoneVerification } from '../hooks/usePhoneVerification'
import { useNotification } from '../contexts/NotificationContext'
import { STATUS } from '../constants/status'

const quickNumbers = [
  { label: '有效号码', value: '13800138000', status: 'valid' },
  { label: '警告号码', value: '13800138004', status: 'warning' },
  { label: '无效号码', value: '13800138000', status: 'invalid' },
]

const PhoneInputForm = ({ onSubmit, isLoading, defaultCountry = 'CN' }) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [countryCode, setCountryCode] = useState(defaultCountry)
  const { showInfo } = useNotification()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (phoneNumber.trim()) {
      onSubmit(phoneNumber.trim(), countryCode)
    }
  }

  const handleQuickNumber = (value) => {
    setPhoneNumber(value)
    showInfo('已填入示例号码，点击验证按钮进行测试')
  }

  const handleCopy = async () => {
    if (phoneNumber) {
      try {
        await navigator.clipboard.writeText(phoneNumber)
        showInfo('号码已复制到剪贴板')
      } catch (err) {
        // Failed silently
      }
    }
  }

  const handleClear = () => {
    setPhoneNumber('')
  }

  return (
    <Card>
      <CardHeader>
        <Heading size="md">电话号码验证</Heading>
        <Text mt={2} color="gray.500" fontSize="sm">
          选择国家/地区并输入电话号码进行验证
        </Text>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>国家/地区</FormLabel>
              <Select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                placeholder="选择国家/地区"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name} ({country.dialCode})
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>电话号码</FormLabel>
              <InputGroup>
                <InputLeftAddon>{getCountryByCode(countryCode).dialCode}</InputLeftAddon>
                <Input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="输入电话号码"
                  pr="80px"
                />
                {phoneNumber && (
                  <Flex position="absolute" right="8px" top="50%" transform="translateY(-50%)" gap="4px">
                    <Tooltip label="复制">
                      <IconButton
                        icon={<CopyIcon />}
                        variant="ghost"
                        size="sm"
                        onClick={handleCopy}
                        aria-label="Copy"
                      />
                    </Tooltip>
                    <Tooltip label="清除">
                      <IconButton
                        icon={<CloseIcon />}
                        variant="ghost"
                        size="sm"
                        onClick={handleClear}
                        aria-label="Clear"
                      />
                    </Tooltip>
                  </Flex>
                )}
              </InputGroup>
              <FormHelperText>
                格式示例: {getCountryByCode(countryCode).format}
              </FormHelperText>
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              w="full"
              isLoading={isLoading}
              loadingText="验证中..."
              leftIcon={!isLoading && <SearchIcon />}
              isDisabled={!phoneNumber.trim()}
            >
              验证号码
            </Button>

            <Box w="full">
              <Text fontSize="sm" color="gray.500" mb={2}>
                快速测试:
              </Text>
              <Wrap spacing={2}>
                {quickNumbers.map((num, idx) => (
                  <WrapItem key={idx}>
                    <Tag
                      size="md"
                      variant="subtle"
                      colorScheme={
                        num.status === 'valid'
                          ? 'green'
                          : num.status === 'warning'
                          ? 'yellow'
                          : 'red'
                      }
                      cursor="pointer"
                      onClick={() => handleQuickNumber(num.value)}
                      _hover={{ transform: 'scale(1.05)' }}
                      transition="transform 0.2s"
                    >
                      <TagLabel>{num.label}</TagLabel>
                    </Tag>
                  </WrapItem>
                ))}
              </Wrap>
            </Box>
          </VStack>
        </form>
      </CardBody>
    </Card>
  )
}

const HistoryList = ({ history, onClear, onRetry }) => {
  const { showSuccess } = useNotification()

  const handleClear = () => {
    onClear()
    showSuccess('历史记录已清除')
  }

  if (history.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="gray.500">暂无验证历史</Text>
      </Box>
    )
  }

  return (
    <VStack spacing={3} align="stretch">
      <Flex justify="space-between" align="center">
        <Text fontWeight="medium">历史记录 ({history.length})</Text>
        <Button size="sm" variant="ghost" leftIcon={<CloseIcon />} onClick={handleClear}>
          清除
        </Button>
      </Flex>
      {history.map((item, idx) => (
        <Box
          key={idx}
          p={3}
          borderWidth="1px"
          rounded="md"
          borderColor={
            item.status === STATUS.VALID
              ? 'valid.200'
              : item.status === STATUS.WARNING
              ? 'warning.200'
              : 'invalid.200'
          }
          bg={
            item.status === STATUS.VALID
              ? 'valid.50'
              : item.status === STATUS.WARNING
              ? 'warning.50'
              : 'invalid.50'
          }
        >
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontWeight="medium">{item.fullNumber}</Text>
              <Text fontSize="xs" color="gray.500">
                {new Date(item.queriedAt).toLocaleString('zh-CN')}
              </Text>
            </Box>
            <Tag
              colorScheme={
                item.status === STATUS.VALID
                  ? 'green'
                  : item.status === STATUS.WARNING
                  ? 'yellow'
                  : 'red'
              }
            >
              {item.status === STATUS.VALID
                ? '有效'
                : item.status === STATUS.WARNING
                ? '警告'
                : '无效'}
            </Tag>
          </Flex>
        </Box>
      ))}
    </VStack>
  )
}

export const PhoneValidator = () => {
  const { isLoading, result, error, status, history, verify, clearHistory, reset } = usePhoneVerification()
  const { showSuccess, showError, showWarning } = useNotification()

  useEffect(() => {
    if (result) {
      if (result.isValid && result.status === STATUS.VALID) {
        showSuccess(`号码 ${result.fullNumber} 验证有效`)
      } else if (result.status === STATUS.WARNING) {
        showWarning(`号码 ${result.fullNumber} 存在警告: ${result.warning}`)
      } else if (!result.isValid) {
        showError(`号码验证失败: ${result.error}`)
      }
    }
  }, [result, showSuccess, showError, showWarning])

  const handleVerify = (phoneNumber, countryCode) => {
    verify(phoneNumber, countryCode)
  }

  const handleReset = () => {
    reset()
  }

  return (
    <Box>
      <Tabs variant="enclosed" colorScheme="blue">
        <TabList>
          <Tab>验证器</Tab>
          <Tab>API 文档</Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={0}>
            <VStack spacing={6} align="stretch">
              <Flex
                direction={{ base: 'column', lg: 'row' }}
                gap={6}
                align="flex-start"
              >
                <Box flex="1" w="full">
                  <PhoneInputForm onSubmit={handleVerify} isLoading={isLoading} />
                </Box>
                <Box flex="1" w="full">
                  <ResultCard result={result} />
                </Box>
              </Flex>

              {history.length > 0 && (
                <Card>
                  <CardHeader>
                    <Flex justify="space-between" align="center">
                      <Heading size="sm">验证历史</Heading>
                      <Button
                        size="sm"
                        variant="ghost"
                        leftIcon={<RepeatIcon />}
                        onClick={handleReset}
                      >
                        重新开始
                      </Button>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <HistoryList
                      history={history}
                      onClear={clearHistory}
                    />
                  </CardBody>
                </Card>
              )}
            </VStack>
          </TabPanel>

          <TabPanel px={0}>
            <ApiDocsTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

const ApiDocsTab = () => {
  const { showSuccess } = useNotification()
  const bgColor = useColorModeValue('gray.900', 'gray.900')

  const endpoints = [
    {
      method: 'GET',
      path: '/api/verify',
      description: '验证单个电话号码',
      params: [
        { name: 'phone', type: 'string', required: true, desc: '电话号码' },
        { name: 'country_code', type: 'string', required: false, desc: '国家代码，默认 CN' },
        { name: 'api_key', type: 'string', required: true, desc: 'API 密钥' },
      ],
      example: `curl -X GET "https://api.numberverify.com/api/verify?phone=13800138000&country_code=CN&api_key=YOUR_API_KEY"`,
      response: `{
  "isValid": true,
  "status": "valid",
  "phoneNumber": "13800138000",
  "countryCode": "CN",
  "fullNumber": "+86 13800138000",
  "carrier": "中国移动",
  "location": "北京市",
  "answerLikelihood": 0.95,
  "ownerInfo": {
    "name": "张三",
    "email": "zhang***@example.com"
  },
  "timestamp": "2024-01-25T10:30:00Z"
}`,
    },
    {
      method: 'GET',
      path: '/api/batch-verify',
      description: '批量验证电话号码',
      params: [
        { name: 'phones', type: 'string[]', required: true, desc: '电话号码数组' },
        { name: 'country_code', type: 'string', required: false, desc: '国家代码' },
        { name: 'api_key', type: 'string', required: true, desc: 'API 密钥' },
      ],
      example: `curl -X GET "https://api.numberverify.com/api/batch-verify?phones=13800138000&phones=13900139000&api_key=YOUR_API_KEY"`,
      response: `{
  "results": [
    { "phone": "13800138000", "isValid": true, "status": "valid" },
    { "phone": "13900139000", "isValid": false, "status": "invalid" }
  ],
  "count": 2,
  "valid": 1,
  "invalid": 1
}`,
    },
  ]

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      showSuccess('已复制到剪贴板')
    } catch (err) {
      // Failed silently
    }
  }

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET':
        return 'green'
      case 'POST':
        return 'blue'
      case 'PUT':
        return 'yellow'
      case 'DELETE':
        return 'red'
      default:
        return 'gray'
    }
  }

  return (
    <VStack spacing={6} align="stretch">
      <Card>
        <CardHeader>
          <Heading size="md">API 端点</Heading>
          <Text mt={2} color="gray.500" fontSize="sm">
            使用以下 REST API 端点进行电话号码验证
          </Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={6} align="stretch">
            {endpoints.map((endpoint, idx) => (
              <Box key={idx} borderWidth="1px" rounded="lg" overflow="hidden">
                <Box p={4} bg="gray.50">
                  <Flex align="center" gap={3} mb={2}>
                    <Tag colorScheme={getMethodColor(endpoint.method)} fontWeight="bold">
                      {endpoint.method}
                    </Tag>
                    <Text fontFamily="mono" fontWeight="medium">
                      {endpoint.path}
                    </Text>
                  </Flex>
                  <Text color="gray.600" fontSize="sm">
                    {endpoint.description}
                  </Text>
                </Box>

                <Divider />

                <Box p={4}>
                  <Text fontWeight="medium" mb={3}>
                    参数:
                  </Text>
                  <VStack spacing={2} align="stretch">
                    {endpoint.params.map((param, pIdx) => (
                      <Flex key={pIdx} gap={4} align="flex-start">
                        <Box flex="0 0 200px">
                          <Text fontFamily="mono" fontSize="sm" fontWeight="medium">
                            {param.name}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            {param.type} {param.required && <Tag size="xs" colorScheme="red">必需</Tag>}
                          </Text>
                        </Box>
                        <Text fontSize="sm" color="gray.600">
                          {param.desc}
                        </Text>
                      </Flex>
                    ))}
                  </VStack>
                </Box>

                <Divider />

                <Box p={4}>
                  <Flex justify="space-between" align="center" mb={3}>
                    <Text fontWeight="medium">请求示例:</Text>
                    <Button size="sm" leftIcon={<CopyIcon />} onClick={() => handleCopy(endpoint.example)}>
                      复制
                    </Button>
                  </Flex>
                  <Box
                    p={4}
                    bg={bgColor}
                    rounded="md"
                    overflowX="auto"
                  >
                    <Text fontFamily="mono" fontSize="sm" color="gray.300" whiteSpace="pre">
                      {endpoint.example}
                    </Text>
                  </Box>
                </Box>

                <Divider />

                <Box p={4}>
                  <Flex justify="space-between" align="center" mb={3}>
                    <Text fontWeight="medium">响应示例:</Text>
                    <Button size="sm" leftIcon={<CopyIcon />} onClick={() => handleCopy(endpoint.response)}>
                      复制
                    </Button>
                  </Flex>
                  <Box
                    p={4}
                    bg={bgColor}
                    rounded="md"
                    overflowX="auto"
                  >
                    <Text fontFamily="mono" fontSize="sm" color="gray.300" whiteSpace="pre">
                      {endpoint.response}
                    </Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </VStack>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Heading size="md">速率限制</Heading>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            <Box p={4} borderWidth="1px" rounded="md" textAlign="center">
              <Text fontSize="3xl" fontWeight="bold" color="blue.500">
                10
              </Text>
              <Text fontSize="sm" color="gray.500">
                每秒请求
              </Text>
            </Box>
            <Box p={4} borderWidth="1px" rounded="md" textAlign="center">
              <Text fontSize="3xl" fontWeight="bold" color="blue.500">
                600
              </Text>
              <Text fontSize="sm" color="gray.500">
                每分钟请求
              </Text>
            </Box>
            <Box p={4} borderWidth="1px" rounded="md" textAlign="center">
              <Text fontSize="3xl" fontWeight="bold" color="blue.500">
                10,000
              </Text>
              <Text fontSize="sm" color="gray.500">
                每天请求
              </Text>
            </Box>
          </SimpleGrid>
        </CardBody>
      </Card>
    </VStack>
  )
}
