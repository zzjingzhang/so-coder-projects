import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Heart,
  Send,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { BackToTop } from '@/components/BackToTop';
import { Carousel, IconComponent } from '@/components/Carousel';
import type { UserProfile } from '@/types';
import {
  defaultUserProfile,
  skills,
  services,
  portfolioItems,
  testimonials,
  socialLinks,
  contactInfo,
} from '@/mock';

const sectionIds = ['home', 'about', 'skills', 'services', 'portfolio', 'testimonials', 'contact'];

export function PortfolioPage() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('home');
  const [profile, setProfile] = useState<UserProfile>(defaultUserProfile);

  useEffect(() => {
    if (location.state && (location.state as { profile?: UserProfile }).profile) {
      setProfile((location.state as { profile: UserProfile }).profile);
    }
  }, [location.state]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('感谢您的留言！我会尽快回复您。');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a] transition-colors duration-300">
      <Navbar activeSection={activeSection} />
      <BackToTop />

      <section
        id="home"
        className="min-h-screen flex items-center pt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Heart className="w-4 h-4" />
                {profile.hobbies}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
                你好，我是
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  {profile.name}
                </span>
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
                {profile.bio}
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    const contactEl = document.getElementById('contact');
                    contactEl?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-accent
                    text-white font-semibold shadow-lg hover:shadow-xl
                    transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  联系我
                </button>
                <button
                  onClick={() => {
                    const portfolioEl = document.getElementById('portfolio');
                    portfolioEl?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-3 rounded-xl border-2 border-primary text-primary
                    font-semibold hover:bg-primary hover:text-white
                    transition-all duration-300"
                >
                  查看作品
                </button>
              </div>
              <div className="flex items-center gap-4 pt-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700
                      text-slate-500 dark:text-slate-400 hover:text-primary hover:border-primary
                      transition-all duration-300"
                  >
                    <IconComponent name={link.icon} className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-3xl blur-2xl opacity-20" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={profile.heroImage}
                  alt={profile.name}
                  className="w-full h-[400px] sm:h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="py-20 bg-slate-50 dark:bg-[#1e293b]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">关于我</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mt-2">
              了解更多
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-accent to-primary rounded-3xl blur-2xl opacity-20" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={profile.aboutImage}
                  alt={`关于 ${profile.name}`}
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                你好！我是 {profile.name}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                {profile.bio}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">爱好</p>
                    <p className="font-medium text-slate-800 dark:text-slate-100">{profile.hobbies}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { value: '5+', label: '年经验' },
                  { value: '50+', label: '完成项目' },
                  { value: '30+', label: '满意客户' },
                  { value: '100%', label: '好评率' },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 text-center"
                  >
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="skills"
        className="py-20 bg-white dark:bg-[#0f172a]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">专业技能</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mt-2">
              我的技能栈
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="group p-6 rounded-2xl bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700
                  hover:border-primary hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                    <IconComponent name={skill.icon} className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100">{skill.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{skill.level}%</p>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-[#334155] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="services"
        className="py-20 bg-slate-50 dark:bg-[#1e293b]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">服务项目</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mt-2">
              我能为您做什么
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative p-8 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700
                  hover:border-primary hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 w-fit mb-6">
                    <IconComponent name={service.icon} className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="portfolio"
        className="py-20 bg-white dark:bg-[#0f172a]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">作品集</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mt-2">
              精选项目
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <Carousel items={portfolioItems} type="portfolio" />
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl overflow-hidden bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700
                  hover:border-primary hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="testimonials"
        className="py-20 bg-slate-50 dark:bg-[#1e293b]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">客户评价</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mt-2">
              他们怎么说
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Carousel items={testimonials} type="testimonial" />
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="py-20 bg-white dark:bg-[#0f172a]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">联系我</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mt-2">
              让我们开始合作
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">
                  联系方式
                </h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                  如果您有任何项目想法或合作意向，欢迎随时联系我。我会在24小时内回复您。
                </p>
              </div>
              <div className="space-y-6">
                {[
                  { icon: Mail, label: '邮箱', value: contactInfo.email },
                  { icon: Phone, label: '电话', value: contactInfo.phone },
                  { icon: MapPin, label: '地址', value: contactInfo.location },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
                      <p className="font-medium text-slate-800 dark:text-slate-100">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">关注我的社交媒体</p>
                <div className="flex items-center gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700
                        text-slate-500 dark:text-slate-400 hover:text-primary hover:border-primary hover:bg-primary/5
                        transition-all duration-300"
                    >
                      <IconComponent name={link.icon} className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-[#1e293b] rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-800 dark:text-slate-100 mb-2">
                    姓名
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="请输入您的姓名"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600
                      bg-white dark:bg-[#0f172a] text-slate-800 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400
                      focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                      transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-800 dark:text-slate-100 mb-2">
                    邮箱
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="请输入您的邮箱"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600
                      bg-white dark:bg-[#0f172a] text-slate-800 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400
                      focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                      transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-800 dark:text-slate-100 mb-2">
                    留言
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="请输入您想说的话..."
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600
                      bg-white dark:bg-[#0f172a] text-slate-800 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400
                      focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                      transition-all duration-300 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary to-accent
                    text-white font-semibold text-lg shadow-lg hover:shadow-xl
                    transform hover:-translate-y-0.5 transition-all duration-300
                    flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  发送留言
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-slate-50 dark:bg-[#1e293b] border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © 2024 {profile.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
                >
                  <IconComponent name={link.icon} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
