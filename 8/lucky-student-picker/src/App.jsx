import { useState, useEffect, useRef } from 'react';
import { Button, Slider, ConfigProvider } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import './App.css';

function App() {
  const students = ['张三', '王五', '李四'];
  const [isRunning, setIsRunning] = useState(false);
  const [currentName, setCurrentName] = useState('准备开始');
  const [speed, setSpeed] = useState(50);
  const [isSelected, setIsSelected] = useState(false);
  const intervalRef = useRef(null);

  const getRandomName = () => {
    const randomIndex = Math.floor(Math.random() * students.length);
    return students[randomIndex];
  };

  const startRolling = () => {
    setIsSelected(false);
    setIsRunning(true);
  };

  const stopRolling = () => {
    setIsRunning(false);
    setIsSelected(true);
  };

  const toggleRolling = () => {
    if (isRunning) {
      stopRolling();
    } else {
      startRolling();
    }
  };

  useEffect(() => {
    if (isRunning) {
      // 计算间隔时间：速度越快，间隔越短
      // 速度范围 0-100，转换为 500ms - 20ms
      const interval = Math.max(20, 500 - speed * 4.8);
      
      intervalRef.current = setInterval(() => {
        setCurrentName(getRandomName());
      }, interval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, speed]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ff69b4',
        },
      }}
    >
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-purple-100 relative overflow-hidden">
        {/* 可爱的背景装饰 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* 漂浮的爱心 */}
          <div className="absolute top-10 left-10 text-pink-300 text-4xl animate-bounce" style={{ animationDelay: '0s' }}>
            ♥
          </div>
          <div className="absolute top-20 right-20 text-pink-400 text-3xl animate-bounce" style={{ animationDelay: '1s' }}>
            ♥
          </div>
          <div className="absolute bottom-32 left-20 text-purple-300 text-5xl animate-bounce" style={{ animationDelay: '0.5s' }}>
            ♥
          </div>
          <div className="absolute bottom-40 right-10 text-pink-300 text-2xl animate-bounce" style={{ animationDelay: '1.5s' }}>
            ♥
          </div>
          
          {/* 星星装饰 */}
          <div className="absolute top-1/4 left-1/4 text-yellow-300 text-2xl animate-pulse">
            ✦
          </div>
          <div className="absolute top-1/3 right-1/4 text-pink-300 text-xl animate-pulse" style={{ animationDelay: '0.5s' }}>
            ✦
          </div>
          <div className="absolute bottom-1/3 left-1/3 text-purple-300 text-2xl animate-pulse" style={{ animationDelay: '1s' }}>
            ✦
          </div>
          
          {/* 圆圈装饰 */}
          <div className="absolute top-1/2 left-10 w-16 h-16 bg-pink-200 rounded-full opacity-50 blur-sm"></div>
          <div className="absolute top-1/3 right-16 w-20 h-20 bg-purple-200 rounded-full opacity-50 blur-sm"></div>
          <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-pink-300 rounded-full opacity-30 blur-md"></div>
        </div>

        {/* 主容器 */}
        <div 
          className="relative z-10"
          style={{
            minHeight: '100vh',
            paddingTop: '100px',
            paddingBottom: '100px',
            paddingLeft: '50px',
            paddingRight: '50px'
          }}
        >
          {/* 标题 */}
          <div 
            className="text-center"
            style={{ marginBottom: '80px' }}
          >
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 drop-shadow-lg">
              🎀 幸运点名器 🎀
            </h1>
            <p 
              className="text-center text-pink-400 text-xl"
              style={{ marginTop: '20px' }}
            >
              今天的幸运儿是谁呢？
            </p>
          </div>

          {/* 姓名显示区域 */}
          <div 
            className="flex justify-center"
            style={{ marginBottom: '60px' }}
          >
            <div 
              className={`
                relative bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl 
                border-4 border-pink-200
                ${isSelected ? 'ring-4 ring-blue-400 ring-opacity-50' : ''}
                transition-all duration-300
              `}
              style={{
                padding: '60px 100px',
                minWidth: '500px',
                textAlign: 'center'
              }}
            >
              {/* 装饰角 */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-pink-400 rounded-full"></div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-400 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-purple-400 rounded-full"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-pink-400 rounded-full"></div>
              
              {/* 姓名显示 */}
              <div>
                <div 
                  className={`
                    font-bold transition-all duration-500
                    ${isSelected 
                      ? 'text-7xl text-blue-600 scale-110 drop-shadow-xl' 
                      : isRunning 
                        ? 'text-6xl text-pink-600 animate-pulse' 
                        : 'text-6xl text-gray-400'
                    }
                  `}
                >
                  {currentName}
                </div>
                {isSelected && (
                  <div 
                    className="text-2xl text-blue-500 font-semibold animate-bounce"
                    style={{ marginTop: '30px' }}
                  >
                    🎉 恭喜你被选中！🎉
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 速度控制滑块 */}
          <div 
            className="flex justify-center"
            style={{ marginBottom: '60px' }}
          >
            <div 
              className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border-2 border-pink-100"
              style={{ 
                padding: '30px 50px',
                minWidth: '500px',
                maxWidth: '600px'
              }}
            >
              <div 
                className="flex items-center justify-between"
                style={{ marginBottom: '20px' }}
              >
                <span className="text-pink-500 font-semibold text-lg">⚡ 滚动速度</span>
                <span className="text-purple-500 font-bold text-lg">{speed}%</span>
              </div>
              <Slider
                min={0}
                max={100}
                value={speed}
                onChange={setSpeed}
                tooltip={{ formatter: (value) => `${value}%` }}
                trackStyle={{ backgroundColor: '#ec4899' }}
                handleStyle={{
                  borderColor: '#ec4899',
                  backgroundColor: '#fff',
                  boxShadow: '0 0 0 2px #ec4899',
                }}
                activeDotStyle={{
                  borderColor: '#ec4899',
                  backgroundColor: '#ec4899',
                }}
              />
              <div 
                className="flex justify-between text-sm text-gray-500"
                style={{ marginTop: '15px' }}
              >
                <span>🐢 慢速</span>
                <span>🐇 快速</span>
              </div>
            </div>
          </div>

          {/* 开始/暂停按钮 */}
          <div 
            className="flex justify-center"
            style={{ marginBottom: '60px' }}
          >
            <Button
              type="primary"
              size="large"
              icon={isRunning ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
              onClick={toggleRolling}
              style={{ 
                height: '80px',
                paddingLeft: '80px',
                paddingRight: '80px',
                fontSize: '24px',
                fontWeight: 'bold',
                borderRadius: '9999px',
                boxShadow: isRunning 
                  ? '0 10px 30px rgba(248, 113, 113, 0.4)' 
                  : '0 10px 30px rgba(244, 114, 182, 0.4)',
                background: isRunning 
                  ? 'linear-gradient(90deg, #fb923c, #f87171)' 
                  : 'linear-gradient(90deg, #f472b6, #c084fc)',
                border: 'none'
              }}
            >
              {isRunning ? '🛑 停止抽奖' : '🎯 开始抽奖'}
            </Button>
          </div>

          {/* 学生名单展示 */}
          <div className="flex justify-center">
            <div 
              className="bg-white/50 backdrop-blur-md rounded-2xl shadow-lg border-2 border-pink-100"
              style={{ 
                padding: '30px 50px',
                minWidth: '500px'
              }}
            >
              <div 
                className="text-center text-pink-400 font-semibold text-lg"
                style={{ marginBottom: '20px' }}
              >
                📋 参与名单
              </div>
              <div 
                className="flex justify-center"
                style={{ gap: '30px' }}
              >
                {students.map((student, index) => (
                  <div 
                    key={index}
                    className={`
                      rounded-full font-semibold text-lg transition-all duration-300
                      ${isSelected && currentName === student 
                        ? 'bg-blue-500 text-white scale-110 shadow-lg' 
                        : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                      }
                    `}
                    style={{
                      paddingLeft: '40px',
                      paddingRight: '40px',
                      paddingTop: '15px',
                      paddingBottom: '15px'
                    }}
                  >
                    {student}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
