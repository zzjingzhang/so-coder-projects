import { useState } from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Checkbox,
  CheckboxGroup,
  Stack,
  Input,
  Button,
  Heading,
  Divider,
  HStack,
  Text,
} from '@chakra-ui/react'
import { chartTypes, dataColumns } from '../data/sampleData'

const ChartConfigForm = ({ config, onConfigChange, onReset }) => {
  const [localConfig, setLocalConfig] = useState(config)

  const handleChange = (field, value) => {
    const newConfig = { ...localConfig, [field]: value }
    setLocalConfig(newConfig)
    onConfigChange(newConfig)
  }

  const handleYAxisChange = (values) => {
    const newConfig = { ...localConfig, yAxisColumns: values }
    setLocalConfig(newConfig)
    onConfigChange(newConfig)
  }

  const handleReset = () => {
    const defaultConfig = {
      chartType: 'line',
      xAxisColumn: 'month',
      yAxisColumns: ['sales'],
      title: '销售数据图表',
      showLegend: true,
      showGrid: true,
    }
    setLocalConfig(defaultConfig)
    onReset(defaultConfig)
  }

  const numberColumns = dataColumns.filter(col => col.type === 'number')
  const categoryColumns = dataColumns.filter(col => col.type === 'category')

  return (
    <Box
      bg="white"
      borderRadius="lg"
      shadow="md"
      p={6}
      className="border border-gray-200"
    >
      <Heading size="lg" mb={6} className="text-gray-800">
        图表配置
      </Heading>
      <Divider mb={6} />

      <FormControl mb={4}>
        <FormLabel className="text-gray-700 font-medium">图表类型</FormLabel>
        <Select
          value={localConfig.chartType}
          onChange={(e) => handleChange('chartType', e.target.value)}
          className="bg-gray-50"
        >
          {chartTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel className="text-gray-700 font-medium">X轴数据列</FormLabel>
        <Select
          value={localConfig.xAxisColumn}
          onChange={(e) => handleChange('xAxisColumn', e.target.value)}
          className="bg-gray-50"
        >
          {dataColumns.map((col) => (
            <option key={col.value} value={col.value}>
              {col.label}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel className="text-gray-700 font-medium">Y轴数据列（可多选）</FormLabel>
        <CheckboxGroup
          value={localConfig.yAxisColumns}
          onChange={handleYAxisChange}
        >
          <Stack spacing={2}>
            {numberColumns.map((col) => (
              <Checkbox 
                key={col.value} 
                value={col.value}
                className="text-gray-700"
              >
                {col.label}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel className="text-gray-700 font-medium">图表标题</FormLabel>
        <Input
          value={localConfig.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="请输入图表标题"
          className="bg-gray-50"
        />
      </FormControl>

      <FormControl mb={6}>
        <FormLabel className="text-gray-700 font-medium">显示选项</FormLabel>
        <Stack spacing={2}>
          <Checkbox
            isChecked={localConfig.showLegend}
            onChange={(e) => handleChange('showLegend', e.target.checked)}
            className="text-gray-700"
          >
            显示图例
          </Checkbox>
          <Checkbox
            isChecked={localConfig.showGrid}
            onChange={(e) => handleChange('showGrid', e.target.checked)}
            className="text-gray-700"
          >
            显示网格线
          </Checkbox>
        </Stack>
      </FormControl>

      <Divider mb={6} />

      <HStack justify="space-between">
        <Button
          colorScheme="blue"
          size="md"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
          width="48%"
          onClick={handleReset}
        >
          重置配置
        </Button>
      </HStack>
    </Box>
  )
}

export default ChartConfigForm
