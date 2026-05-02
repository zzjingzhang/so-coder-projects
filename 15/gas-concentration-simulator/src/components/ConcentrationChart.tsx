import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { GasState } from '../types';
import { GAS_COLORS } from '../types';

interface ConcentrationChartProps {
  before: GasState;
  after: GasState;
  volumeBefore: number;
  volumeAfter: number;
}

const ConcentrationChart: React.FC<ConcentrationChartProps> = ({
  before,
  after,
  volumeBefore,
  volumeAfter,
}) => {
  const calculateConcentration = (moles: number, volume: number) =>
    volume > 0 ? moles / volume : 0;

  const chartData = [
    {
      name: '添加前',
      氮气: calculateConcentration(before.nitrogen, volumeBefore),
      氢气: calculateConcentration(before.hydrogen, volumeBefore),
      氦气: calculateConcentration(before.helium, volumeBefore),
    },
    {
      name: '添加后',
      氮气: calculateConcentration(after.nitrogen, volumeAfter),
      氢气: calculateConcentration(after.hydrogen, volumeAfter),
      氦气: calculateConcentration(after.helium, volumeAfter),
    },
  ];

  const colors = [GAS_COLORS.nitrogen, GAS_COLORS.hydrogen, GAS_COLORS.helium];

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1e3a5f' }}>
        浓度变化对比
      </Typography>
      <Box sx={{ height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#475569', fontWeight: 500 }}
              axisLine={{ stroke: '#94a3b8' }}
            />
            <YAxis
              label={{
                value: '浓度 (mol/L)',
                angle: -90,
                position: 'insideLeft',
                fill: '#475569',
                fontWeight: 500,
              }}
              tick={{ fill: '#475569' }}
              axisLine={{ stroke: '#94a3b8' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: 8,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
              formatter={(value: number | undefined) =>
                value !== undefined ? [value.toFixed(4) + ' mol/L', ''] : ['', '']
              }
            />
            <Legend
              wrapperStyle={{ paddingTop: 20 }}
              formatter={(value) => (
                <span style={{ fontWeight: 500, color: '#475569' }}>{value}</span>
              )}
            />
            <Bar dataKey="氮气" fill={colors[0]} radius={[4, 4, 0, 0]} />
            <Bar dataKey="氢气" fill={colors[1]} radius={[4, 4, 0, 0]} />
            <Bar dataKey="氦气" fill={colors[2]} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default ConcentrationChart;
