import {
  Paper,
  Typography,
  Slider,
  Button,
  ButtonGroup,
  Box,
  Divider,
  Chip,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  Refresh,
  Speed,
  Scale,
} from '@mui/icons-material';

function ControlPanel({
  balls,
  onBallChange,
  isRunning,
  isPaused,
  onStart,
  onPause,
  onReset,
}) {
  const handleMassChange = (ballId, value) => {
    onBallChange(ballId, 'mass', value);
  };

  const handleVelocityChange = (ballId, value) => {
    onBallChange(ballId, 'vx', value);
  };

  return (
    <Paper elevation={3} className="p-6 bg-white rounded-xl">
      <Typography variant="h6" className="mb-4 font-bold text-slate-800">
        控制面板
      </Typography>
      
      <Box className="mb-6">
        <ButtonGroup fullWidth variant="contained">
          {!isRunning ? (
            <Button
              startIcon={<PlayArrow />}
              onClick={onStart}
              color="primary"
              className="font-medium"
            >
              开始模拟
            </Button>
          ) : (
            <Button
              startIcon={<Pause />}
              onClick={onPause}
              color={isPaused ? 'primary' : 'warning'}
              className="font-medium"
            >
              {isPaused ? '继续' : '暂停'}
            </Button>
          )}
          <Button
            startIcon={<Refresh />}
            onClick={onReset}
            color="error"
            className="font-medium"
          >
            重置
          </Button>
        </ButtonGroup>
      </Box>

      <Divider className="mb-6" />

      {balls.map((ball, index) => (
        <Box key={ball.id} className="mb-6 last:mb-0">
          <Box className="flex items-center gap-2 mb-4">
            <Chip
              label={`小球 ${ball.id}`}
              style={{ backgroundColor: ball.color, color: 'white' }}
              className="font-bold"
            />
            <Typography variant="body2" className="text-slate-500">
              当前质量: {ball.mass.toFixed(1)} kg
            </Typography>
          </Box>

          <Box className="mb-4">
            <Box className="flex items-center gap-2 mb-2">
              <Scale fontSize="small" className="text-slate-600" />
              <Typography variant="body2" className="text-slate-700 font-medium">
                质量
              </Typography>
            </Box>
            <Slider
              value={ball.mass}
              onChange={(e, value) => handleMassChange(ball.id, value)}
              min={0.5}
              max={5}
              step={0.1}
              marks={[
                { value: 0.5, label: '0.5' },
                { value: 2.5, label: '2.5' },
                { value: 5, label: '5' },
              ]}
              valueLabelDisplay="auto"
              disabled={isRunning && !isPaused}
              sx={{
                color: ball.color,
                '& .MuiSlider-thumb': {
                  backgroundColor: ball.color,
                },
                '& .MuiSlider-track': {
                  backgroundColor: ball.color,
                },
              }}
            />
          </Box>

          <Box>
            <Box className="flex items-center gap-2 mb-2">
              <Speed fontSize="small" className="text-slate-600" />
              <Typography variant="body2" className="text-slate-700 font-medium">
                初速度 (X轴)
              </Typography>
            </Box>
            <Slider
              value={ball.vx}
              onChange={(e, value) => handleVelocityChange(ball.id, value)}
              min={-200}
              max={200}
              step={10}
              marks={[
                { value: -200, label: '-200' },
                { value: 0, label: '0' },
                { value: 200, label: '200' },
              ]}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value} px/s`}
              disabled={isRunning && !isPaused}
              sx={{
                color: ball.color,
                '& .MuiSlider-thumb': {
                  backgroundColor: ball.color,
                },
                '& .MuiSlider-track': {
                  backgroundColor: ball.color,
                },
              }}
            />
          </Box>

          {index < balls.length - 1 && <Divider className="mt-6" />}
        </Box>
      ))}
    </Paper>
  );
}

export default ControlPanel;
