import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  service: string;
}

interface FormErrors {
  [key: string]: string;
}

const businessHours = [
  { day: '周一至周五', hours: '9:00 - 18:00' },
  { day: '周六', hours: '10:00 - 16:00' },
  { day: '周日', hours: '休息' },
];

const services = [
  '网页设计',
  '品牌设计',
  'UI/UX 设计',
  '前端开发',
  '其他服务',
];

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    service: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);

  const heroRef = useScrollAnimation({ threshold: 0.1 });
  const formRef = useScrollAnimation({ threshold: 0.1 });
  const infoRef = useScrollAnimation({ threshold: 0.1 });
  const mapRef = useScrollAnimation({ threshold: 0.1 });
  const ctaRef = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.service-dropdown-container')) {
        setShowServiceDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = '请输入您的姓名';
    }

    if (!formData.email.trim()) {
      newErrors.email = '请输入您的邮箱';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    if (formData.phone && !/^[\d\s\-+()]+$/.test(formData.phone)) {
      newErrors.phone = '请输入有效的电话号码';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = '请输入主题';
    }

    if (!formData.message.trim()) {
      newErrors.message = '请输入您的留言';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = '留言内容至少需要10个字符';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleServiceSelect = (service: string) => {
    setFormData((prev) => ({ ...prev, service }));
    setShowServiceDropdown(false);
    if (errors.service) {
      setErrors((prev) => ({ ...prev, service: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsSubmitting(false);
      setSubmitStatus('success');

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        service: '',
      });

      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch {
      setIsSubmitting(false);
      setSubmitStatus('error');

      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-primary/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div
            ref={heroRef.ref}
            className={cn(
              'text-center max-w-3xl mx-auto transition-all duration-700',
              heroRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <MessageSquare className="w-4 h-4" />
              联系我们
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              让我们开始
              <br />
              <span className="text-primary">对话</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              无论您有任何问题、想法或项目需求，我们都非常乐意与您沟通。
              填写下方表单，我们会尽快与您联系。
            </p>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      </section>

      {/* Main Content Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div
              ref={formRef.ref}
              className={cn(
                'lg:col-span-2 transition-all duration-700',
                formRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <div className="bg-gray-50 p-8 lg:p-10 rounded-2xl border border-gray-100">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  发送消息
                </h2>
                <p className="text-gray-600 mb-8">
                  填写以下表单，我们会在 24 小时内回复您。
                </p>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-green-700">
                      消息发送成功！我们会尽快与您联系。
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                    <div className="w-5 h-5 text-red-600 flex-shrink-0 flex items-center justify-center">
                      <span className="text-red-600 font-bold">!</span>
                    </div>
                    <p className="text-red-700">
                      消息发送失败，请稍后重试。
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        姓名 <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={cn(
                          'w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary/50',
                          errors.name
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-200 bg-white focus:border-primary'
                        )}
                        placeholder="请输入您的姓名"
                        disabled={isSubmitting}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        邮箱 <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={cn(
                          'w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary/50',
                          errors.email
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-200 bg-white focus:border-primary'
                        )}
                        placeholder="your@email.com"
                        disabled={isSubmitting}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        电话
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={cn(
                          'w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary/50',
                          errors.phone
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-200 bg-white focus:border-primary'
                        )}
                        placeholder="您的联系电话"
                        disabled={isSubmitting}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>

                    <div className="service-dropdown-container relative">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        服务类型
                      </label>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowServiceDropdown(!showServiceDropdown);
                        }}
                        className={cn(
                          'w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 flex items-center justify-between text-left',
                          formData.service ? 'text-gray-900' : 'text-gray-400',
                          'border-gray-200 bg-white focus:border-primary'
                        )}
                        disabled={isSubmitting}
                      >
                        <span>{formData.service || '请选择服务类型'}</span>
                        <ChevronDown
                          className={cn(
                            'w-5 h-5 text-gray-400 transition-transform',
                            showServiceDropdown && 'rotate-180'
                          )}
                        />
                      </button>

                      {showServiceDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
                          {services.map((service) => (
                            <button
                              key={service}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleServiceSelect(service);
                              }}
                              className={cn(
                                'w-full px-4 py-3 text-left transition-colors',
                                formData.service === service
                                  ? 'bg-primary/10 text-primary'
                                  : 'text-gray-700 hover:bg-gray-50'
                              )}
                            >
                              {service}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      主题 <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={cn(
                        'w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary/50',
                        errors.subject
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-200 bg-white focus:border-primary'
                      )}
                      placeholder="请输入消息主题"
                      disabled={isSubmitting}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      留言内容 <span className="text-primary">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className={cn(
                        'w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none',
                        errors.message
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-200 bg-white focus:border-primary'
                      )}
                      placeholder="请详细描述您的项目需求或问题..."
                      disabled={isSubmitting}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-400">
                      至少 10 个字符，当前：{formData.message.length} 个字符
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      'w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-medium transition-all',
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30'
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>发送中...</span>
                      </>
                    ) : (
                      <>
                        <span>发送消息</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div
              ref={infoRef.ref}
              className={cn(
                'space-y-8 transition-all duration-700',
                infoRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">联系方式</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">公司地址</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        上海市浦东新区世纪大道 1000 号
                        <br />
                        环球金融中心 28 层
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">联系电话</h4>
                      <p className="text-gray-600 text-sm">+86 21 8888 8888</p>
                      <p className="text-gray-600 text-sm">+86 138 8888 8888</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">电子邮箱</h4>
                      <p className="text-gray-600 text-sm">hello@avana-llc.com</p>
                      <p className="text-gray-600 text-sm">support@avana-llc.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">工作时间</h4>
                      <div className="space-y-1">
                        {businessHours.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-600">{item.day}</span>
                            <span
                              className={cn(
                                'font-medium',
                                item.day === '周日' ? 'text-gray-400' : 'text-gray-900'
                              )}
                            >
                              {item.hours}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-3">关注我们</h3>
                <p className="text-white/80 text-sm mb-6">
                  关注我们的社交媒体，获取最新的设计灵感和公司动态。
                </p>

                <div className="flex items-center gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors group"
                  >
                    <span className="text-white font-bold group-hover:scale-110 transition-transform">f</span>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors group"
                  >
                    <span className="text-white font-bold group-hover:scale-110 transition-transform">X</span>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors group"
                  >
                    <span className="text-white font-bold group-hover:scale-110 transition-transform">in</span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors group"
                  >
                    <span className="text-white font-bold group-hover:scale-110 transition-transform">Li</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section
        ref={mapRef.ref}
        className={cn(
          'bg-gray-50 transition-all duration-700',
          mapRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              公司位置
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              找到我们
            </h2>
            <p className="text-gray-600 text-lg">
              我们位于上海市浦东新区的核心商业区，交通便利，欢迎预约来访。
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative h-96 sm:h-[500px] bg-gradient-to-br from-gray-100 to-gray-200">
              <iframe
                title="Avana LLC 公司位置"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3412.0!2d121.5!3d31.23!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDEzJzQ4LjAiTiAxMjHCsDMwJzAwLjAiRQ!5e0!3m2!1szh-CN!2scn!4v1710000000000!5m2!1szh-CN!2scn"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <div className="relative">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-dark rounded-full" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 border-t border-gray-100">
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">地址</p>
                    <p className="text-sm font-medium text-gray-900">
                      浦东新区世纪大道 1000 号
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">电话</p>
                    <p className="text-sm font-medium text-gray-900">+86 21 8888 8888</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">工作时间</p>
                    <p className="text-sm font-medium text-gray-900">周一至周五 9:00-18:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef.ref}
        className={cn(
          'py-20 lg:py-32 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden transition-all duration-700',
          ctaRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            准备好开始您的项目了吗？
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            无论是品牌设计、网站开发还是数字营销，我们都能为您提供专业的解决方案。
            立即联系我们，开启您的创意之旅。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/portfolio/web-design"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl"
            >
              <span>查看作品案例</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="flex flex-col sm:flex-row items-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>+86 21 8888 8888</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>hello@avana-llc.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
