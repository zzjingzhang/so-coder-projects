import { useState } from 'react';
import type { Category } from '../types';

interface CategoryNavProps {
  categories: Category[];
  onCategoryChange?: (category: Category) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ categories, onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState<Category>(categories[0]);

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category);
    onCategoryChange?.(category);
  };

  return (
    <div className="w-full bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide gap-1 py-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className={`
                flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium
                transition-all duration-200 ease-in-out
                ${activeCategory.id === category.id
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                }
              `}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
