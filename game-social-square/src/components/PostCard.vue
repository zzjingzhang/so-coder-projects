<template>
  <v-card class="card-hover masonry-item rounded-xl overflow-hidden" flat>
    <v-card-item class="pb-2">
      <v-avatar
        size="48"
        :image="post.user.avatar"
        class="cursor-pointer"
        @click="goToUserProfile"
      ></v-avatar>
      <template v-slot:append>
        <div class="flex flex-col">
          <v-btn
            variant="text"
            class="text-left font-semibold text-gray-800 p-0 min-w-0 h-auto"
            @click="goToUserProfile"
          >
            {{ post.user.name }}
          </v-btn>
          <div class="flex items-center gap-2 text-xs text-gray-500">
            <v-icon size="14">mdi-star-circle</v-icon>
            <span>Lv.{{ post.user.level }}</span>
            <span class="mx-1">·</span>
            <span>{{ formatTime(post.createdAt) }}</span>
          </div>
        </div>
      </template>
    </v-card-item>

    <v-card-text class="pt-0 pb-2">
      <p class="text-gray-700 whitespace-pre-line">{{ post.content }}</p>
    </v-card-text>

    <v-container class="px-4 py-0" v-if="post.images && post.images.length > 0">
      <div :class="imageGridClass">
        <v-img
          v-for="(img, index) in displayImages"
          :key="index"
          :src="img"
          :cover="post.images.length > 1"
          class="cursor-pointer rounded-lg hover:opacity-90 transition-opacity"
          :aspect-ratio="imageAspectRatio"
          @click="openImagePreview(index)"
        ></v-img>
      </div>
    </v-container>

    <v-card-text class="pt-3 pb-2">
      <div class="flex flex-wrap gap-2">
        <v-chip
          v-for="tag in post.tags"
          :key="tag"
          size="small"
          variant="outlined"
          class="cursor-pointer font-medium"
          @click="onTagClick(tag)"
        >
          #{{ tag }}
        </v-chip>
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions class="px-4 py-2">
      <v-btn
        variant="text"
        :color="post.isLiked ? 'error' : 'default'"
        class="flex-1"
        @click="toggleLike"
      >
        <v-icon :icon="post.isLiked ? 'mdi-heart' : 'mdi-heart-outline'"></v-icon>
        <span class="ml-1 text-sm">{{ post.likes }}</span>
      </v-btn>

      <v-btn
        variant="text"
        class="flex-1"
        @click="onCommentClick"
      >
        <v-icon>mdi-comment-outline</v-icon>
        <span class="ml-1 text-sm">{{ post.comments }}</span>
      </v-btn>

      <v-btn
        variant="text"
        class="flex-1"
        @click="sharePost"
      >
        <v-icon>mdi-share-variant</v-icon>
        <span class="ml-1 text-sm">{{ post.shares }}</span>
      </v-btn>

      <v-btn variant="text" class="ml-auto" @click="toggleBookmark">
        <v-icon>{{ isBookmarked ? 'mdi-bookmark' : 'mdi-bookmark-outline' }}</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['tag-click', 'comment-click', 'view-detail'])

const router = useRouter()
const isBookmarked = ref(false)

const displayImages = computed(() => {
  if (props.post.images.length > 4) {
    return props.post.images.slice(0, 4)
  }
  return props.post.images
})

const imageGridClass = computed(() => {
  const count = displayImages.value.length
  if (count === 1) return 'grid grid-cols-1 gap-2'
  if (count === 2) return 'grid grid-cols-2 gap-2'
  if (count === 3) return 'grid grid-cols-3 gap-2'
  return 'grid grid-cols-2 gap-2'
})

const imageAspectRatio = computed(() => {
  const count = displayImages.value.length
  if (count === 1) return 16 / 9
  return 1
})

function formatTime(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now - date
  
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`
  
  return date.toLocaleDateString('zh-CN')
}

function toggleLike() {
  props.post.isLiked = !props.post.isLiked
  props.post.likes += props.post.isLiked ? 1 : -1
}

function toggleBookmark() {
  isBookmarked.value = !isBookmarked.value
}

function sharePost() {
  props.post.shares += 1
}

function onTagClick(tag) {
  emit('tag-click', tag)
}

function onCommentClick() {
  emit('comment-click', props.post)
}

function goToUserProfile() {
  router.push(`/user/${props.post.userId}`)
}

function openImagePreview(index) {
  emit('view-detail', props.post)
}
</script>
