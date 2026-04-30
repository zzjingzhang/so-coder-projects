import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  Input,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Tag,
  TagLabel,
  Avatar,
  AvatarBadge,
  Tooltip,
  Switch,
  FormControl,
  FormLabel,
  Progress,
  Skeleton,
} from '@chakra-ui/react';
import { ColorPalette } from '../types/theme';

interface PreviewComponentsProps {
  theme: ColorPalette;
}

export const PreviewComponents: React.FC<PreviewComponentsProps> = ({ theme }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');
  const [switchChecked, setSwitchChecked] = useState(false);

  return (
    <Box p={6} bg={theme.background.default} minH="100%">
      <Stack spacing={6}>
        <Card bg={theme.background.paper} borderRadius="lg" p={4}>
          <Heading size="md" mb={4} color={theme.text.primary}>
            文本样式
          </Heading>
          <Stack spacing={3}>
            <Heading size="xl" color={theme.text.primary}>
              一级标题
            </Heading>
            <Heading size="lg" color={theme.text.primary}>
              二级标题
            </Heading>
            <Heading size="md" color={theme.text.primary}>
              三级标题
            </Heading>
            <Text color={theme.text.primary}>
              这是普通文本颜色。Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
            <Text color={theme.text.secondary}>
              这是次要文本颜色。Ut enim ad minim veniam, quis nostrud exercitation.
            </Text>
            <Text color={theme.text.disabled}>
              这是禁用文本颜色。Duis aute irure dolor in reprehenderit in voluptate.
            </Text>
          </Stack>
        </Card>

        <Card bg={theme.background.paper} borderRadius="lg" p={4}>
          <Heading size="md" mb={4} color={theme.text.primary}>
            按钮
          </Heading>
          <Stack spacing={4}>
            <Stack direction="row" spacing={3}>
              <Button bg={theme.primary.main} color={theme.primary.contrastText}>
                主要按钮
              </Button>
              <Button bg={theme.secondary.main} color={theme.secondary.contrastText}>
                次要按钮
              </Button>
              <Button bg={theme.error.main} color={theme.error.contrastText}>
                错误按钮
              </Button>
            </Stack>
            <Stack direction="row" spacing={3}>
              <Button variant="outline" borderColor={theme.primary.main} color={theme.primary.main}>
                轮廓按钮
              </Button>
              <Button variant="ghost" color={theme.primary.main}>
                幽灵按钮
              </Button>
              <Button isDisabled>
                禁用按钮
              </Button>
            </Stack>
          </Stack>
        </Card>

        <Card bg={theme.background.paper} borderRadius="lg" p={4}>
          <Heading size="md" mb={4} color={theme.text.primary}>
            表单元素
          </Heading>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel color={theme.text.primary}>文本输入</FormLabel>
              <Input
                placeholder="请输入文本..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                borderColor={theme.primary.light}
                _focus={{ borderColor: theme.primary.main }}
              />
            </FormControl>
            <FormControl>
              <FormLabel color={theme.text.primary}>下拉选择</FormLabel>
              <Select
                placeholder="请选择选项..."
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                borderColor={theme.primary.light}
                _focus={{ borderColor: theme.primary.main }}
              >
                <option value="1">选项 1</option>
                <option value="2">选项 2</option>
                <option value="3">选项 3</option>
              </Select>
            </FormControl>
            <Stack direction={{ base: "column", md: "row" }} spacing={4} align={{ base: "flex-start", md: "center" }}>
              <Checkbox
                isChecked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                colorScheme="blue"
                whiteSpace="nowrap"
              >
                复选框
              </Checkbox>
              <FormControl display="flex" alignItems="center" w="auto">
                <FormLabel htmlFor="switch" mb="0" mr={2}>
                  开关
                </FormLabel>
                <Switch
                  id="switch"
                  isChecked={switchChecked}
                  onChange={(e) => setSwitchChecked(e.target.checked)}
                  colorScheme="blue"
                />
              </FormControl>
            </Stack>
            <RadioGroup onChange={setRadioValue} value={radioValue}>
              <Stack direction="row" spacing={4}>
                <Radio value="1" colorScheme="blue">选项 A</Radio>
                <Radio value="2" colorScheme="blue">选项 B</Radio>
                <Radio value="3" colorScheme="blue">选项 C</Radio>
              </Stack>
            </RadioGroup>
          </Stack>
        </Card>

        <Card bg={theme.background.paper} borderRadius="lg" p={4}>
          <Heading size="md" mb={4} color={theme.text.primary}>
            提示框
          </Heading>
          <Stack spacing={3}>
            <Alert status="success" borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle>成功</AlertTitle>
                <AlertDescription>这是一个成功提示框。</AlertDescription>
              </Box>
            </Alert>
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle>错误</AlertTitle>
                <AlertDescription>这是一个错误提示框。</AlertDescription>
              </Box>
            </Alert>
            <Alert status="warning" borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle>警告</AlertTitle>
                <AlertDescription>这是一个警告提示框。</AlertDescription>
              </Box>
            </Alert>
            <Alert status="info" borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle>信息</AlertTitle>
                <AlertDescription>这是一个信息提示框。</AlertDescription>
              </Box>
            </Alert>
          </Stack>
        </Card>

        <Card bg={theme.background.paper} borderRadius="lg" p={4}>
          <Heading size="md" mb={4} color={theme.text.primary}>
            标签和徽章
          </Heading>
          <Stack spacing={4}>
            <Stack direction="row" spacing={2} wrap="wrap">
              <Badge colorScheme="blue">主要</Badge>
              <Badge colorScheme="green">成功</Badge>
              <Badge colorScheme="red">错误</Badge>
              <Badge colorScheme="yellow">警告</Badge>
              <Badge colorScheme="purple">紫色</Badge>
            </Stack>
            <Stack direction="row" spacing={2} wrap="wrap">
              <Tag size="md" colorScheme="blue" borderRadius="full">
                <TagLabel>主要标签</TagLabel>
              </Tag>
              <Tag size="md" colorScheme="green" borderRadius="full">
                <TagLabel>成功标签</TagLabel>
              </Tag>
              <Tag size="md" colorScheme="red" borderRadius="full">
                <TagLabel>错误标签</TagLabel>
              </Tag>
            </Stack>
          </Stack>
        </Card>

        <Card bg={theme.background.paper} borderRadius="lg" p={4}>
          <Heading size="md" mb={4} color={theme.text.primary}>
            进度条和骨架屏
          </Heading>
          <Stack spacing={6}>
            <Box>
              <Text mb={2} color={theme.text.primary}>进度条</Text>
              <Progress colorScheme="blue" value={60} borderRadius="full" />
            </Box>
            <Box>
              <Text mb={2} color={theme.text.primary}>骨架屏</Text>
              <Stack spacing={3}>
                <Skeleton height="20px" />
                <Skeleton height="20px" w="80%" />
                <Skeleton height="20px" w="60%" />
              </Stack>
            </Box>
          </Stack>
        </Card>

        <Card bg={theme.background.paper} borderRadius="lg" p={4}>
          <Heading size="md" mb={4} color={theme.text.primary}>
            头像和提示框
          </Heading>
          <Stack direction={{ base: "column", md: "row" }} spacing={4} align={{ base: "flex-start", md: "center" }}>
            <Stack direction="row" spacing={3} align="center">
              <Avatar size="lg" name="张三">
                <AvatarBadge boxSize="1.25em" bg={theme.primary.main} />
              </Avatar>
              <Stack spacing={1}>
                <Text fontWeight="bold" color={theme.text.primary}>张三</Text>
                <Text fontSize="sm" color={theme.text.secondary}>用户@example.com</Text>
              </Stack>
            </Stack>
            <Tooltip label="这是一个提示框" placement="top">
              <Button 
                size="sm" 
                bg={theme.primary.main} 
                color={theme.primary.contrastText}
                mx={{ base: 0, md: 2 }}
              >
                悬停查看
              </Button>
            </Tooltip>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
};
