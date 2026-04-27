<template>
  <v-container class="py-6">
    <v-btn
      variant="text"
      prepend-icon="mdi-arrow-left"
      class="mb-4"
      @click="goBack"
    >
      返回
    </v-btn>

    <v-card class="rounded-xl mb-6 overflow-hidden" flat>
      <div class="h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      
      <v-container class="relative -mt-16">
        <v-layout class="align-end">
          <v-avatar
            size="120"
            :image="user?.avatar"
            class="border-4 border-white shadow-lg"
          ></v-avatar>
          
          <div class="ml-4 mb-2">
            <h1 class="text-2xl font-bold text-gray-800">{{ user?.name }}</h1>
            <p class="text-sm text-gray-500">Lv.{{ user?.level }}</p>
          </div>
          
          <v-spacer></v-spacer>
          
          <div class="flex gap-3 mb-2">
            <v-btn color="primary" variant="outlined">
              <v-icon left>mdi-account-plus</v-icon>
              关注
            </v-btn>
            <v-btn color="primary">
              <v-icon left>mdi-message</v-icon>
              私信
            </v-btn>
          </div>
        </v-layout>
      </v-container>

      <v-card-text class="pt-0">
        <p class="text-gray-600 mb-4">{{ user?.bio }}</p>
        
        <div class="flex flex-wrap gap-2 mb-4">
          <v-chip
            v-for="tag in user?.tags"
            :key="tag"
            size="small"
            color="secondary"
            variant="flat"
          >
            #{{ tag }}
          </v-chip>
        </div>

        <div class="flex gap-8">
          <div class="text-center">
            <p class="text-2xl font-bold text-gray-800">{{ user?.followers?.toLocaleString() }}</p>
            <p class="text-sm text-gray-500">粉丝</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-gray-800">{{ user?.following?.toLocaleString() }}</p>
            <p class="text-sm text-gray-500">关注</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-gray-800">{{ userPosts?.length }}</p>
            <p class="text-sm text-gray-500">动态</p>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-tabs v-model="activeTab" class="mb-4">
      <v-tab value="posts">
        <v-icon left>mdi-post</v-icon>
        动态
      </v-tab>
      <v-tab value="likes">
        <v-icon left>mdi-heart</v-icon>
        喜欢
      </v-tab>
      <v-tab value="media">
        <v-icon left>mdi-image-multiple</v-icon>
        媒体
      </v-tab>
    </v-tabs>

    <div v-if="activeTab === 'posts'">
      <div v-if="userPosts?.length > 0" class="masonry-grid">
        <PostCard
          v-for="post in userPosts"
          :key="post.id"
          :post="post"
          @tag-click="handleTagClick"
          @comment-click="handleCommentClick"
          @view-detail="goToPostDetail"
        ></PostCard>
      </div>
      <div v-else class="text-center py-12">
        <v-icon size="64" color="gray" class="mb-4">mdi-post-outline</v-icon>
        <p class="text-gray-500 text-lg">暂无动态</p>
      </div>
    </div>

    <div v-else-if="activeTab === 'likes'" class="text-center py-12">
      <v-icon size="64" color="gray" class="mb-4">mdi-heart-outline</v-icon>
      <p class="text-gray-500 text-lg">暂无喜欢的内容</p>
    </div>

    <div v-else-if="activeTab === 'media'">
      <div v-if="userMedia?.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <v-img
          v-for="(img, index) in userMedia"
          :key="index"
          :src="img"
          aspect-ratio="1"
          cover
          class="cursor-pointer rounded-lg hover:opacity-90 transition-opacity"
        ></v-img>
      </div>
      <div v-else class="text-center py-12">
        <v-icon size="64" color="gray" class="mb-4">mdi-image-outline</v-icon>
        <p class="text-gray-500 text-lg">暂无媒体内容</p>
      </div>
    </div>

    <v-dialog
      v-model="showCommentDialog"
      max-width="600px"
      scrollable
    >
      <v-card v-if="selectedPost">
        <v-card-title class="flex items-center justify-between">
          <span class="font-bold">评论</span>
          <v-btn
            variant="text"
            icon="mdi-close"
            @click="showCommentDialog = false"
          ></v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="max-h-[60vh]">
          <CommentSection
            :comments="postComments"
            :post-id="selectedPost.id"
          ></CommentSection>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PostCard from '../components/PostCard.vue'
import CommentSection from '../components/CommentSection.vue'
import { getUserById, getPostsByUserId, getCommentsByPostId } from '../mock/data'

const route = useRoute()
const router = useRouter()

const activeTab = ref('posts')
const showCommentDialog = ref(false)
const selectedPost = ref(null)

const userId = computed(() => route.params.id)
const user = computed(() => getUserById(userId.value))
const userPosts = computed(() => getPostsByUserId(userId.value))

const userMedia = computed(() => {
  const media = []
  userPosts.value?.forEach(post => {
    if (post.images) {
      media.push(...post.images)
    }
  })
  return media
})

const postComments = computed(() => {
  if (!selectedPost.value) return []
  return getCommentsByPostId(selectedPost.value.id)
})

function goBack() {
  router.back()
}

function handleTagClick(tag) {
  router.push({
    path: '/',
    query: { tag }
  })
}

function handleCommentClick(post) {
  selectedPost.value = post
  showCommentDialog.value = true
}

function goToPostDetail(post) {
  router.push(`/post/${post.id}`)
}
</script>
