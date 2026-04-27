import type { LineType } from '@/types';
import { LINE_CONFIG } from '@/types';

interface ToolbarProps {
  selectedLineType: LineType;
  onSelectLineType: (type: LineType) => void;
  isPlaying: boolean;
}

const lineTypes: { type: LineType; label: string; description: string }[] = [
  { type: 'fire', label: '火焰', description: '灼烧敌人，造成持续伤害' },
  { type: 'slime', label: '黏液', description: '减缓敌人移动速度' },
  { type: 'magnet', label: '磁力', description: '吸引附近的敌人' },
  { type: 'wall', label: '墙壁', description: '阻挡敌人，迫使其绕路' },
];

export function Toolbar({ selectedLineType, onSelectLineType, isPlaying }: ToolbarProps) {
  return (
    <div className="doodle-card p-4 mb-4">
      <h3 className="text-lg font-bold mb-3 text-center">🎨 画笔工具</h3>
      <div className="flex flex-wrap justify-center gap-3">
        {lineTypes.map(({ type, label, description }) => {
          const config = LINE_CONFIG[type];
          const isSelected = selectedLineType === type;
          
          return (
            <button
              key={type}
              onClick={() => isPlaying && onSelectLineType(type)}
              disabled={!isPlaying}
              className={`
                flex flex-col items-center p-3 rounded-lg transition-all duration-150
                ${isSelected ? 'bg-purple-100 ring-2 ring-purple-500' : 'bg-gray-50 hover:bg-gray-100'}
                ${!isPlaying ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
              title={description}
            >
              <div
                className={`color-picker-item mb-2 ${isSelected ? 'selected' : ''}`}
                style={{ backgroundColor: config.color }}
              />
              <span className="text-sm font-bold">{label}</span>
              <span className="text-xs text-gray-500 mt-1">
                {config.paintCostPerPixel.toFixed(2)} 颜料/像素
              </span>
            </button>
          );
        })}
      </div>
      
      <div className="mt-4 pt-3 border-t-2 border-dashed border-gray-300">
        <h4 className="font-bold mb-2 text-sm">💡 提示</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• 在画布上拖动鼠标绘制线条</li>
          <li>• 不同颜色的线条有不同效果</li>
          <li>• 颜料有限，合理规划！</li>
        </ul>
      </div>
    </div>
  );
}
