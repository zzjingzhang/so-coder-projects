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
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Progress,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import type { Goal } from '../types';

export default function GoalPage() {
  const navigate = useNavigate();
  const { setGoal, state } = useAppContext();

  const [formData, setFormData] = useState<Goal>({
    targetWeight: state.goal?.targetWeight || (state.bodyInfo?.weight || 70) - 5,
    weeklyGoal: state.goal?.weeklyGoal || 0.5,
    deadline: state.goal?.deadline || getDefaultDeadline(),
  });

  const [showSuccess, setShowSuccess] = useState(false);

  function getDefaultDeadline(): string {
    const date = new Date();
    date.setMonth(date.getMonth() + 3);
    return date.toISOString().split('T')[0];
  }

  const handleSubmit = () => {
    setGoal(formData);
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/plan');
    }, 1500);
  };

  const currentWeight = state.bodyInfo?.weight || 70;
  const targetWeight = formData.targetWeight;
  const weeklyGoal = formData.weeklyGoal;
  const totalWeightToLose = currentWeight - targetWeight;
  const estimatedWeeks = totalWeightToLose > 0 ? Math.ceil(totalWeightToLose / weeklyGoal) : 0;

  const getWeeklyGoalAdvice = (kg: number): { label: string; color: string; advice: string } => {
    if (kg <= 0.5) return { label: '保守', color: 'green.500', advice: '健康且可持续的减重速度' };
    if (kg <= 1) return { label: '适中', color: 'blue.500', advice: '需要一定的饮食控制和运动' };
    return { label: '激进', color: 'orange.500', advice: '需要严格的计划，建议咨询专业人士' };
  };

  const weeklyAdvice = getWeeklyGoalAdvice(weeklyGoal);

  return (
    <Box minH="100vh" bg="gray.50">
      <Box bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" color="white" py="6" px="6">
        <HStack justify="space-between">
          <Button variant="ghost" color="white" onClick={() => navigate('/body-info')}>
            ← 返回
          </Button>
          <Heading size="lg">设置减肥目标</Heading>
          <Box w="16" />
        </HStack>
      </Box>

      <Box maxW="600px" mx="auto" p="6">
        {showSuccess && (
          <Box
            mb="6"
            p="4"
            bg="green.100"
            color="green.800"
            borderRadius="md"
            borderLeft="4px"
            borderColor="green.500"
          >
            <HStack gap="2">
              <Text fontWeight="bold">✓</Text>
              <Text>目标已设置！正在生成步行计划...</Text>
            </HStack>
          </Box>
        )}

        <Card mb="6">
          <CardBody>
            <VStack gap="6" align="stretch">
              <FormControl isRequired>
                <FormLabel>目标体重 (kg)</FormLabel>
                <NumberInput
                  value={formData.targetWeight}
                  onChange={(valueString) =>
                    setFormData({ ...formData, targetWeight: parseFloat(valueString) || 0 })
                  }
                  min={30}
                  max={currentWeight}
                  step={0.5}
                  size="lg"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                {state.bodyInfo && (
                  <Text mt="2" fontSize="sm" color="gray.500">
                    当前体重: {state.bodyInfo.weight} kg
                  </Text>
                )}
              </FormControl>

              <FormControl isRequired>
                <FormLabel>每周减重目标 (kg)</FormLabel>
                <Slider
                  value={weeklyGoal}
                  onChange={(value) => setFormData({ ...formData, weeklyGoal: value })}
                  min={0.25}
                  max={1.5}
                  step={0.25}
                  size="lg"
                >
                  <SliderTrack>
                    <SliderFilledTrack bg="blue.500" />
                  </SliderTrack>
                  <SliderThumb boxSize={8} bg="blue.500">
                    <Text fontSize="sm" fontWeight="bold" color="white">
                      {weeklyGoal}
                    </Text>
                  </SliderThumb>
                </Slider>
                <HStack justify="space-between" mt="2">
                  <Text fontSize="xs" color="gray.500">0.25 kg</Text>
                  <Text fontSize="xs" color="gray.500">1.5 kg</Text>
                </HStack>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>目标日期</FormLabel>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    fontSize: '1.125rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    outline: 'none',
                  }}
                />
              </FormControl>
            </VStack>
          </CardBody>
        </Card>

        {totalWeightToLose > 0 && (
          <Card mb="6">
            <CardBody>
              <VStack align="start" gap="4">
                <Heading size="md">目标分析</Heading>

                <Box w="full">
                  <Text mb="2" fontSize="sm" color="gray.500">
                    减重进度
                  </Text>
                  <HStack justify="space-between" mb="2">
                    <Text fontWeight="bold">{currentWeight} kg</Text>
                    <Text fontWeight="bold" color="green.500">
                      {targetWeight} kg
                    </Text>
                  </HStack>
                  <Progress
                    value={0}
                    colorScheme="green"
                    size="lg"
                    borderRadius="md"
                    bg="gray.200"
                  />
                  <Text mt="1" fontSize="sm" color="gray.500">
                    还需减重 {totalWeightToLose.toFixed(1)} kg
                  </Text>
                </Box>

                <SimpleGrid columns={2} gap="4" w="full">
                  <Box p="4" bg="blue.50" borderRadius="md">
                    <Text fontSize="sm" color="gray.500">每周目标</Text>
                    <Text fontSize="2xl" fontWeight="bold" color={weeklyAdvice.color}>
                      {weeklyGoal} kg
                    </Text>
                    <Text fontSize="xs" color={weeklyAdvice.color}>
                      {weeklyAdvice.label}
                    </Text>
                  </Box>
                  <Box p="4" bg="green.50" borderRadius="md">
                    <Text fontSize="sm" color="gray.500">预计周期</Text>
                    <Text fontSize="2xl" fontWeight="bold" color="green.500">
                      {estimatedWeeks} 周
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      约 {Math.ceil(estimatedWeeks / 4)} 个月
                    </Text>
                  </Box>
                </SimpleGrid>

                <Box p="4" bg="yellow.50" borderRadius="md">
                  <Text fontSize="sm" fontWeight="medium" color="yellow.700">
                    💡 建议
                  </Text>
                  <Text fontSize="sm" color="yellow.600" mt="1">
                    {weeklyAdvice.advice}
                  </Text>
                </Box>
              </VStack>
            </CardBody>
          </Card>
        )}

        <VStack gap="4">
          <Button size="lg" colorScheme="green" w="full" onClick={handleSubmit}>
            生成步行计划
          </Button>
          <Button variant="ghost" w="full" onClick={() => navigate('/')}>
            跳过，稍后设置
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
