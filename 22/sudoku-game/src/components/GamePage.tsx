import { useState, useEffect, useCallback } from 'react';
import {
  VStack,
  HStack,
  Box,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import type { SudokuCell, Difficulty, GameStatus } from '../types';
import { generateSudoku, isSudokuComplete } from '../utils/sudoku';
import { Timer } from './Timer';
import { ControlButtons } from './ControlButtons';
import { SudokuBoard } from './SudokuBoard';
import { DifficultySelector } from './DifficultySelector';
import { SizeSelector } from './SizeSelector';
import { NumberPad } from './NumberPad';

export function GamePage() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [size, setSize] = useState(9);
  const [board, setBoard] = useState<SudokuCell[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [status, setStatus] = useState<GameStatus>('idle');
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [timeInSeconds, setTimeInSeconds] = useState(0);

  const toast = useToast();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (status === 'playing') {
      interval = setInterval(() => {
        setTimeInSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const initializeBoard = useCallback(() => {
    const { puzzle, solution: sol } = generateSudoku(size, difficulty);
    const newBoard: SudokuCell[][] = puzzle.map((row) =>
      row.map((value) => ({
        value,
        isFixed: value !== 0,
        isSelected: false,
        isError: false,
        isHighlighted: false,
      }))
    );
    setBoard(newBoard);
    setSolution(sol);
    setSelectedCell(null);
    setTimeInSeconds(0);
  }, [size, difficulty]);

  const handleStart = () => {
    initializeBoard();
    setStatus('playing');
    toast({
      title: '游戏开始！',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top',
    });
  };

  const handlePause = () => {
    setStatus('paused');
  };

  const handleResume = () => {
    setStatus('playing');
  };

  const handleEnd = () => {
    setStatus('idle');
    setBoard([]);
    setShowVictoryModal(false);
  };

  const handleCellClick = (row: number, col: number) => {
    if (status !== 'playing') return;
    setSelectedCell({ row, col });
  };

  const handleNumberClick = (num: number) => {
    if (!selectedCell || status !== 'playing') return;

    const { row, col } = selectedCell;
    const cell = board[row][col];

    if (cell.isFixed) {
      toast({
        title: '无法修改固定数字',
        status: 'warning',
        duration: 1500,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    const newBoard = board.map((r, ri) =>
      r.map((c, ci) => {
        if (ri === row && ci === col) {
          return {
            ...c,
            value: num,
            isError: num !== solution[row][col],
          };
        }
        return c;
      })
    );

    setBoard(newBoard);

    const valueBoard = newBoard.map((r) => r.map((c) => c.value));
    if (isSudokuComplete(valueBoard, size)) {
      const hasErrors = newBoard.some((r) => r.some((c) => c.isError));
      if (!hasErrors) {
        setStatus('won');
        setShowVictoryModal(true);
      }
    }
  };

  const handleClear = () => {
    if (!selectedCell || status !== 'playing') return;

    const { row, col } = selectedCell;
    const cell = board[row][col];

    if (cell.isFixed) {
      toast({
        title: '无法清除固定数字',
        status: 'warning',
        duration: 1500,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    const newBoard = board.map((r, ri) =>
      r.map((c, ci) => {
        if (ri === row && ci === col) {
          return {
            ...c,
            value: 0,
            isError: false,
          };
        }
        return c;
      })
    );

    setBoard(newBoard);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (status !== 'playing' || !selectedCell) return;

      const key = e.key;
      
      if (key >= '1' && key <= '9') {
        const num = parseInt(key);
        if (num <= size) {
          handleNumberClick(num);
        }
      } else if (key === 'Backspace' || key === 'Delete') {
        handleClear();
      } else if (key === 'ArrowUp' && selectedCell.row > 0) {
        setSelectedCell({ ...selectedCell, row: selectedCell.row - 1 });
      } else if (key === 'ArrowDown' && selectedCell.row < size - 1) {
        setSelectedCell({ ...selectedCell, row: selectedCell.row + 1 });
      } else if (key === 'ArrowLeft' && selectedCell.col > 0) {
        setSelectedCell({ ...selectedCell, col: selectedCell.col - 1 });
      } else if (key === 'ArrowRight' && selectedCell.col < size - 1) {
        setSelectedCell({ ...selectedCell, col: selectedCell.col + 1 });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, selectedCell, board, solution, size]);

  return (
    <Box 
      minH="100vh" 
      w="100%" 
      py={4} 
      px={2}
    >
      <VStack spacing={6} w="100%" maxW="900px" mx="auto">
        <Box
          bg="rgba(255,255,255,0.15)"
          backdropFilter="blur(10px)"
          borderRadius="2xl"
          p={6}
          w="100%"
          boxShadow="xl"
          border="1px solid rgba(255,255,255,0.2)"
        >
          <VStack spacing={4}>
            <Text
              fontSize="3xl"
              fontWeight="bold"
              color="white"
              textAlign="center"
              textShadow="0 2px 8px rgba(0,0,0,0.3)"
            >
              🧩 数独游戏
            </Text>

            {(status === 'playing' || status === 'paused') && (
              <Timer isRunning={status === 'playing'} isPaused={status === 'paused'} />
            )}
          </VStack>
        </Box>

        {status === 'idle' && (
          <Box
            bg="rgba(255,255,255,0.15)"
            backdropFilter="blur(10px)"
            borderRadius="2xl"
            p={6}
            w="100%"
            boxShadow="xl"
            border="1px solid rgba(255,255,255,0.2)"
          >
            <VStack spacing={8}>
              <SizeSelector
                value={size}
                onChange={setSize}
                disabled={status !== 'idle'}
              />
              <DifficultySelector
                value={difficulty}
                onChange={setDifficulty}
                disabled={status !== 'idle'}
              />
            </VStack>
          </Box>
        )}

        <Box 
          w="100%" 
          display="flex" 
          justifyContent="center" 
          py={2}
        >
          <ControlButtons
            status={status}
            onStart={handleStart}
            onPause={handlePause}
            onResume={handleResume}
            onEnd={handleEnd}
          />
        </Box>

        <Box
          w="100%"
          display="flex"
          flexDirection={{ base: 'column', md: 'row' }}
          alignItems="flex-start"
          justifyContent="center"
          gap={6}
        >
          <Box 
            display="flex" 
            justifyContent="center" 
            w={{ base: '100%', md: 'auto' }}
          >
            <SudokuBoard
              board={board}
              size={size}
              onCellClick={handleCellClick}
              selectedCell={selectedCell}
              isPaused={status === 'paused'}
              isIdle={status === 'idle'}
            />
          </Box>

          {status === 'playing' && (
            <Box
              bg="rgba(255,255,255,0.15)"
              backdropFilter="blur(10px)"
              borderRadius="2xl"
              p={6}
              boxShadow="xl"
              border="1px solid rgba(255,255,255,0.2)"
              w={{ base: '100%', md: 'auto' }}
              display="flex"
              justifyContent="center"
            >
              <VStack spacing={4}>
                <Text fontSize="lg" fontWeight="bold" color="white" textAlign="center">
                  数字键盘
                </Text>
                <Text fontSize="sm" color="rgba(255,255,255,0.8)" textAlign="center">
                  也可以使用键盘数字键和方向键
                </Text>
                <NumberPad
                  maxNumber={size}
                  onNumberClick={handleNumberClick}
                  onClear={handleClear}
                  disabled={!selectedCell}
                />
              </VStack>
            </Box>
          )}
        </Box>

        <Modal isOpen={showVictoryModal} onClose={() => setShowVictoryModal(false)}>
          <ModalOverlay />
          <ModalContent bg="linear-gradient(135deg, #8b5cf6, #6366f1)">
            <ModalHeader color="white" fontSize="2xl" fontWeight="bold" textAlign="center">
              🎉 恭喜你赢了！
            </ModalHeader>
            <ModalBody>
              <VStack spacing={4} py={4}>
                <Text fontSize="xl" color="white" textAlign="center">
                  用时: {formatTime(timeInSeconds)}
                </Text>
                <Text fontSize="lg" color="rgba(255,255,255,0.9)" textAlign="center">
                  难度: {difficulty === 'easy' ? '初级' : difficulty === 'medium' ? '中级' : difficulty === 'hard' ? '高级' : '特级'}
                </Text>
                <Text fontSize="lg" color="rgba(255,255,255,0.9)" textAlign="center">
                  大小: {size}×{size}
                </Text>
              </VStack>
            </ModalBody>
            <ModalFooter justifyContent="center">
              <Button
                bg="white"
                color="purple.600"
                fontWeight="bold"
                onClick={() => {
                  setShowVictoryModal(false);
                  handleEnd();
                }}
                _hover={{ transform: 'scale(1.05)' }}
                transition="all 0.2s"
              >
                再来一局
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
}
