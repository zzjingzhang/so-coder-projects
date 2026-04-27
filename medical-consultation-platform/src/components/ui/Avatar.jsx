import { cn } from '@/utils';

export const Avatar = ({
  src,
  alt = '',
  size = 'md',
  fallback,
  className = '',
  ...props
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div
      className={cn(
        'relative rounded-full overflow-hidden bg-background border border-border-light flex-shrink-0',
        sizes[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      ) : null}
      {(!src || fallback) && (
        <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-medium">
          {fallback || (alt ? alt.charAt(0).toUpperCase() : '?')}
        </div>
      )}
    </div>
  );
};
