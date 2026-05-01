import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Modal, Select, Switch, message } from 'antd';
import { PlayCircleOutlined, AppstoreOutlined, SettingOutlined, TrophyOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useGameContext } from '../context/GameContext';
import { levels } from '../data/levels';

const { Option } = Select;

export const MainMenu: React.FC = () => {
  const navigate = useNavigate();
  const { gameState, settings, updateSettings, resetGame } = useGameContext();
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);

  useEffect(() => {
    const canvas = document.getElementById('bg-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const shapes: { x: number; y: number; size: number; sides: number; color: string; speedX: number; speedY: number; rotation: number; rotationSpeed: number }[] = [];

    const colors = ['#3B82F6', '#F97316', '#A855F7', '#EC4899', '#10B981', '#F59E0B'];

    for (let i = 0; i < 15; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 30 + Math.random() * 50,
        sides: 3 + Math.floor(Math.random() * 5),
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 1,
        speedY: (Math.random() - 0.5) * 1,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    const drawPolygon = (x: number, y: number, size: number, sides: number, color: string, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = 0.2;

      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
        const px = Math.cos(angle) * size;
        const py = Math.sin(angle) * size;
        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.closePath();

      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();
    };

    let animationId: number;

    const animate = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0f0f23');
      gradient.addColorStop(0.5, '#1a1a3e');
      gradient.addColorStop(1, '#0f172a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      shapes.forEach((shape) => {
        shape.x += shape.speedX;
        shape.y += shape.speedY;
        shape.rotation += shape.rotationSpeed;

        if (shape.x < -shape.size) shape.x = canvas.width + shape.size;
        if (shape.x > canvas.width + shape.size) shape.x = -shape.size;
        if (shape.y < -shape.size) shape.y = canvas.height + shape.size;
        if (shape.y > canvas.height + shape.size) shape.y = -shape.size;

        drawPolygon(shape.x, shape.y, shape.size, shape.sides, shape.color, shape.rotation);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleStartGame = () => {
    navigate('/game/1');
  };

  const handleLevelSelect = () => {
    navigate('/levels');
  };

  const handleResetGame = () => {
    Modal.confirm({
      title: '重置游戏进度',
      content: '确定要重置所有游戏进度吗？此操作不可撤销。',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        resetGame();
        message.success('游戏进度已重置');
      },
    });
  };

  return (
    <div className="w-full h-full relative overflow-hidden">
      <canvas id="bg-canvas" className="absolute inset-0" />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-poly-blue via-poly-purple to-poly-pink rounded-3xl blur-xl opacity-50 animate-pulse" />
            <h1 className="relative text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-poly-blue via-poly-purple to-poly-orange mb-4">
              PolyPursuit
            </h1>
          </div>
          <p className="text-2xl text-gray-300 font-light">多边形追逐</p>
        </div>

        <div className="flex flex-col gap-4 w-72">
          <Button
            type="primary"
            size="large"
            icon={<PlayCircleOutlined />}
            onClick={handleStartGame}
            className="h-14 text-lg font-semibold bg-gradient-to-r from-poly-blue to-poly-purple border-0 hover:opacity-90 shadow-lg shadow-poly-purple/30"
          >
            开始游戏
          </Button>

          <Button
            size="large"
            icon={<AppstoreOutlined />}
            onClick={handleLevelSelect}
            className="h-14 text-lg font-semibold bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 hover:text-white"
          >
            关卡选择
          </Button>

          <Button
            size="large"
            icon={<TrophyOutlined />}
            onClick={() => setStatsVisible(true)}
            className="h-14 text-lg font-semibold bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 hover:text-white"
          >
            游戏统计
          </Button>

          <Button
            size="large"
            icon={<SettingOutlined />}
            onClick={() => setSettingsVisible(true)}
            className="h-14 text-lg font-semibold bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 hover:text-white"
          >
            游戏设置
          </Button>

          <Button
            size="large"
            icon={<InfoCircleOutlined />}
            onClick={() => setAboutVisible(true)}
            className="h-14 text-lg font-semibold bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 hover:text-white"
          >
            关于游戏
          </Button>
        </div>

        <div className="absolute bottom-8 text-center text-gray-400">
          <p className="text-sm">使用方向键或 WASD 移动 | 空格键跳跃 | ESC 暂停</p>
        </div>
      </div>

      <Modal
        title={
          <span className="text-xl font-bold text-poly-purple">游戏设置</span>
        }
        open={settingsVisible}
        onCancel={() => setSettingsVisible(false)}
        footer={null}
        className="backdrop-blur-sm"
      >
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-700">音效</div>
              <div className="text-sm text-gray-500">启用游戏音效</div>
            </div>
            <Switch
              checked={settings.soundEnabled}
              onChange={(checked) => updateSettings({ soundEnabled: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-700">音乐</div>
              <div className="text-sm text-gray-500">启用游戏背景音乐</div>
            </div>
            <Switch
              checked={settings.musicEnabled}
              onChange={(checked) => updateSettings({ musicEnabled: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-700">难度</div>
              <div className="text-sm text-gray-500">选择游戏难度</div>
            </div>
            <Select
              value={settings.difficulty}
              onChange={(value) => updateSettings({ difficulty: value })}
              style={{ width: 120 }}
            >
              <Option value="easy">简单</Option>
              <Option value="normal">普通</Option>
              <Option value="hard">困难</Option>
            </Select>
          </div>

          <div className="pt-4 border-t">
            <Button type="primary" danger block onClick={handleResetGame}>
              重置游戏进度
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        title={
          <span className="text-xl font-bold text-poly-yellow">游戏统计</span>
        }
        open={statsVisible}
        onCancel={() => setStatsVisible(false)}
        footer={null}
      >
        <div className="grid grid-cols-2 gap-4 py-4">
          <Card className="text-center bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <div className="text-3xl font-bold text-yellow-600">{gameState.totalScore}</div>
            <div className="text-sm text-gray-600 mt-1">总得分</div>
          </Card>
          <Card className="text-center bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <div className="text-3xl font-bold text-blue-600">{gameState.totalEnergy}</div>
            <div className="text-sm text-gray-600 mt-1">收集能量</div>
          </Card>
          <Card className="text-center bg-gradient-to-br from-green-50 to-teal-50 border-green-200 col-span-2">
            <div className="text-3xl font-bold text-green-600">
              {gameState.unlockedLevels.length}/{levels.length}
            </div>
            <div className="text-sm text-gray-600 mt-1">已解锁关卡</div>
            <div className="mt-2 flex justify-center gap-2">
              {levels.map((level) => (
                <div
                  key={level.id}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                    gameState.unlockedLevels.includes(level.id)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-500'
                  }`}
                >
                  {level.id}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Modal>

      <Modal
        title={
          <span className="text-xl font-bold text-poly-green">关于游戏</span>
        }
        open={aboutVisible}
        onCancel={() => setAboutVisible(false)}
        footer={null}
      >
        <div className="py-4 space-y-4">
          <div>
            <h3 className="font-bold text-lg text-gray-700 mb-2">游戏简介</h3>
            <p className="text-gray-600 leading-relaxed">
              PolyPursuit 是一款低多边形风格的平台动作收集游戏。玩家控制一个多边形角色，在由各种几何形状构成的关卡中进行探索，收集能量碎片，躲避敌人，挑战难关。
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-700 mb-2">操作说明</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• <strong>← → / A D</strong> - 左右移动</li>
              <li>• <strong>↑ / W / 空格</strong> - 跳跃</li>
              <li>• <strong>ESC / P</strong> - 暂停游戏</li>
              <li>• <strong>R</strong> - 重新开始（游戏结束后）</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-700 mb-2">游戏特色</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• 低多边形艺术风格，鲜明色彩</li>
              <li>• 3个独特关卡，各具特色</li>
              <li>• 移动平台、巡逻敌人、能量碎片收集</li>
              <li>• 自动存档，进度保留</li>
              <li>• 从敌人头上跳跃可以消灭敌人</li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MainMenu;
