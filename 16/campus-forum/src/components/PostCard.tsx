import { useState } from 'react';
import { Avatar, Tag, message } from 'antd';
import { 
  ShareAltOutlined, 
  MessageOutlined, 
  HeartOutlined, 
  HeartFilled,
  PlayCircleOutlined 
} from '@ant-design/icons';
import type { Post } from '../types';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onComment, onShare }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likeCount);

  const handleLike = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikeCount(newIsLiked ? likeCount + 1 : likeCount - 1);
    onLike?.(post.id);
    message.success(newIsLiked ? '点赞成功！' : '取消点赞');
  };

  const handleComment = () => {
    onComment?.(post.id);
    message.info('评论功能开发中...');
  };

  const handleShare = () => {
    onShare?.(post.id);
    message.success('分享链接已复制到剪贴板');
  };

  const renderMedia = () => {
    if (post.mediaType === 'image' && post.mediaUrl) {
      return (
        <div className="mt-3 rounded-lg overflow-hidden">
          <img
            src={post.mediaUrl}
            alt={post.title}
            className="w-full h-auto max-h-80 object-cover"
            loading="lazy"
          />
        </div>
      );
    }

    if (post.mediaType === 'video' && post.mediaUrl) {
      return (
        <div className="mt-3 rounded-lg overflow-hidden relative">
          <img
            src={post.mediaUrl}
            alt={post.title}
            className="w-full h-auto max-h-80 object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <PlayCircleOutlined className="text-white text-5xl" />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4 hover:shadow-md transition-shadow duration-200">
      {/* 发帖人头像和昵称 */}
      <div className="flex items-center mb-3">
        <Avatar 
          src={post.author.avatar} 
          size={44}
          className="cursor-pointer"
        />
        <div className="ml-3">
          <div className="font-semibold text-gray-800 cursor-pointer hover:text-blue-500 transition-colors">
            {post.author.nickname}
          </div>
          <div className="text-xs text-gray-400">
            {post.createdAt}
          </div>
        </div>
      </div>

      {/* 帖子标题 */}
      <div className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-blue-500 transition-colors">
        {post.title}
      </div>

      {/* 帖子内容预览 */}
      <div className="text-gray-600 text-sm line-clamp-3 mb-2">
        {post.content}
      </div>

      {/* 帖子图片或视频 */}
      {renderMedia()}

      {/* 板块名 */}
      <div className="mt-3">
        <Tag color="blue" className="cursor-pointer">
          {post.category}
        </Tag>
      </div>

      {/* 分享、评论、点赞 */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-500 transition-all duration-200 flex-1"
        >
          <ShareAltOutlined />
          <span className="text-sm">{post.shareCount > 0 ? post.shareCount : '分享'}</span>
        </button>

        <button
          onClick={handleComment}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-gray-500 hover:bg-green-50 hover:text-green-500 transition-all duration-200 flex-1"
        >
          <MessageOutlined />
          <span className="text-sm">{post.commentCount > 0 ? post.commentCount : '评论'}</span>
        </button>

        <button
          onClick={handleLike}
          className={`
            flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 flex-1
            ${isLiked 
              ? 'text-red-500 bg-red-50' 
              : 'text-gray-500 hover:bg-red-50 hover:text-red-500'
            }
          `}
        >
          {isLiked ? <HeartFilled /> : <HeartOutlined />}
          <span className="text-sm">{likeCount > 0 ? likeCount : '点赞'}</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
