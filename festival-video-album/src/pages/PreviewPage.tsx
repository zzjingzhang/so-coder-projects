import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Film, 
  ArrowLeft, 
  Play, 
  Pause, 
  Download, 
  Share2, 
  Copy, 
  Check,
  Sparkles,
  RefreshCw,
  X
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { downloadVideo, shareVideo, copyToClipboard } from '../services/api';

export default function PreviewPage() {
  const navigate = useNavigate();
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [copyingId, setCopyingId] = useState<string | null>(null);
  const [sharingId, setSharingId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<string | null>(null);
  
  const {
    uploadedImages,
    videoTasks,
    generationConfig,
    resetState,
  } = useAppContext();

  // 显示提示消息
  const showMessage = (message: string) => {
    setShowToast(message);
    setTimeout(() => setShowToast(null), 3000);
  };

  // 处理播放/暂停
  const handlePlayPause = (taskId: string) => {
    if (playingVideoId === taskId) {
      setPlayingVideoId(null);
    } else {
      setPlayingVideoId(taskId);
    }
  };

  // 处理下载
  const handleDownload = async (task: any, index: number) => {
    if (!task.videoUrl) return;
    
    setDownloadingId(task.id);
    
    try {
      await downloadVideo(task.videoUrl, `festival-video-${index + 1}.mp4`);
      showMessage('下载已开始');
    } catch (error) {
      showMessage('下载失败，请重试');
    } finally {
      setDownloadingId(null);
    }
  };

  // 处理分享
  const handleShare = async (task: any, index: number) => {
    if (!task.videoUrl) return;
    
    setSharingId(task.id);
    
    try {
      const success = await shareVideo(
        task.videoUrl,
        '我的节日视频相册',
        `查看我用AI生成的节日视频 - 第${index + 1}个`
      );
      
      if (success) {
        showMessage('分享成功');
      } else {
        showMessage('已复制链接到剪贴板');
      }
    } catch (error) {
      showMessage('分享失败，请重试');
    } finally {
      setSharingId(null);
    }
  };

  // 处理复制链接
  const handleCopyLink = async (task: any) => {
    if (!task.videoUrl) return;
    
    setCopyingId(task.id);
    
    try {
      const success = await copyToClipboard(task.videoUrl);
      
      if (success) {
        showMessage('链接已复制到剪贴板');
      } else {
        showMessage('复制失败，请手动复制');
      }
    } catch (error) {
      showMessage('复制失败，请重试');
    } finally {
      setTimeout(() => setCopyingId(null), 2000);
    }
  };

  // 重新开始
  const handleStartOver = () => {
    resetState();
    navigate('/upload');
  };

  // 获取主题和风格的显示名称
  const getThemeLabel = () => {
    const themeMap: Record<string, string> = {
      christmas: '圣诞节',
      new_year: '新年',
      birthday: '生日',
      wedding: '婚礼',
    };
    return themeMap[generationConfig.theme] || generationConfig.theme;
  };

  const getStyleLabel = () => {
    const styleMap: Record<string, string> = {
      cinematic: '电影',
      dreamy: '梦幻',
      energetic: '活力',
      elegant: '优雅',
    };
    return styleMap[generationConfig.style] || generationConfig.style;
  };

  // 获取成功的任务
  const completedTasks = videoTasks.filter(task => task.status === 'completed');
  const failedTasks = videoTasks.filter(task => task.status === 'failed');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Toast 提示 */}
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-slate-800 border border-purple-500/30 rounded-lg px-6 py-3 shadow-xl">
            <p className="text-white font-medium">{showToast}</p>
          </div>
        </div>
      )}

      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/upload')}
              className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">返回</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <Film className="w-8 h-8 text-purple-400" />
              <span className="text-xl font-bold text-white">节日视频相册</span>
            </div>
            
            <button
              onClick={handleStartOver}
              className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              <span className="font-medium hidden sm:inline">重新开始</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 主内容区 */}
      <main className="pt-24 pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          {/* 页面标题 */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center space-x-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-green-400" />
              <span className="text-green-300 text-sm font-medium">
                {completedTasks.length} 个视频已生成
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              您的节日视频已准备好
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              {getThemeLabel()}主题 · {getStyleLabel()}风格
            </p>
          </div>

          {/* 失败提示 */}
          {failedTasks.length > 0 && (
            <div className="mb-8 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <p className="text-red-300 text-sm">
                有 {failedTasks.length} 个视频生成失败，您可以重新尝试生成。
              </p>
            </div>
          )}

          {/* 视频网格 */}
          {completedTasks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedTasks.map((task, index) => {
                const image = uploadedImages.find(img => img.id === task.imageId);
                const isPlaying = playingVideoId === task.id;
                
                return (
                  <div
                    key={task.id}
                    className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300"
                  >
                    {/* 视频/图片预览 */}
                    <div className="relative aspect-video bg-slate-900">
                      {image && (
                        <img
                          src={image.previewUrl}
                          alt={`视频 ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                      
                      {/* 播放遮罩 */}
                      <div 
                        className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                          isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
                        }`}
                      >
                        <button
                          onClick={() => handlePlayPause(task.id)}
                          className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200 group-hover:scale-110 transform"
                        >
                          <Play className="w-8 h-8 text-white ml-1" />
                        </button>
                      </div>

                      {/* 视频序号 */}
                      <div className="absolute top-3 left-3 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">{index + 1}</span>
                      </div>

                      {/* 状态标签 */}
                      <div className="absolute top-3 right-3">
                        <span className="bg-green-500/80 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                          已生成
                        </span>
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white mb-1">
                            视频 {index + 1}
                          </p>
                          <p className="text-xs text-slate-400">
                            {getThemeLabel()} · {getStyleLabel()}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {/* 复制链接 */}
                          <button
                            onClick={() => handleCopyLink(task)}
                            className="w-9 h-9 rounded-lg bg-slate-700/50 flex items-center justify-center hover:bg-slate-700 transition-colors duration-200"
                            title="复制链接"
                          >
                            {copyingId === task.id ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-slate-300" />
                            )}
                          </button>
                          
                          {/* 分享 */}
                          <button
                            onClick={() => handleShare(task, index)}
                            className="w-9 h-9 rounded-lg bg-slate-700/50 flex items-center justify-center hover:bg-slate-700 transition-colors duration-200"
                            title="分享"
                          >
                            {sharingId === task.id ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Share2 className="w-4 h-4 text-slate-300" />
                            )}
                          </button>
                          
                          {/* 下载 */}
                          <button
                            onClick={() => handleDownload(task, index)}
                            className="w-9 h-9 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors duration-200"
                            title="下载"
                          >
                            {downloadingId === task.id ? (
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                              <Download className="w-4 h-4 text-white" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <Film className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                暂无生成的视频
              </h3>
              <p className="text-slate-400 mb-6">
                看起来没有视频成功生成，请重新尝试
              </p>
              <button
                onClick={handleStartOver}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                <RefreshCw className="w-5 h-5" />
                <span>重新开始</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-slate-400">
                共 {videoTasks.length} 个任务 · 成功 {completedTasks.length} 个
                {failedTasks.length > 0 && <span className="text-red-400"> · 失败 {failedTasks.length} 个</span>}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleStartOver}
                className="flex items-center space-x-2 bg-slate-700 text-white px-6 py-2.5 rounded-full font-medium hover:bg-slate-600 transition-colors duration-200"
              >
                <RefreshCw className="w-4 h-4" />
                <span>重新创作</span>
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2.5 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                <Sparkles className="w-4 h-4" />
                <span>新建相册</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
