import React, { useState } from 'react';
import { Container, Typography, Paper, Box, Alert } from '@mui/material';
import type { GasState } from '../types';
import GasContainer from '../components/GasContainer';
import ControlPanel from '../components/ControlPanel';
import ConcentrationChart from '../components/ConcentrationChart';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const ConstantVolumePage: React.FC = () => {
  const [initialNitrogen, setInitialNitrogen] = useState(4);
  const [initialHydrogen, setInitialHydrogen] = useState(3);
  const [heliumAdded, setHeliumAdded] = useState(2);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isAdded, setIsAdded] = useState(false);

  const initialVolume = 10;

  const initialGases: GasState = {
    nitrogen: initialNitrogen,
    hydrogen: initialHydrogen,
    helium: 0,
  };

  const finalGases: GasState = {
    nitrogen: initialNitrogen,
    hydrogen: initialHydrogen,
    helium: isAdded ? heliumAdded : 0,
  };

  const handleAddHelium = () => {
    setIsAdded(true);
  };

  const handleReset = () => {
    setIsAdded(false);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ textAlign: 'center', mb: 5, mt: 2 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: '#1e3a5f', mb: 2 }}
        >
          恒温恒容条件模拟
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          温度和体积保持不变，添加惰性气体观察浓度变化
        </Typography>
      </Box>

      <Alert
        severity="info"
        icon={<InfoOutlinedIcon />}
        sx={{
          mb: 5,
          backgroundColor: '#dbeafe',
          color: '#1e40af',
          '& .MuiAlert-icon': {
            color: '#2563eb',
          },
          p: 2,
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          <strong>恒温恒容特点：</strong>体积 V 不变，添加惰性气体后，氮气和氢气的物质的量 n 不变，
          因此浓度 c = n/V <strong>保持不变</strong>。只有总压强 P 会升高。
        </Typography>
      </Alert>

      <Box className="flex flex-wrap gap-8">
        <Box className="w-full lg:w-64 flex-shrink-0">
          <ControlPanel
            initialNitrogen={initialNitrogen}
            setInitialNitrogen={setInitialNitrogen}
            initialHydrogen={initialHydrogen}
            setInitialHydrogen={setInitialHydrogen}
            heliumAdded={heliumAdded}
            setHeliumAdded={setHeliumAdded}
            isAnimating={isAnimating}
            setIsAnimating={setIsAnimating}
            onAddHelium={handleAddHelium}
            onReset={handleReset}
            isAdded={isAdded}
          />
        </Box>

        <Box className="flex-1 min-w-0">
          <Box className="flex flex-wrap gap-6 mb-8">
            <Box className="flex-1 min-w-80">
              <GasContainer
                gases={initialGases}
                totalVolume={initialVolume}
                isAnimating={isAnimating}
                title="添加氦气前"
              />
            </Box>
            <Box className="flex-1 min-w-80">
              <GasContainer
                gases={isAdded ? finalGases : initialGases}
                totalVolume={initialVolume}
                isAnimating={isAnimating}
                title="添加氦气后"
              />
            </Box>
          </Box>

          <Box className="mb-8">
            <ConcentrationChart
              before={initialGases}
              after={isAdded ? finalGases : initialGases}
              volumeBefore={initialVolume}
              volumeAfter={initialVolume}
            />
          </Box>

          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography
              variant="h6"
              sx={{ mb: 4, fontWeight: 600, color: '#1e3a5f' }}
            >
              原理说明
            </Typography>
            <Box className="flex flex-wrap gap-6">
              <Box className="flex-1 min-w-64">
                <Box
                  sx={{
                    p: 4,
                    backgroundColor: '#f0f9ff',
                    borderRadius: 2,
                    height: '100%',
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, color: '#0369a1', mb: 3 }}
                  >
                    理想气体状态方程
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#475569', lineHeight: 2 }}
                  >
                    PV = nRT，其中：
                    <br />
                    • P：压强
                    <br />
                    • V：体积（<strong>恒定</strong>）
                    <br />
                    • n：总物质的量
                    <br />
                    • R：气体常数
                    <br />
                    • T：温度（<strong>恒定</strong>）
                  </Typography>
                </Box>
              </Box>
              <Box className="flex-1 min-w-64">
                <Box
                  sx={{
                    p: 4,
                    backgroundColor: '#fef3c7',
                    borderRadius: 2,
                    height: '100%',
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, color: '#92400e', mb: 3 }}
                  >
                    浓度变化分析
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#475569', lineHeight: 2 }}
                  >
                    添加惰性气体后：
                    <br />
                    • 体积 V：<strong>不变</strong>
                    <br />
                    • 各气体的 n：氮气、氢气<strong>不变</strong>
                    <br />
                    • 总 n：增加（加入了氦气）
                    <br />
                    • 压强 P：<strong>升高</strong>（因为 n 增加）
                    <br />
                    • 浓度 c = n/V：<strong>不变</strong>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default ConstantVolumePage;
