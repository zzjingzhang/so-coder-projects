import React from 'react';
import { brandSlogan } from '../mock';
import { MusicIcon } from './Icons';

const BrandSlogan: React.FC = () => {
  const { slogan, subtext, signature } = brandSlogan;

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-purple-900/30 to-gray-900" />

      <div className="absolute inset-0">
        <img
          src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=concert%20stage%20lights%20music%20festival%20dark%20atmospheric%20purple%20pink%20neon&image_size=landscape_16_9"
          alt="Music background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-end space-x-2 h-48 opacity-30">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
              <div
                key={i}
                className="w-4 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full animate-pulse"
                style={{
                  height: `${40 + Math.sin(i * 0.5) * 60 + i * 8}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl mb-8">
          <MusicIcon size={40} className="text-purple-400" />
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
          <span className="block bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            "{slogan}"
          </span>
        </h2>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light leading-relaxed">
          {subtext}
        </p>

        <p className="text-lg text-purple-400 font-medium italic">
          {signature}
        </p>

        <div className="mt-16 flex justify-center">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            <MusicIcon size={20} className="text-purple-400" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandSlogan;
