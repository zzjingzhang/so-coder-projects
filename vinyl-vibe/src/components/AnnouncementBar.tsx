import React from 'react';
import { announcements } from '../mock';

const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-purple-900/80 via-pink-900/80 to-purple-900/80 py-3 overflow-hidden">
      <div className="flex items-center">
        <div className="animate-marquee whitespace-nowrap">
          {[...announcements, ...announcements].map((item, index) => (
            <span key={`${item.id}-${index}`} className="inline-flex items-center px-8">
              <span className="text-white/90 text-sm font-medium">{item.text}</span>
              <span className="mx-4 text-purple-400/50">•</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AnnouncementBar;
