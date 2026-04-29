import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Film, 
  Upload, 
  Sparkles, 
  ArrowRight, 
  Camera, 
  Palette, 
  Share2 
} from 'lucide-react';

const features = [
  {
    icon: Upload,
    title: '简单上传',
    description: '拖放最多10张照片，快速开始您的视频创作之旅',
  },
  {
    icon: Palette,
    title: '主题多样',
    description: '选择圣诞节、新年、生日、婚礼等多种节日主题',
  },
  {
    icon: Film,
    title: '风格自由',
    description: '电影、梦幻、活力、优雅四种视频风格任您选择',
  },
  {
    icon: Sparkles,
    title: 'AI智能生成',
    description: '基于先进的人工智能技术，为您的照片注入生命力',
  },
  {
    icon: Camera,
    title: '高质量输出',
    description: '专业级视频质量，让您的回忆更加精彩动人',
  },
  {
    icon: Share2,
    title: '一键分享',
    description: '支持下载和分享，让美好瞬间传递给更多人',
  },
];

const themes = [
  { name: '圣诞节', emoji: '🎄', color: 'from-red-500 to-green-500' },
  { name: '新年', emoji: '🎆', color: 'from-yellow-400 to-orange-500' },
  { name: '生日', emoji: '🎂', color: 'from-pink-400 to-purple-500' },
  { name: '婚礼', emoji: '💒', color: 'from-rose-300 to-pink-400' },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Film className="w-8 h-8 text-purple-400" />
              <span className="text-xl font-bold text-white">节日视频相册</span>
            </div>
            <button
              onClick={() => navigate('/upload')}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              <span>开始创作</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* 英雄区域 */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">AI驱动的视频创作</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            将您的照片
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              转变为
            </span>
            <br />
            精彩节日视频
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            使用人工智能技术，为您的照片添加节日魔法。只需上传照片，选择主题和风格，
            即可生成令人惊叹的节日视频相册。
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/upload')}
              className="flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-xl hover:shadow-purple-500/30 transform hover:scale-105"
            >
              <Upload className="w-5 h-5" />
              <span>立即开始</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 主题展示 */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            多种节日主题
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {themes.map((theme, index) => (
              <div
                key={index}
                className="relative group cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
                <div className="relative bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 text-center hover:border-purple-500/50 transition-all duration-300">
                  <span className="text-5xl mb-4 block">{theme.emoji}</span>
                  <h3 className="text-xl font-semibold text-white">{theme.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 功能特性 */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
            为什么选择我们
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            我们的平台提供完整的视频创作解决方案，让您的照片讲述动人故事
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/80 hover:border-purple-500/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 工作流程 */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            简单三步，生成视频
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">上传照片</h3>
              <p className="text-slate-400">拖放最多10张您想要处理的照片</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">选择主题风格</h3>
              <p className="text-slate-400">选择您喜欢的节日主题和视频风格</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">生成分享</h3>
              <p className="text-slate-400">AI自动生成视频，支持下载和分享</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA区域 */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-50"></div>
            <div className="relative bg-slate-800/80 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-8 sm:p-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                准备好开始创作了吗？
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                立即上传您的照片，让AI为您创造独一无二的节日视频相册
              </p>
              <button
                onClick={() => navigate('/upload')}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-xl hover:shadow-purple-500/30 transform hover:scale-105"
              >
                <Upload className="w-5 h-5" />
                <span>开始创作</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="py-8 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center text-slate-500">
          <p>© 2024 节日视频相册. 基于AI技术的视频创作平台</p>
        </div>
      </footer>
    </div>
  );
}
