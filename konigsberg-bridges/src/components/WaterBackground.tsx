import { useEffect, useRef } from 'react';
import './WaterBackground.css';

const WaterBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const waves: {
      amplitude: number;
      frequency: number;
      phase: number;
      speed: number;
      offset: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initWaves = () => {
      for (let i = 0; i < 8; i++) {
        waves.push({
          amplitude: 30 + Math.random() * 40,
          frequency: 0.01 + Math.random() * 0.02,
          phase: Math.random() * Math.PI * 2,
          speed: 0.005 + Math.random() * 0.01,
          offset: (i * canvas.height) / 8,
        });
      }
    };

    const drawWave = (wave: (typeof waves)[0], time: number, alpha: number) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let x = 0; x <= canvas.width; x += 2) {
        const y =
          wave.offset +
          Math.sin(x * wave.frequency + time * wave.speed + wave.phase) *
            wave.amplitude;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, wave.offset, 0, canvas.height);
      gradient.addColorStop(0, `rgba(100, 180, 255, ${alpha})`);
      gradient.addColorStop(1, `rgba(50, 120, 200, ${alpha * 0.8})`);
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const drawRipples = (time: number) => {
      for (let i = 0; i < 5; i++) {
        const radius = ((time * 0.02 + i * 100) % 300);
        const alpha = 1 - radius / 300;
        if (alpha > 0) {
          ctx.beginPath();
          ctx.arc(
            canvas.width * (0.2 + i * 0.15),
            canvas.height * 0.5,
            radius,
            0,
            Math.PI * 2
          );
          ctx.strokeStyle = `rgba(150, 200, 255, ${alpha * 0.15})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, '#1a365d');
      bgGradient.addColorStop(0.5, '#2b6cb0');
      bgGradient.addColorStop(1, '#2c5282');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      waves.forEach((wave, index) => {
        const alpha = 0.1 + (index * 0.1) / waves.length;
        drawWave(wave, time, alpha);
      });

      drawRipples(time);

      animationId = requestAnimationFrame(animate);
    };

    resize();
    initWaves();
    animate(0);

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="water-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
};

export default WaterBackground;
