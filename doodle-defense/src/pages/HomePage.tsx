import { useNavigate } from 'react-router-dom';
import { LEVELS, LINE_CONFIG, ENEMY_CONFIG } from '@/types';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="text-center py-8">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          <span className="text-purple-600">🎨</span> 涂鸦防线
          <span className="text-pink-500">🎨</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto px-4">
          用你的画笔创造防线，阻止涂鸦敌人入侵你的基地！
        </p>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 pb-8">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="doodle-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>📜</span> 游戏说明
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>🎯 目标：</strong>阻止所有涂鸦敌人从起点到达你的基地（终点）。
              </p>
              <p>
                <strong>🖌️ 玩法：</strong>在画布上绘制不同颜色的线条，每种颜色有独特的效果。
              </p>
              <p>
                <strong>💡 策略：</strong>合理使用有限的颜料，组合不同效果的线条，设计最佳防御路线。
              </p>
            </div>
          </div>

          <div className="doodle-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>🎨</span> 画笔效果
            </h2>
            <div className="space-y-3">
              {[
                { type: 'fire', name: '🔥 火焰线条', effect: '灼烧敌人，造成持续伤害。敌人离开后仍会燃烧一段时间。' },
                { type: 'slime', name: '💧 黏液线条', effect: '大幅减缓敌人移动速度。让敌人在其他陷阱中停留更久。' },
                { type: 'magnet', name: '🧲 磁力线条', effect: '吸引附近的敌人向线条靠近。可以用来聚集敌人。' },
                { type: 'wall', name: '🧱 墙壁线条', effect: '完全阻挡敌人，迫使其绕道而行。有耐久度限制。' },
              ].map(({ type, name, effect }) => (
                <div key={type} className="flex gap-3 items-start">
                  <div
                    className="w-8 h-8 rounded-full flex-shrink-0 mt-1 border-2 border-gray-800"
                    style={{ backgroundColor: LINE_CONFIG[type as keyof typeof LINE_CONFIG].color }}
                  />
                  <div>
                    <p className="font-bold">{name}</p>
                    <p className="text-sm text-gray-600">{effect}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="doodle-card mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span>👾</span> 敌人类型
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(ENEMY_CONFIG).map(([type, config]) => {
              const typeNames: Record<string, string> = {
                normal: '普通涂鸦',
                fast: '快速涂鸦',
                tank: '重装涂鸦',
                'fire-resistant': '抗火涂鸦',
                'ice-resistant': '抗冰涂鸦',
              };
              const typeDesc: Record<string, string> = {
                normal: '标准敌人，没有特殊能力',
                fast: '移动速度快，但生命值较低',
                tank: '生命值高，但移动缓慢',
                'fire-resistant': '对火焰伤害免疫，但更容易被减速',
                'ice-resistant': '对减速效果免疫，但更容易被火烧',
              };
              
              return (
                <div key={type} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div
                    className="w-12 h-12 mx-auto mb-2 rounded-full border-3 border-gray-800 flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: config.color }}
                  >
                    {type === 'normal' && '😈'}
                    {type === 'fast' && '💨'}
                    {type === 'tank' && '🛡️'}
                    {type === 'fire-resistant' && '🔥'}
                    {type === 'ice-resistant' && '❄️'}
                  </div>
                  <p className="font-bold text-sm">{typeNames[type]}</p>
                  <p className="text-xs text-gray-500 mt-1">{typeDesc[type]}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="doodle-card">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span>🎮</span> 选择关卡
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {LEVELS.map((level, index) => (
              <button
                key={level.id}
                onClick={() => navigate(`/game/${level.id}`)}
                className="doodle-card text-left hover:scale-105 transition-transform duration-150 group"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-3xl font-bold text-purple-600">
                    {level.id}
                  </span>
                  <span className="text-2xl">
                    {index === 0 && '🌱'}
                    {index === 1 && '🔬'}
                    {index === 2 && '⚔️'}
                    {index === 3 && '🌊'}
                    {index === 4 && '🏆'}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">
                  {level.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {level.description}
                </p>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span>🎨 {level.initialPaint} 颜料</span>
                  <span>🌊 {level.enemyWaves.length} 波次</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>🎨 涂鸦防线 - 用你的画笔守护基地！</p>
      </footer>
    </div>
  );
}
