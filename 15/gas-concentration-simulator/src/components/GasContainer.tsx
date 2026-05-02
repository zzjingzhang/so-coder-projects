import React, { useMemo, useId } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import type { GasState } from '../types';
import { GAS_COLORS, GAS_NAMES } from '../types';

interface GasContainerProps {
  gases: GasState;
  totalVolume: number;
  isAnimating: boolean;
  title: string;
}

interface GasParticle {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  delay: number;
  color: string;
  radius: number;
}

const GasContainer: React.FC<GasContainerProps> = ({
  gases,
  totalVolume,
  isAnimating,
  title,
}) => {
  const containerWidth = 400;
  const containerHeight = 300;
  const wallThickness = 8;
  const uniqueId = useId();

  const particles = useMemo(() => {
    const result: GasParticle[] = [];
    let particleId = 0;

    const totalMoles = gases.nitrogen + gases.hydrogen + gases.helium;
    const maxParticles = 40;

    const addParticles = (gas: keyof GasState, baseRadius: number) => {
      const moleRatio = totalMoles > 0 ? gases[gas] / totalMoles : 0;
      const count = Math.max(2, Math.round(moleRatio * maxParticles));
      for (let i = 0; i < count; i++) {
        const startX = Math.random() * (containerWidth - 40) + 20;
        const startY = Math.random() * (containerHeight - 40) + 20;
        const endX = Math.random() * (containerWidth - 40) + 20;
        const endY = Math.random() * (containerHeight - 40) + 20;
        result.push({
          id: particleId++,
          startX,
          startY,
          endX,
          endY,
          duration: 3 + Math.random() * 4,
          delay: Math.random() * 5,
          color: GAS_COLORS[gas],
          radius: baseRadius,
        });
      }
    };

    addParticles('nitrogen', 8);
    addParticles('hydrogen', 5);
    addParticles('helium', 6);

    return result;
  }, [gases]);

  const totalMoles = gases.nitrogen + gases.hydrogen + gases.helium;

  const animationKeyframes = useMemo(() => {
    return particles.map((p, idx) => {
      const animationName = `gasMove_${uniqueId.replace(/:/g, '_')}_${idx}`;
      return `
        @keyframes ${animationName} {
          0% { transform: translate(${p.startX - p.radius}px, ${p.startY - p.radius}px); }
          25% { transform: translate(${Math.random() * (containerWidth - 40) + 20 - p.radius}px, ${Math.random() * (containerHeight - 40) + 20 - p.radius}px); }
          50% { transform: translate(${Math.random() * (containerWidth - 40) + 20 - p.radius}px, ${Math.random() * (containerHeight - 40) + 20 - p.radius}px); }
          75% { transform: translate(${Math.random() * (containerWidth - 40) + 20 - p.radius}px, ${Math.random() * (containerHeight - 40) + 20 - p.radius}px); }
          100% { transform: translate(${p.startX - p.radius}px, ${p.startY - p.radius}px); }
        }
        .particle_${uniqueId.replace(/:/g, '_')}_${idx} {
          animation: ${animationName} ${p.duration}s ease-in-out infinite;
          animation-delay: ${p.delay}s;
        }
      `;
    }).join('\n');
  }, [particles, uniqueId]);

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <style>{animationKeyframes}</style>
      
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1e3a5f' }}>
        {title}
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        {(['nitrogen', 'hydrogen', 'helium'] as const).map((gas) => (
          <Box
            key={gas}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 1,
              borderRadius: 1,
              backgroundColor: `${GAS_COLORS[gas]}15`,
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: GAS_COLORS[gas],
              }}
            />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {GAS_NAMES[gas]}: {gases[gas].toFixed(1)} mol
            </Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          position: 'relative',
          width: containerWidth,
          height: containerHeight,
          margin: '0 auto',
          backgroundColor: '#f8fafc',
          border: `${wallThickness}px solid #475569`,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        {particles.map((particle, idx) => (
          <Box
            key={particle.id}
            className={`particle_${uniqueId.replace(/:/g, '_')}_${idx}`}
            sx={{
              position: 'absolute',
              width: particle.radius * 2,
              height: particle.radius * 2,
              borderRadius: '50%',
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.radius}px ${particle.color}80`,
              left: 0,
              top: 0,
              transform: `translate(${particle.startX - particle.radius}px, ${particle.startY - particle.radius}px)`,
              animationPlayState: isAnimating ? 'running' : 'paused',
            }}
          />
        ))}

        <Box
          sx={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            backgroundColor: 'rgba(255,255,255,0.9)',
            px: 2,
            py: 1,
            borderRadius: 1,
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 500 }}>
            容积: {totalVolume.toFixed(1)} L
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
        {(['nitrogen', 'hydrogen', 'helium'] as const).map((gas) => {
          const concentration = totalMoles > 0 ? gases[gas] / totalVolume : 0;
          return (
            <Box key={gas} sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                {GAS_NAMES[gas]}浓度
              </Typography>
              <Typography variant="h6" sx={{ color: GAS_COLORS[gas], fontWeight: 700 }}>
                {concentration.toFixed(3)} mol/L
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};

export default GasContainer;
