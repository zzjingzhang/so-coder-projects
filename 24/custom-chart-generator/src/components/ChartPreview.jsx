import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  ScatterChart, 
  Scatter,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'
import { Box, Heading, Text } from '@chakra-ui/react'
import { sampleData, dataColumns } from '../data/sampleData'

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

const ChartPreview = ({ config }) => {
  const getColumnLabel = (value) => {
    const col = dataColumns.find(c => c.value === value)
    return col ? col.label : value
  }

  const renderChart = () => {
    const { chartType, xAxisColumn, yAxisColumns, showLegend, showGrid } = config

    if (yAxisColumns.length === 0) {
      return (
        <Text className="text-gray-500 text-center py-20">
          请至少选择一个 Y 轴数据列
        </Text>
      )
    }

    if (chartType === 'line') {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={sampleData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />}
            <XAxis 
              dataKey={xAxisColumn} 
              stroke="#6B7280" 
              tick={{ fill: '#374151' }}
            />
            <YAxis 
              stroke="#6B7280" 
              tick={{ fill: '#374151' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }} 
            />
            {showLegend && <Legend />}
            {yAxisColumns.map((col, index) => (
              <Line
                key={col}
                type="monotone"
                dataKey={col}
                name={getColumnLabel(col)}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )
    }

    if (chartType === 'bar') {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={sampleData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />}
            <XAxis 
              dataKey={xAxisColumn} 
              stroke="#6B7280" 
              tick={{ fill: '#374151' }}
            />
            <YAxis 
              stroke="#6B7280" 
              tick={{ fill: '#374151' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }} 
            />
            {showLegend && <Legend />}
            {yAxisColumns.map((col, index) => (
              <Bar
                key={col}
                dataKey={col}
                name={getColumnLabel(col)}
                fill={COLORS[index % COLORS.length]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      )
    }

    if (chartType === 'scatter') {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />}
            <XAxis 
              dataKey={xAxisColumn} 
              stroke="#6B7280" 
              tick={{ fill: '#374151' }}
            />
            <YAxis 
              stroke="#6B7280" 
              tick={{ fill: '#374151' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }} 
            />
            {showLegend && <Legend />}
            {yAxisColumns.map((col, index) => (
              <Scatter
                key={col}
                name={getColumnLabel(col)}
                data={sampleData.map(item => ({
                  ...item,
                  [xAxisColumn]: item[xAxisColumn],
                  [col]: item[col]
                }))}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      )
    }

    return null
  }

  return (
    <Box
      bg="white"
      borderRadius="lg"
      shadow="md"
      p={6}
      className="border border-gray-200 h-full"
    >
      <Heading size="lg" mb={6} className="text-gray-800">
        {config.title}
      </Heading>
      <Box className="w-full">
        {renderChart()}
      </Box>
    </Box>
  )
}

export default ChartPreview
