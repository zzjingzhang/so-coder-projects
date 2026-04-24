import React, { useState } from 'react';
import type { Product } from '../types';
import { StarIcon, HeartIcon, CartIcon } from './Icons';

interface ProductCardProps {
  product: Product;
}

const tagColors: Record<string, string> = {
  '热卖': 'bg-red-500/90',
  '经典': 'bg-yellow-500/90',
  '新品': 'bg-green-500/90',
  '限量': 'bg-purple-500/90',
  '旗舰': 'bg-blue-500/90',
  '传奇': 'bg-pink-500/90',
  '畅销': 'bg-orange-500/90'
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div
      className="group relative bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50 transition-all duration-500 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {product.tag && (
          <div className={`absolute top-4 left-4 px-3 py-1 ${tagColors[product.tag] || 'bg-gray-700'} rounded-full text-xs font-semibold text-white backdrop-blur-sm`}>
            {product.tag}
          </div>
        )}

        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            isWishlisted
              ? 'bg-pink-500 text-white'
              : 'bg-gray-900/50 text-gray-300 backdrop-blur-sm hover:bg-pink-500 hover:text-white'
          }`}
        >
          <HeartIcon size={18} />
        </button>

        <div
          className={`absolute bottom-4 left-4 right-4 transform transition-all duration-300 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white flex items-center justify-center space-x-2 hover:from-purple-500 hover:to-pink-500 transition-all duration-300">
            <CartIcon size={18} />
            <span>加入购物车</span>
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            {product.category === 'vinyl' ? '黑胶唱片' : product.category === 'headphone' ? '耳机' : '播放器'}
          </span>
          <div className="flex items-center space-x-1">
            <StarIcon size={14} className="text-yellow-400" />
            <span className="text-sm text-gray-300 font-medium">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors line-clamp-1">
          {product.name}
        </h3>

        <p className="text-sm text-gray-400 mb-3 line-clamp-1">{product.artist}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ¥{product.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
