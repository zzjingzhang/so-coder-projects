import { Grid, GridItem, Button, Icon } from '@chakra-ui/react';

interface NumberPadProps {
  maxNumber: number;
  onNumberClick: (num: number) => void;
  onClear: () => void;
  disabled: boolean;
}

export function NumberPad({ maxNumber, onNumberClick, onClear, disabled }: NumberPadProps) {
  const numbers = Array.from({ length: maxNumber }, (_, i) => i + 1);

  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      gap={2}
      maxW="200px"
    >
      {numbers.map((num) => (
        <GridItem key={num}>
          <Button
            onClick={() => onNumberClick(num)}
            disabled={disabled}
            size="lg"
            fontSize="xl"
            fontWeight="bold"
            bg="whiteAlpha.200"
            color="white"
            border="1px solid"
            borderColor="whiteAlpha.400"
            _hover={{
              bg: 'whiteAlpha.300',
              transform: 'scale(1.05)',
            }}
            _active={{
              bg: 'whiteAlpha.400',
            }}
            transition="all 0.2s"
          >
            {num}
          </Button>
        </GridItem>
      ))}
      <GridItem colSpan={3}>
        <Button
          onClick={onClear}
          disabled={disabled}
          size="lg"
          width="100%"
          leftIcon={
            <Icon boxSize={5}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </Icon>
          }
          bg="linear-gradient(135deg, #f87171, #ef4444)"
          color="white"
          _hover={{
            bg: 'linear-gradient(135deg, #ef4444, #dc2626)',
            transform: 'scale(1.02)',
          }}
          transition="all 0.2s"
          fontWeight="bold"
        >
          清除
        </Button>
      </GridItem>
    </Grid>
  );
}
