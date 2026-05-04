import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Button, message, Progress, Modal } from 'antd';
import { PauseOutlined, PlayCircleOutlined, CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { usePractice } from '../context/PracticeContext';

const { Title, Text } = Typography;

const PracticePage = () => {
  const navigate = useNavigate();
  const {
    words,
    practiceTime,
    currentIndex,
    setCurrentIndex,
    correctCount,
    setCorrectCount,
    incorrectWords,
    setIncorrectWords,
    setStartTime,
    setEndTime,
    startTime,
  } = usePractice();

  const [currentWord, setCurrentWord] = useState('');
  const [inputLetters, setInputLetters] = useState([]);
  const [timeLeft, setTimeLeft] = useState(practiceTime * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [shakeInput, setShakeInput] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (words.length === 0) {
      navigate('/');
      return;
    }

    if (!startTime) {
      setStartTime(Date.now());
    }

    loadCurrentWord();
  }, [words, currentIndex]);

  useEffect(() => {
    if (isPaused || isFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          finishPractice();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, isFinished]);

  const loadCurrentWord = () => {
    if (currentIndex < words.length) {
      setCurrentWord(words[currentIndex].english);
      setInputLetters(new Array(words[currentIndex].english.length).fill(''));
      setShowHint(false);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  };

  const handleLetterInput = useCallback((index, value) => {
    const newLetters = [...inputLetters];
    const oldValue = newLetters[index];
    newLetters[index] = value.toLowerCase().slice(-1);
    setInputLetters(newLetters);

    if (value && !oldValue && index < inputLetters.length - 1) {
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 0);
    }

    const filledCount = newLetters.filter(l => l !== '').length;
    const totalLetters = currentWord.length;

    if (filledCount === totalLetters) {
      const inputWord = newLetters.join('');
      if (inputWord === currentWord) {
        handleCorrect();
      } else {
        handleIncorrect(inputWord);
      }
    }
  }, [inputLetters, currentWord]);

  const handleKeyDown = useCallback((index, e) => {
    if (e.key === 'Backspace' && !inputLetters[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }, [inputLetters]);

  const handleCorrect = () => {
    message.success('🎉 回答正确！');
    setCorrectCount(correctCount + 1);
    moveToNextWord();
  };

  const handleIncorrect = (inputWord) => {
    setShakeInput(true);
    message.error('❌ 拼写错误，请重试！');
    
    const isAlreadyIncorrect = incorrectWords.some(w => w.word === currentWord);
    if (!isAlreadyIncorrect) {
      setIncorrectWords([...incorrectWords, {
        word: currentWord,
        chinese: words[currentIndex].chinese,
        userAnswer: inputWord,
      }]);
    }

    setTimeout(() => {
      setShakeInput(false);
      setInputLetters(new Array(currentWord.length).fill(''));
    }, 500);
  };

  const moveToNextWord = () => {
    if (currentIndex + 1 >= words.length) {
      finishPractice();
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const finishPractice = () => {
    setIsFinished(true);
    setEndTime(Date.now());
    navigate('/result');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentIndex + (isFinished ? 1 : 0)) / words.length) * 100;

  const handleShowHint = () => {
    setShowHint(true);
    message.info('💡 提示：首字母是 ' + currentWord[0].toUpperCase());
  };

  const handleQuit = () => {
    Modal.confirm({
      title: '确认退出',
      content: '确定要退出练习吗？当前进度将不会保存。',
      okText: '确认退出',
      cancelText: '继续练习',
      onOk: () => {
        navigate('/');
      },
    });
  };

  if (words.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl rounded-2xl border-0 mb-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Text strong className="text-lg">
                📊 进度：{currentIndex + 1}/{words.length}
              </Text>
              <Progress
                percent={Math.round(progress)}
                size="small"
                style={{ width: 150 }}
                status={timeLeft < 60 ? 'exception' : 'active'}
              />
            </div>
            <div className="flex items-center gap-4">
              <Text 
                strong 
                className={`text-2xl ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-blue-600'}`}
              >
                ⏱️ {formatTime(timeLeft)}
              </Text>
              <Button
                icon={isPaused ? <PlayCircleOutlined /> : <PauseOutlined />}
                onClick={() => setIsPaused(!isPaused)}
              >
                {isPaused ? '继续' : '暂停'}
              </Button>
              <Button
                icon={<CloseOutlined />}
                onClick={handleQuit}
                danger
              >
                退出
              </Button>
            </div>
          </div>
        </Card>

        <Card className="shadow-xl rounded-2xl border-0">
          <div className="text-center py-8">
            <Title level={2} className="!text-gray-700 !mb-8">
              请拼写：
            </Title>

            <Title level={1} className="!text-5xl !text-blue-600 !font-bold !mb-12">
              {words[currentIndex]?.chinese}
            </Title>

            <div className={`flex justify-center gap-3 mb-8 flex-wrap ${shakeInput ? 'animate-bounce' : ''}`}>
              {inputLetters.map((letter, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  value={letter.toUpperCase()}
                  onChange={(e) => handleLetterInput(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-16 h-20 text-3xl font-bold text-center border-4 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all uppercase"
                  maxLength={1}
                  disabled={isPaused}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <Button
                icon={<QuestionCircleOutlined />}
                size="large"
                onClick={handleShowHint}
                disabled={showHint || isPaused}
                className="!h-12 !px-6"
              >
                {showHint ? '提示已显示' : '获取提示'}
              </Button>
            </div>

            {showHint && (
              <div className="mt-6 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 inline-block">
                <Text className="text-yellow-700 text-lg">
                  💡 提示：这个单词的首字母是 <strong className="text-2xl">{currentWord[0].toUpperCase()}</strong>
                </Text>
              </div>
            )}
          </div>
        </Card>

        {isPaused && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-96 text-center shadow-2xl">
              <Title level={2} className="!text-blue-600 !mb-4">
                ⏸️ 练习已暂停
              </Title>
              <Text className="text-gray-500 block mb-6">
                点击继续按钮恢复练习
              </Text>
              <Button
                type="primary"
                size="large"
                icon={<PlayCircleOutlined />}
                onClick={() => setIsPaused(false)}
                className="!h-12 !w-full !text-lg"
              >
                继续练习
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticePage;
