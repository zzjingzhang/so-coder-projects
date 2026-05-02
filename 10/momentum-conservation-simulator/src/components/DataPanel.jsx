import {
  Paper,
  Typography,
  Box,
  Divider,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  AccessTime,
  TrendingUp,
  FlashOn,
  RadioButtonChecked,
} from '@mui/icons-material';

function DataPanel({
  time,
  balls,
  totalMomentum,
  totalKineticEnergy,
  initialTotalMomentum,
  initialTotalKineticEnergy,
}) {
  const momentumChange = initialTotalMomentum > 0 
    ? ((totalMomentum - initialTotalMomentum) / initialTotalMomentum * 100)
    : 0;
  const energyChange = initialTotalKineticEnergy > 0
    ? ((totalKineticEnergy - initialTotalKineticEnergy) / initialTotalKineticEnergy * 100)
    : 0;

  const momentumIsConserved = Math.abs(momentumChange) < 0.1;
  const energyIsConserved = Math.abs(energyChange) < 0.1;

  return (
    <Paper elevation={3} className="p-6 bg-white rounded-xl">
      <Typography variant="h6" className="mb-4 font-bold text-slate-800">
        物理参数监控
      </Typography>

      <Box className="mb-6 p-4 bg-slate-50 rounded-lg">
        <Box className="flex items-center gap-2 mb-2">
          <AccessTime className="text-blue-500" />
          <Typography variant="subtitle1" className="font-medium text-slate-700">
            模拟时间
          </Typography>
        </Box>
        <Typography variant="h3" className="font-mono font-bold text-blue-600">
          {time.toFixed(2)} s
        </Typography>
      </Box>

      <Divider className="mb-6" />

      <Box className="mb-6">
        <Box className="flex items-center justify-between mb-3">
          <Box className="flex items-center gap-2">
            <TrendingUp className="text-green-500" />
            <Typography variant="subtitle1" className="font-medium text-slate-700">
              总动量
            </Typography>
          </Box>
          <Chip
            label={momentumIsConserved ? '守恒 ✓' : '变化'}
            color={momentumIsConserved ? 'success' : 'warning'}
            size="small"
          />
        </Box>
        <Box className="space-y-2">
          <Typography variant="h4" className="font-mono font-bold text-green-600">
            {totalMomentum.toFixed(2)} kg·m/s
          </Typography>
          <Typography variant="body2" className="text-slate-500">
            初始值: {initialTotalMomentum.toFixed(2)} kg·m/s
          </Typography>
          <Typography 
            variant="body2" 
            className={`font-medium ${momentumIsConserved ? 'text-green-600' : 'text-yellow-600'}`}
          >
            变化: {momentumChange >= 0 ? '+' : ''}{momentumChange.toFixed(4)}%
          </Typography>
        </Box>
      </Box>

      <Divider className="mb-6" />

      <Box className="mb-6">
        <Box className="flex items-center justify-between mb-3">
          <Box className="flex items-center gap-2">
            <FlashOn className="text-amber-500" />
            <Typography variant="subtitle1" className="font-medium text-slate-700">
              总动能
            </Typography>
          </Box>
          <Chip
            label={energyIsConserved ? '守恒 ✓' : '变化'}
            color={energyIsConserved ? 'success' : 'warning'}
            size="small"
          />
        </Box>
        <Box className="space-y-2">
          <Typography variant="h4" className="font-mono font-bold text-amber-600">
            {totalKineticEnergy.toFixed(2)} J
          </Typography>
          <Typography variant="body2" className="text-slate-500">
            初始值: {initialTotalKineticEnergy.toFixed(2)} J
          </Typography>
          <Typography 
            variant="body2" 
            className={`font-medium ${energyIsConserved ? 'text-green-600' : 'text-yellow-600'}`}
          >
            变化: {energyChange >= 0 ? '+' : ''}{energyChange.toFixed(4)}%
          </Typography>
        </Box>
      </Box>

      <Divider className="mb-6" />

      <Typography variant="subtitle1" className="mb-3 font-medium text-slate-700">
        各小球详细参数
      </Typography>
      <TableContainer component={Paper} elevation={0} className="border border-slate-200">
        <Table size="small">
          <TableHead className="bg-slate-100">
            <TableRow>
              <TableCell className="font-bold text-slate-700">小球</TableCell>
              <TableCell align="right" className="font-bold text-slate-700">质量</TableCell>
              <TableCell align="right" className="font-bold text-slate-700">速度</TableCell>
              <TableCell align="right" className="font-bold text-slate-700">动量</TableCell>
              <TableCell align="right" className="font-bold text-slate-700">动能</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {balls.map((ball) => (
              <TableRow key={ball.id} hover>
                <TableCell>
                  <Box className="flex items-center gap-2">
                    <RadioButtonChecked sx={{ color: ball.color }} />
                    <Typography variant="body2" className="font-medium">
                      小球 {ball.id}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right" className="font-mono">
                  {ball.mass.toFixed(1)} kg
                </TableCell>
                <TableCell align="right" className="font-mono">
                  {ball.velocity.toFixed(1)} m/s
                </TableCell>
                <TableCell align="right" className="font-mono">
                  {ball.momentum.toFixed(2)}
                </TableCell>
                <TableCell align="right" className="font-mono">
                  {ball.kineticEnergy.toFixed(2)} J
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <Typography variant="body2" className="text-blue-800">
          <strong>提示:</strong> 在弹性碰撞中，动量和动能都应该守恒。观察碰撞前后的数值变化来验证物理定律。
        </Typography>
      </Box>
    </Paper>
  );
}

export default DataPanel;
