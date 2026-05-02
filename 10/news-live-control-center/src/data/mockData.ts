import type { Channel, RealTimeData } from '../types';

export const mockChannels: Channel[] = [
  {
    id: '1',
    name: 'CCTV-1 综合频道',
    description: '中央电视台综合频道，实时新闻报道',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=CCTV%20news%20studio%20live%20broadcast&image_size=square',
    viewers: 1256789,
    status: 'live',
    startTime: '08:00',
    endTime: '24:00'
  },
  {
    id: '2',
    name: 'CCTV-2 财经频道',
    description: '中央电视台财经频道，财经新闻报道',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=financial%20news%20studio%20live%20broadcast&image_size=square',
    viewers: 876543,
    status: 'live',
    startTime: '06:00',
    endTime: '23:00'
  },
  {
    id: '3',
    name: 'CCTV-13 新闻频道',
    description: '中央电视台新闻频道，24小时新闻播报',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=24%20hour%20news%20channel%20studio&image_size=square',
    viewers: 2345678,
    status: 'live',
    startTime: '00:00',
    endTime: '24:00'
  },
  {
    id: '4',
    name: '东方卫视',
    description: '东方卫视，综合性新闻娱乐频道',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Shanghai%20Dragon%20TV%20news%20studio&image_size=square',
    viewers: 567890,
    status: 'live',
    startTime: '07:00',
    endTime: '24:00'
  },
  {
    id: '5',
    name: '湖南卫视',
    description: '湖南卫视，娱乐新闻综合频道',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Hunan%20TV%20entertainment%20news%20studio&image_size=square',
    viewers: 987654,
    status: 'scheduled',
    startTime: '10:00',
    endTime: '23:00'
  },
  {
    id: '6',
    name: '浙江卫视',
    description: '浙江卫视，新闻综艺综合频道',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Zhejiang%20TV%20news%20variety%20studio&image_size=square',
    viewers: 0,
    status: 'offline',
    startTime: '09:00',
    endTime: '22:00'
  }
];

export const initialRealTimeData: RealTimeData = {
  totalViewers: 5924554,
  activeChannels: 4,
  bandwidth: 1256.78,
  bitrate: 8.5,
  latency: 120,
  frameRate: 30,
  uptime: 99.95,
  errors: 0
};
