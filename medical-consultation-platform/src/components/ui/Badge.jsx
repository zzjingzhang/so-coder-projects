import { cn } from '@/utils';

export const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-colors';
  
  const variants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-background text-text border border-border',
    outline: 'border-2 border-primary text-primary bg-transparent',
    ghost: 'bg-background text-text',
    danger: 'bg-danger text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
    accent: 'bg-accent text-white',
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </span>
  );
};
