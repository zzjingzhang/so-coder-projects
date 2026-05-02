import { useEffect, useRef } from 'react';

function SimulationCanvas({ balls, width, height }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, width, height);
    
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, width, height);
    
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    const gridSize = 50;
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, width, height);
    
    balls.forEach(ball => {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius + 5, 0, Math.PI * 2);
      ctx.fillStyle = `${ball.color}33`;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      
      const gradient = ctx.createRadialGradient(
        ball.x - ball.radius * 0.3,
        ball.y - ball.radius * 0.3,
        0,
        ball.x,
        ball.y,
        ball.radius
      );
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(0.3, ball.color);
      gradient.addColorStop(1, `${ball.color}aa`);
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      ctx.strokeStyle = ball.color;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      const velocityScale = 0.5;
      if (ball.vx !== 0 || ball.vy !== 0) {
        const arrowLength = ball.velocity * velocityScale;
        const angle = Math.atan2(ball.vy, ball.vx);
        
        ctx.beginPath();
        ctx.moveTo(ball.x, ball.y);
        ctx.lineTo(
          ball.x + Math.cos(angle) * arrowLength,
          ball.y + Math.sin(angle) * arrowLength
        );
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        const arrowHeadSize = 10;
        const arrowAngle = Math.PI / 6;
        
        ctx.beginPath();
        ctx.moveTo(
          ball.x + Math.cos(angle) * arrowLength,
          ball.y + Math.sin(angle) * arrowLength
        );
        ctx.lineTo(
          ball.x + Math.cos(angle - arrowAngle) * (arrowLength - arrowHeadSize),
          ball.y + Math.sin(angle - arrowAngle) * (arrowLength - arrowHeadSize)
        );
        ctx.moveTo(
          ball.x + Math.cos(angle) * arrowLength,
          ball.y + Math.sin(angle) * arrowLength
        );
        ctx.lineTo(
          ball.x + Math.cos(angle + arrowAngle) * (arrowLength - arrowHeadSize),
          ball.y + Math.sin(angle + arrowAngle) * (arrowLength - arrowHeadSize)
        );
        ctx.stroke();
      }
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(ball.id.toString(), ball.x, ball.y);
    });
  }, [balls, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="rounded-lg shadow-2xl border-2 border-slate-700"
    />
  );
}

export default SimulationCanvas;
