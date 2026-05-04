import { useState, useRef, useEffect } from 'react';
import { Slider } from 'primereact/slider';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import './App.css';

function App() {
  const [k, setK] = useState<number>(1);
  const [b, setB] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 绘制坐标系和函数图像
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 30; // 每个单位的像素数

    // 清除画布
    ctx.clearRect(0, 0, width, height);

    // 绘制背景网格
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 0.5;
    
    for (let x = centerX % scale; x < width; x += scale) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    for (let y = centerY % scale; y < height; y += scale) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 绘制坐标轴
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;

    // X 轴
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    // Y 轴
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // 绘制坐标轴箭头
    ctx.fillStyle = '#374151';
    
    // X 轴箭头
    ctx.beginPath();
    ctx.moveTo(width - 10, centerY - 5);
    ctx.lineTo(width, centerY);
    ctx.lineTo(width - 10, centerY + 5);
    ctx.fill();

    // Y 轴箭头
    ctx.beginPath();
    ctx.moveTo(centerX - 5, 10);
    ctx.lineTo(centerX, 0);
    ctx.lineTo(centerX + 5, 10);
    ctx.fill();

    // 绘制刻度和标签
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    // X 轴刻度
    for (let i = -10; i <= 10; i++) {
      if (i === 0) continue;
      const x = centerX + i * scale;
      if (x > 0 && x < width) {
        ctx.beginPath();
        ctx.moveTo(x, centerY - 5);
        ctx.lineTo(x, centerY + 5);
        ctx.strokeStyle = '#6b7280';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillText(i.toString(), x, centerY + 8);
      }
    }

    // Y 轴刻度
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let i = -10; i <= 10; i++) {
      if (i === 0) continue;
      const y = centerY - i * scale;
      if (y > 0 && y < height) {
        ctx.beginPath();
        ctx.moveTo(centerX - 5, y);
        ctx.lineTo(centerX + 5, y);
        ctx.strokeStyle = '#6b7280';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillText(i.toString(), centerX - 10, y);
      }
    }

    // 原点标签
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText('O', centerX - 10, centerY + 8);

    // 绘制函数图像 y = kx + b
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();

    // 计算直线的起点和终点
    // x 范围: -10 到 10
    const xMin = -10;
    const xMax = 10;
    const yMin = k * xMin + b;
    const yMax = k * xMax + b;

    const startX = centerX + xMin * scale;
    const startY = centerY - yMin * scale;
    const endX = centerX + xMax * scale;
    const endY = centerY - yMax * scale;

    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // 绘制特殊点
    ctx.fillStyle = '#ef4444';
    
    // 与 Y 轴交点 (0, b)
    const yInterceptY = centerY - b * scale;
    if (yInterceptY > 0 && yInterceptY < height) {
      ctx.beginPath();
      ctx.arc(centerX, yInterceptY, 6, 0, Math.PI * 2);
      ctx.fill();
      
      // 标注
      ctx.fillStyle = '#374151';
      ctx.font = 'bold 14px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`(0, ${b.toFixed(1)})`, centerX + 12, yInterceptY - 12);
    }

    // 与 X 轴交点 (-b/k, 0)，当 k != 0 时
    if (Math.abs(k) > 0.01) {
      const xIntercept = -b / k;
      const xInterceptX = centerX + xIntercept * scale;
      if (xInterceptX > 0 && xInterceptX < width) {
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(xInterceptX, centerY, 6, 0, Math.PI * 2);
        ctx.fill();
        
        // 标注
        ctx.fillStyle = '#374151';
        ctx.font = 'bold 14px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(`(${xIntercept.toFixed(1)}, 0)`, xInterceptX, centerY + 12);
      }
    }

    // 坐标轴标签
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText('y', centerX - 12, 10);
    
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText('x', width - 10, centerY + 8);

  }, [k, b]);

  // 重置按钮功能
  const handleReset = () => {
    setK(1);
    setB(0);
  };

  // 获取函数表达式的格式化字符串
  const getFunctionExpression = () => {
    let expr = 'y = ';
    
    if (Math.abs(k) < 0.01) {
      expr += b.toFixed(1);
    } else if (Math.abs(k - 1) < 0.01) {
      expr += 'x';
      if (Math.abs(b) > 0.01) {
        expr += b > 0 ? ` + ${b.toFixed(1)}` : ` - ${Math.abs(b).toFixed(1)}`;
      }
    } else if (Math.abs(k + 1) < 0.01) {
      expr += '-x';
      if (Math.abs(b) > 0.01) {
        expr += b > 0 ? ` + ${b.toFixed(1)}` : ` - ${Math.abs(b).toFixed(1)}`;
      }
    } else {
      expr += `${k.toFixed(1)}x`;
      if (Math.abs(b) > 0.01) {
        expr += b > 0 ? ` + ${b.toFixed(1)}` : ` - ${Math.abs(b).toFixed(1)}`;
      }
    }
    
    return expr;
  };

  // 获取斜率描述
  const getSlopeDescription = () => {
    if (Math.abs(k) < 0.01) return '直线平行于 x 轴（水平线）';
    if (k > 0) return '直线从左下向右上倾斜（递增函数）';
    return '直线从左上向右下倾斜（递减函数）';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* 顶部标题区域 */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-2">
            📊 一次函数图像探索器
          </h1>
          <p className="text-center text-blue-100 text-lg">
            拖动滑块，直观感受 y = kx + b 中 k 和 b 对函数图像的影响
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 左侧：函数图像区域 */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0">
              <div className="text-center p-6">
                {/* 函数表达式显示 */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl py-6 px-4 mb-6">
                  <p className="text-sm text-blue-100 mb-2">当前函数表达式</p>
                  <h2 className="text-4xl font-bold font-mono">
                    {getFunctionExpression()}
                  </h2>
                </div>

                {/* 坐标系画布 */}
                <div className="bg-white rounded-xl border-2 border-gray-200 p-4 shadow-inner">
                  <canvas
                    ref={canvasRef}
                    width={640}
                    height={480}
                    className="w-full h-auto"
                  />
                </div>

                {/* 图例说明 */}
                <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-1 bg-blue-500 rounded"></div>
                    <span className="text-gray-600">函数图像</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span className="text-gray-600">与坐标轴交点</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* 右侧：控制面板 */}
          <div className="space-y-6">
            {/* 参数控制面板 */}
            <Card className="shadow-xl border-0">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="text-2xl">🎛️</span> 参数控制面板
                </h3>

              {/* 斜率 k 控制 */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-lg font-semibold text-gray-700">
                    斜率 <span className="text-2xl text-blue-600 font-bold">k</span>
                  </label>
                  <span className="text-3xl font-bold text-blue-600 font-mono bg-blue-50 px-4 py-2 rounded-lg">
                    {k.toFixed(1)}
                  </span>
                </div>
                <Slider
                  value={k}
                  onChange={(e) => setK(e.value as number)}
                  min={-5}
                  max={5}
                  step={0.1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>-5</span>
                  <span>0</span>
                  <span>5</span>
                </div>
                <p className="mt-3 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  💡 {getSlopeDescription()}
                </p>
              </div>

              {/* 截距 b 控制 */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-lg font-semibold text-gray-700">
                    截距 <span className="text-2xl text-indigo-600 font-bold">b</span>
                  </label>
                  <span className="text-3xl font-bold text-indigo-600 font-mono bg-indigo-50 px-4 py-2 rounded-lg">
                    {b.toFixed(1)}
                  </span>
                </div>
                <Slider
                  value={b}
                  onChange={(e) => setB(e.value as number)}
                  min={-10}
                  max={10}
                  step={0.1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>-10</span>
                  <span>0</span>
                  <span>10</span>
                </div>
                <p className="mt-3 text-sm text-gray-600 bg-indigo-50 p-3 rounded-lg">
                  💡 截距 b 决定直线与 y 轴的交点位置，当前交点为 <strong>(0, {b.toFixed(1)})</strong>
                </p>
              </div>

              {/* 重置按钮 */}
              <Button
                onClick={handleReset}
                label="🔄 重置参数"
                className="w-full text-lg py-3 bg-gradient-to-r from-blue-500 to-indigo-500 border-0 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              />
              </div>
            </Card>

            {/* 知识卡片 */}
            <Card className="shadow-xl border-0">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📚</span> 知识要点
                </h3>
                <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border-l-4 border-blue-500">
                  <h4 className="font-bold text-blue-800 mb-1">斜率 k 的作用</h4>
                  <p className="text-sm text-blue-700">
                    k {'>'} 0：直线从左下向右上，y 随 x 增大而增大<br/>
                    k {'<'} 0：直线从左上向右下，y 随 x 增大而减小<br/>
                    k = 0：直线平行于 x 轴
                  </p>
                </div>
                <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-4 rounded-xl border-l-4 border-indigo-500">
                  <h4 className="font-bold text-indigo-800 mb-1">截距 b 的作用</h4>
                  <p className="text-sm text-indigo-700">
                    b 是直线与 y 轴交点的纵坐标<br/>
                    交点坐标为 (0, b)<br/>
                    b {'>'} 0：交点在 y 轴正半轴<br/>
                    b {'<'} 0：交点在 y 轴负半轴
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border-l-4 border-green-500">
                  <h4 className="font-bold text-green-800 mb-1">与 x 轴的交点</h4>
                  <p className="text-sm text-green-700">
                    当 y = 0 时，x = -b/k（k ≠ 0）<br/>
                    交点坐标为 (-b/k, 0)
                  </p>
                </div>
              </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-800 text-gray-300 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            🎓 一次函数图像探索器 | 让数学学习更加直观有趣
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
