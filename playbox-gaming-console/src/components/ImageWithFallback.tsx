import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackContent?: React.ReactNode;
  fallbackClassName?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackContent,
  fallbackClassName = '',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const defaultFallback = (
    <div className={`w-full h-full bg-gradient-to-br from-[var(--gaming-dark)] to-[var(--gaming-dark-secondary)] flex items-center justify-center border-2 border-dashed border-[var(--gaming-neon)]/30 rounded-lg ${fallbackClassName}`}>
      <div className="text-center p-4">
        <div className="text-4xl mb-2">🖼️</div>
        <div className="text-sm text-[var(--gaming-muted)]">Image not available</div>
      </div>
    </div>
  );

  return (
    <div className={`relative ${className}`}>
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--gaming-dark)]/50 rounded-lg">
          <div className="w-8 h-8 border-4 border-[var(--gaming-neon)]/30 border-t-[var(--gaming-neon)] rounded-full animate-spin" />
        </div>
      )}
      
      {hasError ? (
        fallbackContent || defaultFallback
      ) : (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-contain ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onError={handleError}
          onLoad={handleLoad}
        />
      )}
    </div>
  );
};

export default ImageWithFallback;
