import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Typography,
  Container,
  Grid,
  Box,
} from '@mui/material';
import SimulationCanvas from './SimulationCanvas';
import ControlPanel from './ControlPanel';
import DataPanel from './DataPanel';
import {
  Ball,
  createSimulationState,
  updateSimulation,
  calculateTotalMomentum,
  calculateTotalKineticEnergy,
} from '../utils/physics';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;

function Simulation() {
  const [simulationState, setSimulationState] = useState(() => 
    createSimulationState(CANVAS_WIDTH, CANVAS_HEIGHT)
  );
  
  const [initialTotalMomentum, setInitialTotalMomentum] = useState(0);
  const [initialTotalKineticEnergy, setInitialTotalKineticEnergy] = useState(0);
  
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const initialMomentum = calculateTotalMomentum(simulationState.balls);
    const initialEnergy = calculateTotalKineticEnergy(simulationState.balls);
    setInitialTotalMomentum(initialMomentum);
    setInitialTotalKineticEnergy(initialEnergy);
  }, []);

  const animate = useCallback((timestamp) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp;
    }
    
    const dt = (timestamp - lastTimeRef.current) / 1000;
    lastTimeRef.current = timestamp;

    setSimulationState(prevState => 
      updateSimulation(prevState, dt)
    );

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (simulationState.isRunning && !simulationState.isPaused) {
      lastTimeRef.current = 0;
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [simulationState.isRunning, simulationState.isPaused, animate]);

  const handleStart = () => {
    if (!simulationState.isRunning) {
      const initialMomentum = calculateTotalMomentum(simulationState.balls);
      const initialEnergy = calculateTotalKineticEnergy(simulationState.balls);
      setInitialTotalMomentum(initialMomentum);
      setInitialTotalKineticEnergy(initialEnergy);
    }

    setSimulationState(prev => ({
      ...prev,
      isRunning: true,
      isPaused: false,
    }));
  };

  const handlePause = () => {
    setSimulationState(prev => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  };

  const handleReset = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    lastTimeRef.current = 0;

    const newState = createSimulationState(CANVAS_WIDTH, CANVAS_HEIGHT);
    setSimulationState(newState);
    
    const initialMomentum = calculateTotalMomentum(newState.balls);
    const initialEnergy = calculateTotalKineticEnergy(newState.balls);
    setInitialTotalMomentum(initialMomentum);
    setInitialTotalKineticEnergy(initialEnergy);
  };

  const handleBallChange = (ballId, property, value) => {
    setSimulationState(prev => ({
      ...prev,
      balls: prev.balls.map(ball => {
        if (ball.id === ballId) {
          const newBall = new Ball(
            ball.id,
            ball.x,
            ball.y,
            property === 'vx' ? value : ball.vx,
            ball.vy,
            property === 'mass' ? value : ball.mass,
            ball.radius,
            ball.color
          );
          return newBall;
        }
        return ball;
      }),
    }));
  };

  const currentTotalMomentum = calculateTotalMomentum(simulationState.balls);
  const currentTotalKineticEnergy = calculateTotalKineticEnergy(simulationState.balls);

  return (
    <Box className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-8">
      <Container maxWidth="xl">
        <Box className="text-center mb-8">
          <Typography variant="h3" component="h1" className="font-bold text-slate-800 mb-2">
            动量守恒实验模拟器
          </Typography>
          <Typography variant="subtitle1" className="text-slate-600">
            探索弹性碰撞中的动量守恒与能量守恒定律
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            <Box className="flex flex-col items-center">
              <SimulationCanvas
                balls={simulationState.balls}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
              />
              <Box className="mt-4 text-center">
                <Typography variant="body2" className="text-slate-600">
                  {simulationState.isRunning 
                    ? (simulationState.isPaused ? '⏸ 模拟已暂停' : '▶ 模拟运行中...')
                    : '⏹ 模拟已停止 - 点击"开始模拟"开始实验'}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <ControlPanel
                  balls={simulationState.balls}
                  onBallChange={handleBallChange}
                  isRunning={simulationState.isRunning}
                  isPaused={simulationState.isPaused}
                  onStart={handleStart}
                  onPause={handlePause}
                  onReset={handleReset}
                />
              </Grid>
              <Grid item xs={12}>
                <DataPanel
                  time={simulationState.time}
                  balls={simulationState.balls}
                  totalMomentum={currentTotalMomentum}
                  totalKineticEnergy={currentTotalKineticEnergy}
                  initialTotalMomentum={initialTotalMomentum}
                  initialTotalKineticEnergy={initialTotalKineticEnergy}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Simulation;
