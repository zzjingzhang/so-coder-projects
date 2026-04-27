import { useState, useEffect } from 'react';
import { cn } from '@/utils';

export const Tabs = ({
  value,
  defaultValue,
  onValueChange,
  children,
  className = '',
  ...props
}) => {
  const [activeTab, setActiveTab] = useState(value || defaultValue || '');

  useEffect(() => {
    if (value !== undefined) {
      setActiveTab(value);
    }
  }, [value]);

  const handleTabChange = (newValue) => {
    if (value === undefined) {
      setActiveTab(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <div className={cn('w-full', className)} {...props}>
      {children}
    </div>
  );
};

export const TabsList = ({ children, className = '', ...props }) => {
  return (
    <div
      className={cn(
        'flex flex-wrap gap-1 p-1 bg-background rounded-lg',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const TabsTrigger = ({
  value,
  children,
  className = '',
  disabled = false,
  ...props
}) => {
  return (
    <button
      type="button"
      role="tab"
      aria-selected="false"
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
        'bg-transparent text-text-secondary hover:text-text hover:bg-surface',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent',
        'data-[state=active]:bg-surface data-[state=active]:text-text data-[state=active]:shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({
  value,
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      role="tabpanel"
      className={cn(
        'mt-2 focus:outline-none',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
