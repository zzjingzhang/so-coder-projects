import { Link } from 'react-router-dom';
import { ArrowUpRight, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PortfolioItem } from '@/data/portfolio';

interface PortfolioCardProps {
  item: PortfolioItem;
  variant?: 'default' | 'featured';
  className?: string;
}

const PortfolioCard = ({ item, variant = 'default', className }: PortfolioCardProps) => {
  const isFeatured = variant === 'featured';

  return (
    <article 
      className={cn(
        "group relative bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300",
        "hover:shadow-xl hover:shadow-gray-200/50",
        isFeatured && "md:grid md:grid-cols-2 md:items-stretch",
        className
      )}
    >
      {/* Image Container */}
      <Link 
        to={`/portfolio/${item.id}`}
        className={cn(
          "block overflow-hidden relative",
          isFeatured ? "md:h-full" : "aspect-[4/3]"
        )}
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* View Button */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm shadow-lg">
            查看详情
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className={cn(
        "p-6",
        isFeatured && "p-8 flex flex-col justify-center"
      )}>
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-3">
          <Tag className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-medium">
            {item.category}
          </span>
        </div>

        {/* Title */}
        <h3 className={cn(
          "font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors",
          isFeatured ? "text-2xl leading-tight" : "text-lg"
        )}>
          <Link to={`/portfolio/${item.id}`}>
            {item.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.technologies.slice(0, 3).map((tech, index) => (
            <span 
              key={index}
              className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md"
            >
              {tech}
            </span>
          ))}
          {item.technologies.length > 3 && (
            <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
              +{item.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Client & Date */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
          <span>客户: {item.client}</span>
          <span>{item.date}</span>
        </div>
      </div>
    </article>
  );
};

export default PortfolioCard;
