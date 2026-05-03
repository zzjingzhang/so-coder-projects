import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface SearchBarProps {
  onSearch?: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = '搜索帖子、用户、话题...' 
}) => {
  return (
    <div className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <Input
          placeholder={placeholder}
          prefix={<SearchOutlined className="text-gray-400" />}
          size="large"
          className="rounded-full"
          onSearch={onSearch}
          style={{ borderRadius: '24px' }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
