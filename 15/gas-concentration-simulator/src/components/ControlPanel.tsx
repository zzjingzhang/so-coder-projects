import React from 'react';
import {
  Paper,
  Typography,
  Slider,
  Button,
  Box,
  Stack,
  FormControlLabel,
  Switch,
  Divider,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';
import PauseIcon from '@mui/icons-material/Pause';

interface ControlPanelProps {
  initialNitrogen: number;
  setInitialNitrogen: (value: number) => void;
  initialHydrogen: number;
  setInitialHydrogen: (value: number) => void;
  heliumAdded: number;
  setHeliumAdded: (value: number) => void;
  isAnimating: boolean;
  setIsAnimating: (value: boolean) => void;
  onAddHelium: () => void;
  onReset: () => void;
  isAdded: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  initialNitrogen,
  setInitialNitrogen,
  initialHydrogen,
  setInitialHydrogen,
  heliumAdded,
  setHeliumAdded,
  isAnimating,
  setIsAnimating,
  onAddHelium,
  onReset,
  isAdded,
}) => {
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#1e3a5f' }}>
        控制面板
      </Typography>

      <Stack spacing={3}>
        <Box>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 500, color: '#475569' }}>
            初始氮气量: {initialNitrogen.toFixed(1)} mol
          </Typography>
          <Slider
            value={initialNitrogen}
            onChange={(_, value) => setInitialNitrogen(value as number)}
            min={1}
            max={10}
            step={0.5}
            marks={[
              { value: 1, label: '1' },
              { value: 5, label: '5' },
              { value: 10, label: '10' },
            ]}
            disabled={isAdded}
            sx={{
              color: '#3b82f6',
              '& .MuiSlider-thumb': {
                backgroundColor: '#3b82f6',
                '&:hover, &.Mui-active': {
                  boxShadow: '0 0 0 8px rgba(59, 130, 246, 0.16)',
                },
              },
              '& .MuiSlider-rail': {
                backgroundColor: '#bfdbfe',
              },
            }}
          />
        </Box>

        <Box>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 500, color: '#475569' }}>
            初始氢气量: {initialHydrogen.toFixed(1)} mol
          </Typography>
          <Slider
            value={initialHydrogen}
            onChange={(_, value) => setInitialHydrogen(value as number)}
            min={1}
            max={10}
            step={0.5}
            marks={[
              { value: 1, label: '1' },
              { value: 5, label: '5' },
              { value: 10, label: '10' },
            ]}
            disabled={isAdded}
            sx={{
              color: '#10b981',
              '& .MuiSlider-thumb': {
                backgroundColor: '#10b981',
                '&:hover, &.Mui-active': {
                  boxShadow: '0 0 0 8px rgba(16, 185, 129, 0.16)',
                },
              },
              '& .MuiSlider-rail': {
                backgroundColor: '#a7f3d0',
              },
            }}
          />
        </Box>

        <Divider />

        <Box>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 500, color: '#475569' }}>
            添加氦气量: {heliumAdded.toFixed(1)} mol
          </Typography>
          <Slider
            value={heliumAdded}
            onChange={(_, value) => setHeliumAdded(value as number)}
            min={0}
            max={8}
            step={0.5}
            marks={[
              { value: 0, label: '0' },
              { value: 4, label: '4' },
              { value: 8, label: '8' },
            ]}
            disabled={isAdded}
            sx={{
              color: '#f59e0b',
              '& .MuiSlider-thumb': {
                backgroundColor: '#f59e0b',
                '&:hover, &.Mui-active': {
                  boxShadow: '0 0 0 8px rgba(245, 158, 11, 0.16)',
                },
              },
              '& .MuiSlider-rail': {
                backgroundColor: '#fde68a',
              },
            }}
          />
        </Box>

        <FormControlLabel
          control={
            <Switch
              checked={isAnimating}
              onChange={(e) => setIsAnimating(e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#1e3a5f',
                  '&:hover': {
                    backgroundColor: 'rgba(30, 58, 95, 0.08)',
                  },
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#1e3a5f',
                },
              }}
            />
          }
          label={
            <Typography sx={{ fontWeight: 500, color: '#475569' }}>
              {isAnimating ? <><PauseIcon sx={{ fontSize: 18, verticalAlign: 'middle', mr: 0.5 }} />暂停动画</> : <><PlayArrowIcon sx={{ fontSize: 18, verticalAlign: 'middle', mr: 0.5 }} />播放动画</>}
            </Typography>
          }
        />

        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
          <Button
            variant="contained"
            onClick={onAddHelium}
            disabled={isAdded || heliumAdded <= 0}
            startIcon={<PlayArrowIcon />}
            sx={{
              flex: 1,
              backgroundColor: '#1e3a5f',
              fontWeight: 600,
              py: 1.5,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#2d4a6f',
              },
              '&:disabled': {
                backgroundColor: '#94a3b8',
              },
            }}
          >
            添加氦气
          </Button>
          <Button
            variant="outlined"
            onClick={onReset}
            startIcon={<ReplayIcon />}
            sx={{
              flex: 1,
              borderColor: '#1e3a5f',
              color: '#1e3a5f',
              fontWeight: 600,
              py: 1.5,
              textTransform: 'none',
              '&:hover': {
                borderColor: '#2d4a6f',
                backgroundColor: 'rgba(30, 58, 95, 0.04)',
              },
            }}
          >
            重置
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default ControlPanel;
