import { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Card,
  CardBody,
  SimpleGrid,
  Badge,
  Progress,
  IconButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import type { WalkPlan } from '../types';

export default function PlanPage() {
  const navigate = useNavigate();
  const { state, generateWalkPlan, togglePlanCompleted } = useAppContext();

  const [showGenerateOptions, setShowGenerateOptions] = useState(!state.walkPlans.length);

  const dailyPlans = state.walkPlans.filter((p) => p.type === 'daily');
  const weeklyPlans = state.walkPlans.filter((p) => p.type === 'weekly');

  const todayStr = new Date().toISOString().split('T')[0];
  const todayPlan = dailyPlans.find((p) => p.date === todayStr);

  const totalDailySteps = dailyPlans.reduce((sum, p) => sum + (p.completed ? p.steps : 0), 0);
  const totalDailyCalories = dailyPlans.reduce((sum, p) => sum + (p.completed ? p.calories : 0), 0);
  const completedWeeklyPlans = weeklyPlans.filter((p) => p.completed).length;

  const handleGeneratePlan = (type: 'daily' | 'weekly') => {
    generateWalkPlan(type);
    setShowGenerateOptions(false);
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return `${date.getMonth() + 1}月${date.getDate()}日 ${weekDays[date.getDay()]}`;
  };

  const getPlanStatusColor = (plan: WalkPlan): string => {
    if (plan.completed) return 'green';
    if (plan.date < todayStr) return 'red';
    return 'blue';
  };

  const getPlanStatusText = (plan: WalkPlan): string => {
    if (plan.completed) return '已完成';
    if (plan.date < todayStr) return '已过期';
    return '进行中';
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Box bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" color="white" py="6" px="6">
        <HStack justify="space-between">
          <Button variant="ghost" color="white" onClick={() => navigate('/goal')}>
            ← 返回
          </Button>
          <Heading size="lg">步行计划</Heading>
          <Button variant="ghost" color="white" onClick={() => setShowGenerateOptions(true)}>
            + 生成
          </Button>
        </HStack>
      </Box>

      <Box maxW="800px" mx="auto" p="6">
        {todayPlan && (
          <Card mb="6" borderLeft="4px" borderColor="blue.500">
            <CardBody>
              <VStack align="start" gap="4">
                <HStack justify="space-between" w="full">
                  <Heading size="md">今日计划</Heading>
                  <Badge colorScheme={getPlanStatusColor(todayPlan)} px="3" py="1" borderRadius="full">
                    {getPlanStatusText(todayPlan)}
                  </Badge>
                </HStack>

                <SimpleGrid columns={{ base: 2, md: 4 }} gap="4" w="full">
                  <VStack align="start" gap="1">
                    <Text fontSize="sm" color="gray.500">目标步数</Text>
                    <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                      {todayPlan.steps.toLocaleString()}
                    </Text>
                  </VStack>
                  <VStack align="start" gap="1">
                    <Text fontSize="sm" color="gray.500">预计时长</Text>
                    <Text fontSize="2xl" fontWeight="bold" color="purple.600">
                      {todayPlan.duration} 分钟
                    </Text>
                  </VStack>
                  <VStack align="start" gap="1">
                    <Text fontSize="sm" color="gray.500">消耗卡路里</Text>
                    <Text fontSize="2xl" fontWeight="bold" color="orange.600">
                      {todayPlan.calories} kcal
                    </Text>
                  </VStack>
                  <VStack align="start" gap="1">
                    <Text fontSize="sm" color="gray.500">完成进度</Text>
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      color={todayPlan.completed ? 'green.600' : 'gray.600'}
                    >
                      {todayPlan.completed ? '100' : '0'}%
                    </Text>
                  </VStack>
                </SimpleGrid>

                <Progress
                  value={todayPlan.completed ? 100 : 0}
                  colorScheme={todayPlan.completed ? 'green' : 'blue'}
                  size="lg"
                  borderRadius="md"
                  w="full"
                />

                <Button
                  size="lg"
                  colorScheme={todayPlan.completed ? 'gray' : 'green'}
                  w="full"
                  onClick={() => togglePlanCompleted(todayPlan.id)}
                >
                  {todayPlan.completed ? '取消完成' : '标记为完成'}
                </Button>
              </VStack>
            </CardBody>
          </Card>
        )}

        {showGenerateOptions && (
          <Card mb="6" bg="blue.50">
            <CardBody>
              <VStack gap="4">
                <Heading size="md" textAlign="center">
                  生成步行计划
                </Heading>
                <Text textAlign="center" color="gray.600">
                  根据您的身体信息和减肥目标，系统将为您生成个性化的步行计划
                </Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" w="full">
                  <Button
                    size="lg"
                    colorScheme="blue"
                    variant="outline"
                    onClick={() => handleGeneratePlan('daily')}
                  >
                    <VStack gap="1">
                      <Text fontWeight="bold">今日计划</Text>
                      <Text fontSize="sm" opacity="0.7">生成当天的步行计划</Text>
                    </VStack>
                  </Button>
                  <Button
                    size="lg"
                    colorScheme="green"
                    variant="outline"
                    onClick={() => handleGeneratePlan('weekly')}
                  >
                    <VStack gap="1">
                      <Text fontWeight="bold">周计划</Text>
                      <Text fontSize="sm" opacity="0.7">生成未来7天的步行计划</Text>
                    </VStack>
                  </Button>
                </SimpleGrid>
              </VStack>
            </CardBody>
          </Card>
        )}

        <Tabs colorScheme="blue">
          <TabList mb="4">
            <Tab>每日计划</Tab>
            <Tab>周计划</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px="0">
              {dailyPlans.length > 0 ? (
                <VStack gap="4" align="stretch">
                  {dailyPlans
                    .sort((a, b) => b.date.localeCompare(a.date))
                    .map((plan) => (
                      <Card key={plan.id}>
                        <CardBody>
                          <HStack justify="space-between" align="center">
                            <VStack align="start" gap="1" flex="1">
                              <HStack gap="2">
                                <Text fontWeight="bold">{formatDate(plan.date)}</Text>
                                <Badge colorScheme={getPlanStatusColor(plan)}>
                                  {getPlanStatusText(plan)}
                                </Badge>
                              </HStack>
                              <HStack gap="4" fontSize="sm" color="gray.500">
                                <Text>步数: {plan.steps.toLocaleString()}</Text>
                                <Text>时长: {plan.duration}分钟</Text>
                                <Text>卡路里: {plan.calories}kcal</Text>
                              </HStack>
                            </VStack>
                            <Button
                              variant={plan.completed ? 'solid' : 'outline'}
                              colorScheme={plan.completed ? 'green' : 'blue'}
                              size="md"
                              leftIcon={plan.completed ? '✓' : '○'}
                              onClick={() => togglePlanCompleted(plan.id)}
                            >
                              {plan.completed ? '已完成' : '标记完成'}
                            </Button>
                          </HStack>
                        </CardBody>
                      </Card>
                    ))}
                </VStack>
              ) : (
                <Card>
                  <CardBody textAlign="center" py="8">
                    <Text color="gray.500">暂无每日计划</Text>
                    <Text fontSize="sm" color="gray.400" mt="2">
                      点击上方的「生成」按钮创建您的第一个步行计划
                    </Text>
                  </CardBody>
                </Card>
              )}
            </TabPanel>

            <TabPanel px="0">
              {weeklyPlans.length > 0 ? (
                <VStack gap="4" align="stretch">
                  <Card>
                    <CardBody>
                      <VStack align="start" gap="3">
                        <Heading size="sm">本周统计</Heading>
                        <SimpleGrid columns={3} gap="4" w="full">
                          <VStack align="start" gap="1">
                            <Text fontSize="sm" color="gray.500">已完成</Text>
                            <Text fontSize="2xl" fontWeight="bold" color="green.600">
                              {completedWeeklyPlans}/{weeklyPlans.length}
                            </Text>
                          </VStack>
                          <VStack align="start" gap="1">
                            <Text fontSize="sm" color="gray.500">完成率</Text>
                            <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                              {weeklyPlans.length > 0
                                ? Math.round((completedWeeklyPlans / weeklyPlans.length) * 100)
                                : 0}
                              %
                            </Text>
                          </VStack>
                          <VStack align="start" gap="1">
                            <Text fontSize="sm" color="gray.500">总步数</Text>
                            <Text fontSize="2xl" fontWeight="bold" color="purple.600">
                              {weeklyPlans
                                .filter((p) => p.completed)
                                .reduce((sum, p) => sum + p.steps, 0)
                                .toLocaleString()}
                            </Text>
                          </VStack>
                        </SimpleGrid>
                      </VStack>
                    </CardBody>
                  </Card>

                  {weeklyPlans
                    .sort((a, b) => a.date.localeCompare(b.date))
                    .map((plan, index) => (
                      <div key={plan.id}>
                        {index > 0 && <Divider my="2" />}
                        <Card>
                          <CardBody>
                            <HStack justify="space-between" align="center">
                              <VStack align="start" gap="1" flex="1">
                                <HStack gap="2">
                                  <Text fontWeight="bold">{formatDate(plan.date)}</Text>
                                  <Badge colorScheme={getPlanStatusColor(plan)}>
                                    {getPlanStatusText(plan)}
                                  </Badge>
                                </HStack>
                                <HStack gap="4" fontSize="sm" color="gray.500">
                                  <Text>步数: {plan.steps.toLocaleString()}</Text>
                                  <Text>时长: {plan.duration}分钟</Text>
                                  <Text>卡路里: {plan.calories}kcal</Text>
                                </HStack>
                              </VStack>
                              <Button
                                variant={plan.completed ? 'solid' : 'outline'}
                                colorScheme={plan.completed ? 'green' : 'blue'}
                                size="md"
                                leftIcon={plan.completed ? '✓' : '○'}
                                onClick={() => togglePlanCompleted(plan.id)}
                              >
                                {plan.completed ? '已完成' : '标记完成'}
                              </Button>
                            </HStack>
                          </CardBody>
                        </Card>
                      </div>
                    ))}
                </VStack>
              ) : (
                <Card>
                  <CardBody textAlign="center" py="8">
                    <Text color="gray.500">暂无周计划</Text>
                    <Text fontSize="sm" color="gray.400" mt="2">
                      点击上方的「生成」按钮创建您的周步行计划
                    </Text>
                  </CardBody>
                </Card>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}
