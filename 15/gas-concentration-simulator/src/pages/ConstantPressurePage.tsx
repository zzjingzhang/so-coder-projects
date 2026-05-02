import React, { useState } from 'react';
import { Container, Typography, Paper, Box, Alert } from '@mui/material';
import type { GasState } from '../types';
import GasContainer from '../components/GasContainer';
import ControlPanel from '../components/ControlPanel';
import ConcentrationChart from '../components/ConcentrationChart';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const ConstantPressurePage: React.FC = () => {
  const [initialNitrogen, setInitialNitrogen] = useState(4);
  const [initialHydrogen, setInitialHydrogen] = useState(3);
  const [heliumAdded, setHeliumAdded] = useState(2);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isAdded, setIsAdded] = useState(false);

  const initialVolume = 10;
  const initialTotalMoles = initialNitrogen + initialHydrogen;
  const finalTotalMoles = initialTotalMoles + (isAdded ? heliumAdded : 0);
  const finalVolume = isAdded
    ? (finalTotalMoles / initialTotalMoles) * initialVolume
    : initialVolume;

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
          恒温恒压条件模拟
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          温度和压强保持不变，添加惰性气体观察浓度变化
        </Typography>
      </Box>

      <Alert
        severity="warning"
        icon={<InfoOutlinedIcon />}
        sx={{
          mb: 5,
          backgroundColor: '#fef3c7',
          color: '#92400e',
          '& .MuiAlert-icon': {
            color: '#d97706',
          },
          p: 2,
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          <strong>恒温恒压特点：</strong>压强 P 不变，添加惰性气体后，总体积 V 增大（根据 PV = nRT），
          氮气和氢气的物质的量 n 不变，但体积 V 增大，因此浓度 c = n/V <strong>降低</strong>。
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
                totalVolume={finalVolume}
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
              volumeAfter={finalVolume}
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
                    backgroundColor: '#fdf2f8',
                    borderRadius: 2,
                    height: '100%',
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, color: '#be185d', mb: 3 }}
                  >
                    理想气体状态方程
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#475569', lineHeight: 2 }}
                  >
                    PV = nRT，其中：
                    <br />
                    • P：压强（<strong>恒定</strong>）
                    <br />
                    • V：体积
                    <br />
                    • n：总物质的量
                    <br />
                    • R：气体常数
                    <br />
                    • T：温度（<strong>恒定</strong>）
                    <br />
                    <br />
                    因为 P 和 T 恒定，所以 V 与 n 成正比：
                    <br />
                    V₁ / n₁ = V₂ / n₂
                  </Typography>
                </Box>
              </Box>
              <Box className="flex-1 min-w-64">
                <Box
                  sx={{
                    p: 4,
                    backgroundColor: '#f0fdf4',
                    borderRadius: 2,
                    height: '100%',
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, color: '#166534', mb: 3 }}
                  >
                    浓度变化分析
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#475569', lineHeight: 2 }}
                  >
                    添加惰性气体后：
                    <br />
                    • 压强 P：<strong>不变</strong>
                    <br />
                    • 总物质的量 n：<strong>增加</strong>（加入了氦气）
                    <br />
                    • 体积 V：<strong>增大</strong>（因为 n 增加）
                    <br />
                    • 各气体的 n：氮气、氢气<strong>不变</strong>
                    <br />
                    • 浓度 c = n/V：<strong>降低</strong>
                    <br />
                    <br />
                    体积变化公式：
                    <br />
                    V₂ = V₁ × (n₁ + n_He) / n₁
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ mt: 6, pt: 4, borderTop: 1, borderColor: '#e2e8f0' }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, color: '#1e3a5f', mb: 3 }}
              >
                计算示例
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  backgroundColor: '#f8fafc',
                  borderRadius: 2,
                  fontFamily: 'monospace',
                }}
              >
                <Typography variant="body2" sx={{ lineHeight: 2 }}>
                  初始状态：
                  <br />
                  • 氮气 n(N₂) = {initialNitrogen} mol
                  <br />
                  • 氢气 n(H₂) = {initialHydrogen} mol
                  <br />
                  • 总物质的量 n₁ = {initialTotalMoles} mol
                  <br />
                  • 体积 V₁ = {initialVolume} L
                  <br />
                  <br />
                  添加氦气后：
                  <br />
                  • 氦气 n(He) = {isAdded ? heliumAdded : heliumAdded} mol
                  <br />
                  • 总物质的量 n₂ = {finalTotalMoles} mol
                  <br />
                  • 体积 V₂ = {finalVolume.toFixed(2)} L （增大了）
                  <br />
                  <br />
                  浓度变化：
                  <br />
                  • 氮气浓度：{isAdded ? (initialNitrogen / initialVolume).toFixed(3) : '?'} → {isAdded ? (initialNitrogen / finalVolume).toFixed(3) : '?'} mol/L
                  <br />
                  • 氢气浓度：{isAdded ? (initialHydrogen / initialVolume).toFixed(3) : '?'} → {isAdded ? (initialHydrogen / finalVolume).toFixed(3) : '?'} mol/L
                </Typography>
              </Paper>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default ConstantPressurePage;
