<template>
  <a-card
    hoverable
    class="article-card w-full overflow-hidden"
    :class="{ 'fade-in': true, 'visible': isVisible }"
  >
    <template #cover>
      <div class="relative h-48 overflow-hidden bg-gray-100">
        <img
          v-if="article.urlToImage"
          :src="article.urlToImage"
          :alt="article.title"
          class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          @error="handleImageError"
        />
        <div
          v-else
          class="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center"
        >
          <ReadOutlined class="text-4xl text-white" />
        </div>
        
        <div class="absolute top-3 left-3">
          <a-tag color="blue">
            {{ article.source.name }}
          </a-tag>
        </div>
      </div>
    </template>
    
    <a-card-meta
      :title="truncatedTitle"
      :description="truncatedDescription"
    >
      <template #title>
        <h3 class="text-lg font-semibold text-gray-800 line-clamp-2 min-h-[3.5rem]">
          {{ article.title }}
        </h3>
      </template>
      
      <template #description>
        <p class="text-gray-600 text-sm line-clamp-3 min-h-[4.5rem]">
          {{ article.description || '暂无描述' }}
        </p>
      </template>
    </a-card-meta>
    
    <div class="mt-4">
      <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div class="flex items-center gap-2">
          <ClockCircleOutlined />
          <span>{{ formattedDate }}</span>
        </div>
        <div v-if="article.author" class="flex items-center gap-2">
          <UserOutlined />
          <span class="truncate max-w-[150px]">{{ article.author }}</span>
        </div>
      </div>
      
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <a-tooltip title="分享到微信">
            <a-button
              type="text"
              shape="circle"
              @click="shareToWeChat"
            >
              <WechatOutlined class="text-green-500 text-lg" />
            </a-button>
          </a-tooltip>
          
          <a-tooltip title="分享到微博">
            <a-button
              type="text"
              shape="circle"
              @click="shareToWeibo"
            >
              <WeiboCircleOutlined class="text-red-500 text-lg" />
            </a-button>
          </a-tooltip>
          
          <a-tooltip title="分享到 Twitter">
            <a-button
              type="text"
              shape="circle"
              @click="shareToTwitter"
            >
              <TwitterOutlined class="text-blue-400 text-lg" />
            </a-button>
          </a-tooltip>
          
          <a-tooltip title="复制链接">
            <a-button
              type="text"
              shape="circle"
              @click="copyLink"
            >
              <LinkOutlined class="text-gray-500 text-lg" />
            </a-button>
          </a-tooltip>
        </div>
        
        <a-button
          type="primary"
          @click="readMore"
        >
          <template #icon>
            <ReadOutlined />
          </template>
          阅读更多
        </a-button>
      </div>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { message } from 'ant-design-vue';
import {
  ReadOutlined,
  ClockCircleOutlined,
  UserOutlined,
  WechatOutlined,
  WeiboCircleOutlined,
  TwitterOutlined,
  LinkOutlined
} from '@ant-design/icons-vue';
import type { Article } from '../types';

interface Props {
  article: Article;
  index?: number;
}

const props = withDefaults(defineProps<Props>(), {
  index: 0
});

const isVisible = ref(false);
const cardRef = ref<HTMLElement | null>(null);

const truncatedTitle = computed(() => {
  const title = props.article.title;
  return title.length > 80 ? title.substring(0, 80) + '...' : title;
});

const truncatedDescription = computed(() => {
  const description = props.article.description;
  if (!description) return '暂无描述';
  return description.length > 150 ? description.substring(0, 150) + '...' : description;
});

const formattedDate = computed(() => {
  const date = new Date(props.article.publishedAt);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return '刚刚';
  if (diffMins < 60) return `${diffMins}分钟前`;
  if (diffHours < 24) return `${diffHours}小时前`;
  if (diffDays < 7) return `${diffDays}天前`;
  
  return date.toLocaleDateString('zh-CN');
});

const handleImageError = () => {
  // 图片加载失败时，可以处理为默认图片
};

const shareToWeChat = () => {
  message.info('请使用微信扫描二维码分享');
};

const shareToWeibo = () => {
  const url = encodeURIComponent(props.article.url);
  const title = encodeURIComponent(props.article.title);
  window.open(`https://service.weibo.com/share/share.php?url=${url}&title=${title}`, '_blank');
};

const shareToTwitter = () => {
  const url = encodeURIComponent(props.article.url);
  const text = encodeURIComponent(props.article.title);
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(props.article.url);
    message.success('链接已复制到剪贴板');
  } catch {
    message.error('复制失败，请手动复制');
  }
};

const readMore = () => {
  window.open(props.article.url, '_blank');
};

const handleScroll = () => {
  if (!cardRef.value) return;
  
  const rect = cardRef.value.getBoundingClientRect();
  const isInView = rect.top < window.innerHeight && rect.bottom > 0;
  
  if (isInView) {
    isVisible.value = true;
    window.removeEventListener('scroll', handleScroll);
  }
};

onMounted(() => {
  // 延迟显示，创建逐个出现的动画效果
  setTimeout(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始检查
  }, (props.index || 0) * 100);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.article-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

:deep(.ant-card-body) {
  flex: 1;
  display: flex;
  flex-direction: column;
}

:deep(.ant-card-meta) {
  flex: 1;
}

:deep(.ant-card-meta-description) {
  margin-top: 8px;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
