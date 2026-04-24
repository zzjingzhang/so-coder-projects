import React from 'react';
import { aboutData } from '../mock';
import { MusicIcon, HeadphonesIcon, DiscIcon } from './Icons';

const AboutUs: React.FC = () => {
  const { title, subtitle, description, stats } = aboutData;

  const icons = [MusicIcon, HeadphonesIcon, DiscIcon];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
              <span className="w-2 h-2 bg-pink-400 rounded-full mr-2" />
              <span className="text-sm text-pink-400 font-medium">品牌故事</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {title}
            </h2>
            <p className="text-xl text-purple-400 mb-6 font-medium">
              {subtitle}
            </p>
            <p className="text-gray-400 leading-relaxed mb-10">
              {description}
            </p>

            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => {
                const Icon = icons[index] || MusicIcon;
                return (
                  <div
                    key={index}
                    className="text-center p-6 bg-gray-700/30 rounded-2xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                      <Icon size={24} className="text-purple-400" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-8">
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <img
                  src="https://picsum.photos/seed/vinylstore/500/500"
                  alt="Vinyl records collection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl opacity-20 blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl opacity-20 blur-xl" />

            <div className="absolute -bottom-6 -left-6 bg-gray-800 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 shadow-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <MusicIcon size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">自2015年</div>
                  <div className="text-sm text-gray-400">专注音乐体验</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
