import { STATUS } from '../constants/status'
import { countries } from '../constants/countries'

const mockResponses = {
  valid: [
    {
      isValid: true,
      status: STATUS.VALID,
      carrier: '中国移动',
      location: '北京市',
      answerLikelihood: 0.95,
      ownerInfo: {
        name: '张三',
        email: 'zhang***@example.com',
        lastActive: '2024-01-15',
      },
    },
    {
      isValid: true,
      status: STATUS.VALID,
      carrier: '中国联通',
      location: '上海市',
      answerLikelihood: 0.88,
      ownerInfo: null,
    },
    {
      isValid: true,
      status: STATUS.VALID,
      carrier: '中国电信',
      location: '广东省深圳市',
      answerLikelihood: 0.92,
      ownerInfo: {
        name: '李四',
        email: null,
        lastActive: '2024-01-20',
      },
    },
  ],
  invalid: [
    {
      isValid: false,
      status: STATUS.INVALID,
      carrier: null,
      location: null,
      answerLikelihood: 0,
      ownerInfo: null,
      error: '号码格式不正确',
    },
    {
      isValid: false,
      status: STATUS.INVALID,
      carrier: null,
      location: null,
      answerLikelihood: 0,
      ownerInfo: null,
      error: '号码已停机',
    },
  ],
  warning: [
    {
      isValid: true,
      status: STATUS.WARNING,
      carrier: '虚拟运营商',
      location: '未知',
      answerLikelihood: 0.45,
      ownerInfo: null,
      warning: '虚拟号码，可能用于临时注册',
    },
    {
      isValid: true,
      status: STATUS.WARNING,
      carrier: '中国移动',
      location: '北京市',
      answerLikelihood: 0.3,
      ownerInfo: null,
      warning: '近期多次被标记为骚扰电话',
    },
  ],
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const parsePhoneNumber = (phoneNumber, dialCode) => {
  const cleanedNumber = phoneNumber.replace(/[\s\-\(\)]/g, '')
  
  if (cleanedNumber.length < 7 || cleanedNumber.length > 15) {
    return { valid: false, reason: '号码长度不正确' }
  }

  if (!/^\d+$/.test(cleanedNumber)) {
    return { valid: false, reason: '号码包含非数字字符' }
  }

  const firstDigit = cleanedNumber.charAt(0)
  const secondDigit = cleanedNumber.charAt(1)
  const thirdDigit = cleanedNumber.charAt(2)

  if (dialCode === '+86') {
    if (firstDigit !== '1') {
      return { valid: false, reason: '中国大陆手机号码应以1开头' }
    }
    
    const validSecondDigits = ['3', '4', '5', '7', '8', '9']
    if (!validSecondDigits.includes(secondDigit)) {
      return { valid: false, reason: '号码前缀不合法' }
    }
  }

  return { valid: true, cleanedNumber }
}

const determineResponseType = (cleanedNumber) => {
  const lastDigit = parseInt(cleanedNumber.charAt(cleanedNumber.length - 1))
  const secondLastDigit = parseInt(cleanedNumber.charAt(cleanedNumber.length - 2))
  
  if (lastDigit === 0 || lastDigit === 1) {
    return 'invalid'
  } else if (lastDigit === 4 || (secondLastDigit === 9 && lastDigit === 9)) {
    return 'warning'
  } else {
    return 'valid'
  }
}

export const verifyPhoneNumber = async (phoneNumber, countryCode = 'CN') => {
  await delay(800 + Math.random() * 400)

  const country = countries.find(c => c.code === countryCode) || countries[0]
  
  const parseResult = parsePhoneNumber(phoneNumber, country.dialCode)
  
  if (!parseResult.valid) {
    return {
      isValid: false,
      status: STATUS.INVALID,
      phoneNumber,
      countryCode,
      carrier: null,
      location: null,
      answerLikelihood: 0,
      ownerInfo: null,
      error: parseResult.reason,
      timestamp: new Date().toISOString(),
    }
  }

  const responseType = determineResponseType(parseResult.cleanedNumber)
  const responses = mockResponses[responseType]
  const response = responses[Math.floor(Math.random() * responses.length)]

  return {
    ...response,
    phoneNumber,
    countryCode,
    fullNumber: `${country.dialCode} ${phoneNumber}`,
    timestamp: new Date().toISOString(),
  }
}

export const getApiExamples = () => {
  return {
    endpoints: [
      {
        method: 'GET',
        path: '/api/verify',
        description: '验证电话号码',
        parameters: [
          { name: 'phone', type: 'string', required: true, description: '电话号码' },
          { name: 'country_code', type: 'string', required: false, description: '国家代码，默认 CN' },
          { name: 'api_key', type: 'string', required: true, description: 'API 密钥' },
        ],
        example: `curl -X GET "https://api.numberverify.com/api/verify?phone=13800138000&country_code=CN&api_key=your_api_key"`,
        response: {
          isValid: true,
          status: 'valid',
          phoneNumber: '13800138000',
          countryCode: 'CN',
          fullNumber: '+86 13800138000',
          carrier: '中国移动',
          location: '北京市',
          answerLikelihood: 0.95,
          ownerInfo: {
            name: '张三',
            email: 'zhang***@example.com',
            lastActive: '2024-01-15'
          },
          timestamp: '2024-01-25T10:30:00Z'
        }
      },
      {
        method: 'GET',
        path: '/api/batch-verify',
        description: '批量验证电话号码',
        parameters: [
          { name: 'phones', type: 'string[]', required: true, description: '电话号码数组' },
          { name: 'country_code', type: 'string', required: false, description: '国家代码' },
          { name: 'api_key', type: 'string', required: true, description: 'API 密钥' },
        ],
        example: `curl -X GET "https://api.numberverify.com/api/batch-verify?phones=13800138000&phones=13900139000&country_code=CN&api_key=your_api_key"`,
        response: {
          results: [
            { phone: '13800138000', isValid: true, status: 'valid' },
            { phone: '13900139000', isValid: true, status: 'valid' }
          ],
          count: 2,
          valid: 2,
          invalid: 0
        }
      },
      {
        method: 'GET',
        path: '/api/countries',
        description: '获取支持的国家列表',
        parameters: [
          { name: 'api_key', type: 'string', required: true, description: 'API 密钥' },
        ],
        example: `curl -X GET "https://api.numberverify.com/api/countries?api_key=your_api_key"`,
        response: {
          countries: [
            { code: 'CN', name: '中国', dialCode: '+86' },
            { code: 'US', name: '美国', dialCode: '+1' }
          ],
          total: 20
        }
      }
    ],
    baseUrl: 'https://api.numberverify.com',
    rateLimit: {
      requestsPerSecond: 10,
      requestsPerMinute: 600,
      requestsPerDay: 10000
    }
  }
}
