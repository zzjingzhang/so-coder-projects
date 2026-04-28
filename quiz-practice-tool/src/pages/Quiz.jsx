import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, Progress, Button, Typography, Tag, Space, Modal } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  RightOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { useQuiz } from '../hooks/useQuiz';

const { Title, Text, Paragraph } = Typography;

const Quiz = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const category = searchParams.get('category') || 'all';
  const questionCount = parseInt(searchParams.get('count') || '5');
  const shouldResume = searchParams.get('resume') === 'true';

  const {
    quizStatus,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    selectedAnswer,
    isAnswered,
    isCorrect,
    score,
    progress,
    initializeQuiz,
    resumeQuiz,
    selectAnswer,
    submitAnswer,
    goToNextQuestion
  } = useQuiz(category, questionCount);

  useEffect(() => {
    if (quizStatus === 'idle') {
      if (shouldResume) {
        const resumed = resumeQuiz();
        if (!resumed) {
          initializeQuiz();
        }
      } else {
        initializeQuiz();
      }
    }
  }, [quizStatus, shouldResume, resumeQuiz, initializeQuiz]);

  useEffect(() => {
    if (quizStatus === 'finished') {
      navigate(`/result?score=${score}&total=${totalQuestions}`);
    }
  }, [quizStatus, score, totalQuestions, navigate]);

  const handleOptionClick = (index) => {
    if (isAnswered) return;
    selectAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    submitAnswer();
  };

  const handleNext = () => {
    goToNextQuestion();
  };

  const getOptionClass = (index) => {
    let baseClass = 'p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ';
    
    if (isAnswered) {
      if (index === currentQuestion?.correctAnswer) {
        return baseClass + 'border-green-500 bg-green-50 text-green-700 scale-102';
      }
      if (index === selectedAnswer && index !== currentQuestion?.correctAnswer) {
        return baseClass + 'border-red-500 bg-red-50 text-red-700';
      }
      return baseClass + 'border-gray-200 bg-gray-50 text-gray-400 opacity-60';
    }
    
    if (index === selectedAnswer) {
      return baseClass + 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md scale-102';
    }
    
    return baseClass + 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 hover:shadow-sm';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'error';
      default: return 'default';
    }
  };

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '简单';
      case 'medium': return '中等';
      case 'hard': return '困难';
      default: return '未知';
    }
  };

  if (quizStatus === 'idle' || !currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-white text-xl">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button
            icon={<HomeOutlined />}
            onClick={() => navigate('/')}
            className="bg-white/20 border-0 text-white hover:bg-white/30"
          >
            返回首页
          </Button>
          <Tag color="blue" className="text-base px-4 py-1">
            得分：{score} / {totalQuestions}
          </Tag>
        </div>

        <Card className="shadow-2xl border-0 mb-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <Text type="secondary">
                进度：{currentQuestionIndex + 1} / {totalQuestions}
              </Text>
              <Text type="secondary">
                {Math.round(progress)}%
              </Text>
            </div>
            <Progress
              percent={progress}
              showInfo={false}
              strokeColor={{
                '0%': '#6366f1',
                '100%': '#a855f7',
              }}
              strokeWidth={8}
            />
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Tag color={getDifficultyColor(currentQuestion.difficulty)}>
              {getDifficultyText(currentQuestion.difficulty)}
            </Tag>
            <Tag color="purple">{currentQuestion.category}</Tag>
          </div>

          <Title level={4} className="!mb-6 !text-gray-800">
            {currentQuestion.question}
          </Title>

          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionClick(index)}
                className={getOptionClass(index)}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-white shadow-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {isAnswered && index === currentQuestion.correctAnswer && (
                    <CheckCircleOutlined className="text-green-500 text-xl" />
                  )}
                  {isAnswered && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                    <CloseCircleOutlined className="text-red-500 text-xl" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {isAnswered && (
            <div className={`p-4 rounded-lg mb-6 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <CheckCircleOutlined className="text-green-500 text-xl" />
                ) : (
                  <CloseCircleOutlined className="text-red-500 text-xl" />
                )}
                <Text strong className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                  {isCorrect ? '回答正确！' : '回答错误'}
                </Text>
              </div>
              {!isCorrect && (
                <Paragraph className="!mb-0 text-gray-700">
                  正确答案是：
                  <Text strong>
                    {String.fromCharCode(65 + currentQuestion.correctAnswer)}. {currentQuestion.options[currentQuestion.correctAnswer]}
                  </Text>
                </Paragraph>
              )}
            </div>
          )}

          <div className="flex gap-3">
            {!isAnswered ? (
              <Button
                type="primary"
                size="large"
                block
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="h-12 text-lg bg-gradient-to-r from-indigo-500 to-purple-500 border-0 hover:from-indigo-600 hover:to-purple-600"
              >
                提交答案
              </Button>
            ) : (
              <Button
                type="primary"
                size="large"
                block
                onClick={handleNext}
                icon={<RightOutlined />}
                className="h-12 text-lg bg-gradient-to-r from-green-500 to-emerald-500 border-0 hover:from-green-600 hover:to-emerald-600"
              >
                {currentQuestionIndex < totalQuestions - 1 ? '下一题' : '查看结果'}
              </Button>
            )}
          </div>
        </Card>

        {isAnswered && (
          <div className="text-center">
            <Text type="secondary" className="text-white">
              ⏱ 2 秒后自动跳转到
              {currentQuestionIndex < totalQuestions - 1 ? '下一题' : '结果页面'}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
