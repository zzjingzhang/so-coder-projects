import { useState, useRef, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, User, Heart, FileText, Sparkles, ImagePlus, X, Check, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import type { UserProfile } from '@/types';
import { defaultUserProfile } from '@/mock';

export function GeneratorPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(defaultUserProfile);
  const [heroPreview, setHeroPreview] = useState<string | null>(null);
  const [aboutPreview, setAboutPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const heroInputRef = useRef<HTMLInputElement>(null);
  const aboutInputRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = '请输入姓名';
    }
    if (!formData.hobbies.trim()) {
      newErrors.hobbies = '请输入爱好';
    }
    if (!formData.bio.trim()) {
      newErrors.bio = '请输入个人简介';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>, type: 'hero' | 'about') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('图片大小不能超过 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (type === 'hero') {
          setHeroPreview(result);
          setFormData((prev) => ({ ...prev, heroImage: result }));
        } else {
          setAboutPreview(result);
          setFormData((prev) => ({ ...prev, aboutImage: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (type: 'hero' | 'about') => {
    if (type === 'hero') {
      setHeroPreview(null);
      setFormData((prev) => ({ ...prev, heroImage: defaultUserProfile.heroImage }));
      if (heroInputRef.current) {
        heroInputRef.current.value = '';
      }
    } else {
      setAboutPreview(null);
      setFormData((prev) => ({ ...prev, aboutImage: defaultUserProfile.aboutImage }));
      if (aboutInputRef.current) {
        aboutInputRef.current.value = '';
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/portfolio', { state: { profile: formData } });
    }, 2500);
  };

  const InputField = ({
    label,
    name,
    value,
    placeholder,
    type = 'text',
    icon: Icon,
    error,
  }: {
    label: string;
    name: string;
    value: string;
    placeholder: string;
    type?: string;
    icon: React.ComponentType<{ className?: string }>;
    error?: string;
  }) => (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-100">
        <Icon className="w-4 h-4 text-primary" />
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 
          bg-slate-50 dark:bg-[#1e293b] text-slate-800 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400
          focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
          ${error ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'}`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );

  const ImageUploadField = ({
    label,
    type,
    preview,
    inputRef,
  }: {
    label: string;
    type: 'hero' | 'about';
    preview: string | null;
    inputRef: React.RefObject<HTMLInputElement | null>;
  }) => (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-100">
        <ImagePlus className="w-4 h-4 text-primary" />
        {label}
      </label>
      <div
        onClick={() => inputRef.current?.click()}
        className="relative w-full h-48 rounded-xl border-2 border-dashed 
          border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-[#1e293b] cursor-pointer
          hover:border-primary hover:bg-primary/5 transition-all duration-300
          flex items-center justify-center overflow-hidden"
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt={label}
              className="w-full h-full object-cover"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeImage(type);
              }}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full
                hover:bg-red-600 transition-colors shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400">
            <Upload className="w-8 h-8" />
            <span className="text-sm">点击上传图片</span>
            <span className="text-xs">支持 JPG、PNG、GIF（最大 5MB）</span>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e, type)}
        className="hidden"
      />
    </div>
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a] transition-colors duration-300">
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-[#0f172a]/80 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-slate-800 dark:text-slate-100">个人网站生成器</span>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-[#1e293b] hover:bg-slate-200 dark:hover:bg-[#334155]
                text-slate-800 dark:text-slate-100 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            一键生成专业个人网站
          </div>
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            创建您的专属个人网站
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            填写以下信息，我们将为您生成一个精美的个人展示网站，包含首页、关于、技能、服务、作品集等多个章节
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-[#1e293b] rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-700">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                基本信息
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="姓名"
                  name="name"
                  value={formData.name}
                  placeholder="请输入您的姓名"
                  icon={User}
                  error={errors.name}
                />
                <InputField
                  label="爱好"
                  name="hobbies"
                  value={formData.hobbies}
                  placeholder="例如：编程、摄影、旅行"
                  icon={Heart}
                  error={errors.hobbies}
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-100">
                  <FileText className="w-4 h-4 text-primary" />
                  个人简介
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="请介绍一下您自己..."
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 
                    bg-slate-50 dark:bg-[#1e293b] text-slate-800 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400
                    focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                    resize-none ${errors.bio ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'}`}
                />
                {errors.bio && <p className="text-sm text-red-500">{errors.bio}</p>}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <ImagePlus className="w-5 h-5 text-primary" />
                图片上传
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageUploadField
                  label="主页照片"
                  type="hero"
                  preview={heroPreview}
                  inputRef={heroInputRef}
                />
                <ImageUploadField
                  label="关于我的照片"
                  type="about"
                  preview={aboutPreview}
                  inputRef={aboutInputRef}
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary to-accent
                  text-white font-semibold text-lg shadow-lg hover:shadow-xl
                  transform hover:-translate-y-0.5 transition-all duration-300
                  flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                生成网站
              </button>
            </div>
          </div>
        </form>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Check, title: '响应式设计', desc: '完美适配各种设备' },
            { icon: Check, title: '主题切换', desc: '支持亮/暗色模式' },
            { icon: Check, title: '丰富组件', desc: '轮播、导航、表单等' },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-100">{item.title}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
