import React, { useState, useEffect } from 'react';
import ImageWithFallback from '@/components/ImageWithFallback';

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleBuyNow = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWatchDemo = () => {
    alert('Demo video would play here!');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f0f1a 100%), url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dark%20neon%20lit%20gaming%20room%20atmosphere%20with%20retro%20arcade%20machines%20and%20vibrant%20purple%20pink%20blue%20lights%20cinematic%20mood&image_size=landscape_16_9')`,
          backgroundBlendMode: 'overlay',
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--gaming-dark)]/90 via-[var(--gaming-purple)]/40 to-[var(--gaming-neon)]/30" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--gaming-neon)]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[var(--gaming-cyan)]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[var(--gaming-purple)]/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`text-center lg:text-left transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--gaming-neon)]/10 border border-[var(--gaming-neon)]/30 mb-6">
              <span className="w-2 h-2 bg-[var(--gaming-neon)] rounded-full animate-pulse" />
              <span className="text-[var(--gaming-neon)] text-sm font-medium">
                New Release 2024
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="block text-[var(--gaming-light)] mb-2">
                Introducing
              </span>
              <span className="block bg-gradient-to-r from-[var(--gaming-neon)] via-[var(--gaming-cyan)] to-[var(--gaming-purple)] bg-clip-text text-transparent animate-pulse-gradient">
                PLAYBOX
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--gaming-muted)] mb-8 max-w-2xl mx-auto lg:mx-0">
              The ultimate portable gaming experience. Play 20,000+ classic retro games 
              anywhere, anytime. Stunning HD display, 8-hour battery life, and immersive 
              audio that brings your favorite games to life.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <button
                onClick={handleBuyNow}
                className="gaming-button w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Buy Now - $199.99
              </button>
              
              <button
                onClick={handleWatchDemo}
                className="gaming-button-outline w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Demo
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[var(--gaming-neon)]">
                  20K+
                </div>
                <div className="text-sm text-[var(--gaming-muted)]">Games</div>
              </div>
              <div className="text-center border-x border-[var(--gaming-muted)]/30">
                <div className="text-2xl md:text-3xl font-bold text-[var(--gaming-cyan)]">
                  8H
                </div>
                <div className="text-sm text-[var(--gaming-muted)]">Battery</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[var(--gaming-purple)]">
                  4.9★
                </div>
                <div className="text-sm text-[var(--gaming-muted)]">Rating</div>
              </div>
            </div>
          </div>

          <div className={`relative flex items-center justify-center transition-all duration-1000 delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-r from-[var(--gaming-neon)] via-[var(--gaming-cyan)] to-[var(--gaming-purple)] rounded-3xl blur-3xl opacity-50 animate-pulse" />
              
              <div className="relative animate-float">
                <ImageWithFallback
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sleek%20modern%20portable%20handheld%20gaming%20console%20PLAYBOX%20with%20neon%20pink%20purple%20blue%20lighting%20effects%20on%20dark%20background%20product%20photography%20high%20quality%20render&image_size=square_hd"
                  alt="PLAYBOX Portable Gaming Console"
                  className="w-80 h-80 md:w-96 md:h-96 rounded-2xl"
                  fallbackContent={
                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[var(--gaming-dark)] to-[var(--gaming-dark-secondary)] flex items-center justify-center border-2 border-dashed border-[var(--gaming-neon)]/30">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🎮</div>
                        <div className="text-xl font-bold text-[var(--gaming-light)]">PLAYBOX</div>
                        <div className="text-sm text-[var(--gaming-muted)]">Portable Gaming Console</div>
                      </div>
                    </div>
                  }
                />
                
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center gap-2 px-4 py-2 bg-[var(--gaming-dark)]/80 backdrop-blur-sm rounded-full border border-[var(--gaming-neon)]/30">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-[var(--gaming-dark)] bg-gradient-to-br from-[var(--gaming-neon)] to-[var(--gaming-purple)] flex items-center justify-center text-xs font-bold"
                        >
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-[var(--gaming-light)]">
                      <span className="font-bold text-[var(--gaming-neon)]">10K+</span> happy customers
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute -top-8 -right-8 animate-bounce" style={{ animationDelay: '0.5s' }}>
                <div className="w-16 h-16 bg-[var(--gaming-dark)] rounded-2xl border-2 border-[var(--gaming-neon)] flex items-center justify-center shadow-lg shadow-[var(--gaming-neon)]/20">
                  <span className="text-2xl">🎮</span>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-8 animate-bounce" style={{ animationDelay: '1s' }}>
                <div className="w-16 h-16 bg-[var(--gaming-dark)] rounded-2xl border-2 border-[var(--gaming-cyan)] flex items-center justify-center shadow-lg shadow-[var(--gaming-cyan)]/20">
                  <span className="text-2xl">🔋</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-[var(--gaming-muted)]">
          <span className="text-sm">Scroll to explore</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
