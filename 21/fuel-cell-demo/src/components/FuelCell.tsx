import React, { useState, useEffect, useRef, useCallback } from 'react';

interface Particle {
  id: number;
  type: 'H2' | 'H+' | 'electron' | 'O2' | 'H2O';
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  opacity: number;
  stage: number;
}

const FuelCell: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [current, setCurrent] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [reactionInfo, setReactionInfo] = useState<string>('点击"开始"按钮观察燃料电池工作原理');
  const animationRef = useRef<number | null>(null);
  const particleIdRef = useRef(0);

  const getParticleId = () => {
    particleIdRef.current += 1;
    return particleIdRef.current;
  };

  const createParticle = useCallback((type: Particle['type'], x: number, y: number, targetX: number, targetY: number): Particle => {
    return {
      id: getParticleId(),
      type,
      x,
      y,
      targetX,
      targetY,
      opacity: 1,
      stage: 0,
    };
  }, []);

  const animateParticles = useCallback(() => {
    setParticles(prevParticles => {
      const newParticles = prevParticles.map(particle => {
        const speed = particle.type === 'electron' ? 3 : 1.5;
        const dx = particle.targetX - particle.x;
        const dy = particle.targetY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < speed) {
          return {
            ...particle,
            x: particle.targetX,
            y: particle.targetY,
            stage: particle.stage + 1,
          };
        }

        return {
          ...particle,
          x: particle.x + (dx / distance) * speed,
          y: particle.y + (dy / distance) * speed,
        };
      });

      const activeParticles: Particle[] = [];
      newParticles.forEach(particle => {
        if (particle.stage === 0) {
          activeParticles.push(particle);
        } else if (particle.type === 'H2' && particle.stage === 1) {
          const h1 = createParticle('H+', 180, 200 + Math.random() * 40, 320, 200 + Math.random() * 40);
          const h2 = createParticle('H+', 180, 220 + Math.random() * 40, 320, 220 + Math.random() * 40);
          const e1 = createParticle('electron', 160, 50, 640, 50);
          const e2 = createParticle('electron', 160, 50, 640, 50);
          activeParticles.push(h1, h2, e1, e2);
        } else if (particle.type === 'H+' && particle.stage === 1) {
          activeParticles.push({
            ...particle,
            targetX: 420,
            targetY: 200 + Math.random() * 40,
            stage: 0,
          });
        } else if (particle.type === 'electron' && particle.stage === 1) {
          const h2o = createParticle('H2O', 550, 200, 650, 350);
          activeParticles.push(h2o);
        } else if (particle.type === 'O2' && particle.stage === 1) {
          activeParticles.push({
            ...particle,
            targetX: 500,
            targetY: 200,
            stage: 0,
          });
        } else if (particle.type === 'H2O' && particle.stage === 1) {
          // 水分子消失
        } else {
          activeParticles.push(particle);
        }
      });

      return activeParticles.slice(-50);
    });
  }, [createParticle]);

  useEffect(() => {
    if (!isRunning) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        const h2 = createParticle('H2', 50, 200 + Math.random() * 40, 180, 200 + Math.random() * 40);
        setParticles(prev => [...prev, h2]);
      }
      if (Math.random() > 0.5) {
        const o2 = createParticle('O2', 750, 200 + Math.random() * 40, 620, 200 + Math.random() * 40);
        setParticles(prev => [...prev, o2]);
      }
    }, 1000);

    const animate = () => {
      animateParticles();
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);

    const currentInterval = setInterval(() => {
      setCurrent(prev => {
        const target = 1.5 + Math.random() * 0.5;
        return prev + (target - prev) * 0.1;
      });
    }, 200);

    return () => {
      clearInterval(interval);
      clearInterval(currentInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, createParticle, animateParticles]);

  const handleStart = () => {
    setIsRunning(true);
    setReactionInfo('燃料电池开始工作！观察氢气分解、电子流动和水生成的过程。');
  };

  const handlePause = () => {
    setIsRunning(false);
    setReactionInfo('已暂停。点击"继续"按钮继续观察。');
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrent(0);
    setParticles([]);
    setReactionInfo('已重置。点击"开始"按钮重新观察燃料电池工作原理。');
  };

  const renderParticle = (particle: Particle) => {
    let color = '#fff';
    let size = 12;
    let label = '';

    switch (particle.type) {
      case 'H2':
        color = '#3b82f6';
        size = 20;
        label = 'H₂';
        break;
      case 'H+':
        color = '#60a5fa';
        size = 12;
        label = 'H⁺';
        break;
      case 'electron':
        color = '#f59e0b';
        size = 8;
        label = 'e⁻';
        break;
      case 'O2':
        color = '#ef4444';
        size = 20;
        label = 'O₂';
        break;
      case 'H2O':
        color = '#06b6d4';
        size = 18;
        label = 'H₂O';
        break;
    }

    return (
      <g key={particle.id}>
        <circle
          cx={particle.x}
          cy={particle.y}
          r={size}
          fill={color}
          opacity={0.9}
        />
        <text
          x={particle.x}
          y={particle.y + 4}
          textAnchor="middle"
          fontSize={10}
          fill="white"
          fontWeight="bold"
        >
          {label}
        </text>
      </g>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <svg viewBox="0 0 800 450" className="w-full h-auto">
          <defs>
            <linearGradient id="anodeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="cathodeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#dc2626" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="electrolyteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#fde68a" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="800" height="450" fill="#f8fafc" rx="8" />

          <text x="400" y="30" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e293b">
            酸性氢氧燃料电池工作原理
          </text>

          <rect x="150" y="120" width="40" height="220" fill="url(#anodeGrad)" rx="4" />
          <text x="170" y="360" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e40af">
            负极
          </text>
          <text x="170" y="380" textAnchor="middle" fontSize="11" fill="#64748b">
            (阳极)
          </text>

          <rect x="610" y="120" width="40" height="220" fill="url(#cathodeGrad)" rx="4" />
          <text x="630" y="360" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#991b1b">
            正极
          </text>
          <text x="630" y="380" textAnchor="middle" fontSize="11" fill="#64748b">
            (阴极)
          </text>

          <rect x="190" y="120" width="420" height="220" fill="url(#electrolyteGrad)" />
          <text x="400" y="390" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#92400e">
            电解质区域
          </text>
          <text x="400" y="410" textAnchor="middle" fontSize="11" fill="#64748b">
            (H⁺可通过)
          </text>

          <line x1="170" y1="120" x2="170" y2="50" stroke="#374151" strokeWidth="3" />
          <line x1="630" y1="120" x2="630" y2="50" stroke="#374151" strokeWidth="3" />
          <line x1="170" y1="50" x2="630" y2="50" stroke="#374151" strokeWidth="3" />

          <rect x="380" y="30" width="40" height="30" fill="#e5e7eb" stroke="#374151" strokeWidth="2" rx="4" />
          <text x="400" y="50" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#374151">
            A
          </text>
          <text x="400" y="22" textAnchor="middle" fontSize="11" fill="#6b7280">
            电流表
          </text>

          <text x="400" y="75" textAnchor="middle" fontSize="12" fill="#059669" fontWeight="bold">
            电流: {current.toFixed(2)} A
          </text>

          <text x="50" y="240" textAnchor="middle" fontSize="13" fill="#2563eb" fontWeight="bold">
            H₂
          </text>
          <text x="50" y="258" textAnchor="middle" fontSize="10" fill="#64748b">
            氢气
          </text>
          <line x1="70" y1="240" x2="145" y2="240" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrowBlue)" />
          <polygon points="145,235 155,240 145,245" fill="#2563eb" />

          <text x="750" y="240" textAnchor="middle" fontSize="13" fill="#dc2626" fontWeight="bold">
            O₂
          </text>
          <text x="750" y="258" textAnchor="middle" fontSize="10" fill="#64748b">
            氧气
          </text>
          <line x1="730" y1="240" x2="655" y2="240" stroke="#dc2626" strokeWidth="2" />
          <polygon points="655,235 645,240 655,245" fill="#dc2626" />

          <text x="680" y="420" textAnchor="middle" fontSize="13" fill="#06b6d4" fontWeight="bold">
            H₂O
          </text>
          <text x="680" y="438" textAnchor="middle" fontSize="10" fill="#64748b">
            水
          </text>
          <line x1="640" y1="340" x2="670" y2="415" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5,3" />
          <polygon points="670,415 675,405 665,408" fill="#06b6d4" />

          <rect x="30" y="90" width="90" height="55" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" rx="4" />
          <text x="75" y="110" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e40af">
            负极反应
          </text>
          <text x="75" y="130" textAnchor="middle" fontSize="9" fill="#1e3a8a">
            2H₂ - 4e⁻ → 4H⁺
          </text>

          <rect x="680" y="90" width="90" height="55" fill="#fee2e2" stroke="#ef4444" strokeWidth="1" rx="4" />
          <text x="725" y="110" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#991b1b">
            正极反应
          </text>
          <text x="725" y="130" textAnchor="middle" fontSize="9" fill="#7f1d1d">
            O₂ + 4H⁺ + 4e⁻ → 2H₂O
          </text>

          <rect x="280" y="360" width="240" height="30" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1" rx="4" />
          <text x="400" y="380" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">
            总反应: 2H₂ + O₂ → 2H₂O + 电能
          </text>

          {particles.map(renderParticle)}

          {isRunning && (
            <>
              <circle cx="200" cy="80" r="3" fill="#f59e0b" opacity="0.8">
                <animate attributeName="cx" from="170" to="630" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle cx="250" cy="80" r="3" fill="#f59e0b" opacity="0.8">
                <animate attributeName="cx" from="170" to="630" dur="1s" begin="0.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="300" cy="80" r="3" fill="#f59e0b" opacity="0.8">
                <animate attributeName="cx" from="170" to="630" dur="1s" begin="0.4s" repeatCount="indefinite" />
              </circle>
              <circle cx="350" cy="80" r="3" fill="#f59e0b" opacity="0.8">
                <animate attributeName="cx" from="170" to="630" dur="1s" begin="0.6s" repeatCount="indefinite" />
              </circle>
            </>
          )}
        </svg>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800 text-center">{reactionInfo}</p>
      </div>

      <div className="flex justify-center gap-4">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 flex items-center justify-center"
          >
            开始
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 flex items-center justify-center"
          >
            暂停
          </button>
        )}
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 flex items-center justify-center"
        >
          重置
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-base font-semibold text-gray-800 mb-2">图例说明</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">H₂</div>
              <span className="text-gray-700">氢气分子</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center text-white text-xs font-bold">H⁺</div>
              <span className="text-gray-700">氢离子</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold">e⁻</div>
              <span className="text-gray-700">电子</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">O₂</div>
              <span className="text-gray-700">氧气分子</span>
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">H₂O</div>
              <span className="text-gray-700">水分子（生成物）</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-base font-semibold text-gray-800 mb-2">知识点</h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p><strong>负极（阳极）：</strong>氢气失去电子，被氧化生成氢离子</p>
            <p><strong>正极（阴极）：</strong>氧气得到电子，被还原与氢离子结合生成水</p>
            <p><strong>电子流动：</strong>从负极通过外电路流向正极，形成电流</p>
            <p><strong>离子迁移：</strong>H⁺通过电解质从负极移向正极</p>
            <p><strong>能量转换：</strong>化学能直接转换为电能，效率高</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuelCell;
