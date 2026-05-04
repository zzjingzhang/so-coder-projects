export const HORSE_LEVELS = {
  SUPERIOR: 'superior',
  MEDIUM: 'medium',
  INFERIOR: 'inferior',
};

export const HORSE_NAMES = {
  [HORSE_LEVELS.SUPERIOR]: '上等马',
  [HORSE_LEVELS.MEDIUM]: '中等马',
  [HORSE_LEVELS.INFERIOR]: '下等马',
};

export const HORSE_SPEED = {
  [HORSE_LEVELS.SUPERIOR]: 100,
  [HORSE_LEVELS.MEDIUM]: 80,
  [HORSE_LEVELS.INFERIOR]: 60,
};

export const KING_HORSES = {
  [HORSE_LEVELS.SUPERIOR]: { level: HORSE_LEVELS.SUPERIOR, speed: 100, owner: 'king' },
  [HORSE_LEVELS.MEDIUM]: { level: HORSE_LEVELS.MEDIUM, speed: 80, owner: 'king' },
  [HORSE_LEVELS.INFERIOR]: { level: HORSE_LEVELS.INFERIOR, speed: 60, owner: 'king' },
};

export const TIANYI_HORSES = {
  [HORSE_LEVELS.SUPERIOR]: { level: HORSE_LEVELS.SUPERIOR, speed: 90, owner: 'tianyi' },
  [HORSE_LEVELS.MEDIUM]: { level: HORSE_LEVELS.MEDIUM, speed: 70, owner: 'tianyi' },
  [HORSE_LEVELS.INFERIOR]: { level: HORSE_LEVELS.INFERIOR, speed: 50, owner: 'tianyi' },
};

export const determineWinner = (kingHorse, tianyiHorse) => {
  if (tianyiHorse.speed > kingHorse.speed) {
    return 'tianyi';
  } else if (tianyiHorse.speed < kingHorse.speed) {
    return 'king';
  }
  return 'draw';
};

export const simulateRace = (kingOrder, tianyiOrder) => {
  const results = [];
  let kingWins = 0;
  let tianyiWins = 0;

  for (let i = 0; i < 3; i++) {
    const kingHorse = KING_HORSES[kingOrder[i]];
    const tianyiHorse = TIANYI_HORSES[tianyiOrder[i]];
    const winner = determineWinner(kingHorse, tianyiHorse);

    results.push({
      round: i + 1,
      kingHorse: HORSE_NAMES[kingHorse.level],
      tianyiHorse: HORSE_NAMES[tianyiHorse.level],
      kingSpeed: kingHorse.speed,
      tianyiSpeed: tianyiHorse.speed,
      winner,
    });

    if (winner === 'king') kingWins++;
    if (winner === 'tianyi') tianyiWins++;
  }

  return {
    results,
    kingWins,
    tianyiWins,
    overallWinner: tianyiWins > kingWins ? 'tianyi' : kingWins > tianyiWins ? 'king' : 'draw',
  };
};

export const getAllPermutations = (arr) => {
  if (arr.length <= 1) return [arr];
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const perms = getAllPermutations(rest);
    for (const perm of perms) {
      result.push([arr[i], ...perm]);
    }
  }
  return result;
};

export const findOptimalStrategy = () => {
  const allOrders = getAllPermutations([
    HORSE_LEVELS.SUPERIOR,
    HORSE_LEVELS.MEDIUM,
    HORSE_LEVELS.INFERIOR,
  ]);

  const strategies = [];

  for (const kingOrder of allOrders) {
    for (const tianyiOrder of allOrders) {
      const result = simulateRace(kingOrder, tianyiOrder);
      strategies.push({
        kingOrder: kingOrder.map(l => HORSE_NAMES[l]),
        tianyiOrder: tianyiOrder.map(l => HORSE_NAMES[l]),
        kingOrderRaw: kingOrder,
        tianyiOrderRaw: tianyiOrder,
        ...result,
      });
    }
  }

  return strategies;
};

export const findTianyiBestAgainstKingOrder = (kingOrder) => {
  const allTianyiOrders = getAllPermutations([
    HORSE_LEVELS.SUPERIOR,
    HORSE_LEVELS.MEDIUM,
    HORSE_LEVELS.INFERIOR,
  ]);

  let bestResult = null;
  let bestOrder = null;

  for (const tianyiOrder of allTianyiOrders) {
    const result = simulateRace(kingOrder, tianyiOrder);
    if (!bestResult || result.tianyiWins > bestResult.tianyiWins) {
      bestResult = result;
      bestOrder = tianyiOrder;
    }
  }

  return {
    bestOrder,
    bestOrderNames: bestOrder.map(l => HORSE_NAMES[l]),
    result: bestResult,
  };
};
