import { AddressSuggestion } from '../types';

export const mockAddressSuggestions: AddressSuggestion[] = [
  {
    id: '1',
    text: '北京市海淀区中关村大街1号',
    province: '北京市',
    city: '北京市',
    district: '海淀区',
    street: '中关村大街1号'
  },
  {
    id: '2',
    text: '北京市朝阳区建国路88号',
    province: '北京市',
    city: '北京市',
    district: '朝阳区',
    street: '建国路88号'
  },
  {
    id: '3',
    text: '上海市浦东新区陆家嘴环路1000号',
    province: '上海市',
    city: '上海市',
    district: '浦东新区',
    street: '陆家嘴环路1000号'
  },
  {
    id: '4',
    text: '上海市黄浦区南京东路100号',
    province: '上海市',
    city: '上海市',
    district: '黄浦区',
    street: '南京东路100号'
  },
  {
    id: '5',
    text: '广东省深圳市南山区科技园南路',
    province: '广东省',
    city: '深圳市',
    district: '南山区',
    street: '科技园南路'
  },
  {
    id: '6',
    text: '广东省广州市天河区天河路385号',
    province: '广东省',
    city: '广州市',
    district: '天河区',
    street: '天河路385号'
  },
  {
    id: '7',
    text: '浙江省杭州市西湖区文三路478号',
    province: '浙江省',
    city: '杭州市',
    district: '西湖区',
    street: '文三路478号'
  },
  {
    id: '8',
    text: '江苏省南京市鼓楼区中山路100号',
    province: '江苏省',
    city: '南京市',
    district: '鼓楼区',
    street: '中山路100号'
  },
  {
    id: '9',
    text: '四川省成都市武侯区科华北路62号',
    province: '四川省',
    city: '成都市',
    district: '武侯区',
    street: '科华北路62号'
  },
  {
    id: '10',
    text: '湖北省武汉市洪山区珞喻路1037号',
    province: '湖北省',
    city: '武汉市',
    district: '洪山区',
    street: '珞喻路1037号'
  }
];

export const getMockSuggestions = (query: string): AddressSuggestion[] => {
  if (!query || query.trim() === '') {
    return [];
  }

  const lowerQuery = query.toLowerCase();
  return mockAddressSuggestions.filter(
    suggestion =>
      suggestion.text.toLowerCase().includes(lowerQuery) ||
      suggestion.province.toLowerCase().includes(lowerQuery) ||
      suggestion.city.toLowerCase().includes(lowerQuery) ||
      suggestion.district.toLowerCase().includes(lowerQuery) ||
      (suggestion.street && suggestion.street.toLowerCase().includes(lowerQuery))
  );
};
