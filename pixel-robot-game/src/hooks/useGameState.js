import { useState, useEffect, useRef, useCallback } from 'react';
import { Direction, GameStatus, CellType } from '../types';
import {
  isPositionValid,
  isObstacle,
  isCoin,
  getArrowAtPosition,
  getNextPosition,
  isAtEnd,
  getCellType
} from '../utils/gameUtils';
import levels from '../data/levels';

export const useGameState = (levelId) => {
  const level = levels.find((l) => l.id === levelId) || levels[0];
  
  const [robotPos, setRobotPos] = useState({ ...level.startPos });
  const [robotDirection, setRobotDirection] = useState(level.startDirection);
  const [arrows, setArrows] = useState([]);
  const [collectedCoins, setCollectedCoins] = useState([]);
  const [gameStatus, setGameStatus] = useState(GameStatus.READY);
  const [selectedArrow, setSelectedArrow] = useState(null);
  const [usedArrowCount, setUsedArrowCount] = useState(0);
  const [totalCoins, setTotalCoins] = useState(level.coins.length);
  const [currentLevel, setCurrentLevel] = useState(level);
  
  const gameLoopRef = useRef(null);
  const robotPosRef = useRef(robotPos);
  const robotDirectionRef = useRef(robotDirection);
  const collectedCoinsRef = useRef(collectedCoins);
  const gameStatusRef = useRef(gameStatus);

  useEffect(() => {
    robotPosRef.current = robotPos;
  }, [robotPos]);

  useEffect(() => {
    robotDirectionRef.current = robotDirection;
  }, [robotDirection]);

  useEffect(() => {
    collectedCoinsRef.current = collectedCoins;
  }, [collectedCoins]);

  useEffect(() => {
    gameStatusRef.current = gameStatus;
  }, [gameStatus]);

  const resetGame = useCallback(() => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
    
    setRobotPos({ ...currentLevel.startPos });
    setRobotDirection(currentLevel.startDirection);
    setCollectedCoins([]);
    setGameStatus(GameStatus.READY);
    robotPosRef.current = { ...currentLevel.startPos };
    robotDirectionRef.current = currentLevel.startDirection;
    collectedCoinsRef.current = [];
    gameStatusRef.current = GameStatus.READY;
  }, [currentLevel]);

  const placeArrow = useCallback((row, col) => {
    if (gameStatus !== GameStatus.READY || !selectedArrow) return;
    
    const cellType = getCellType(row, col, currentLevel);
    if (cellType === CellType.OBSTACLE || cellType === CellType.START || cellType === CellType.END) {
      return;
    }
    
    const existingArrow = arrows.find((a) => a.row === row && a.col === col);
    if (existingArrow) {
      const updatedArrows = arrows.map((a) =>
        a.row === row && a.col === col
          ? { ...a, direction: selectedArrow }
          : a
      );
      setArrows(updatedArrows);
    } else {
      if (currentLevel.maxArrows > 0 && usedArrowCount >= currentLevel.maxArrows) {
        return;
      }
      
      const newArrow = { row, col, direction: selectedArrow };
      setArrows([...arrows, newArrow]);
      setUsedArrowCount(usedArrowCount + 1);
    }
  }, [gameStatus, selectedArrow, arrows, currentLevel, usedArrowCount]);

  const removeArrow = useCallback((row, col) => {
    if (gameStatus !== GameStatus.READY) return;
    
    const arrowToRemove = arrows.find((a) => a.row === row && a.col === col);
    if (arrowToRemove) {
      const updatedArrows = arrows.filter((a) => !(a.row === row && a.col === col));
      setArrows(updatedArrows);
      setUsedArrowCount(usedArrowCount - 1);
    }
  }, [gameStatus, arrows, usedArrowCount]);

  const startGame = useCallback(() => {
    if (gameStatus !== GameStatus.READY) return;
    
    setGameStatus(GameStatus.RUNNING);
    gameStatusRef.current = GameStatus.RUNNING;
    
    gameLoopRef.current = setInterval(() => {
      const currentPos = robotPosRef.current;
      const currentDir = robotDirectionRef.current;
      const currentCoins = collectedCoinsRef.current;
      const currentStatus = gameStatusRef.current;
      
      if (currentStatus !== GameStatus.RUNNING) {
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
          gameLoopRef.current = null;
        }
        return;
      }
      
      const arrowAtPosition = getArrowAtPosition(currentPos, arrows);
      let newDirection = currentDir;
      
      if (arrowAtPosition) {
        newDirection = arrowAtPosition.direction;
        setRobotDirection(newDirection);
        robotDirectionRef.current = newDirection;
      }
      
      const nextPos = getNextPosition(currentPos, newDirection);
      
      if (!isPositionValid(nextPos, currentLevel.gridSize)) {
        setGameStatus(GameStatus.LOST);
        gameStatusRef.current = GameStatus.LOST;
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
          gameLoopRef.current = null;
        }
        return;
      }
      
      if (isObstacle(nextPos, currentLevel.obstacles)) {
        setGameStatus(GameStatus.LOST);
        gameStatusRef.current = GameStatus.LOST;
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
          gameLoopRef.current = null;
        }
        return;
      }
      
      setRobotPos(nextPos);
      robotPosRef.current = nextPos;
      
      if (isCoin(nextPos, currentLevel.coins)) {
        const isAlreadyCollected = currentCoins.some(
          (c) => c.row === nextPos.row && c.col === nextPos.col
        );
        
        if (!isAlreadyCollected) {
          const newCollectedCoins = [...currentCoins, nextPos];
          setCollectedCoins(newCollectedCoins);
          collectedCoinsRef.current = newCollectedCoins;
        }
      }
      
      if (isAtEnd(nextPos, currentLevel.endPos)) {
        setGameStatus(GameStatus.WON);
        gameStatusRef.current = GameStatus.WON;
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
          gameLoopRef.current = null;
        }
        return;
      }
    }, 300);
  }, [gameStatus, arrows, currentLevel]);

  const changeLevel = useCallback((newLevelId) => {
    const newLevel = levels.find((l) => l.id === newLevelId) || levels[0];
    setCurrentLevel(newLevel);
    setRobotPos({ ...newLevel.startPos });
    setRobotDirection(newLevel.startDirection);
    setArrows([]);
    setCollectedCoins([]);
    setGameStatus(GameStatus.READY);
    setSelectedArrow(null);
    setUsedArrowCount(0);
    setTotalCoins(newLevel.coins.length);
    
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, []);

  return {
    currentLevel,
    robotPos,
    robotDirection,
    arrows,
    collectedCoins,
    gameStatus,
    selectedArrow,
    usedArrowCount,
    totalCoins,
    setSelectedArrow,
    placeArrow,
    removeArrow,
    startGame,
    resetGame,
    changeLevel
  };
};
