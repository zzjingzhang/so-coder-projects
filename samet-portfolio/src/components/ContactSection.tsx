import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from 'lucide-react';

const ContactSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
    
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} className="text-blue-500" />,
      title: language === 'en' ? 'Email' : 'E-posta',
      value: 'contact@sametsoysal.com'
    },
    {
      icon: <Phone size={24} className="text-purple-500" />,
      title: language === 'en' ? 'Phone' : 'Telefon',
      value: '+90 555 123 4567'
    },
    {
      icon: <MapPin size={24} className="text-pink-500" />,
      title: language === 'en' ? 'Location' : 'Konum',
      value: language === 'en' ? 'Istanbul, Turkey' : 'İstanbul, Türkiye'
    }
  ];

  const socialLinks = [
    { icon: <Github size={24} />, href: 'https://github.com/sametsoysal', label: 'GitHub' },
    { icon: <Linkedin size={24} />, href: 'https://linkedin.com/in/sametsoysal', label: 'LinkedIn' },
    { icon: <Twitter size={24} />, href: 'https://twitter.com/sametsoysal', label: 'Twitter' }
  ];

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {t.contact.title}
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                {language === 'en'
                  ? 'Feel free to reach out to me for any inquiries, collaboration opportunities, or just to say hello. I\'m always excited to connect with fellow developers and potential clients.'
                  : 'Herhangi bir soru, işbirliği fırsatı veya sadece merhaba demek için benimle iletişime geçmekten çekinmeyin. Diğer geliştiriciler ve potansiyel müşterilerle bağlantı kurmak her zaman heyecan verici.'}
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-xl hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-300"
                >
                  <div className="p-3 bg-black/5 dark:bg-white/5 rounded-lg">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{info.title}</p>
                    <p className="text-gray-900 dark:text-white font-medium">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-gray-500 text-sm mb-4">
                {language === 'en' ? 'Follow me on social media' : 'Sosyal medyada beni takip edin'}
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white hover:bg-white/90 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-10"></div>
            <div className="relative bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-3xl p-8">
              {submitSuccess ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {language === 'en' ? 'Message Sent!' : 'Mesaj Gönderildi!'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {language === 'en' ? 'Thank you for reaching out. I\'ll get back to you soon.' : 'İletişime geçtiğiniz için teşekkürler. En kısa sürede size döneceğim.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.contact.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-white/5 border border-black/20 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder={language === 'en' ? 'Your name' : 'Adınız'}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.contact.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-white/5 border border-black/20 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder={language === 'en' ? 'your@email.com' : 'sizin@email.com'}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.contact.message}
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-white/5 border border-black/20 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder={language === 'en' ? 'Your message...' : 'Mesajınız...'}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {language === 'en' ? 'Sending...' : 'Gönderiliyor...'}
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        {t.contact.send}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
