import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Blog } from '@/data/blogs';

interface BlogCardProps {
  blog: Blog;
  variant?: 'default' | 'featured' | 'small';
  className?: string;
  delay?: number;
}

const BlogCard = ({ blog, variant = 'default', className, delay = 0 }: BlogCardProps) => {
  const isFeatured = variant === 'featured';
  const isSmall = variant === 'small';

  return (
    <article 
      className={cn(
        "group bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300",
        "hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1",
        isFeatured && "md:grid md:grid-cols-2 md:items-center",
        isSmall && "flex gap-4 border-none shadow-none hover:shadow-none hover:translate-y-0",
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Image */}
      <Link 
        to={`/blog/${blog.id}`}
        className={cn(
          "block overflow-hidden",
          isFeatured ? "md:h-full" : "relative aspect-[4/3]",
          isSmall && "w-24 h-24 shrink-0 rounded-lg"
        )}
      >
        <img
          src={blog.image}
          alt={blog.title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
            isSmall && "rounded-lg"
          )}
        />
        {!isSmall && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
              {blog.category}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className={cn(
        "p-6",
        isFeatured && "p-8",
        isSmall && "p-0 flex-1"
      )}>
        {/* Meta Info */}
        {!isSmall && (
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {blog.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {blog.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {blog.readTime}
            </span>
          </div>
        )}

        {/* Category for small variant */}
        {isSmall && (
          <span className="text-xs text-primary font-medium mb-1 block">
            {blog.category}
          </span>
        )}

        {/* Title */}
        <h3 className={cn(
          "font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors",
          isFeatured ? "text-2xl leading-tight" : "text-lg",
          isSmall && "text-base mb-2 line-clamp-2"
        )}>
          <Link to={`/blog/${blog.id}`}>
            {blog.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {!isSmall && (
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
            {blog.excerpt}
          </p>
        )}

        {/* Small variant meta */}
        {isSmall && (
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {blog.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {blog.readTime}
            </span>
          </div>
        )}

        {/* Read More */}
        {!isSmall && (
          <Link
            to={`/blog/${blog.id}`}
            className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all group/link"
          >
            <span>阅读更多</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        )}
      </div>
    </article>
  );
};

export default BlogCard;
