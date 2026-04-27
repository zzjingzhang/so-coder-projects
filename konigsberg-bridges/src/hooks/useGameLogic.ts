import { useState, useCallback } from 'react';
import type { Region, Bridge, GameState } from '../types';

export const BRIDGES: Bridge[] = [
  { id: 1, from: 'A', to: 'C' },
  { id: 2, from: 'A', to: 'C' },
  { id: 3, from: 'A', to: 'D' },
  { id: 4, from: 'A', to: 'D' },
  { id: 5, from: 'A', to: 'B' },
  { id: 6, from: 'B', to: 'C' },
  { id: 7, from: 'B', to: 'D' },
];

const initialState: GameState = {
  currentPosition: null,
  visitedBridges: [],
  history: [],
  gameStarted: false,
  message: '请选择一个起点开始游戏',
  messageType: 'info',
};

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const getConnectedBridges = useCallback((region: Region): Bridge[] => {
    return BRIDGES.filter(
      (bridge) =>
        (bridge.from === region || bridge.to === region) &&
        !gameState.visitedBridges.includes(bridge.id)
    );
  }, [gameState.visitedBridges]);

  const selectStartPosition = useCallback((region: Region) => {
    setGameState({
      currentPosition: region,
      visitedBridges: [],
      history: [],
      gameStarted: true,
      message: `你已在 ${region} 区域开始。点击连接的桥梁移动。`,
      messageType: 'info',
    });
  }, []);

  const crossBridge = useCallback((bridgeId: number) => {
    setGameState((prev) => {
      if (!prev.currentPosition || prev.visitedBridges.includes(bridgeId)) {
        return prev;
      }

      const bridge = BRIDGES.find((b) => b.id === bridgeId);
      if (!bridge) return prev;

      const canCross =
        bridge.from === prev.currentPosition || bridge.to === prev.currentPosition;
      if (!canCross) {
        return {
          ...prev,
          message: '无法跨过这座桥 - 你不在连接的区域。',
          messageType: 'error',
        };
      }

      const newPosition =
        bridge.from === prev.currentPosition ? bridge.to : bridge.from;
      const newVisitedBridges = [...prev.visitedBridges, bridgeId];

      const newHistory = [
        ...prev.history,
        {
          position: prev.currentPosition,
          visitedBridges: [...prev.visitedBridges],
        },
      ];

      let message = `移动到了 ${newPosition} 区域。`;
      let messageType: GameState['messageType'] = 'info';

      const remainingBridges = BRIDGES.length - newVisitedBridges.length;

      if (remainingBridges === 0) {
        message =
          '恭喜！你走过了所有桥梁。等等——实际上这不可能！七桥问题是无解的，因为有超过两个区域有奇数座桥连接。';
        messageType = 'success';
      } else {
        const availableBridges = BRIDGES.filter(
          (b) =>
            (b.from === newPosition || b.to === newPosition) &&
            !newVisitedBridges.includes(b.id)
        );

        if (availableBridges.length === 0 && remainingBridges > 0) {
          message = `卡住了！你已经走过了 ${newVisitedBridges.length} 座桥，但无法到达剩下的 ${remainingBridges} 座桥。这就是为什么七桥问题无解！尝试另一条路线或了解图论。`;
          messageType = 'warning';
        } else {
          message = `移动到了 ${newPosition} 区域。还剩 ${remainingBridges} 座桥。`;
        }
      }

      return {
        ...prev,
        currentPosition: newPosition,
        visitedBridges: newVisitedBridges,
        history: newHistory,
        message,
        messageType,
      };
    });
  }, []);

  const undo = useCallback(() => {
    setGameState((prev) => {
      if (prev.history.length === 0) {
        return {
          ...prev,
          message: '没有可撤销的操作。',
          messageType: 'warning',
        };
      }

      const lastState = prev.history[prev.history.length - 1];
      const newHistory = prev.history.slice(0, -1);

      const remainingBridges = BRIDGES.length - lastState.visitedBridges.length;

      return {
        ...prev,
        currentPosition: lastState.position,
        visitedBridges: lastState.visitedBridges,
        history: newHistory,
        message: `已撤销。回到 ${lastState.position} 区域。还剩 ${remainingBridges} 座桥。`,
        messageType: 'info',
      };
    });
  }, []);

  const reset = useCallback(() => {
    setGameState(initialState);
  }, []);

  const clearMessage = useCallback(() => {
    setGameState((prev) => ({ ...prev, message: null }));
  }, []);

  const showHint = useCallback(() => {
    const hintMessage =
      '💡 提示：哥尼斯堡七桥问题实际上是**无解**的！这是图论中的经典问题。根据欧拉的欧拉路径定理：一个图存在欧拉路径（每条边恰好经过一次）的条件是：图中奇数度的顶点数量必须是 0 或 2。在七桥问题中，四个区域的度数分别是：A岛5座桥（奇数）、B岛3座桥（奇数）、C岸3座桥（奇数）、D岸3座桥（奇数）。共有 4 个奇数度顶点，所以不存在这样的路径！这个发现开创了图论这一数学分支。';

    setGameState((prev) => ({
      ...prev,
      message: hintMessage,
      messageType: 'warning',
    }));
  }, []);

  return {
    gameState,
    BRIDGES,
    getConnectedBridges,
    selectStartPosition,
    crossBridge,
    undo,
    reset,
    clearMessage,
    showHint,
  };
};
