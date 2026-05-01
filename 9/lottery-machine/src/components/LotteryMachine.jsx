import { useState, useCallback } from 'react';

const LotteryMachine = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showPaperBall, setShowPaperBall] = useState(false);
  const [isPaperBallUnfolded, setIsPaperBallUnfolded] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [isFirstTime, setIsFirstTime] = useState(true);

  const questionMarks = [0, 1, 2, 3, 4, 5, 6, 7];

  const getRandomNumber = useCallback(() => {
    if (isFirstTime) {
      setIsFirstTime(false);
      return 19;
    }
    
    const availableNumbers = [];
    for (let i = 1; i <= 46; i++) {
      if (i !== 39 && i !== 45) {
        availableNumbers.push(i);
      }
    }
    
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    return availableNumbers[randomIndex];
  }, [isFirstTime]);

  const handleButtonClick = () => {
    if (isSpinning || showPaperBall) return;
    
    setIsSpinning(true);
    
    setTimeout(() => {
      setIsSpinning(false);
      setCurrentNumber(getRandomNumber());
      setShowPaperBall(true);
    }, 2000);
  };

  const handlePaperBallClick = () => {
    if (!isPaperBallUnfolded) {
      setIsPaperBallUnfolded(true);
    } else {
      setShowPaperBall(false);
      setIsPaperBallUnfolded(false);
      setCurrentNumber(null);
    }
  };

  const wheelSize = 320;
  const paperBallSize = 80;
  const unfoldedPaperSize = 200;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="relative">
        <div className="flex items-center gap-8">
          <div className="relative">
            <div 
              className="w-24 h-24 bg-gray-700 rounded-full border-4 border-gray-600 shadow-inner relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-black rounded-full shadow-inner" />
              </div>
            </div>
            
            {showPaperBall && !isPaperBallUnfolded && (
              <div
                className="absolute -left-4 top-1/2 -translate-y-1/2 cursor-pointer pop-out-animation"
                onClick={handlePaperBallClick}
              >
                <div
                  className="rounded-full bg-gradient-to-br from-amber-200 to-amber-400 border-2 border-amber-500 glow-pulse"
                  style={{ width: paperBallSize, height: paperBallSize }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-700 font-bold text-lg">?</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div 
            className="relative" 
            style={{ width: wheelSize + 40, height: wheelSize + 40 }}
          >
            <div 
              className="absolute inset-0 bg-gradient-to-br from-amber-700 to-amber-900 rounded-3xl shadow-2xl border-4 border-amber-600"
            />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`relative rounded-full bg-gradient-to-br from-amber-500 to-amber-700 border-4 border-amber-400 shadow-lg ${
                  isSpinning ? 'spin-animation rotate-animation' : ''
                }`}
                style={{ width: wheelSize, height: wheelSize }}
              >
                {questionMarks.map((_, index) => {
                  const angle = (index * 360) / questionMarks.length;
                  const radius = wheelSize / 2 - 30;
                  const x = radius * Math.cos((angle * Math.PI) / 180 - Math.PI / 2);
                  const y = radius * Math.sin((angle * Math.PI) / 180 - Math.PI / 2);
                  
                  return (
                    <div
                      key={index}
                      className="absolute"
                      style={{
                        left: `calc(50% + ${x}px - 20px)`,
                        top: `calc(50% + ${y}px - 20px)`,
                      }}
                    >
                      <div className="w-10 h-10 rounded-full border-2 border-amber-300 bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center shadow-md">
                        <span className="text-gray-800 font-bold text-lg">?</span>
                      </div>
                    </div>
                  );
                })}
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 border-2 border-amber-200 shadow-lg flex items-center justify-center">
                    <span className="text-gray-800 font-bold text-xl">?</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              className={`w-32 h-32 rounded-full text-xl font-bold shadow-lg transform transition-all ${
                isSpinning || showPaperBall 
                  ? 'bg-gray-400 cursor-not-allowed opacity-60' 
                  : 'bg-gradient-to-br from-orange-500 to-orange-700 hover:shadow-xl hover:scale-105 cursor-pointer text-white'
              }`}
              onClick={handleButtonClick}
              disabled={isSpinning || showPaperBall}
            >
              {isSpinning ? '抽奖中...' : '开始抽奖'}
            </button>
          </div>
        </div>
      </div>

      {isPaperBallUnfolded && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer z-50"
          onClick={handlePaperBallClick}
        >
          <div
            className="unfold-animation rounded-lg bg-gradient-to-br from-amber-100 to-amber-200 border-4 border-amber-400 shadow-2xl flex items-center justify-center"
            style={{ width: unfoldedPaperSize, height: unfoldedPaperSize }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-800 font-bold text-6xl">
                {currentNumber}
              </span>
            </div>
          </div>
          <span className="absolute bottom-10 text-white text-lg">
            点击任意位置关闭
          </span>
        </div>
      )}
    </div>
  );
};

export default LotteryMachine;
