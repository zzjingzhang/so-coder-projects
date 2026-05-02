import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Card,
  CardBody,
  SimpleGrid,
  Progress,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const navigate = useNavigate();
  const { state } = useAppContext();

  const bmi = state.bodyInfo
    ? (state.bodyInfo.weight / Math.pow(state.bodyInfo.height / 100, 2)).toFixed(1)
    : null;

  const completedPlans = state.walkPlans.filter((p) => p.completed).length;
  const totalPlans = state.walkPlans.length;
  const progress = totalPlans > 0 ? (completedPlans / totalPlans) * 100 : 0;

  const getBMICategory = (bmi: number): { label: string; color: string } => {
    if (bmi < 18.5) return { label: '偏瘦', color: 'blue.500' };
    if (bmi < 24) return { label: '正常', color: 'green.500' };
    if (bmi < 28) return { label: '偏胖', color: 'orange.500' };
    return { label: '肥胖', color: 'red.500' };
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Box bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" color="white" py="8" px="6">
        <VStack align="start" gap="2">
          <Heading size="xl">步行减肥追踪</Heading>
          <Text opacity="0.9">每一步都让你更接近目标</Text>
        </VStack>
      </Box>

      <Box maxW="1200px" mx="auto" p="6">
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="6" mb="8">
          <Card>
            <CardBody>
              <VStack align="start" gap="1">
                <Text fontSize="sm" color="gray.500">总步数</Text>
                <Text fontSize="3xl" fontWeight="bold" color="blue.600">
                  {state.totalSteps.toLocaleString()}
                </Text>
                <Text fontSize="sm" color="gray.500">累计步行</Text>
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <VStack align="start" gap="1">
                <Text fontSize="sm" color="gray.500">消耗卡路里</Text>
                <Text fontSize="3xl" fontWeight="bold" color="orange.600">
                  {state.totalCaloriesBurned.toLocaleString()}
                </Text>
                <Text fontSize="sm" color="gray.500">kcal</Text>
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <VStack align="start" gap="1">
                <Text fontSize="sm" color="gray.500">计划完成率</Text>
                <Text fontSize="3xl" fontWeight="bold" color="green.600">
                  {progress.toFixed(0)}%
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {completedPlans}/{totalPlans} 个计划
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {state.bodyInfo && (
          <Card mb="8">
            <CardBody>
              <VStack align="start" gap="4">
                <Heading size="md">当前身体状况</Heading>
                <SimpleGrid columns={{ base: 2, md: 4 }} gap="4" w="full">
                  <Box>
                    <Text fontSize="sm" color="gray.500">身高</Text>
                    <Text fontSize="xl" fontWeight="bold">{state.bodyInfo.height} cm</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.500">体重</Text>
                    <Text fontSize="xl" fontWeight="bold">{state.bodyInfo.weight} kg</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.500">年龄</Text>
                    <Text fontSize="xl" fontWeight="bold">{state.bodyInfo.age} 岁</Text>
                  </Box>
                  {bmi && (
                    <Box>
                      <Text fontSize="sm" color="gray.500">BMI</Text>
                      <Text fontSize="xl" fontWeight="bold" color={getBMICategory(parseFloat(bmi)).color}>
                        {bmi}
                      </Text>
                      <Text fontSize="xs" color={getBMICategory(parseFloat(bmi)).color}>
                        {getBMICategory(parseFloat(bmi)).label}
                      </Text>
                    </Box>
                  )}
                </SimpleGrid>
              </VStack>
            </CardBody>
          </Card>
        )}

        {state.goal && (
          <Card mb="8">
            <CardBody>
              <VStack align="start" gap="4">
                <Heading size="md">减肥目标</Heading>
                <SimpleGrid columns={{ base: 2, md: 3 }} gap="4" w="full">
                  <Box>
                    <Text fontSize="sm" color="gray.500">目标体重</Text>
                    <Text fontSize="xl" fontWeight="bold">{state.goal.targetWeight} kg</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.500">每周目标</Text>
                    <Text fontSize="xl" fontWeight="bold">{state.goal.weeklyGoal} kg</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.500">目标日期</Text>
                    <Text fontSize="xl" fontWeight="bold">{state.goal.deadline}</Text>
                  </Box>
                </SimpleGrid>
                {state.bodyInfo && (
                  <Box w="full">
                    <Text mb="2">减重进度</Text>
                    <Progress
                      value={Math.min(
                        ((state.bodyInfo.weight - state.bodyInfo.weight) /
                          (state.bodyInfo.weight - state.goal.targetWeight)) *
                          100,
                        100
                      )}
                      colorScheme="green"
                      size="lg"
                      borderRadius="md"
                    />
                    <Text mt="1" fontSize="sm" color="gray.500">
                      还需减重 {(state.bodyInfo.weight - state.goal.targetWeight).toFixed(1)} kg
                    </Text>
                  </Box>
                )}
              </VStack>
            </CardBody>
          </Card>
        )}

        <VStack gap="4" align="stretch">
          {!state.bodyInfo && (
            <Button
              size="lg"
              colorScheme="blue"
              onClick={() => navigate('/body-info')}
            >
              开始使用 - 填写身体信息
            </Button>
          )}
          {state.bodyInfo && !state.goal && (
            <Button
              size="lg"
              colorScheme="purple"
              onClick={() => navigate('/goal')}
            >
              设置减肥目标
            </Button>
          )}
          {state.bodyInfo && state.goal && (
            <Button
              size="lg"
              colorScheme="green"
              onClick={() => navigate('/plan')}
            >
              查看步行计划
            </Button>
          )}
        </VStack>
      </Box>
    </Box>
  );
}
