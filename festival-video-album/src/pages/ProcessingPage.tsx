import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Film, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { ProcessingStep } from '../types';
import { 
  analyzePhotos, 
  submitVideoTask, 
  checkTaskStatus, 
  finalizeVideos,
  generatePrompt 
} from '../services/api';

const steps = [
  { 
    step: ProcessingStep.ANALYZING_PHOTOS, 
    label: '分析照片', 
    description: '正在分析您上传的照片...'
  },
  { 
    step: ProcessingStep.SUBMITTING_TASKS, 
    label: '提交任务', 
    description: '正在提交视频生成任务...'
  },
  { 
    step: ProcessingStep.CREATING_VIDEOS, 
    label: '创建视频', 
    description: 'AI正在为您创建精彩视频...'
  },
  { 
    step: ProcessingStep.FINALIZING, 
    label: '最终确定', 
    description: '正在处理最终结果...'
  },
];

export default function ProcessingPage() {
  const navigate = useNavigate();
  const isProcessingRef = useRef(false);
  
  const {
    uploadedImages,
    generationConfig,
    processingStep,
    progress,
    videoTasks,
    error,
    updateProcessingStep,
    updateProgress,
    updateVideoTask,
    generationComplete,
    setError,
  } = useAppContext();

  // 开始视频生成流程
  useEffect(() => {
    // 防止重复执行
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;

    const processVideos = async () => {
      try {
        // 步骤1：分析照片
        updateProcessingStep(ProcessingStep.ANALYZING_PHOTOS);
        updateProgress(5);
        
        await analyzePhotos();
        updateProgress(25);

        // 步骤2：提交任务
        updateProcessingStep(ProcessingStep.SUBMITTING_TASKS);
        updateProgress(30);

        const prompt = generatePrompt(generationConfig.theme, generationConfig.style);
        
        // 为每张图片提交任务
        for (let i = 0; i < uploadedImages.length; i++) {
          const image = uploadedImages[i];
          const task = await submitVideoTask(image.file, prompt);
          updateVideoTask({
            ...task,
            imageId: image.id,
          });
          
          // 更新进度
          const progressIncrement = (60 - 30) / uploadedImages.length;
          updateProgress(30 + (i + 1) * progressIncrement);
        }

        // 步骤3：创建视频（轮询任务状态）
        updateProcessingStep(ProcessingStep.CREATING_VIDEOS);
        updateProgress(65);

        // 模拟轮询任务状态
        let allCompleted = false;
        let attempts = 0;
        const maxAttempts = 30; // 最多轮询30次

        while (!allCompleted && attempts < maxAttempts) {
          attempts++;
          let completedCount = 0;

          for (const task of videoTasks) {
            if (task.status === 'completed') {
              completedCount++;
              continue;
            }

            if (task.status === 'failed') {
              continue;
            }

            // 检查任务状态
            const status = await checkTaskStatus(task.id);
            
            updateVideoTask({
              ...task,
              status: status.status,
              videoUrl: status.videoUrl,
              error: status.error,
            });

            if (status.status === 'completed') {
              completedCount++;
            }
          }

          // 更新进度
          const currentProgress = 65 + (attempts / maxAttempts) * 25;
          updateProgress(Math.min(currentProgress, 90));

          // 检查是否全部完成
          allCompleted = completedCount === videoTasks.length;
          
          if (!allCompleted) {
            // 等待一段时间后再次检查
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        }

        // 步骤4：最终确定
        updateProcessingStep(ProcessingStep.FINALIZING);
        updateProgress(92);
        
        await finalizeVideos();
        updateProgress(100);
        
        // 完成
        generationComplete();
        
        // 延迟一点后跳转到预览页面，让用户看到完成状态
        setTimeout(() => {
          navigate('/preview');
        }, 1500);

      } catch (err) {
        console.error('Video generation failed:', err);
        setError(err instanceof Error ? err.message : '视频生成失败，请重试');
      }
    };

    processVideos();

    // 清理函数
    return () => {
      isProcessingRef.current = false;
    };
  }, []); // 空依赖数组，只在组件挂载时执行一次

  const getCurrentStepIndex = () => {
    return steps.findIndex(s => s.step === processingStep);
  };

  const currentStepIndex = getCurrentStepIndex();

  // 如果有错误，显示错误页面
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">
            生成失败
          </h2>
          <p className="text-slate-400 mb-6">
            {error}
          </p>
          
          <button
            onClick={() => navigate('/upload')}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            <span>返回上传页面</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            <div className="flex items-center space-x-2">
              <Film className="w-8 h-8 text-purple-400" />
              <span className="text-xl font-bold text-white">节日视频相册</span>
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容区 */}
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              正在生成您的视频
            </h1>
            <p className="text-slate-400 text-lg">
              AI正在为您的照片添加节日魔法，请稍候...
            </p>
          </div>

          {/* 步骤指示器 */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => {
                const isActive = index === currentStepIndex;
                const isCompleted = index < currentStepIndex;
                const isLast = index === steps.length - 1;
                
                return (
                  <div key={step.step} className="flex-1 relative">
                    {/* 连接线 */}
                    {!isLast && (
                      <div className="absolute top-4 left-1/2 w-full h-0.5 bg-slate-700">
                        {isCompleted && (
                          <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500" style={{ width: '100%' }}></div>
                        )}
                      </div>
                    )}
                    
                    {/* 步骤图标 */}
                    <div className="relative flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-purple-500' 
                          : isActive 
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500 animate-pulse' 
                            : 'bg-slate-700'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        ) : isActive ? (
                          <Loader2 className="w-5 h-5 text-white animate-spin" />
                        ) : (
                          <span className="text-sm font-medium text-slate-400">{index + 1}</span>
                        )}
                      </div>
                      
                      <span className={`mt-2 text-xs font-medium text-center ${
                        isActive ? 'text-purple-400' : isCompleted ? 'text-slate-300' : 'text-slate-500'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 当前步骤详情 */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-2">
              {steps[currentStepIndex]?.label}
            </h3>
            <p className="text-slate-400">
              {steps[currentStepIndex]?.description}
            </p>
          </div>

          {/* 进度条 */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-300">处理进度</span>
              <span className="text-sm font-semibold text-purple-400">{Math.round(progress)}%</span>
            </div>
            
            <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* 任务列表 */}
          {videoTasks.length > 0 && (
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4">任务状态</h4>
              
              <div className="space-y-3">
                {videoTasks.map((task, index) => {
                  const image = uploadedImages.find(img => img.id === task.imageId);
                  
                  return (
                    <div 
                      key={task.id}
                      className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl"
                    >
                      <div className="flex items-center space-x-3">
                        {image && (
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-700">
                            <img 
                              src={image.previewUrl} 
                              alt="照片" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-white">
                            照片 {index + 1}
                          </p>
                          <p className="text-xs text-slate-400">
                            {task.status === 'pending' && '等待处理...'}
                            {task.status === 'processing' && '正在处理...'}
                            {task.status === 'completed' && '处理完成'}
                            {task.status === 'failed' && '处理失败'}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        {task.status === 'pending' && (
                          <div className="w-5 h-5 rounded-full border-2 border-slate-600"></div>
                        )}
                        {task.status === 'processing' && (
                          <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                        )}
                        {task.status === 'completed' && (
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        )}
                        {task.status === 'failed' && (
                          <AlertCircle className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 提示信息 */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              视频生成可能需要几分钟时间，请不要关闭此页面
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
