import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Code, Palette, Server, Cloud } from 'lucide-react';

const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Code size={32} className="text-blue-400" />,
      title: 'Frontend Development',
      description: 'Building beautiful, responsive user interfaces with React, Vue.js, and modern CSS.'
    },
    {
      icon: <Server size={32} className="text-purple-400" />,
      title: 'Backend Development',
      description: 'Creating robust APIs and server-side applications with Node.js, Python, and more.'
    },
    {
      icon: <Cloud size={32} className="text-pink-400" />,
      title: 'Cloud & DevOps',
      description: 'Deploying and managing applications on AWS, Docker, and CI/CD pipelines.'
    },
    {
      icon: <Palette size={32} className="text-green-400" />,
      title: 'UI/UX Design',
      description: 'Crafting intuitive and aesthetically pleasing user experiences.'
    }
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {t.about.title}
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* About Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Glass Card for Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl mx-auto">
                    <span className="text-5xl font-bold text-white">SS</span>
                  </div>
                  <p className="mt-4 text-gray-400">5+ Years Experience</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {t.about.content}
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
                <p className="text-3xl font-bold text-blue-400">50+</p>
                <p className="text-gray-400 text-sm">Projects</p>
              </div>
              <div className="text-center p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
                <p className="text-3xl font-bold text-purple-400">5+</p>
                <p className="text-gray-400 text-sm">Years Exp</p>
              </div>
              <div className="text-center p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
                <p className="text-3xl font-bold text-pink-400">30+</p>
                <p className="text-gray-400 text-sm">Clients</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
