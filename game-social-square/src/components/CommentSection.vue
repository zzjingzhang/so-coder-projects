<template>
  <v-card class="rounded-xl" flat>
    <v-card-title class="pb-2">
      <div class="flex items-center gap-2">
        <v-icon color="primary">mdi-comment-text</v-icon>
        <span class="font-bold text-lg">评论 ({{ comments.length }})</span>
      </div>
    </v-card-title>

    <v-card-text class="pt-0">
      <div class="flex gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
        <v-avatar size="40" :image="currentUser.avatar"></v-avatar>
        <div class="flex-1">
          <v-textarea
            v-model="newComment"
            variant="outlined"
            placeholder="写下你的评论..."
            rows="2"
            hide-details
            class="bg-white"
          ></v-textarea>
          <div class="flex justify-end mt-2">
            <v-btn
              color="primary"
              size="small"
              :disabled="!newComment.trim()"
              @click="submitComment"
            >
              发送评论
            </v-btn>
          </div>
        </div>
      </div>

      <v-divider class="mb-4"></v-divider>

      <div v-if="comments.length === 0" class="text-center py-8 text-gray-500">
        <v-icon size="48" class="mb-2">mdi-comment-remove-outline</v-icon>
        <p>暂无评论，快来抢沙发吧！</p>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="comment in comments"
          :key="comment.id"
          class="pb-4 border-b border-gray-100 last:border-0"
        >
          <div class="flex gap-3">
            <v-avatar
              size="36"
              :image="comment.user.avatar"
              class="cursor-pointer"
              @click="goToUserProfile(comment.userId)"
            ></v-avatar>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span
                    class="font-semibold text-gray-800 cursor-pointer hover:text-primary"
                    @click="goToUserProfile(comment.userId)"
                  >
                    {{ comment.user.name }}
                  </span>
                  <span class="text-xs text-gray-400">{{ formatTime(comment.createdAt) }}</span>
                </div>
                <v-btn variant="text" size="small" icon="mdi-dots-vertical"></v-btn>
              </div>

              <p class="text-gray-700 mt-1">{{ comment.content }}</p>

              <div class="flex items-center gap-4 mt-2">
                <v-btn
                  variant="text"
                  size="small"
                  :color="comment.isLiked ? 'error' : 'default'"
                  @click="toggleCommentLike(comment)"
                >
                  <v-icon size="16">{{ comment.isLiked ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                  <span class="text-xs ml-1">{{ comment.likes || 0 }}</span>
                </v-btn>
                <v-btn variant="text" size="small" @click="replyToComment(comment)">
                  <v-icon size="16">mdi-reply</v-icon>
                  <span class="text-xs ml-1">回复</span>
                </v-btn>
              </div>

              <div v-if="comment.replies && comment.replies.length > 0" class="mt-3 pl-4 border-l-2 border-gray-200">
                <div
                  v-for="reply in comment.replies"
                  :key="reply.id"
                  class="flex gap-2 mb-2 last:mb-0"
                >
                  <v-avatar
                    size="28"
                    :image="reply.user.avatar"
                    class="cursor-pointer"
                    @click="goToUserProfile(reply.userId)"
                  ></v-avatar>
                  <div class="flex-1">
                    <div class="flex items-center gap-2">
                      <span
                        class="font-semibold text-sm text-gray-800 cursor-pointer hover:text-primary"
                        @click="goToUserProfile(reply.userId)"
                      >
                        {{ reply.user.name }}
                      </span>
                      <span class="text-xs text-gray-400">{{ formatTime(reply.createdAt) }}</span>
                    </div>
                    <p class="text-sm text-gray-700 mt-0.5">{{ reply.content }}</p>
                    <div class="flex items-center gap-3 mt-1">
                      <v-btn
                        variant="text"
                        size="x-small"
                        :color="reply.isLiked ? 'error' : 'default'"
                        @click="toggleReplyLike(comment, reply)"
                      >
                        <v-icon size="14">{{ reply.isLiked ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                        <span class="text-xs ml-0.5">{{ reply.likes || 0 }}</span>
                      </v-btn>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="replyingTo && replyingTo.id === comment.id" class="mt-3 pl-4">
                <div class="flex gap-2">
                  <v-avatar size="28" :image="currentUser.avatar"></v-avatar>
                  <div class="flex-1">
                    <v-text-field
                      v-model="replyContent"
                      variant="outlined"
                      :placeholder="`回复 ${comment.user.name}`"
                      hide-details
                      density="compact"
                    ></v-text-field>
                    <div class="flex justify-end gap-2 mt-2">
                      <v-btn variant="text" size="small" @click="cancelReply">取消</v-btn>
                      <v-btn color="primary" size="small" :disabled="!replyContent.trim()" @click="submitReply(comment)">
                        发送
                      </v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { users } from '../mock/data'

const props = defineProps({
  comments: {
    type: Array,
    default: () => []
  },
  postId: {
    type: [Number, String],
    required: true
  }
})

const emit = defineEmits(['comment-added'])

const router = useRouter()

const currentUser = ref({
  id: 99,
  name: '我',
  avatar: 'https://i.pravatar.cc/150?img=68'
})

const newComment = ref('')
const replyingTo = ref(null)
const replyContent = ref('')

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

function submitComment() {
  if (!newComment.value.trim()) return
  
  const newCommentObj = {
    id: Date.now(),
    userId: currentUser.value.id,
    user: currentUser.value,
    content: newComment.value,
    likes: 0,
    createdAt: new Date().toISOString(),
    replies: [],
    isLiked: false
  }
  
  props.comments.unshift(newCommentObj)
  newComment.value = ''
  emit('comment-added', newCommentObj)
}

function toggleCommentLike(comment) {
  comment.isLiked = !comment.isLiked
  comment.likes = (comment.likes || 0) + (comment.isLiked ? 1 : -1)
}

function toggleReplyLike(comment, reply) {
  reply.isLiked = !reply.isLiked
  reply.likes = (reply.likes || 0) + (reply.isLiked ? 1 : -1)
}

function replyToComment(comment) {
  replyingTo.value = comment
  replyContent.value = ''
}

function cancelReply() {
  replyingTo.value = null
  replyContent.value = ''
}

function submitReply(comment) {
  if (!replyContent.value.trim()) return
  
  const newReply = {
    id: Date.now(),
    userId: currentUser.value.id,
    user: currentUser.value,
    content: replyContent.value,
    likes: 0,
    createdAt: new Date().toISOString(),
    isLiked: false
  }
  
  if (!comment.replies) {
    comment.replies = []
  }
  comment.replies.push(newReply)
  
  cancelReply()
  emit('comment-added', newReply)
}

function goToUserProfile(userId) {
  router.push(`/user/${userId}`)
}
</script>
