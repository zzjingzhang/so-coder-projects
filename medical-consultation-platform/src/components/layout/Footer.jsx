import { Link } from 'react-router-dom';
import {
  Home,
  Calendar,
  MessageCircle,
  FileText,
  Pill,
  User,
  AlertTriangle,
  Phone,
  Mail,
  MapPin,
  Heart,
} from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: '首页', icon: Home },
    { path: '/appointment', label: '医生预约', icon: Calendar },
    { path: '/consultation', label: '在线问诊', icon: MessageCircle },
    { path: '/medical-records', label: '病历管理', icon: FileText },
    { path: '/medicines', label: '药品信息', icon: Pill },
    { path: '/health-records', label: '健康档案', icon: User },
    { path: '/emergency', label: '紧急求助', icon: AlertTriangle },
  ];

  const services = [
    { label: '医生预约', path: '/appointment' },
    { label: '在线问诊', path: '/consultation' },
    { label: '健康检查', path: '/health-records' },
    { label: '药品配送', path: '/medicines' },
  ];

  const contactInfo = [
    { icon: Phone, label: '客服热线', value: '400-888-8888' },
    { icon: Mail, label: '邮箱', value: 'service@medical.com' },
    { icon: MapPin, label: '地址', value: '某市某区某路1号' },
  ];

  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-text">智慧医疗</span>
            </div>
            <p className="text-sm text-text-secondary mb-4">
              为您提供专业、便捷、高效的在线医疗服务，让健康触手可及。
            </p>
            <div className="space-y-2">
              {contactInfo.slice(0, 2).map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="flex items-center gap-2 text-sm text-text-secondary">
                    <Icon className="w-4 h-4" />
                    <span>{info.label}：{info.value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-text mb-4">快速链接</h4>
            <div className="space-y-2">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-text mb-4">服务项目</h4>
            <div className="space-y-2">
              {services.map((service, index) => (
                <Link
                  key={index}
                  to={service.path}
                  className="block text-sm text-text-secondary hover:text-primary transition-colors"
                >
                  {service.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-text mb-4">关于我们</h4>
            <div className="space-y-2 text-sm text-text-secondary">
              <p>智慧医疗是一家致力于提供便捷在线医疗服务的平台。</p>
              <p>我们连接优质医疗资源，让每个人都能享受到专业的医疗服务。</p>
              <div className="pt-2">
                <p className="text-xs text-text-secondary">
                  工作时间：周一至周日 9:00-21:00
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  紧急情况请拨打：120
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border-light">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-text-secondary">
              © {currentYear} 智慧医疗. 保留所有权利.
            </p>
            <div className="flex items-center gap-4 text-sm text-text-secondary">
              <a href="#" className="hover:text-primary transition-colors">隐私政策</a>
              <a href="#" className="hover:text-primary transition-colors">服务条款</a>
              <a href="#" className="hover:text-primary transition-colors">帮助中心</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
