<template>
  <v-container class="py-6">
    <v-layout>
      <v-col cols="12" lg="8" class="order-2 lg:order-1">
        <v-card class="rounded-xl mb-6 p-4" flat>
          <div class="flex items-center gap-4">
            <v-avatar size="48" :image="currentUser.avatar"></v-avatar>
            <v-text-field
              v-model="newPostContent"
              variant="outlined"
              density="compact"
              placeholder="分享你的游戏趣事..."
              hide-details
              class="flex-1"
              @focus="showCreatePost = true"
            ></v-text-field>
          </div>
          <v-divider class="my-3"></v-divider>
          <div class="flex justify-between">
            <div class="flex gap-2">
              <v-btn
                variant="text"
                prepend-icon="mdi-image"
                class="text-gray-600"
              >
                图片
              </v-btn>
              <v-btn
                variant="text"
                prepend-icon="mdi-tag"
                class="text-gray-600"
              >
                标签
              </v-btn>
              <v-btn
                variant="text"
                prepend-icon="mdi-emoticon-happy-outline"
                class="text-gray-600"
              >
                表情
              </v-btn>
            </div>
            <v-btn color="primary" :disabled="!newPostContent.trim()">
              发布
            </v-btn>
          </div>
        </v-card>

        <div v-if="searchKeyword" class="mb-4">
          <v-chip color="primary" close @click="clearSearch">
            <v-icon left>mdi-magnify</v-icon>
            搜索: "{{ searchKeyword }}"
            <span class="ml-2 text-sm opacity-70"
              >({{ filteredPosts.length }} 条结果)</span
            >
          </v-chip>
        </div>

        <v-chip-group class="mb-4" variant="outlined">
          <v-chip
            v-for="tab in tabs"
            :key="tab.value"
            :value="tab.value"
            :color="activeTab === tab.value ? 'primary' : undefined"
            @click="activeTab = tab.value"
          >
            {{ tab.label }}
          </v-chip>
        </v-chip-group>

        <div v-if="selectedTag" class="mb-4">
          <v-chip color="primary" close @click="selectedTag = ''">
            <v-icon left>mdi-tag</v-icon>
            筛选: {{ selectedTag }}
          </v-chip>
        </div>

        <div class="masonry-grid" v-if="filteredPosts.length > 0">
          <PostCard
            v-for="post in filteredPosts"
            :key="post.id"
            :post="post"
            @tag-click="handleTagClick"
            @comment-click="handleCommentClick"
            @view-detail="goToPostDetail"
          ></PostCard>
        </div>

        <div v-else class="text-center py-12">
          <v-icon size="64" color="gray" class="mb-4">mdi-post-outline</v-icon>
          <p class="text-gray-500 text-lg">暂无相关动态</p>
          <p class="text-gray-400 text-sm mt-1">
            {{
              searchKeyword
                ? "试试其他关键词"
                : "试试其他标签或发布第一条动态吧"
            }}
          </p>
        </div>

        <div class="text-center mt-6" v-if="filteredPosts.length > 0">
          <v-btn variant="outlined" prepend-icon="mdi-refresh">
            加载更多
          </v-btn>
        </div>
      </v-col>

      <v-col cols="12" lg="4" class="order-1 lg:order-2">
        <TagCloud v-model="selectedTag" class="mb-6"></TagCloud>

        <v-card class="rounded-xl mb-6" flat>
          <v-card-title class="pb-2">
            <div class="flex items-center gap-2">
              <v-icon color="success">mdi-fire</v-icon>
              <span class="font-bold text-lg">热门话题</span>
            </div>
          </v-card-title>
          <v-card-text class="pt-0">
            <v-list lines="one-line">
              <v-list-item
                v-for="(topic, index) in hotTopics"
                :key="index"
                :prepend-avatar="index + 1"
                class="cursor-pointer hover:bg-gray-50 rounded-lg"
                @click="handleTopicClick(topic)"
              >
                <template v-slot:prepend-avatar>
                  <div
                    class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    :class="
                      index < 3
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-600'
                    "
                  >
                    {{ index + 1 }}
                  </div>
                </template>
                <v-list-item-title class="text-sm font-medium">
                  {{ topic.title }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-xs text-gray-400">
                  {{ topic.count }} 讨论
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

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
                    @click="goToUserProfile(user.id)"
                  ></v-avatar>
                </template>

                <v-list-item-title
                  class="text-sm font-medium cursor-pointer hover:text-primary"
                  @click="goToUserProfile(user.id)"
                >
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

    <v-dialog v-model="showCommentDialog" max-width="600px" scrollable>
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
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import PostCard from "../components/PostCard.vue";
import TagCloud from "../components/TagCloud.vue";
import CommentSection from "../components/CommentSection.vue";
import {
  posts,
  getPostsByTag,
  getCommentsByPostId,
  users,
  searchPosts,
} from "../mock/data";

const router = useRouter();
const route = useRoute();

const currentUser = ref({
  id: 99,
  name: "游戏玩家",
  avatar: "https://i.pravatar.cc/150?img=68",
});

const newPostContent = ref("");
const showCreatePost = ref(false);
const selectedTag = ref("");
const activeTab = ref("hot");
const showCommentDialog = ref(false);
const selectedPost = ref(null);

const tabs = [
  { label: "热门", value: "hot" },
  { label: "最新", value: "new" },
  { label: "关注", value: "following" },
];

const hotTopics = [
  { title: "#英雄联盟S14赛季", count: 12580 },
  { title: "#原神4.5版本前瞻", count: 8920 },
  { title: "#CSGO新赛季更新", count: 6540 },
  { title: "#王者荣耀新英雄影", count: 5420 },
  { title: "#独立游戏开发日志", count: 3250 },
];

const recommendedUsers = computed(() => {
  return users.slice(0, 3);
});

const searchKeyword = computed(() => {
  return route.query.search || "";
});

const filteredPosts = computed(() => {
  let result = posts;

  if (searchKeyword.value) {
    result = searchPosts(searchKeyword.value);
  }

  if (selectedTag.value) {
    result = result.filter((p) => p.tags.includes(selectedTag.value));
  }

  if (activeTab.value === "new") {
    result = [...result].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  } else if (activeTab.value === "hot") {
    result = [...result].sort(
      (a, b) => b.likes + b.comments * 2 - (a.likes + a.comments * 2),
    );
  }

  return result;
});

const postComments = computed(() => {
  if (!selectedPost.value) return [];
  return getCommentsByPostId(selectedPost.value.id);
});

function handleTagClick(tag) {
  selectedTag.value = tag;
}

function handleCommentClick(post) {
  selectedPost.value = post;
  showCommentDialog.value = true;
}

function handleTopicClick(topic) {
  selectedTag.value = topic.title.replace("#", "");
}

function clearSearch() {
  const newQuery = { ...route.query };
  delete newQuery.search;
  router.replace({ query: newQuery });
}

function goToPostDetail(post) {
  router.push(`/post/${post.id}`);
}

function goToUserProfile(userId) {
  router.push(`/user/${userId}`);
}
</script>
