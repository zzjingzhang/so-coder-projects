import { Grid, GridItem, Box, Text } from '@chakra-ui/react';
import type { SudokuCell } from '../types';

interface SudokuBoardProps {
  board: SudokuCell[][];
  size: number;
  onCellClick: (row: number, col: number) => void;
  selectedCell: { row: number; col: number } | null;
  isPaused: boolean;
  isIdle: boolean;
}

function getBoxSize(gridSize: number): { rows: number; cols: number } {
  if (gridSize === 4) return { rows: 2, cols: 2 };
  if (gridSize === 6) return { rows: 2, cols: 3 };
  if (gridSize === 9) return { rows: 3, cols: 3 };
  if (gridSize === 16) return { rows: 4, cols: 4 };
  return { rows: 2, cols: 2 };
}

export function SudokuBoard({
  board,
  size,
  onCellClick,
  selectedCell,
  isPaused,
  isIdle,
}: SudokuBoardProps) {
  const boxSize = getBoxSize(size);
  
  const getCellSize = () => {
    if (size <= 4) return { w: '60px', h: '60px', fontSize: '2xl' };
    if (size <= 6) return { w: '50px', h: '50px', fontSize: 'xl' };
    if (size <= 9) return { w: '45px', h: '45px', fontSize: 'lg' };
    return { w: '35px', h: '35px', fontSize: 'md' };
  };

  const cellSizes = getCellSize();

  const isRightBorder = (col: number) => {
    return (col + 1) % boxSize.cols === 0 && col !== size - 1;
  };

  const isBottomBorder = (row: number) => {
    return (row + 1) % boxSize.rows === 0 && row !== size - 1;
  };

  const isSelected = (row: number, col: number) => {
    return selectedCell?.row === row && selectedCell?.col === col;
  };

  const isHighlighted = (row: number, col: number) => {
    if (!selectedCell) return false;
    if (selectedCell.row === row || selectedCell.col === col) return true;
    const boxStartRow = Math.floor(selectedCell.row / boxSize.rows) * boxSize.rows;
    const boxStartCol = Math.floor(selectedCell.col / boxSize.cols) * boxSize.cols;
    return (
      row >= boxStartRow &&
      row < boxStartRow + boxSize.rows &&
      col >= boxStartCol &&
      col < boxStartCol + boxSize.cols
    );
  };

  const getCellBg = (cell: SudokuCell, row: number, col: number) => {
    if (cell.isError) return 'red.100';
    if (isSelected(row, col)) return 'blue.300';
    if (isHighlighted(row, col)) return 'blue.100';
    if (cell.isFixed) return 'gray.100';
    return 'white';
  };

  if (isIdle) {
    return (
      <Box
        w={cellSizes.w}
        h={cellSizes.h}
        bg="whiteAlpha.300"
        rounded="2xl"
        display="flex"
        alignItems="center"
        justifyContent="center"
        backdropFilter="blur(10px)"
        style={{ aspectRatio: '1' }}
      >
        <Text fontSize="xl" color="white" fontWeight="bold">
          选择设置后开始游戏
        </Text>
      </Box>
    );
  }

  if (isPaused) {
    return (
      <Box
        bg="whiteAlpha.300"
        rounded="2xl"
        p={8}
        display="flex"
        alignItems="center"
        justifyContent="center"
        backdropFilter="blur(10px)"
        minH="300px"
      >
        <Text fontSize="3xl" color="white" fontWeight="bold">
          游戏暂停中...
        </Text>
      </Box>
    );
  }

  return (
    <Box
      bg="white"
      p={4}
      rounded="2xl"
      shadow="2xl"
      backdropFilter="blur(10px)"
    >
      <Grid
        templateColumns={`repeat(${size}, 1fr)`}
        gap={1}
        bg="gray.200"
        p={1}
        rounded="lg"
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <GridItem key={`${rowIndex}-${colIndex}`}>
              <Box
                w={cellSizes.w}
                h={cellSizes.h}
                bg={getCellBg(cell, rowIndex, colIndex)}
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ bg: isSelected(rowIndex, colIndex) ? 'blue.300' : 'blue.50' }}
                borderRight={isRightBorder(colIndex) ? '3px solid' : '1px solid'}
                borderRightColor={isRightBorder(colIndex) ? 'gray.700' : 'gray.200'}
                borderBottom={isBottomBorder(rowIndex) ? '3px solid' : '1px solid'}
                borderBottomColor={isBottomBorder(rowIndex) ? 'gray.700' : 'gray.200'}
                onClick={() => onCellClick(rowIndex, colIndex)}
              >
                <Text
                  fontSize={cellSizes.fontSize}
                  fontWeight={cell.isFixed ? 'bold' : 'medium'}
                  color={cell.isFixed ? 'gray.800' : cell.isError ? 'red.500' : 'blue.600'}
                >
                  {cell.value !== 0 ? cell.value : ''}
                </Text>
              </Box>
            </GridItem>
          ))
        )}
      </Grid>
    </Box>
  );
}
