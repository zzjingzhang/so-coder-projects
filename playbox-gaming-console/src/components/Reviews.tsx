import React from 'react';
import { reviews, trustScore } from '@/data/mockData';
import RatingStars from '@/components/RatingStars';
import ImageWithFallback from '@/components/ImageWithFallback';

const Reviews: React.FC = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section className="py-20 bg-[var(--gaming-dark)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[var(--gaming-neon)] via-[var(--gaming-cyan)] to-[var(--gaming-purple)] bg-clip-text text-transparent">
              What Our Customers Say
            </span>
          </h2>
          <p className="text-lg text-[var(--gaming-muted)] max-w-2xl mx-auto mb-8">
            Join thousands of satisfied gamers who have elevated their retro gaming experience with PLAYBOX.
          </p>

          <div className="inline-flex items-center gap-8 p-6 neon-border rounded-2xl">
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-[var(--gaming-neon)] to-[var(--gaming-cyan)] bg-clip-text text-transparent mb-2">
                {trustScore}
              </div>
              <RatingStars rating={trustScore} size="lg" />
              <p className="text-sm text-[var(--gaming-muted)] mt-2">
                Based on 10,000+ reviews
              </p>
            </div>

            <div className="h-24 w-px bg-[var(--gaming-muted)]/30" />

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-[var(--gaming-light)] font-medium">5★</span>
                </div>
                <div className="w-32 h-2 bg-[var(--gaming-muted)]/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[var(--gaming-neon)] to-[var(--gaming-cyan)] rounded-full"
                    style={{ width: '85%' }}
                  />
                </div>
                <span className="text-sm text-[var(--gaming-muted)]">85%</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-[var(--gaming-light)] font-medium">4★</span>
                </div>
                <div className="w-32 h-2 bg-[var(--gaming-muted)]/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[var(--gaming-cyan)] to-[var(--gaming-purple)] rounded-full"
                    style={{ width: '12%' }}
                  />
                </div>
                <span className="text-sm text-[var(--gaming-muted)]">12%</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-[var(--gaming-light)] font-medium">3★</span>
                </div>
                <div className="w-32 h-2 bg-[var(--gaming-muted)]/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[var(--gaming-purple)] to-[var(--gaming-neon)] rounded-full"
                    style={{ width: '2%' }}
                  />
                </div>
                <span className="text-sm text-[var(--gaming-muted)]">2%</span>
              </div>
            </div>

            <div className="h-24 w-px bg-[var(--gaming-muted)]/30" />

            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-[var(--gaming-success)]/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[var(--gaming-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-[var(--gaming-light)] font-bold">Verified Reviews</p>
                  <p className="text-sm text-[var(--gaming-muted)]">All reviews are verified</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ImageWithFallback
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=trustpilot%20badge%20logo%20simple%20icon%20dark%20background&image_size=square"
                  alt="Trustpilot Badge"
                  className="w-16 h-8"
                  fallbackContent={
                    <div className="w-16 h-8 bg-[var(--gaming-muted)]/20 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-[var(--gaming-light)]">Trustpilot</span>
                    </div>
                  }
                />
                <ImageWithFallback
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=google%20reviews%20badge%20logo%20simple%20icon%20dark%20background&image_size=square"
                  alt="Google Reviews Badge"
                  className="w-16 h-8"
                  fallbackContent={
                    <div className="w-16 h-8 bg-[var(--gaming-muted)]/20 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-[var(--gaming-light)]">Google</span>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="neon-border p-6 hover:scale-[1.02] transition-transform duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <ImageWithFallback
                    src={review.avatar}
                    alt={review.name}
                    className="w-14 h-14 rounded-full border-2 border-[var(--gaming-neon)]"
                    fallbackContent={
                      <div className="w-14 h-14 rounded-full border-2 border-[var(--gaming-neon)] bg-gradient-to-br from-[var(--gaming-neon)] to-[var(--gaming-purple)] flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {review.name.charAt(0)}
                        </span>
                      </div>
                    }
                  />
                  <div>
                    <h4 className="text-lg font-bold text-[var(--gaming-light)]">
                      {review.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <RatingStars rating={review.rating} size="sm" />
                      <span className="text-sm text-[var(--gaming-muted)]">
                        {formatDate(review.date)}
                      </span>
                    </div>
                  </div>
                </div>

                {review.verified && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-[var(--gaming-success)]/10 rounded-full">
                    <svg className="w-4 h-4 text-[var(--gaming-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs font-medium text-[var(--gaming-success)]">
                      Verified
                    </span>
                  </div>
                )}
              </div>

              <h3 className="text-lg font-bold text-[var(--gaming-light)] mb-3">
                {review.title}
              </h3>

              <p className="text-[var(--gaming-muted)] leading-relaxed">
                {review.content}
              </p>

              <div className="mt-4 pt-4 border-t border-[var(--gaming-muted)]/20 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-[var(--gaming-muted)]">
                  <button className="flex items-center gap-1 hover:text-[var(--gaming-neon)] transition-colors duration-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    Helpful (124)
                  </button>
                </div>

                <button className="text-sm text-[var(--gaming-muted)] hover:text-[var(--gaming-neon)] transition-colors duration-300">
                  Reply
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="gaming-button-outline flex items-center justify-center gap-2 mx-auto">
            <span>View All 10,000+ Reviews</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
