<template>
  <v-container class="py-6">
    <v-layout>
      <v-col cols="12" lg="8">
        <v-btn
          variant="text"
          prepend-icon="mdi-arrow-left"
          class="mb-4"
          @click="goBack"
        >
          返回
        </v-btn>

        <v-card class="rounded-xl mb-6" flat>
          <v-card-item class="pb-3">
            <v-avatar
              size="52"
              :image="post?.user?.avatar"
              class="cursor-pointer"
              @click="goToUserProfile"
            ></v-avatar>
            <template v-slot:append>
              <div class="flex flex-col">
                <v-btn
                  variant="text"
                  class="text-left font-semibold text-lg text-gray-800 p-0 min-w-0 h-auto"
                  @click="goToUserProfile"
                >
                  {{ post?.user?.name }}
                </v-btn>
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <v-icon size="14">mdi-star-circle</v-icon>
                  <span>Lv.{{ post?.user?.level }}</span>
                  <span class="mx-1">·</span>
                  <span>{{ formatTime(post?.createdAt) }}</span>
                </div>
              </div>
            </template>
          </v-card-item>

          <v-card-text class="pt-0 pb-4">
            <p class="text-gray-700 text-base leading-relaxed whitespace-pre-line">
              {{ post?.content }}
            </p>
          </v-card-text>

          <v-container class="px-4 py-0" v-if="post?.images?.length > 0">
            <div :class="imageGridClass">
              <v-img
                v-for="(img, index) in post?.images"
                :key="index"
                :src="img"
                :cover="post?.images?.length > 1"
                class="cursor-pointer rounded-lg hover:opacity-90 transition-opacity"
                :aspect-ratio="imageAspectRatio"
                @click="openImagePreview(index)"
              ></v-img>
            </div>
          </v-container>

          <v-card-text class="pt-4 pb-2">
            <div class="flex flex-wrap gap-2">
              <v-chip
                v-for="tag in post?.tags"
                :key="tag"
                size="small"
                variant="outlined"
                class="cursor-pointer font-medium"
                @click="goToTag(tag)"
              >
                #{{ tag }}
              </v-chip>
            </div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions class="px-4 py-3">
            <v-btn
              variant="text"
              :color="post?.isLiked ? 'error' : 'default'"
              class="flex-1"
              @click="toggleLike"
            >
              <v-icon :icon="post?.isLiked ? 'mdi-heart' : 'mdi-heart-outline'"></v-icon>
              <span class="ml-2">{{ post?.likes }}</span>
            </v-btn>

            <v-btn variant="text" class="flex-1">
              <v-icon>mdi-comment-outline</v-icon>
              <span class="ml-2">{{ post?.comments }}</span>
            </v-btn>

            <v-btn
              variant="text"
              class="flex-1"
              @click="sharePost"
            >
              <v-icon>mdi-share-variant</v-icon>
              <span class="ml-2">{{ post?.shares }}</span>
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn variant="text" @click="toggleBookmark">
              <v-icon>{{ isBookmarked ? 'mdi-bookmark' : 'mdi-bookmark-outline' }}</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>

        <CommentSection
          :comments="comments"
          :post-id="postId"
          @comment-added="onCommentAdded"
        ></CommentSection>
      </v-col>

      <v-col cols="12" lg="4" class="hidden lg:block">
        <TagCloud class="mb-6"></TagCloud>

        <v-card class="rounded-xl" flat>
          <v-card-title class="pb-2">
            <div class="flex items-center gap-2">
              <v-icon color="warning">mdi-star</v-icon>
              <span class="font-bold text-lg">推荐关注</span>
            </div>
          </v-card-title>
          <v-card-text class="pt-0">
            <v-list>
              <v-list-item
                v-for="user in recommendedUsers"
                :key="user.id"
                class="px-0"
              >
                <template v-slot:prepend>
                  <v-avatar
                    :image="user.avatar"
                    size="40"
                    class="cursor-pointer"
                    @click="goToUserProfileById(user.id)"
                  ></v-avatar>
                </template>

                <v-list-item-title class="text-sm font-medium cursor-pointer hover:text-primary" @click="goToUserProfileById(user.id)">
                  {{ user.name }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-xs text-gray-400">
                  Lv.{{ user.level }} · {{ user.followers }} 粉丝
                </v-list-item-subtitle>

                <template v-slot:append>
                  <v-btn variant="outlined" size="small" color="primary">
                    关注
                  </v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CommentSection from '../components/CommentSection.vue'
import TagCloud from '../components/TagCloud.vue'
import { getPostById, getCommentsByPostId, getPostsByTag, users } from '../mock/data'

const route = useRoute()
const router = useRouter()

const postId = computed(() => route.params.id)
const post = computed(() => getPostById(postId.value))
const comments = computed(() => getCommentsByPostId(postId.value))

const isBookmarked = ref(false)

const recommendedUsers = computed(() => {
  return users.slice(0, 3)
})

const imageGridClass = computed(() => {
  if (!post.value?.images) return ''
  const count = post.value.images.length
  if (count === 1) return 'grid grid-cols-1 gap-2'
  if (count === 2) return 'grid grid-cols-2 gap-2'
  if (count === 3) return 'grid grid-cols-3 gap-2'
  return 'grid grid-cols-2 gap-2'
})

const imageAspectRatio = computed(() => {
  if (!post.value?.images) return 16 / 9
  const count = post.value.images.length
  if (count === 1) return 16 / 9
  return 1
})

function formatTime(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function goBack() {
  router.back()
}

function goToUserProfile() {
  if (post.value) {
    router.push(`/user/${post.value.userId}`)
  }
}

function goToUserProfileById(userId) {
  router.push(`/user/${userId}`)
}

function goToTag(tag) {
  router.push({
    path: '/',
    query: { tag }
  })
}

function toggleLike() {
  if (post.value) {
    post.value.isLiked = !post.value.isLiked
    post.value.likes += post.value.isLiked ? 1 : -1
  }
}

function toggleBookmark() {
  isBookmarked.value = !isBookmarked.value
}

function sharePost() {
  if (post.value) {
    post.value.shares += 1
  }
}

function openImagePreview(index) {
  console.log('查看图片:', index)
}

function onCommentAdded(comment) {
  if (post.value) {
    post.value.comments += 1
  }
}
</script>
