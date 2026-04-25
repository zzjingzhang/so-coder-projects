import { AddressSuggestion, Address } from '../types';
import { getMockSuggestions } from '../mock';

export interface AddressApiConfig {
  useMock: boolean;
  apiUrl?: string;
  apiKey?: string;
}

const defaultConfig: AddressApiConfig = {
  useMock: true
};

let config = { ...defaultConfig };

export const configureAddressApi = (newConfig: Partial<AddressApiConfig>) => {
  config = { ...config, ...newConfig };
};

export const fetchAddressSuggestions = async (
  query: string
): Promise<AddressSuggestion[]> => {
  if (!query || query.trim().length < 1) {
    return [];
  }

  if (config.useMock) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(getMockSuggestions(query));
      }, 200);
    });
  }

  if (config.apiUrl) {
    try {
      const response = await fetch(
        `${config.apiUrl}?query=${encodeURIComponent(query)}${
          config.apiKey ? `&key=${config.apiKey}` : ''
        }`
      );
      if (!response.ok) {
        throw new Error('API请求失败');
      }
      return response.json();
    } catch (error) {
      console.error('获取地址建议失败:', error);
      return [];
    }
  }

  return [];
};

export const formatFullAddress = (address: Partial<Address>): string => {
  const parts: string[] = [];

  if (address.province) parts.push(address.province);
  if (address.city && address.city !== address.province) parts.push(address.city);
  if (address.district) parts.push(address.district);
  if (address.street) parts.push(address.street);
  if (address.detail) parts.push(address.detail);

  return parts.join('');
};

export const createAddressFromSuggestion = (
  suggestion: AddressSuggestion
): Address => {
  const address: Address = {
    id: suggestion.id,
    province: suggestion.province,
    city: suggestion.city,
    district: suggestion.district,
    street: suggestion.street || '',
    detail: '',
    postalCode: '',
    fullAddress: ''
  };

  address.fullAddress = formatFullAddress(address);
  return address;
};

export const validateAddress = (address: Partial<Address>): {
  valid: boolean;
  errors: { [key: string]: string };
} => {
  const errors: { [key: string]: string } = {};

  if (!address.province || address.province.trim() === '') {
    errors.province = '请选择省份';
  }

  if (!address.city || address.city.trim() === '') {
    errors.city = '请选择城市';
  }

  if (!address.district || address.district.trim() === '') {
    errors.district = '请选择区县';
  }

  if (!address.detail || address.detail.trim() === '') {
    errors.detail = '请输入详细地址';
  }

  if (address.postalCode && address.postalCode.trim() !== '') {
    const postalCodeRegex = /^[1-9]\d{5}$/;
    if (!postalCodeRegex.test(address.postalCode.trim())) {
      errors.postalCode = '请输入有效的邮政编码';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};
