import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import AnnouncementBar from '../components/AnnouncementBar';
import ProductGrid from '../components/ProductGrid';
import AboutUs from '../components/AboutUs';
import BrandSlogan from '../components/BrandSlogan';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { products } from '../mock';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <main className="pt-16 lg:pt-20">
        <AnnouncementBar />
        <Hero />

        <ProductGrid
          products={products}
          title="热卖精选"
          subtitle="发现最受欢迎的音乐产品，从经典黑胶到现代音频设备"
        />

        <AboutUs />

        <BrandSlogan />

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
