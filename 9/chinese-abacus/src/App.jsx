import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 12档的名称，从右到左：个位到千亿位
const COLUMN_NAMES = ['千亿', '百亿', '十亿', '亿', '千万', '百万', '十万', '万', '千', '百', '十', '个'];
// 每档的位值，从右到左
const COLUMN_VALUES = [100000000000, 10000000000, 1000000000, 100000000, 10000000, 1000000, 100000, 10000, 1000, 100, 10, 1];

// 初始化每列的状态：上珠2个，下珠5个，默认都未激活
const initialState = COLUMN_NAMES.map(() => ({
  upper: [false, false], // 两个上珠，默认未激活
  lower: [false, false, false, false, false] // 五个下珠，默认未激活
}));

// 珠子组件
const Bead = ({ isActive, isUpper, onClick, index, total }) => {
  const baseColor = isActive 
    ? (isUpper ? 'bg-red' : 'bg-blue') 
    : 'bg-white';
  
  const activeShadow = isActive 
    ? (isUpper ? 'shadow-lg shadow-red/50' : 'shadow-lg shadow-blue/50') 
    : 'shadow-md';
  
  const position = isUpper 
    ? (isActive ? 'translate-y-8' : 'translate-y-0') 
    : (isActive ? '-translate-y-8' : 'translate-y-0');

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        cursor-pointer w-8 h-8 md:w-10 md:h-10 rounded-full 
        ${baseColor} ${activeShadow}
        border-2 border-gray-300
        transition-all duration-300 ease-in-out
        flex items-center justify-center
        relative
      `}
      animate={{ y: isActive ? (isUpper ? 32 : -32) : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* 珠子高光效果 */}
      <div className="absolute top-1 left-2 w-2 h-2 rounded-full bg-white/40" />
      {/* 珠子反光效果 */}
      <div className="absolute bottom-1 right-2 w-1 h-1 rounded-full bg-black/20" />
    </motion.div>
  );
};

// 算盘列组件
const AbacusColumn = ({ columnData, columnIndex, onUpperClick, onLowerClick, columnName }) => {
  return (
    <div className="flex flex-col items-center">
      {/* 列名称 */}
      <div className="text-gold text-xs md:text-sm font-bold mb-2">{columnName}</div>
      
      {/* 上珠区域 */}
      <div className="flex flex-col gap-2 mb-4 relative">
        {/* 分隔线（横梁） */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-wood-dark rounded" />
        {columnData.upper.map((isActive, index) => (
          <Bead
            key={`upper-${index}`}
            isActive={isActive}
            isUpper={true}
            onClick={() => onUpperClick(columnIndex, index)}
            index={index}
            total={2}
          />
        ))}
      </div>
      
      {/* 下珠区域 */}
      <div className="flex flex-col gap-2 mt-4 relative">
        {/* 分隔线（横梁） */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-wood-dark rounded" />
        {columnData.lower.map((isActive, index) => (
          <Bead
            key={`lower-${index}`}
            isActive={isActive}
            isUpper={false}
            onClick={() => onLowerClick(columnIndex, index)}
            index={index}
            total={5}
          />
        ))}
      </div>
    </div>
  );
};

// 使用说明卡片组件
const InfoCard = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-navy/50 backdrop-blur-sm rounded-xl p-6 border border-gold/30 shadow-xl"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-gold text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

// 装饰元素组件
const DecorativeElement = ({ position }) => {
  return (
    <div className={`absolute ${position} text-gold/20 text-6xl md:text-8xl font-bold select-none pointer-events-none`}>
      算
    </div>
  );
};

function App() {
  const [columns, setColumns] = useState(initialState);

  // 计算当前数值
  const calculateValue = useCallback(() => {
    let total = 0;
    columns.forEach((col, index) => {
      // 上珠：每个代表5
      const upperValue = col.upper.filter(Boolean).length * 5;
      // 下珠：每个代表1
      const lowerValue = col.lower.filter(Boolean).length;
      // 该列的总值
      const columnValue = (upperValue + lowerValue) * COLUMN_VALUES[index];
      total += columnValue;
    });
    return total;
  }, [columns]);

  // 格式化数值（添加千位分隔符）
  const formatNumber = (num) => {
    return num.toLocaleString('zh-CN');
  };

  // 点击上珠
  const handleUpperClick = (colIndex, beadIndex) => {
    setColumns(prev => {
      const newColumns = [...prev];
      newColumns[colIndex] = {
        ...newColumns[colIndex],
        upper: newColumns[colIndex].upper.map((val, idx) => 
          idx === beadIndex ? !val : val
        )
      };
      return newColumns;
    });
  };

  // 点击下珠
  const handleLowerClick = (colIndex, beadIndex) => {
    setColumns(prev => {
      const newColumns = [...prev];
      newColumns[colIndex] = {
        ...newColumns[colIndex],
        lower: newColumns[colIndex].lower.map((val, idx) => 
          idx === beadIndex ? !val : val
        )
      };
      return newColumns;
    });
  };

  // 复位功能
  const handleReset = () => {
    setColumns(initialState);
  };

  const currentValue = calculateValue();

  return (
    <div className="min-h-screen py-8 px-4 relative overflow-hidden">
      {/* 装饰元素 */}
      <DecorativeElement position="top-10 left-10" />
      <DecorativeElement position="bottom-10 right-10" />
      <DecorativeElement position="top-1/2 left-5" />
      <DecorativeElement position="top-1/3 right-5" />

      {/* 主要内容 */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* 顶部标题和简介 */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-shine">
            中国传统算盘
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            体验古老的计算智慧，上二下五型算盘模拟器
          </p>
          <div className="mt-4 flex justify-center gap-2">
            {['🇨🇳', '🧮', '✨'].map((emoji, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.2, type: "spring" }}
                className="text-3xl"
              >
                {emoji}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* 中部算盘主体区域 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          {/* 算盘外框 */}
          <div className="relative">
            {/* 木质边框 */}
            <div className="absolute -inset-4 bg-gradient-to-br from-wood-light to-wood-dark rounded-2xl shadow-2xl" />
            
            {/* 算盘主体 */}
            <div className="relative bg-gradient-to-br from-wood-dark to-wood-light rounded-xl p-6 md:p-8 shadow-inner">
              {/* 算盘内部框架 */}
              <div className="bg-wood-dark/30 rounded-lg p-4 md:p-6">
                {/* 12档算盘 */}
                <div className="flex justify-between overflow-x-auto pb-2">
                  {columns.map((col, index) => (
                    <div key={index} className="flex-shrink-0 mx-1 md:mx-2">
                      <AbacusColumn
                        columnData={col}
                        columnIndex={index}
                        onUpperClick={handleUpperClick}
                        onLowerClick={handleLowerClick}
                        columnName={COLUMN_NAMES[index]}
                      />
                    </div>
                  ))}
                </div>
                
                {/* 垂直的杆（表示每档） */}
                <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-around pointer-events-none">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <div
                      key={index}
                      className="w-0.5 bg-wood-dark/60 h-full"
                      style={{ 
                        marginLeft: `${(index * 100 / 12) + (100 / 24)}%`,
                        marginTop: '-100%',
                        height: '300%'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 数值显示和复位按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12"
        >
          {/* 数值显示 */}
          <div className="bg-navy/70 backdrop-blur-sm rounded-xl p-6 border-2 border-gold/50 shadow-xl min-w-[300px] text-center">
            <div className="text-gray-400 text-sm mb-2">当前数值</div>
            <motion.div 
              key={currentValue}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-gold text-4xl md:text-5xl font-bold font-mono"
            >
              {formatNumber(currentValue)}
            </motion.div>
          </div>

          {/* 复位按钮 */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 175, 55, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="bg-gradient-to-r from-red to-red-dark text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl border-2 border-red/50 hover:border-gold transition-all duration-300"
          >
            🔄 复位归零
          </motion.button>
        </motion.div>

        {/* 使用说明卡片网格 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-gold text-2xl md:text-3xl font-bold text-center mb-8 animate-pulse-slow">
            📖 使用说明
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard
              icon="🔴"
              title="上珠操作"
              description="点击上珠（位于横梁上方），珠子会向下移动并变为红色。每个上珠代表数值5。"
            />
            <InfoCard
              icon="🔵"
              title="下珠操作"
              description="点击下珠（位于横梁下方），珠子会向上移动并变为蓝色。每个下珠代表数值1。"
            />
            <InfoCard
              icon="🧮"
              title="数值计算"
              description="每档的数值 =（激活的上珠数 × 5）+（激活的下珠数 × 1）× 该档位的位值。系统会实时计算并显示总数值。"
            />
            <InfoCard
              icon="📊"
              title="档位说明"
              description="从右到左依次为：个、十、百、千、万、十万、百万、千万、亿、十亿、百亿、千亿位。每档可表示0-15的数值。"
            />
            <InfoCard
              icon="🎯"
              title="操作技巧"
              description="再次点击已激活的珠子可以取消激活状态。尝试组合不同的珠子来表示各种数字，体验传统计算的魅力！"
            />
            <InfoCard
              icon="🔄"
              title="复位功能"
              description="点击红色的「复位归零」按钮，可以将所有珠子重置到初始位置，方便进行新的计算。"
            />
          </div>
        </motion.div>

        {/* 底部页脚信息 */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center py-8 border-t border-gold/20"
        >
          <div className="text-gray-400 text-sm space-y-2">
            <p>🏮 中国传统算盘模拟器 🏮</p>
            <p>传承千年计算智慧，体验古老文化魅力</p>
            <p className="text-gold/60">
              使用 React + Tailwind CSS + Framer Motion 构建
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;
