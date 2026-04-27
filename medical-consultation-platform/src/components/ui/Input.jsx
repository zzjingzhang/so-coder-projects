import { cn } from '@/utils';

export const Input = ({
  className = '',
  type = 'text',
  placeholder = '',
  disabled = false,
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      className={cn(
        'w-full px-4 py-2 border border-border rounded-lg bg-surface text-text placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-background',
        className
      )}
      {...props}
    />
  );
};
