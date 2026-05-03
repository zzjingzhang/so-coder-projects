import type { Post } from '../types';
import PostCard from './PostCard';
import { Empty } from 'antd';

interface PostListProps {
  posts: Post[];
  loading?: boolean;
}

const PostList: React.FC<PostListProps> = ({ posts, loading = false }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="py-12">
        <Empty description="暂无帖子，快来发布第一条帖子吧！" />
      </div>
    );
  }

  return (
    <div className="py-4">
      {posts.map((post) => (
        <PostCard 
          key={post.id} 
          post={post} 
        />
      ))}
    </div>
  );
};

export default PostList;
