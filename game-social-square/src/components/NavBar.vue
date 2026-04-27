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
          class="w-80 hidden md:flex"
          clearable
          @keyup.enter="handleSearch"
        ></v-text-field>

        <v-spacer></v-spacer>

        <div class="flex items-center gap-2">
          <v-btn
            variant="text"
            icon="mdi-bell-outline"
            size="large"
          >
            <v-badge
              color="error"
              dot
              :content="notifications"
              class="translate-x-2 -translate-y-2"
            ></v-badge>
          </v-btn>

          <v-btn
            variant="text"
            icon="mdi-message-outline"
            size="large"
          >
            <v-badge
              color="primary"
              :content="messages"
              class="translate-x-2 -translate-y-2"
            ></v-badge>
          </v-btn>

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
                  class="cursor-pointer"
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
            class="hidden sm:flex"
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

const currentUser = ref({
  id: 99,
  name: '游戏玩家',
  avatar: 'https://i.pravatar.cc/150?img=68'
})

function goHome() {
  router.push('/')
}

function goToProfile() {
  router.push(`/user/${currentUser.value.id}`)
}

function handleSearch() {
  console.log('搜索:', searchQuery.value)
}
</script>
