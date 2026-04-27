import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/utils';

export const Modal = ({
  isOpen,
  onClose,
  children,
  size = 'md',
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 200);
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    full: 'max-w-full mx-4',
  };

  if (!isVisible && !isOpen) return null;

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200',
        isOpen ? 'opacity-100' : 'opacity-0'
      )}
      {...props}
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative bg-white rounded-xl shadow-xl w-full transform transition-all duration-200',
          sizes[size],
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4',
          className
        )}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export const ModalHeader = ({ children, className = '', ...props }) => {
  return (
    <div
      className={cn('px-6 py-4 border-b border-border-light', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const ModalTitle = ({ children, className = '', ...props }) => {
  return (
    <h2
      className={cn('text-lg font-semibold text-text', className)}
      {...props}
    >
      {children}
    </h2>
  );
};

export const ModalContent = ({ children, className = '', ...props }) => {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  );
};

export const ModalFooter = ({ children, className = '', ...props }) => {
  return (
    <div
      className={cn(
        'px-6 py-4 border-t border-border-light flex justify-end gap-3',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const ModalCloseButton = ({ onClose, className = '', ...props }) => {
  return (
    <button
      onClick={onClose}
      className={cn(
        'absolute top-4 right-4 p-1 rounded-lg text-text-secondary hover:bg-background hover:text-text transition-colors',
        className
      )}
      {...props}
    >
      <X className="w-5 h-5" />
    </button>
  );
};
