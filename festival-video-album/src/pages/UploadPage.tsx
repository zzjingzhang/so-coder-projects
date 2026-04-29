import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  X, 
  Film, 
  ArrowLeft, 
  Sparkles,
  Image as ImageIcon,
  Check
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import type { UploadedImage } from '../types/index';
import { HolidayTheme, VideoStyle } from '../types/index';

const holidayThemes = [
  { 
    value: HolidayTheme.CHRISTMAS, 
    label: '圣诞节', 
    emoji: '🎄',
    color: 'from-red-500 to-green-500',
    description: '雪花、圣诞树、圣诞老人'
  },
  { 
    value: HolidayTheme.NEW_YEAR, 
    label: '新年', 
    emoji: '🎆',
    color: 'from-yellow-400 to-orange-500',
    description: '烟花、香槟、倒计时'
  },
  { 
    value: HolidayTheme.BIRTHDAY, 
    label: '生日', 
    emoji: '🎂',
    color: 'from-pink-400 to-purple-500',
    description: '蛋糕、气球、祝福'
  },
  { 
    value: HolidayTheme.WEDDING, 
    label: '婚礼', 
    emoji: '💒',
    color: 'from-rose-300 to-pink-400',
    description: '优雅、浪漫、幸福'
  },
];

const videoStyles = [
  { 
    value: VideoStyle.CINEMATIC, 
    label: '电影', 
    icon: '🎬',
    description: '戏剧性灯光，专业镜头'
  },
  { 
    value: VideoStyle.DREAMY, 
    label: '梦幻', 
    icon: '✨',
    description: '柔和焦点，魔法效果'
  },
  { 
    value: VideoStyle.ENERGETIC, 
    label: '活力', 
    icon: '⚡',
    description: '快节奏剪辑，鲜艳色彩'
  },
  { 
    value: VideoStyle.ELEGANT, 
    label: '优雅', 
    icon: '🌸',
    description: '流畅过渡，精致美学'
  },
];

export default function UploadPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const {
    uploadedImages,
    generationConfig,
    addImages,
    removeImage,
    updateConfig,
    startGeneration,
  } = useAppContext();

  // 处理文件选择
  const handleFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const imageFiles = fileArray.filter((file) => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      alert('请选择图片文件');
      return;
    }

    const remainingSlots = 10 - uploadedImages.length;
    const filesToAdd = imageFiles.slice(0, remainingSlots);

    if (filesToAdd.length < imageFiles.length) {
      alert(`最多只能上传10张图片，已选择${filesToAdd.length}张`);
    }

    const newImages: UploadedImage[] = filesToAdd.map((file) => ({
      id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    addImages(newImages);
  }, [uploadedImages.length, addImages]);

  // 拖放处理
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleGenerate = () => {
    if (uploadedImages.length === 0) {
      alert('请至少上传一张图片');
      return;
    }
    
    startGeneration();
    navigate('/processing');
  };

  const canGenerate = uploadedImages.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">返回</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <Film className="w-8 h-8 text-purple-400" />
              <span className="text-xl font-bold text-white">节日视频相册</span>
            </div>
            
            <div className="w-20"></div>
          </div>
        </div>
      </nav>

      {/* 主内容区 */}
      <main className="pt-24 pb-32 px-4">
        <div className="max-w-5xl mx-auto">
          {/* 页面标题 */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              创建您的节日视频相册
            </h1>
            <p className="text-slate-400 text-lg">
              上传照片，选择主题和风格，让AI为您创造精彩视频
            </p>
          </div>

          {/* 上传区域 */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
                <ImageIcon className="w-5 h-5 text-purple-400" />
                <span>上传照片</span>
              </h2>
              <span className="text-sm text-slate-400">
                {uploadedImages.length} / 10 张照片
              </span>
            </div>

            {/* 拖放区域 */}
            {uploadedImages.length < 10 && (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                  isDragging
                    ? 'border-purple-400 bg-purple-500/10'
                    : 'border-slate-600 hover:border-purple-500/50 bg-slate-800/30'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                
                <div className="flex flex-col items-center space-y-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isDragging ? 'bg-purple-500/20' : 'bg-slate-700/50'
                  }`}>
                    <Upload className={`w-8 h-8 transition-colors duration-300 ${
                      isDragging ? 'text-purple-400' : 'text-slate-400'
                    }`} />
                  </div>
                  
                  <div>
                    <p className="text-lg font-medium text-white mb-1">
                      {isDragging ? '松开鼠标上传图片' : '拖放图片到这里'}
                    </p>
                    <p className="text-sm text-slate-400">
                      或点击选择文件（最多10张）
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <span>支持格式: JPG, PNG, GIF, WEBP</span>
                  </div>
                </div>
              </div>
            )}

            {/* 已上传图片预览 */}
            {uploadedImages.length > 0 && (
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {uploadedImages.map((image) => (
                  <div
                    key={image.id}
                    className="relative group aspect-square rounded-xl overflow-hidden bg-slate-700"
                  >
                    <img
                      src={image.previewUrl}
                      alt="上传的照片"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* 删除按钮 */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(image.id);
                        URL.revokeObjectURL(image.previewUrl);
                      }}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-500/80"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                    
                    {/* 序号 */}
                    <div className="absolute bottom-2 left-2 w-6 h-6 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-white">
                        {uploadedImages.indexOf(image) + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 主题选择 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white flex items-center space-x-2 mb-6">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>选择节日主题</span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {holidayThemes.map((theme) => (
                <button
                  key={theme.value}
                  onClick={() => updateConfig({ theme: theme.value })}
                  className={`relative p-4 rounded-2xl text-center transition-all duration-300 ${
                    generationConfig.theme === theme.value
                      ? 'bg-slate-800 ring-2 ring-purple-500'
                      : 'bg-slate-800/50 hover:bg-slate-800/80'
                  }`}
                >
                  {generationConfig.theme === theme.value && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <span className="text-4xl mb-3 block">{theme.emoji}</span>
                  <h3 className="text-lg font-semibold text-white mb-1">{theme.label}</h3>
                  <p className="text-xs text-slate-400">{theme.description}</p>
                </button>
              ))}
            </div>
          </section>

          {/* 风格选择 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white flex items-center space-x-2 mb-6">
              <Film className="w-5 h-5 text-purple-400" />
              <span>选择视频风格</span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {videoStyles.map((style) => (
                <button
                  key={style.value}
                  onClick={() => updateConfig({ style: style.value })}
                  className={`relative p-4 rounded-2xl text-center transition-all duration-300 ${
                    generationConfig.style === style.value
                      ? 'bg-slate-800 ring-2 ring-purple-500'
                      : 'bg-slate-800/50 hover:bg-slate-800/80'
                  }`}
                >
                  {generationConfig.style === style.value && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <span className="text-4xl mb-3 block">{style.icon}</span>
                  <h3 className="text-lg font-semibold text-white mb-1">{style.label}</h3>
                  <p className="text-xs text-slate-400">{style.description}</p>
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* 底部固定按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="hidden sm:block">
              <p className="text-sm text-slate-400">
                {uploadedImages.length > 0 
                  ? `已选择 ${uploadedImages.length} 张照片，准备生成` 
                  : '请上传照片开始创作'
                }
              </p>
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={!canGenerate}
              className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                canGenerate
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105'
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span>生成视频</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
