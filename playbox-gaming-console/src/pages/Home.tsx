import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductShowcase from '@/components/ProductShowcase';
import Reviews from '@/components/Reviews';
import Footer from '@/components/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--gaming-dark)]">
      <Header />
      <main>
        <Hero />
        <ProductShowcase />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
