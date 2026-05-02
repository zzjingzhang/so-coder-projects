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
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import type { BodyInfo } from '../types';

export default function BodyInfoPage() {
  const navigate = useNavigate();
  const { setBodyInfo, state } = useAppContext();

  const [formData, setFormData] = useState<BodyInfo>({
    height: state.bodyInfo?.height || 170,
    weight: state.bodyInfo?.weight || 70,
    age: state.bodyInfo?.age || 30,
    gender: state.bodyInfo?.gender || 'male',
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    setBodyInfo(formData);
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/goal');
    }, 1500);
  };

  const bmi = (formData.weight / Math.pow(formData.height / 100, 2)).toFixed(1);

  const getBMICategory = (bmi: number): { label: string; color: string } => {
    if (bmi < 18.5) return { label: '偏瘦', color: 'blue.500' };
    if (bmi < 24) return { label: '正常', color: 'green.500' };
    if (bmi < 28) return { label: '偏胖', color: 'orange.500' };
    return { label: '肥胖', color: 'red.500' };
  };

  const bmiCategory = getBMICategory(parseFloat(bmi));

  return (
    <Box minH="100vh" bg="gray.50">
      <Box bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" color="white" py="6" px="6">
        <HStack justify="space-between">
          <Button variant="ghost" color="white" onClick={() => navigate('/')}>
            ← 返回
          </Button>
          <Heading size="lg">当前身体信息</Heading>
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
              <Text>身体信息已保存！正在跳转到目标设置...</Text>
            </HStack>
          </Box>
        )}

        <Card mb="6">
          <CardBody>
            <VStack gap="6" align="stretch">
              <FormControl isRequired>
                <FormLabel>性别</FormLabel>
                <RadioGroup
                  value={formData.gender}
                  onChange={(value) => setFormData({ ...formData, gender: value as 'male' | 'female' })}
                >
                  <HStack gap="8">
                    <Radio value="male" size="lg">
                      男
                    </Radio>
                    <Radio value="female" size="lg">
                      女
                    </Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>身高 (cm)</FormLabel>
                <NumberInput
                  value={formData.height}
                  onChange={(valueString) => setFormData({ ...formData, height: parseInt(valueString) || 0 })}
                  min={100}
                  max={250}
                  size="lg"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>体重 (kg)</FormLabel>
                <NumberInput
                  value={formData.weight}
                  onChange={(valueString) => setFormData({ ...formData, weight: parseInt(valueString) || 0 })}
                  min={30}
                  max={300}
                  size="lg"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>年龄</FormLabel>
                <NumberInput
                  value={formData.age}
                  onChange={(valueString) => setFormData({ ...formData, age: parseInt(valueString) || 0 })}
                  min={10}
                  max={120}
                  size="lg"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </VStack>
          </CardBody>
        </Card>

        <Card mb="6">
          <CardBody>
            <VStack align="start" gap="3">
              <Heading size="md">BMI 计算</Heading>
              <HStack align="baseline" gap="4">
                <Text fontSize="4xl" fontWeight="bold" color={bmiCategory.color}>
                  {bmi}
                </Text>
                <Text fontSize="xl" color={bmiCategory.color}>
                  {bmiCategory.label}
                </Text>
              </HStack>
              <Text fontSize="sm" color="gray.500">
                BMI 参考范围：偏瘦 (＜18.5) | 正常 (18.5-23.9) | 偏胖 (24-27.9) | 肥胖 (≥28)
              </Text>
            </VStack>
          </CardBody>
        </Card>

        <Button size="lg" colorScheme="blue" w="full" onClick={handleSubmit}>
          保存并继续
        </Button>
      </Box>
    </Box>
  );
}
