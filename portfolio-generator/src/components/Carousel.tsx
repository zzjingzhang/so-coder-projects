import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import type { PortfolioItem, Testimonial } from '@/types';
import * as Icons from 'lucide-react';

interface CarouselProps {
  items: PortfolioItem[] | Testimonial[];
  type: 'portfolio' | 'testimonial';
  autoPlay?: boolean;
  interval?: number;
}

export function Carousel({ items, type, autoPlay = true, interval = 5000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (autoPlay && !isPaused) {
      const timer = setInterval(goToNext, interval);
      return () => clearInterval(timer);
    }
  }, [autoPlay, interval, isPaused, goToNext]);

  if (type === 'portfolio') {
    const portfolioItems = items as PortfolioItem[];
    return (
      <div
        className="relative overflow-hidden rounded-2xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {portfolioItems.map((item) => (
            <div key={item.id} className="w-full flex-shrink-0">
              <div className="relative group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 sm:h-80 object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/80 rounded-full mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-200">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {portfolioItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  const testimonialItems = items as Testimonial[];
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonialItems.map((item) => (
            <div key={item.id} className="w-full flex-shrink-0 px-4">
              <div className="bg-slate-50 dark:bg-[#1e293b] rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-lg">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-slate-800 dark:text-slate-100 text-lg italic mb-6 leading-relaxed">
                  "{item.content}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                  />
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100">{item.name}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.role} · {item.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={goToPrev}
        className="absolute -left-4 sm:left-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={goToNext}
        className="absolute -right-4 sm:right-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {testimonialItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-primary w-8'
                : 'bg-slate-200 dark:bg-slate-600 hover:bg-primary/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function IconComponent({ name, className }: { name: string; className?: string }) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name];
  if (!Icon) {
    return <span className={className}>?</span>;
  }
  return <Icon className={className} />;
}
