import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Category: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-white mb-4">分类页面</h1>
            <p className="text-gray-400 text-lg">这是分类页面，导航成功！</p>
            <div className="mt-8 p-6 bg-gray-800 rounded-xl inline-block">
              <p className="text-purple-400">当前路径：/category</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Category;
