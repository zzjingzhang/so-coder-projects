import { cn } from '@/utils';

export const Loading = ({
  size = 'md',
  color = 'primary',
  className = '',
  ...props
}) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
    xl: 'w-12 h-12 border-4',
  };

  const colors = {
    primary: 'border-primary',
    secondary: 'border-text-secondary',
    white: 'border-white',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-t-transparent',
        sizes[size],
        colors[color],
        className
      )}
      {...props}
    />
  );
};

export const LoadingSpinner = ({
  text = '加载中...',
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <Loading size={size} color={color} />
      {text && <p className="text-sm text-text-secondary">{text}</p>}
    </div>
  );
};
