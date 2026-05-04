import { useState } from 'react'
import { Box, Container, Heading, Text, Grid } from '@chakra-ui/react'
import ChartConfigForm from '../components/ChartConfigForm'
import ChartPreview from '../components/ChartPreview'

const ChartGenerator = () => {
  const [chartConfig, setChartConfig] = useState({
    chartType: 'line',
    xAxisColumn: 'month',
    yAxisColumns: ['sales'],
    title: '销售数据图表',
    showLegend: true,
    showGrid: true,
  })

  const handleConfigChange = (newConfig) => {
    setChartConfig(newConfig)
  }

  const handleReset = (defaultConfig) => {
    setChartConfig(defaultConfig)
  }

  return (
    <Box className="min-h-screen bg-gray-50">
      {/* Header */}
      <Box className="bg-gradient-to-r from-blue-600 to-blue-800 py-8 shadow-lg">
        <Container maxW="container.xl">
          <Heading 
            as="h1" 
            size="2xl" 
            className="text-white text-center"
          >
            自定义图表生成器
          </Heading>
          <Text 
            className="text-blue-100 text-center mt-4 text-lg"
          >
            选择数据列和图表类型，实时预览生成的图表
          </Text>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" py={8}>
        <Grid 
          templateColumns={{ base: '1fr', lg: '1fr 2fr' }} 
          gap={8}
        >
          {/* Chart Configuration Form */}
          <Box>
            <ChartConfigForm 
              config={chartConfig}
              onConfigChange={handleConfigChange}
              onReset={handleReset}
            />
          </Box>

          {/* Chart Preview */}
          <Box>
            <ChartPreview 
              config={chartConfig}
            />
          </Box>
        </Grid>
      </Container>

      {/* Footer */}
      <Box className="bg-gray-800 py-6 mt-8">
        <Container maxW="container.xl">
          <Text className="text-gray-400 text-center">
            自定义图表生成器 © 2024 | 使用 React, Tailwind CSS, Chakra UI 和 Recharts 构建
          </Text>
        </Container>
      </Box>
    </Box>
  )
}

export default ChartGenerator
