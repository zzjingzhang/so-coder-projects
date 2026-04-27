<template>
  <v-app-bar
    color="white"
    flat
    class="shadow-sm sticky top-0 z-50"
  >
    <v-container>
      <v-layout class="align-center">
        <v-btn
          variant="text"
          class="font-bold text-xl text-primary px-0"
          @click="goHome"
        >
          <v-icon size="28" class="mr-2">mdi-gamepad-variant</v-icon>
          游戏社交广场
        </v-btn>

        <v-spacer></v-spacer>

        <v-text-field
          v-model="searchQuery"
          variant="outlined"
          density="compact"
          placeholder="搜索动态、用户、标签..."
          prepend-inner-icon="mdi-magnify"
          hide-details
          class="w-64 sm:w-80 md:w-96"
          clearable
          @keyup.enter="handleSearch"
          @click:clear="handleClearSearch"
        >
          <template v-slot:append-inner>
            <v-btn
              variant="text"
              icon="mdi-magnify"
              size="small"
              :disabled="!searchQuery.trim()"
              @click="handleSearch"
            ></v-btn>
          </template>
        </v-text-field>

        <v-spacer></v-spacer>

        <div class="flex items-center gap-1">
          <v-menu
            v-model="showNotificationsMenu"
            location="bottom end"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="text"
                icon="mdi-bell-outline"
                size="large"
                class="relative"
                @click="toggleNotifications"
              >
                <v-badge
                  color="error"
                  :content="notifications"
                  class="translate-x-3 -translate-y-3"
                  v-if="notifications > 0"
                ></v-badge>
              </v-btn>
            </template>

            <v-card max-width="320">
              <v-card-title class="flex items-center justify-between py-3">
                <span class="font-bold">通知</span>
                <v-btn
                  variant="text"
                  size="small"
                  :disabled="notifications === 0"
                  @click="clearNotifications"
                >
                  全部已读
                </v-btn>
              </v-card-title>
              <v-divider></v-divider>
              <v-list>
                <v-list-item
                  v-for="notification in notificationList"
                  :key="notification.id"
                  class="py-2"
                  :class="{ 'bg-blue-50': !notification.read }"
                >
                  <template v-slot:prepend>
                    <v-avatar
                      size="36"
                      :color="notification.color"
                      variant="flat"
                    >
                      <v-icon :icon="notification.icon" size="18"></v-icon>
                    </v-avatar>
                  </template>
                  <v-list-item-title class="text-sm">
                    {{ notification.title }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-xs">
                    {{ notification.content }}
                    <span class="ml-1 text-gray-400">{{ notification.time }}</span>
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item v-if="notificationList.length === 0" class="text-center">
                  <span class="text-gray-500 w-full">暂无通知</span>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
              <v-card-actions class="justify-center py-2">
                <v-btn variant="text" text size="small">
                  查看全部通知
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>

          <v-menu
            v-model="showMessagesMenu"
            location="bottom end"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="text"
                icon="mdi-message-outline"
                size="large"
                class="relative"
                @click="toggleMessages"
              >
                <v-badge
                  color="primary"
                  :content="messages"
                  class="translate-x-3 -translate-y-3"
                  v-if="messages > 0"
                ></v-badge>
              </v-btn>
            </template>

            <v-card max-width="320">
              <v-card-title class="flex items-center justify-between py-3">
                <span class="font-bold">消息</span>
                <v-btn
                  variant="text"
                  size="small"
                  :disabled="messages === 0"
                  @click="clearMessages"
                >
                  全部已读
                </v-btn>
              </v-card-title>
              <v-divider></v-divider>
              <v-list>
                <v-list-item
                  v-for="message in messageList"
                  :key="message.id"
                  class="py-2 cursor-pointer hover:bg-gray-50"
                  :class="{ 'bg-blue-50': !message.read }"
                  @click="openChat(message)"
                >
                  <template v-slot:prepend>
                    <v-avatar
                      size="40"
                      :image="message.avatar"
                    ></v-avatar>
                  </template>
                  <v-list-item-title class="text-sm font-medium">
                    {{ message.name }}
                    <span class="ml-2 text-xs text-gray-400 font-normal">
                      {{ message.time }}
                    </span>
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-xs text-gray-500 truncate">
                    {{ message.preview }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item v-if="messageList.length === 0" class="text-center">
                  <span class="text-gray-500 w-full">暂无消息</span>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
              <v-card-actions class="justify-center py-2">
                <v-btn variant="text" text size="small">
                  查看全部消息
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>

          <v-menu location="bottom end">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="text"
                class="p-0 min-w-0"
              >
                <v-avatar
                  size="36"
                  :image="currentUser.avatar"
                  class="cursor-pointer hover:opacity-80 transition-opacity"
                ></v-avatar>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                prepend-avatar="https://i.pravatar.cc/150?img=68"
                :title="currentUser.name"
                subtitle="Lv.35 游戏爱好者"
              >
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item
                prepend-icon="mdi-account-circle"
                title="个人中心"
                @click="goToProfile"
              ></v-list-item>
              <v-list-item
                prepend-icon="mdi-bookmark"
                title="我的收藏"
              ></v-list-item>
              <v-list-item
                prepend-icon="mdi-history"
                title="浏览历史"
              ></v-list-item>
              <v-divider></v-divider>
              <v-list-item
                prepend-icon="mdi-cog"
                title="设置"
              ></v-list-item>
              <v-list-item
                prepend-icon="mdi-logout"
                title="退出登录"
                class="text-red-500"
              ></v-list-item>
            </v-list>
          </v-menu>

          <v-btn
            color="primary"
            prepend-icon="mdi-plus"
            class="hidden sm:flex ml-2"
            @click="showCreateDialog = true"
          >
            发布动态
          </v-btn>
        </div>
      </v-layout>
    </v-container>

    <v-dialog
      v-model="showCreateDialog"
      max-width="600px"
    >
      <v-card>
        <v-card-title class="flex items-center justify-between">
          <span class="font-bold">发布新动态</span>
          <v-btn
            variant="text"
            icon="mdi-close"
            @click="showCreateDialog = false"
          ></v-btn>
        </v-card-title>

        <v-card-text>
          <v-textarea
            v-model="newPostContent"
            variant="outlined"
            placeholder="分享你的游戏趣事、攻略、心情..."
            rows="4"
            hide-details
          ></v-textarea>

          <div class="mt-4">
            <v-btn
              variant="outlined"
              prepend-icon="mdi-image"
              class="mr-2"
            >
              添加图片
            </v-btn>
            <v-btn
              variant="outlined"
              prepend-icon="mdi-tag"
            >
              添加标签
            </v-btn>
          </div>
        </v-card-text>

        <v-card-actions class="justify-end px-4 pb-4">
          <v-btn variant="text" @click="showCreateDialog = false">取消</v-btn>
          <v-btn color="primary" :disabled="!newPostContent.trim()">发布</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchQuery = ref('')
const showCreateDialog = ref(false)
const newPostContent = ref('')
const notifications = ref(3)
const messages = ref(12)
const showNotificationsMenu = ref(false)
const showMessagesMenu = ref(false)

const currentUser = ref({
  id: 99,
  name: '游戏玩家',
  avatar: 'https://i.pravatar.cc/150?img=68'
})

const notificationList = ref([
  {
    id: 1,
    title: '有人点赞了你的动态',
    content: '电竞女神小梦 赞了你的「德莱文五杀」动态',
    icon: 'mdi-heart',
    color: 'red',
    time: '2分钟前',
    read: false
  },
  {
    id: 2,
    title: '新评论',
    content: 'FPS老司机 评论了：「五杀截图呢？」',
    icon: 'mdi-comment',
    color: 'blue',
    time: '15分钟前',
    read: false
  },
  {
    id: 3,
    title: '新关注',
    content: '独立游戏开发者 关注了你',
    icon: 'mdi-account-plus',
    color: 'green',
    time: '1小时前',
    read: true
  }
])

const messageList = ref([
  {
    id: 1,
    name: '电竞女神小梦',
    avatar: 'https://i.pravatar.cc/150?img=5',
    preview: '好的，下次一起组队！',
    time: '5分钟前',
    read: false
  },
  {
    id: 2,
    name: 'FPS老司机',
    avatar: 'https://i.pravatar.cc/150?img=8',
    preview: '那个烟雾弹点位能再详细说一下吗？',
    time: '2小时前',
    read: false
  },
  {
    id: 3,
    name: '独立游戏开发者',
    avatar: 'https://i.pravatar.cc/150?img=3',
    preview: '感谢你推荐的资源网站！',
    time: '1天前',
    read: true
  }
])

function goHome() {
  router.push('/')
}

function goToProfile() {
  router.push(`/user/${currentUser.value.id}`)
}

function handleSearch() {
  if (!searchQuery.value.trim()) return
  console.log('搜索:', searchQuery.value)
}

function handleClearSearch() {
  searchQuery.value = ''
}

function toggleNotifications() {
  showMessagesMenu.value = false
}

function toggleMessages() {
  showNotificationsMenu.value = false
}

function clearNotifications() {
  notifications.value = 0
  notificationList.value.forEach(n => n.read = true)
}

function clearMessages() {
  messages.value = 0
  messageList.value.forEach(m => m.read = true)
}

function openChat(message) {
  console.log('打开聊天:', message)
  showMessagesMenu.value = false
}
</script>
