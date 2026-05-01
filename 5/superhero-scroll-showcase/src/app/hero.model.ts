export interface Hero {
  id: number;
  name: string;
  alias: string;
  powers: string[];
  description: string;
  color: string;
  image: string;
}

export const HEROES: Hero[] = [
  {
    id: 1,
    name: 'Captain Valor',
    alias: 'The Sentinel',
    powers: ['超级力量', '飞行', '能量护盾'],
    description: '一位守护正义的超级英雄，拥有超人般的力量和坚不可摧的意志。',
    color: 'hero-blue',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Inferno',
    alias: 'Blaze Master',
    powers: ['火焰操控', '热感应', '免疫高温'],
    description: '能够操控强大的火焰力量，是一位热情而勇敢的英雄。',
    color: 'hero-red',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'Aurora',
    alias: 'Light Weaver',
    powers: ['光能量操控', '治愈能力', '幻象创造'],
    description: '一位拥有光明力量的英雄，用光芒驱散黑暗，治愈伤痛。',
    color: 'hero-yellow',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
  },
  {
    id: 4,
    name: 'Shadowstrike',
    alias: 'The Phantom',
    powers: ['隐形', '传送', '阴影操控'],
    description: '神秘的暗夜守护者，在黑暗中无声无息地打击犯罪。',
    color: 'hero-purple',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
  },
  {
    id: 5,
    name: 'Thornward',
    alias: 'Nature Guardian',
    powers: ['植物操控', '自然沟通', '再生能力'],
    description: '与自然融为一体的守护者，能够召唤植物的力量保护地球。',
    color: 'hero-green',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
  },
  {
    id: 6,
    name: 'Tempest',
    alias: 'Storm Bringer',
    powers: ['天气操控', '闪电攻击', '超级速度'],
    description: '能够掌控风暴的力量，用闪电和狂风打击邪恶势力。',
    color: 'hero-blue',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop'
  }
];
