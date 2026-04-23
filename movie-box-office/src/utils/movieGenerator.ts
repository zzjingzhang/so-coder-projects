import type { Movie } from '../types/movie';

const chinesePrefixes = [
  '星际', '未来', '爱情', '英雄', '神话', '江湖', '热血', '青春', '奇幻', '冒险',
  '超级', '终极', '神秘', '黑暗', '光明', '黑暗', '梦幻', '魔法', '武侠', '科幻'
];

const chineseMiddle = [
  '战士', '特工', '女王', '王者', '传说', '传奇', '时代', '世界', '帝国', '王国',
  '战队', '联盟', '守护者', '复仇者', '守护者', '追梦人', '探险家', '冒险家', '英雄', '侠客'
];

const chineseSuffixes = [
  '归来', '崛起', '觉醒', '重生', '传奇', '之战', '危机', '行动', '计划', '任务',
  '启示录', '编年史', '前传', '后传', '外传', '续集', '终章', '第一章', '最终章', '新纪元'
];

function generateRandomName(existingNames: string[]): string {
  let name: string;
  let attempts = 0;
  do {
    const prefix = chinesePrefixes[Math.floor(Math.random() * chinesePrefixes.length)];
    const middle = chineseMiddle[Math.floor(Math.random() * chineseMiddle.length)];
    const suffix = chineseSuffixes[Math.floor(Math.random() * chineseSuffixes.length)];
    name = prefix + middle + suffix;
    attempts++;
  } while (existingNames.includes(name) && attempts < 100);
  return name;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

function calculatePredictedBoxOffice(
  actualBoxOffice: number,
  reputation: number,
  remainingDays: number
): number {
  const dailyGrowthBase = 0.05 + (reputation / 10) * 0.1;
  const predictedGrowth = actualBoxOffice * dailyGrowthBase * remainingDays;
  return Math.round(actualBoxOffice + predictedGrowth);
}

export function generateMovie(existingNames: string[] = []): Movie {
  const name = generateRandomName(existingNames);
  const initialBoxOffice = Math.floor(Math.random() * 5000) + 1000;
  const reputation = Math.round((Math.random() * 5 + 5) * 10) / 10;
  const remainingDays = Math.floor(Math.random() * 30) + 5;
  const predictedBoxOffice = calculatePredictedBoxOffice(
    initialBoxOffice,
    reputation,
    remainingDays
  );

  return {
    id: generateId(),
    name,
    actualBoxOffice: initialBoxOffice,
    predictedBoxOffice,
    reputation,
    remainingDays,
    isReleased: false,
  };
}

export function generateInitialMovies(count: number): Movie[] {
  const movies: Movie[] = [];
  const names: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const movie = generateMovie(names);
    movies.push(movie);
    names.push(movie.name);
  }
  
  return movies;
}

export function generateSequelMovie(originalMovie: Movie, existingNames: string[]): Movie {
  const sequelNumbers = ['2', '3', '4', '5'];
  const sequelSuffix = sequelNumbers[Math.floor(Math.random() * sequelNumbers.length)];
  let name = `${originalMovie.name}${sequelSuffix}`;
  
  let attempts = 0;
  while (existingNames.includes(name) && attempts < 10) {
    const newSequel = sequelNumbers[Math.floor(Math.random() * sequelNumbers.length)];
    name = `${originalMovie.name}${newSequel}`;
    attempts++;
  }
  
  if (existingNames.includes(name)) {
    return generateMovie(existingNames);
  }
  
  const initialBoxOffice = Math.floor(originalMovie.actualBoxOffice * 0.8 + Math.random() * 2000);
  const reputation = Math.round((Math.random() * 3 + 7) * 10) / 10;
  const remainingDays = Math.floor(Math.random() * 30) + 5;
  const predictedBoxOffice = calculatePredictedBoxOffice(
    initialBoxOffice,
    reputation,
    remainingDays
  );

  return {
    id: generateId(),
    name,
    actualBoxOffice: initialBoxOffice,
    predictedBoxOffice,
    reputation,
    remainingDays,
    isReleased: false,
  };
}
