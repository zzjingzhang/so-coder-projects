import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// 运动状态类型
type MotionState = 'static' | 'alongField' | 'cuttingField';

const App = () => {
  // 金属棒的运动状态
  const [motionState, setMotionState] = useState<MotionState>('static');
  // 电流表指针角度（-90 到 90 度）
  const [needleAngle, setNeedleAngle] = useState(0);
  // 金属棒的位置
  const [rodPosition, setRodPosition] = useState({ x: 200, y: 200 });

  // 根据运动状态更新金属棒位置和电流表指针
  useEffect(() => {
    let animationFrame: number;
    let startTime = 0;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = (time - startTime) / 1000;

      if (motionState === 'static') {
        // 静止状态
        setNeedleAngle(0);
        setRodPosition({ x: 200, y: 200 });
        return;
      } else if (motionState === 'alongField') {
        // 沿磁感线运动（上下运动）
        const yOffset = Math.sin(elapsed * 2) * 80;
        setRodPosition({ x: 200, y: 200 + yOffset });
        // 沿磁感线运动不产生电流
        setNeedleAngle(0);
      } else if (motionState === 'cuttingField') {
        // 切割磁感线运动（左右运动）
        const xOffset = Math.sin(elapsed * 2) * 80;
        setRodPosition({ x: 200 + xOffset, y: 200 });
        // 切割磁感线产生感应电流
        const currentAngle = Math.sin(elapsed * 4) * 60;
        setNeedleAngle(currentAngle);
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [motionState]);

  // 获取状态描述
  const getStatusDescription = () => {
    switch (motionState) {
      case 'static':
        return '金属棒静止，不切割磁感线，不产生感应电流';
      case 'alongField':
        return '金属棒沿磁感线方向运动，不切割磁感线，不产生感应电流';
      case 'cuttingField':
        return '金属棒切割磁感线运动，产生感应电流，电流表指针偏转';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* 标题区域 */}
        <div className="text-center py-4 mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            法拉第电磁感应定律演示
          </h1>
          <p className="text-lg text-gray-600">
            观察金属导体切割磁感线产生感应电流的现象
          </p>
        </div>

        {/* 主要演示区域 */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-center text-gray-800">实验演示区域</h2>
          </div>
          <div className="p-6">
            {/* SVG 演示区域 */}
            <div className="relative h-[500px] bg-gray-50 rounded-lg overflow-hidden">
              <svg width="100%" height="100%" viewBox="0 0 600 500">
                {/* 背景网格 */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* 磁场区域（N极和S极） */}
                <g id="magneticField">
                  {/* N极 */}
                  <rect x="20" y="50" width="60" height="400" fill="#ef4444" rx="8" />
                  <text x="50" y="260" textAnchor="middle" fill="white" fontWeight="bold" fontSize="24">N</text>
                  
                  {/* S极 */}
                  <rect x="520" y="50" width="60" height="400" fill="#3b82f6" rx="8" />
                  <text x="550" y="260" textAnchor="middle" fill="white" fontWeight="bold" fontSize="24">S</text>

                  {/* 磁感线（水平方向的线，从N到S） */}
                  {[100, 150, 200, 250, 300, 350, 400, 450].map((y, index) => (
                    <g key={index}>
                      {/* 磁感线 */}
                      <line 
                        x1="80" 
                        y1={y} 
                        x2="520" 
                        y2={y} 
                        stroke="#9ca3af" 
                        strokeWidth="2" 
                        strokeDasharray="10,5"
                      />
                      {/* 箭头 */}
                      <polygon 
                        points={`${300 - 8},${y - 4} ${300 + 8},${y} ${300 - 8},${y + 4}`}
                        fill="#9ca3af"
                      />
                    </g>
                  ))}
                </g>

                {/* 金属棒（可移动） */}
                <g 
                  id="metalRod" 
                  transform={`translate(${rodPosition.x}, ${rodPosition.y})`}
                  style={{ transition: motionState === 'static' ? 'all 0.3s ease' : 'none' }}
                >
                  {/* 金属棒本体 */}
                  <rect x="-10" y="-100" width="20" height="200" fill="#f59e0b" rx="4" stroke="#d97706" strokeWidth="2" />
                  
                  {/* 连接导线（示意） */}
                  <line x1="0" y1="-100" x2="0" y2="-120" stroke="#374151" strokeWidth="3" />
                  <line x1="0" y1="100" x2="0" y2="120" stroke="#374151" strokeWidth="3" />
                  
                  {/* 标签 */}
                  <text x="0" y="0" textAnchor="middle" fill="#78350f" fontWeight="bold" fontSize="14">
                    金属棒
                  </text>
                </g>

                {/* 电流表（右侧） */}
                <g id="ammeter" transform="translate(500, 450)">
                  {/* 电流表外壳 */}
                  <circle cx="0" cy="0" r="40" fill="white" stroke="#1f2937" strokeWidth="3" />
                  
                  {/* 刻度 */}
                  {[-60, -30, 0, 30, 60].map((angle, index) => {
                    const radian = (angle - 90) * (Math.PI / 180);
                    const x1 = Math.cos(radian) * 25;
                    const y1 = Math.sin(radian) * 25;
                    const x2 = Math.cos(radian) * 35;
                    const y2 = Math.sin(radian) * 35;
                    return (
                      <line 
                        key={index} 
                        x1={x1} 
                        y1={y1} 
                        x2={x2} 
                        y2={y2} 
                        stroke="#1f2937" 
                        strokeWidth="2" 
                      />
                    );
                  })}
                  
                  {/* 刻度标签 */}
                  {[-60, -30, 0, 30, 60].map((angle, index) => {
                    const radian = (angle - 90) * (Math.PI / 180);
                    const x = Math.cos(radian) * 45;
                    const y = Math.sin(radian) * 45;
                    const labels = ['-', '-', '0', '+', '+'];
                    return (
                      <text 
                        key={index} 
                        x={x} 
                        y={y} 
                        textAnchor="middle" 
                        dominantBaseline="middle"
                        fill="#1f2937" 
                        fontSize="12" 
                        fontWeight="bold"
                      >
                        {labels[index]}
                      </text>
                    );
                  })}
                  
                  {/* 指针（使用 motion 组件进行动画） */}
                  <motion.line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="-30"
                    stroke="#ef4444"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{
                      originX: 0,
                      originY: 0,
                      rotate: needleAngle,
                    }}
                  />
                  
                  {/* 中心点 */}
                  <circle cx="0" cy="0" r="5" fill="#1f2937" />
                  
                  {/* 标签 */}
                  <text x="0" y="60" textAnchor="middle" fill="#1f2937" fontWeight="bold" fontSize="12">
                    电流表
                  </text>
                </g>

                {/* 状态指示 */}
                <g id="statusIndicator" transform="translate(50, 450)">
                  <rect x="-70" y="-30" width="140" height="60" fill="white" stroke="#1f2937" strokeWidth="2" rx="8" />
                  <text x="0" y="-5" textAnchor="middle" fill="#1f2937" fontSize="12" fontWeight="bold">
                    感应电流
                  </text>
                  <text 
                    x="0" 
                    y="15" 
                    textAnchor="middle" 
                    fill={needleAngle !== 0 ? "#ef4444" : "#9ca3af"} 
                    fontSize="16" 
                    fontWeight="bold"
                  >
                    {needleAngle !== 0 ? "有" : "无"}
                  </text>
                </g>
              </svg>
            </div>

            {/* 控制按钮区域 */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">控制金属棒运动</h3>
              <div className="flex justify-center gap-4 flex-wrap">
                <button
                  className={`px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-200 ${
                    motionState === 'static'
                      ? 'bg-blue-500 text-white shadow-md hover:bg-blue-600'
                      : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400 hover:text-blue-500'
                  }`}
                  onClick={() => setMotionState('static')}
                >
                  静止
                </button>
                <button
                  className={`px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-200 ${
                    motionState === 'alongField'
                      ? 'bg-blue-500 text-white shadow-md hover:bg-blue-600'
                      : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400 hover:text-blue-500'
                  }`}
                  onClick={() => setMotionState('alongField')}
                >
                  沿磁感线运动
                </button>
                <button
                  className={`px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-200 ${
                    motionState === 'cuttingField'
                      ? 'bg-blue-500 text-white shadow-md hover:bg-blue-600'
                      : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400 hover:text-blue-500'
                  }`}
                  onClick={() => setMotionState('cuttingField')}
                >
                  切割磁感线运动
                </button>
              </div>
            </div>

            {/* 当前状态描述 */}
            <div className="mt-6">
              <div className="flex items-center mb-2">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-full">
                  当前状态
                </span>
              </div>
              <p className="text-lg p-4 bg-blue-50 rounded-lg border border-blue-200 text-gray-800">
                {getStatusDescription()}
              </p>
            </div>
          </div>
        </div>

        {/* 实验结论解释 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-green-600">实验结论</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-green-700">核心条件</h3>
                <p className="text-lg text-gray-800">
                  只有当闭合电路中的一部分导体<span className="text-blue-600 font-bold">切割磁感线运动</span>时，
                  才会在电路中产生<span className="text-blue-600 font-bold">感应电流</span>。
                </p>
              </div>

              <hr className="border-gray-300" />

              <div>
                <h3 className="text-xl font-semibold mb-2 text-green-700">三种情况对比</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-bold mb-1 text-gray-800">1. 静止状态</p>
                    <p className="text-gray-600">
                      金属棒静止，不切割磁感线，<span className="text-red-500 font-bold">不产生感应电流</span>。
                      电流表指针保持在零位。
                    </p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-bold mb-1 text-gray-800">2. 沿磁感线运动</p>
                    <p className="text-gray-600">
                      金属棒沿磁感线方向（上下）运动，虽然在运动，但<span className="text-red-500 font-bold">并没有切割磁感线</span>，
                      因此<span className="text-red-500 font-bold">不产生感应电流</span>。电流表指针仍保持在零位。
                    </p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="font-bold mb-1 text-gray-800">3. 切割磁感线运动（关键！）</p>
                    <p className="text-gray-700">
                      金属棒切割磁感线（左右）运动，<span className="text-green-600 font-bold">产生感应电流</span>！
                      电流表指针会<span className="text-green-600 font-bold">左右摆动</span>，
                      表明电路中有<span className="text-green-600 font-bold">电流流动</span>。
                    </p>
                  </div>
                </div>
              </div>

              <hr className="border-gray-300" />

              <div>
                <h3 className="text-xl font-semibold mb-2 text-green-700">法拉第电磁感应定律</h3>
                <p className="text-lg italic p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400 text-gray-800">
                  "感应电动势的大小，等于穿过这一电路的磁通量的变化率。"
                </p>
                <p className="mt-2 text-gray-600">
                  简单来说：当穿过闭合电路的<span className="font-bold">磁通量发生变化</span>时，
                  电路中就会产生<span className="font-bold">感应电流</span>。
                  切割磁感线运动正是改变磁通量的一种方式。
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-gray-50 flex justify-center">
            <p className="text-sm text-gray-500">
              提示：点击不同按钮观察金属棒运动和电流表指针的变化，对比理解感应电流产生的条件
            </p>
          </div>
        </div>

        {/* 页脚 */}
        <div className="text-center py-4 mt-8 text-gray-500">
          <p className="text-sm">法拉第电磁感应定律演示 | 高中物理教学辅助工具</p>
        </div>
      </div>
    </div>
  );
};

export default App;