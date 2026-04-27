import { cn } from '@/utils';

export const Textarea = ({
  className = '',
  placeholder = '',
  disabled = false,
  rows = 4,
  ...props
}) => {
  return (
    <textarea
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
      className={cn(
        'w-full px-4 py-2 border border-border rounded-lg bg-surface text-text placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-background resize-vertical',
        className
      )}
      {...props}
    />
  );
};
