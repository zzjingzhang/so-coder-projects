import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--gaming-dark)] flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-2xl">
          <div className="relative mb-8">
            <h1 className="text-[150px] md:text-[200px] font-bold bg-gradient-to-r from-[var(--gaming-neon)] via-[var(--gaming-cyan)] to-[var(--gaming-purple)] bg-clip-text text-transparent animate-pulse-gradient">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-32 h-32 bg-[var(--gaming-neon)]/20 rounded-full blur-3xl animate-pulse" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-[var(--gaming-light)] mb-4">
            Page Not Found
          </h2>
          
          <p className="text-lg text-[var(--gaming-muted)] mb-8 leading-relaxed">
            Oops! It seems like the page you're looking for has wandered off into the gaming void. 
            Don't worry, even the best gamers get lost sometimes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="gaming-button flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </Link>

            <Link
              to="/shop"
              className="gaming-button-outline flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Browse Products
            </Link>
          </div>

          <div className="mt-16 p-6 neon-border rounded-2xl">
            <h3 className="text-xl font-bold text-[var(--gaming-light)] mb-4">
              Maybe you were looking for:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                to="/"
                className="p-4 rounded-lg bg-[var(--gaming-muted)]/10 hover:bg-[var(--gaming-neon)]/10 transition-colors duration-300 text-[var(--gaming-light)] hover:text-[var(--gaming-neon)]"
              >
                <div className="text-2xl mb-2">🏠</div>
                <div className="font-medium">Home</div>
              </Link>
              <Link
                to="/shop"
                className="p-4 rounded-lg bg-[var(--gaming-muted)]/10 hover:bg-[var(--gaming-cyan)]/10 transition-colors duration-300 text-[var(--gaming-light)] hover:text-[var(--gaming-cyan)]"
              >
                <div className="text-2xl mb-2">🎮</div>
                <div className="font-medium">Shop</div>
              </Link>
              <Link
                to="/reviews"
                className="p-4 rounded-lg bg-[var(--gaming-muted)]/10 hover:bg-[var(--gaming-purple)]/10 transition-colors duration-300 text-[var(--gaming-light)] hover:text-[var(--gaming-purple)]"
              >
                <div className="text-2xl mb-2">⭐</div>
                <div className="font-medium">Reviews</div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
