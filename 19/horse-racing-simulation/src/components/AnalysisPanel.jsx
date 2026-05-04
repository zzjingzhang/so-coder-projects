import { useState } from 'react';
import { 
  Box, 
  Button, 
  VStack, 
  Heading, 
  Text, 
  Table, 
  Tabs,
  Badge,
  HStack,
  Collapsible,
} from '@chakra-ui/react';
import { HORSE_NAMES, findOptimalStrategy } from '../utils/gameLogic';

const AnalysisPanel = ({ isVisible, strategies, currentKingOrder, currentTianyiOrder }) => {
  const [activeTab, setActiveTab] = useState(0);

  const optimalStrategies = strategies?.filter(s => s.overallWinner === 'tianyi') || [];
  const allStrategies = strategies || [];

  const isCurrentStrategyOptimal = (kingOrder, tianyiOrder) => {
    return optimalStrategies.some(s => 
      JSON.stringify(s.kingOrderRaw) === JSON.stringify(kingOrder) &&
      JSON.stringify(s.tianyiOrderRaw) === JSON.stringify(tianyiOrder)
    );
  };

  const getResultBadge = (result) => {
    if (result.overallWinner === 'tianyi') {
      return <Badge colorPalette="green">田忌胜 {result.tianyiWins}:{result.kingWins}</Badge>;
    } else if (result.overallWinner === 'king') {
      return <Badge colorPalette="red">齐王胜 {result.kingWins}:{result.tianyiWins}</Badge>;
    }
    return <Badge colorPalette="gray">平局</Badge>;
  };

  return (
    <Collapsible.Root open={isVisible}>
      <Collapsible.Content>
        <Box 
          mt={6} 
          p={4} 
          bg="gray.50" 
          borderRadius="md" 
          border="2px solid #8b4513"
        >
          <Heading as="h3" size="md" mb={4} color="#8b4513">
            策略分析与总结
          </Heading>

          <Tabs.Root variant="enclosed" colorPalette="orange" lazyMount>
            <Tabs.List>
              <Tabs.Trigger fontWeight="bold">最优策略分析</Tabs.Trigger>
              <Tabs.Trigger fontWeight="bold">全部策略一览</Tabs.Trigger>
              <Tabs.Trigger fontWeight="bold">故事背景</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content>
              <VStack gap={4} align="stretch">
                <Box p={4} bg="white" borderRadius="md">
                  <Heading as="h4" size="sm" mb={3} color="#8b4513">
                    田忌如何获胜？
                  </Heading>
                  <Text fontSize="sm" lineHeight="tall" mb={3}>
                    田忌赛马是中国古代著名的博弈故事。齐王的马总体实力强于田忌的马，
                    但田忌通过巧妙的策略安排，最终以 2:1 的比分获胜。
                  </Text>
                  <Text fontSize="sm" lineHeight="tall" mb={3} fontWeight="bold">
                    经典最优策略（田忌视角）：
                  </Text>
                  <Box p={3} bg="green.50" borderRadius="md" border="1px solid green.200">
                    <Text fontSize="sm" mb={2}>
                      <strong>第一场：</strong>用<strong>下等马</strong>对齐王的<strong>上等马</strong> → <Badge colorPalette="red" ml={1}>输</Badge>
                    </Text>
                    <Text fontSize="sm" mb={2}>
                      <strong>第二场：</strong>用<strong>上等马</strong>对齐王的<strong>中等马</strong> → <Badge colorPalette="green" ml={1}>赢</Badge>
                    </Text>
                    <Text fontSize="sm">
                      <strong>第三场：</strong>用<strong>中等马</strong>对齐王的<strong>下等马</strong> → <Badge colorPalette="green" ml={1}>赢</Badge>
                    </Text>
                  </Box>
                  <Text fontSize="sm" lineHeight="tall" mt={3} color="gray.600">
                    核心思想：<strong>以弱胜强，以强击弱</strong>。牺牲局部利益换取整体胜利。
                  </Text>
                </Box>

                {optimalStrategies.length > 0 && (
                  <Box p={4} bg="white" borderRadius="md">
                    <Heading as="h4" size="sm" mb={3} color="#8b4513">
                      所有可让田忌获胜的策略组合（共 {optimalStrategies.length} 种）
                    </Heading>
                    <Table.Root variant="simple" size="sm">
                      <Table.Header bg="green.50">
                        <Table.Row>
                          <Table.ColumnHeader fontWeight="bold">齐王顺序</Table.ColumnHeader>
                          <Table.ColumnHeader fontWeight="bold">田忌顺序</Table.ColumnHeader>
                          <Table.ColumnHeader fontWeight="bold">结果</Table.ColumnHeader>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {optimalStrategies.slice(0, 10).map((s, idx) => (
                          <Table.Row key={idx} bg={idx % 2 === 0 ? 'white' : 'gray.50'}>
                            <Table.Cell fontSize="sm">{s.kingOrder.join(' → ')}</Table.Cell>
                            <Table.Cell fontSize="sm">{s.tianyiOrder.join(' → ')}</Table.Cell>
                            <Table.Cell>{getResultBadge(s)}</Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root>
                  </Box>
                )}
              </VStack>
            </Tabs.Content>

            <Tabs.Content>
              <Box p={4} bg="white" borderRadius="md" maxH="500px" overflowY="auto">
                <Heading as="h4" size="sm" mb={3} color="#8b4513">
                  全部 36 种策略组合
                </Heading>
                <Table.Root variant="simple" size="sm">
                  <Table.Header bg="gray.100" position="sticky" top={0}>
                    <Table.Row>
                      <Table.ColumnHeader fontWeight="bold">#</Table.ColumnHeader>
                      <Table.ColumnHeader fontWeight="bold">齐王出马</Table.ColumnHeader>
                      <Table.ColumnHeader fontWeight="bold">田忌出马</Table.ColumnHeader>
                      <Table.ColumnHeader fontWeight="bold">结果</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {allStrategies.map((s, idx) => (
                      <Table.Row 
                        key={idx} 
                        bg={s.overallWinner === 'tianyi' ? 'green.50' : idx % 2 === 0 ? 'white' : 'gray.50'}
                        fontWeight={s.overallWinner === 'tianyi' ? 'bold' : 'normal'}
                      >
                        <Table.Cell fontSize="xs">{idx + 1}</Table.Cell>
                        <Table.Cell fontSize="sm">{s.kingOrder.join(' → ')}</Table.Cell>
                        <Table.Cell fontSize="sm">{s.tianyiOrder.join(' → ')}</Table.Cell>
                        <Table.Cell>{getResultBadge(s)}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Box>
            </Tabs.Content>

            <Tabs.Content>
              <VStack gap={4} align="stretch">
                <Box p={4} bg="white" borderRadius="md">
                  <Heading as="h4" size="sm" mb={3} color="#8b4513">
                    田忌赛马的故事
                  </Heading>
                  <Text fontSize="sm" lineHeight="tall" mb={3}>
                    田忌赛马是中国历史上有名的揭示如何善用自己的长处去对付对手的短处，从而在竞技中获胜的事例。
                  </Text>
                  <Text fontSize="sm" lineHeight="tall" mb={3}>
                    <strong>故事背景：</strong>战国时期，齐国的大将田忌经常与齐威王赛马。
                    双方的马都分为上、中、下三等。在同等级的马中，齐王的马总是略胜一筹，
                    所以田忌每次比赛都输。
                  </Text>
                  <Text fontSize="sm" lineHeight="tall" mb={3}>
                    <strong>孙膑献策：</strong>后来，田忌的谋士孙膑观察发现，两方的马
                    实力差距并不大，于是献计让田忌调整出马顺序。
                  </Text>
                  <Text fontSize="sm" lineHeight="tall" mb={3}>
                    <strong>比赛结果：</strong>第一场用下等马对齐王的上等马，输了；
                    第二场用上等马对齐王的中等马，赢了；第三场用中等马对齐王的下等马，
                    又赢了。最终田忌以 2:1 的比分获胜。
                  </Text>
                  <Text fontSize="sm" lineHeight="tall" color="gray.600">
                    <strong>启示：</strong>这个故事告诉我们，在竞争中，有时候需要
                    牺牲局部利益来换取整体胜利。策略的选择往往比单纯的实力更重要。
                    这也是博弈论中著名的"田忌赛马"策略。
                  </Text>
                </Box>
              </VStack>
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default AnalysisPanel;
