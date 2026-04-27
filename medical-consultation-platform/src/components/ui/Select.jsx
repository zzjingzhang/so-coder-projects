import { cn } from '@/utils';

export const Select = ({
  className = '',
  placeholder = '',
  disabled = false,
  children,
  ...props
}) => {
  return (
    <select
      disabled={disabled}
      className={cn(
        'w-full px-4 py-2 border border-border rounded-lg bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-background appearance-none cursor-pointer',
        className
      )}
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {children}
    </select>
  );
};
