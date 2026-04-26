import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Github size={20} />, href: 'https://github.com/sametsoysal', label: 'GitHub' },
    { icon: <Linkedin size={20} />, href: 'https://linkedin.com/in/sametsoysal', label: 'LinkedIn' },
    { icon: <Twitter size={20} />, href: 'https://twitter.com/sametsoysal', label: 'Twitter' },
    { icon: <Mail size={20} />, href: 'mailto:contact@sametsoysal.com', label: 'Email' }
  ];

  return (
    <footer className="py-12 px-4 border-t border-black/10 dark:border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Samet Soysal
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {language === 'en'
                ? 'Full Stack Developer passionate about creating beautiful and functional web applications.'
                : 'Güzel ve işlevsel web uygulamaları oluşturmak için tutkulu Full Stack Geliştirici.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">
              {language === 'en' ? 'Quick Links' : 'Hızlı Bağlantılar'}
            </h4>
            <ul className="space-y-2">
              {['about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
                <li key={section}>
                  <a
                    href={`#${section}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors text-sm"
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">
              {language === 'en' ? 'Connect' : 'Bağlantı'}
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white hover:bg-white/90 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Samet Soysal. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            {language === 'en' ? 'Made with' : 'İle yapıldı'}
            <Heart size={14} className="text-red-500 fill-red-500" />
            {language === 'en' ? 'using React & Tailwind CSS' : 'React ve Tailwind CSS kullanılarak'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
