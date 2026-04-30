<template>
  <a-layout-footer class="bg-gray-800 text-white">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
            <ReadOutlined class="text-blue-400" />
            新闻应用
          </h3>
          <p class="text-gray-400 text-sm leading-relaxed">
            一个基于 NewsAPI 的现代化新闻阅读应用，提供来自全球各地的最新新闻资讯。
          </p>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">快速链接</h3>
          <ul class="space-y-2">
            <li>
              <a
                href="https://newsapi.org"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-white transition-colors text-sm"
              >
                NewsAPI 官网
              </a>
            </li>
            <li>
              <a
                href="https://vuejs.org"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Vue.js 文档
              </a>
            </li>
            <li>
              <a
                href="https://antdv.com"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Ant Design Vue
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">联系我们</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-3 text-gray-400 text-sm">
              <MailOutlined />
              <span>contact@newsapp.com</span>
            </div>
            <div class="flex items-center gap-3 text-gray-400 text-sm">
              <EnvironmentOutlined />
              <span>中国，北京</span>
            </div>
          </div>
          
          <div class="mt-6 flex items-center gap-4">
            <a-tooltip title="GitHub">
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors text-2xl"
              >
                <GithubOutlined />
              </a>
            </a-tooltip>
            
            <a-tooltip title="Twitter">
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors text-2xl"
              >
                <TwitterOutlined />
              </a>
            </a-tooltip>
            
            <a-tooltip title="LinkedIn">
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors text-2xl"
              >
                <LinkedinOutlined />
              </a>
            </a-tooltip>
          </div>
        </div>
      </div>
      
      <div class="mt-8 pt-6 border-t border-gray-700 text-center">
        <p class="text-gray-400 text-sm">
          &copy; {{ currentYear }} 新闻应用. 保留所有权利.
        </p>
        <p class="text-gray-500 text-xs mt-2">
          本应用使用 NewsAPI 提供数据支持。
        </p>
      </div>
    </div>
  </a-layout-footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  ReadOutlined,
  MailOutlined,
  EnvironmentOutlined,
  GithubOutlined,
  TwitterOutlined,
  LinkedinOutlined
} from '@ant-design/icons-vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
:deep(.ant-layout-footer) {
  padding: 0;
  margin-top: auto;
}
</style>
