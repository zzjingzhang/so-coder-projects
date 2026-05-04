import { Box, Table, Heading, Text, Flex, Badge, VStack } from '@chakra-ui/react';

const ResultTable = ({ raceResults, isOptimal, kingWins, tianyiWins, overallWinner }) => {
  const getWinnerBadge = (winner) => {
    if (winner === 'king') {
      return <Badge colorPalette="red">齐王胜</Badge>;
    } else if (winner === 'tianyi') {
      return <Badge colorPalette="green">田忌胜</Badge>;
    }
    return <Badge colorPalette="gray">平局</Badge>;
  };

  return (
    <VStack gap={4} align="stretch">
      <Heading as="h3" size="md" color="#8b4513">
        比赛结果
      </Heading>

      {raceResults.length === 0 ? (
        <Box p={8} bg="gray.50" borderRadius="md" textAlign="center">
          <Text color="gray.500">暂无比赛记录，请选择出马顺序后开始比赛</Text>
        </Box>
      ) : (
        <>
          <Table.Root variant="simple" size="md">
            <Table.Header bg="#8b4513">
              <Table.Row>
                <Table.ColumnHeader color="white" fontWeight="bold">场次</Table.ColumnHeader>
                <Table.ColumnHeader color="white" fontWeight="bold">齐王马匹</Table.ColumnHeader>
                <Table.ColumnHeader color="white" fontWeight="bold">田忌马匹</Table.ColumnHeader>
                <Table.ColumnHeader color="white" fontWeight="bold">齐王速度</Table.ColumnHeader>
                <Table.ColumnHeader color="white" fontWeight="bold">田忌速度</Table.ColumnHeader>
                <Table.ColumnHeader color="white" fontWeight="bold">结果</Table.ColumnHeader>
                {isOptimal && <Table.ColumnHeader color="white" fontWeight="bold">最优策略</Table.ColumnHeader>}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {raceResults.map((result, index) => (
                <Table.Row key={index} bg={index % 2 === 0 ? 'white' : 'gray.50'}>
                  <Table.Cell fontWeight="bold">第 {result.round} 场</Table.Cell>
                  <Table.Cell>{result.kingHorse}</Table.Cell>
                  <Table.Cell>{result.tianyiHorse}</Table.Cell>
                  <Table.Cell>{result.kingSpeed}</Table.Cell>
                  <Table.Cell>{result.tianyiSpeed}</Table.Cell>
                  <Table.Cell>{getWinnerBadge(result.winner)}</Table.Cell>
                  {isOptimal && (
                    <Table.Cell>
                      {result.isOptimal ? (
                        <Box
                          as="span"
                          display="inline-flex"
                          alignItems="center"
                          justifyContent="center"
                          w="6"
                          h="6"
                          borderRadius="full"
                          border="2px solid red"
                          color="red"
                          fontWeight="bold"
                          fontSize="xs"
                        >
                          ●
                        </Box>
                      ) : null}
                    </Table.Cell>
                  )}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>

          <Box p={4} bg="gray.50" borderRadius="md">
            <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
              <Box>
                <Text fontSize="sm" color="gray.600">齐王胜场:</Text>
                <Text fontSize="2xl" fontWeight="bold" color="red.600">
                  {kingWins}
                </Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.600">田忌胜场:</Text>
                <Text fontSize="2xl" fontWeight="bold" color="green.600">
                  {tianyiWins}
                </Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="sm" color="gray.600">最终结果:</Text>
                <Badge
                  fontSize="lg"
                  px={4}
                  py={2}
                  colorPalette={
                    overallWinner === 'tianyi' 
                      ? 'green' 
                      : overallWinner === 'king' 
                        ? 'red' 
                        : 'gray'
                  }
                >
                  {overallWinner === 'tianyi' 
                    ? '田忌获胜！' 
                    : overallWinner === 'king' 
                      ? '齐王获胜！' 
                      : '平局'}
                </Badge>
              </Box>
            </Flex>
          </Box>
        </>
      )}
    </VStack>
  );
};

export default ResultTable;
