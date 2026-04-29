import React, { useState } from 'react';
import { products, features } from '@/data/mockData';
import RatingStars from '@/components/RatingStars';
import ImageWithFallback from '@/components/ImageWithFallback';
import type { Product } from '@/types';

const ProductShowcase: React.FC = () => {
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
  const [addedToCart, setAddedToCart] = useState<Record<string, boolean>>({});

  const handleColorSelect = (productId: string, color: string) => {
    setSelectedColors(prev => ({
      ...prev,
      [productId]: color
    }));
  };

  const handleAddToCart = (product: Product) => {
    setAddedToCart(prev => ({
      ...prev,
      [product.id]: true
    }));

    setTimeout(() => {
      setAddedToCart(prev => ({
        ...prev,
        [product.id]: false
      }));
    }, 2000);
  };

  return (
    <section id="products" className="py-20 bg-[var(--gaming-dark-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[var(--gaming-neon)] via-[var(--gaming-cyan)] to-[var(--gaming-purple)] bg-clip-text text-transparent">
              Choose Your PLAYBOX
            </span>
          </h2>
          <p className="text-lg text-[var(--gaming-muted)] max-w-2xl mx-auto">
            Discover the perfect portable gaming companion for your lifestyle. 
            Each PLAYBOX comes pre-loaded with thousands of classic games.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="neon-border p-6 text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[var(--gaming-light)] mb-2">
                {feature.title}
              </h3>
              <p className="text-[var(--gaming-muted)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="neon-border overflow-hidden group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-[var(--gaming-dark)] to-[var(--gaming-dark-secondary)] p-6">
                <div className="absolute top-4 left-4 z-10">
                  {product.originalPrice && (
                    <span className="px-3 py-1 bg-[var(--gaming-neon)] text-white text-sm font-bold rounded-full">
                      -${Math.round(product.originalPrice - product.price)}
                    </span>
                  )}
                </div>

                <div className="relative aspect-square flex items-center justify-center mb-6 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                    fallbackContent={
                      <div className="w-full h-full bg-gradient-to-br from-[var(--gaming-dark)] to-[var(--gaming-dark-secondary)] flex items-center justify-center border-2 border-dashed border-[var(--gaming-neon)]/30 rounded-lg">
                        <div className="text-center">
                          <div className="text-5xl mb-3">🎮</div>
                          <div className="text-lg font-bold text-[var(--gaming-light)]">{product.name}</div>
                          <div className="text-sm text-[var(--gaming-muted)]">Portable Gaming Console</div>
                        </div>
                      </div>
                    }
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <RatingStars rating={product.rating} size="sm" />
                    <span className="text-sm text-[var(--gaming-muted)]">
                      ({product.reviewCount})
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-[var(--gaming-dark)]">
                <h3 className="text-xl font-bold text-[var(--gaming-light)] mb-2 group-hover:text-[var(--gaming-neon)] transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-[var(--gaming-muted)] text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.slice(0, 3).map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-[var(--gaming-muted)]/10 text-[var(--gaming-cyan)] text-xs rounded-md"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="mb-4">
                  <p className="text-sm text-[var(--gaming-muted)] mb-2">Color:</p>
                  <div className="flex gap-2">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleColorSelect(product.id, color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                          (selectedColors[product.id] || product.colors[0]) === color
                            ? 'border-[var(--gaming-light)] scale-110'
                            : 'border-transparent hover:scale-105'
                        }`}
                        style={{ backgroundColor: color }}
                        title={`Color ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-[var(--gaming-neon)]">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-[var(--gaming-muted)] line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className={`w-full gaming-button flex items-center justify-center gap-2 relative overflow-hidden ${
                    addedToCart[product.id] ? 'bg-[var(--gaming-success)]' : ''
                  }`}
                >
                  {addedToCart[product.id] ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-8 p-8 neon-border rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[var(--gaming-neon)]/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--gaming-neon)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-[var(--gaming-light)] font-bold">Free Shipping</p>
                <p className="text-[var(--gaming-muted)] text-sm">On orders over $100</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[var(--gaming-cyan)]/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--gaming-cyan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-[var(--gaming-light)] font-bold">1 Year Warranty</p>
                <p className="text-[var(--gaming-muted)] text-sm">Full coverage</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[var(--gaming-purple)]/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--gaming-purple)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-[var(--gaming-light)] font-bold">30-Day Returns</p>
                <p className="text-[var(--gaming-muted)] text-sm">Hassle-free</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[var(--gaming-success)]/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--gaming-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-[var(--gaming-light)] font-bold">24/7 Support</p>
                <p className="text-[var(--gaming-muted)] text-sm">Always here for you</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
