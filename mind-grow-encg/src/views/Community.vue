<template>
  <div class="community-page">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <el-icon class="text-6xl mb-4 opacity-80"><ChatDotRound /></el-icon>
        <h1 class="text-4xl lg:text-5xl font-bold mb-4">Community</h1>
        <p class="text-xl text-white/90 max-w-2xl mx-auto">
          Connect with fellow students, join discussions, find mentors, and participate in challenges together.
        </p>
      </div>
    </section>

    <!-- Main Content with Tabs -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <el-tabs v-model="activeTab" class="community-tabs">
          <!-- Forums Tab -->
          <el-tab-pane label="Forums" name="forums">
            <div class="space-y-6">
              <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 class="text-2xl font-bold text-gray-900">Discussion Forums</h2>
                  <p class="text-gray-600 mt-1">Join conversations, ask questions, and share your experiences.</p>
                </div>
                <el-button type="primary" size="large" @click="showNewPostDialog = true">
                  <el-icon class="mr-2"><Plus /></el-icon>
                  New Post
                </el-button>
              </div>

              <!-- Forum Topics -->
              <div class="space-y-4">
                <div
                  v-for="topic in forumTopics"
                  :key="topic.id"
                  class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                  @click="viewPost(topic)"
                >
                  <div class="flex flex-col lg:flex-row lg:items-start gap-4">
                    <img
                      :src="topic.avatar"
                      :alt="topic.author"
                      class="w-12 h-12 rounded-full object-cover"
                    />
                    <div class="flex-1">
                      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h3 class="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                          {{ topic.title }}
                        </h3>
                        <span class="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                          {{ topic.category }}
                        </span>
                      </div>
                      <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span class="flex items-center">
                          <el-icon class="mr-1"><User /></el-icon>
                          {{ topic.author }}
                        </span>
                        <span class="flex items-center">
                          <el-icon class="mr-1"><ChatDotRound /></el-icon>
                          {{ topic.replies }} replies
                        </span>
                        <span class="flex items-center">
                          <el-icon class="mr-1"><View /></el-icon>
                          {{ topic.views }} views
                        </span>
                        <span class="flex items-center">
                          <el-icon class="mr-1"><Clock /></el-icon>
                          {{ topic.lastReply }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <!-- Live Chat Tab -->
          <el-tab-pane label="Live Chat" name="chat">
            <div class="space-y-8">
              <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Live Chat Schedule</h2>
                <p class="text-gray-600">Join our scheduled live chat sessions for real-time support and discussion.</p>
              </div>

              <!-- Chat Schedule -->
              <div class="grid md:grid-cols-2 gap-6">
                <div
                  v-for="chat in chatSchedule"
                  :key="chat.id"
                  class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                  <div class="flex items-start justify-between mb-4">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">{{ chat.topic }}</h3>
                      <p class="text-sm text-gray-500 mt-1">Moderated by {{ chat.moderator }}</p>
                    </div>
                    <div class="text-right">
                      <div class="text-lg font-bold text-primary-600">{{ chat.day }}</div>
                      <div class="text-sm text-gray-500">{{ chat.time }}</div>
                    </div>
                  </div>
                  <el-button type="primary" plain size="small" class="w-full">
                    Set Reminder
                  </el-button>
                </div>
              </div>

              <!-- Chat Rules -->
              <div class="bg-gradient-to-r from-secondary-50 to-primary-50 rounded-2xl p-8">
                <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <el-icon class="mr-2 text-primary-600"><InfoFilled /></el-icon>
                  Chat Guidelines
                </h3>
                <ul class="space-y-3">
                  <li class="flex items-start text-gray-700">
                    <el-icon class="text-primary-500 mt-1 mr-3 flex-shrink-0"><Check /></el-icon>
                    <span>Be respectful and kind to all community members</span>
                  </li>
                  <li class="flex items-start text-gray-700">
                    <el-icon class="text-primary-500 mt-1 mr-3 flex-shrink-0"><Check /></el-icon>
                    <span>Stay on topic during scheduled chat sessions</span>
                  </li>
                  <li class="flex items-start text-gray-700">
                    <el-icon class="text-primary-500 mt-1 mr-3 flex-shrink-0"><Check /></el-icon>
                    <span>No personal attacks, harassment, or discrimination</span>
                  </li>
                  <li class="flex items-start text-gray-700">
                    <el-icon class="text-primary-500 mt-1 mr-3 flex-shrink-0"><Check /></el-icon>
                    <span>Protect your privacy - don't share personal information</span>
                  </li>
                  <li class="flex items-start text-gray-700">
                    <el-icon class="text-primary-500 mt-1 mr-3 flex-shrink-0"><Check /></el-icon>
                    <span>If you're in crisis, please contact the support resources</span>
                  </li>
                </ul>
              </div>
            </div>
          </el-tab-pane>

          <!-- Mentorship Tab -->
          <el-tab-pane label="Mentorship" name="mentorship">
            <div class="space-y-8">
              <div class="text-center max-w-2xl mx-auto">
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Meet Our Mentors</h2>
                <p class="text-gray-600">Connect with experienced professionals who can guide you on your wellness journey.</p>
              </div>

              <!-- Mentor Cards -->
              <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                  v-for="mentor in mentors"
                  :key="mentor.id"
                  class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div class="p-6">
                    <div class="flex items-center mb-4">
                      <img
                        :src="mentor.avatar"
                        :alt="mentor.name"
                        class="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 class="text-lg font-semibold text-gray-900">{{ mentor.name }}</h3>
                        <p class="text-sm text-primary-600 font-medium">{{ mentor.specialty }}</p>
                      </div>
                    </div>
                    <div class="flex items-center justify-between mb-4">
                      <el-rate :model-value="mentor.rating" disabled size="small" />
                      <span class="text-sm text-gray-500">{{ mentor.sessions }} sessions</span>
                    </div>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-3">{{ mentor.bio }}</p>
                    <div class="flex flex-wrap gap-2 mb-6">
                      <span
                        v-for="(skill, index) in mentor.expertise"
                        :key="index"
                        class="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                      >
                        {{ skill }}
                      </span>
                    </div>
                    <el-button type="primary" size="default" class="w-full rounded-xl">
                      Book Session
                    </el-button>
                  </div>
                </div>
              </div>

              <!-- Application Process -->
              <div class="bg-gradient-to-r from-accent-50 to-secondary-50 rounded-2xl p-8">
                <h3 class="text-xl font-bold text-gray-900 mb-6">Become a Mentor</h3>
                <div class="grid md:grid-cols-4 gap-6">
                  <div class="text-center">
                    <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <span class="text-lg font-bold text-primary-600">1</span>
                    </div>
                    <h4 class="font-semibold text-gray-900 mb-1">Apply</h4>
                    <p class="text-sm text-gray-600">Fill out the mentor application form</p>
                  </div>
                  <div class="text-center">
                    <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <span class="text-lg font-bold text-primary-600">2</span>
                    </div>
                    <h4 class="font-semibold text-gray-900 mb-1">Review</h4>
                    <p class="text-sm text-gray-600">Our team reviews your application</p>
                  </div>
                  <div class="text-center">
                    <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <span class="text-lg font-bold text-primary-600">3</span>
                    </div>
                    <h4 class="font-semibold text-gray-900 mb-1">Training</h4>
                    <p class="text-sm text-gray-600">Complete our mentor training program</p>
                  </div>
                  <div class="text-center">
                    <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <span class="text-lg font-bold text-primary-600">4</span>
                    </div>
                    <h4 class="font-semibold text-gray-900 mb-1">Start</h4>
                    <p class="text-sm text-gray-600">Begin mentoring students</p>
                  </div>
                </div>
                <div class="text-center mt-8">
                  <el-button type="primary" size="large">Apply to Be a Mentor</el-button>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <!-- Challenges Tab -->
          <el-tab-pane label="Challenges" name="challenges">
            <div class="space-y-8">
              <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Weekly Challenges</h2>
                <p class="text-gray-600">Participate in challenges, earn points, and climb the leaderboard!</p>
              </div>

              <!-- Active Challenges -->
              <div class="grid md:grid-cols-2 gap-6">
                <div
                  v-for="challenge in weeklyChallenges"
                  :key="challenge.id"
                  class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all"
                >
                  <img
                    :src="challenge.image"
                    :alt="challenge.title"
                    class="w-full h-48 object-cover"
                  />
                  <div class="p-6">
                    <div class="flex items-center justify-between mb-3">
                      <h3 class="text-xl font-bold text-gray-900">{{ challenge.title }}</h3>
                      <span class="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                        Active
                      </span>
                    </div>
                    <p class="text-gray-600 mb-4">{{ challenge.description }}</p>
                    <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span class="flex items-center">
                        <el-icon class="mr-1"><User /></el-icon>
                        {{ challenge.participants }} joined
                      </span>
                      <span class="flex items-center">
                        <el-icon class="mr-1"><Calendar /></el-icon>
                        {{ challenge.startDate }} - {{ challenge.endDate }}
                      </span>
                    </div>
                    <div class="bg-gray-50 rounded-xl p-4 mb-4">
                      <div class="flex items-center text-primary-600">
                        <el-icon class="mr-2 text-xl"><Trophy /></el-icon>
                        <span class="font-semibold">{{ challenge.rewards }}</span>
                      </div>
                    </div>
                    <el-button type="primary" size="large" class="w-full rounded-xl">
                      Join Challenge
                    </el-button>
                  </div>
                </div>
              </div>

              <!-- Leaderboard -->
              <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <el-icon class="mr-2 text-yellow-500"><Trophy /></el-icon>
                  Leaderboard
                </h3>
                <div class="space-y-4">
                  <div
                    v-for="user in leaderboard"
                    :key="user.rank"
                    :class="[
                      'flex items-center p-4 rounded-xl transition-all',
                      user.rank <= 3 ? 'bg-gradient-to-r from-primary-50 to-secondary-50' : 'bg-gray-50'
                    ]"
                  >
                    <div
                      :class="[
                        'w-10 h-10 rounded-full flex items-center justify-center mr-4 font-bold text-lg',
                        user.rank === 1 ? 'bg-yellow-400 text-white' :
                        user.rank === 2 ? 'bg-gray-300 text-white' :
                        user.rank === 3 ? 'bg-amber-600 text-white' :
                        'bg-gray-200 text-gray-600'
                      ]"
                    >
                      {{ user.rank }}
                    </div>
                    <img
                      :src="user.avatar"
                      :alt="user.name"
                      class="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div class="flex-1">
                      <span class="font-semibold text-gray-900">{{ user.name }}</span>
                    </div>
                    <div class="text-right">
                      <span class="font-bold text-primary-600 text-lg">{{ user.points.toLocaleString() }}</span>
                      <span class="text-gray-500 text-sm ml-1">pts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <!-- Events Tab -->
          <el-tab-pane label="Events" name="events">
            <div class="space-y-8">
              <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 class="text-2xl font-bold text-gray-900 mb-2">Upcoming Events</h2>
                  <p class="text-gray-600">Join workshops, webinars, and social events to connect and learn.</p>
                </div>
                <el-button type="primary" size="large">
                  <el-icon class="mr-2"><Calendar /></el-icon>
                  View Calendar
                </el-button>
              </div>

              <!-- Events List -->
              <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                  v-for="event in events"
                  :key="event.id"
                  class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div class="relative">
                    <img
                      :src="event.image"
                      :alt="event.title"
                      class="w-full h-48 object-cover"
                    />
                    <div class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                      <div class="text-xs text-gray-500">{{ event.date }}</div>
                      <div class="text-sm font-semibold text-gray-900">{{ event.time }}</div>
                    </div>
                  </div>
                  <div class="p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-2">{{ event.title }}</h3>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ event.description }}</p>
                    <div class="flex items-center text-sm text-gray-500 mb-4">
                      <el-icon class="mr-1"><Location /></el-icon>
                      {{ event.location }}
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="text-sm text-gray-500">
                        <span class="font-medium text-primary-600">{{ event.attendees }}</span>
                        <span> / {{ event.maxAttendees }} attending</span>
                      </div>
                      <el-button type="primary" size="small" rounded>
                        RSVP
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </section>

    <!-- New Post Dialog -->
    <el-dialog
      v-model="showNewPostDialog"
      title="Create New Post"
      width="600px"
      :close-on-click-modal="false"
    >
      <el-form :model="newPost" label-position="top">
        <el-form-item label="Title">
          <el-input v-model="newPost.title" placeholder="Enter a descriptive title" />
        </el-form-item>
        <el-form-item label="Category">
          <el-select v-model="newPost.category" placeholder="Select a category" class="w-full">
            <el-option label="General Discussion" value="General Discussion" />
            <el-option label="Mental Health" value="Mental Health" />
            <el-option label="Nutrition" value="Nutrition" />
            <el-option label="Study Groups" value="Study Groups" />
            <el-option label="Fitness" value="Fitness" />
          </el-select>
        </el-form-item>
        <el-form-item label="Content">
          <el-input
            v-model="newPost.content"
            type="textarea"
            :rows="6"
            placeholder="Share your thoughts, questions, or experiences..."
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showNewPostDialog = false">Cancel</el-button>
        <el-button type="primary" @click="submitPost">Publish Post</el-button>
      </template>
    </el-dialog>

    <!-- Post Detail Dialog -->
    <el-dialog
      v-model="showPostDetail"
      :title="selectedPost?.title"
      width="800px"
    >
      <div v-if="selectedPost" class="space-y-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <img
              :src="selectedPost.avatar"
              :alt="selectedPost.author"
              class="w-10 h-10 rounded-full object-cover mr-3"
            />
            <div>
              <div class="font-semibold text-gray-900">{{ selectedPost.author }}</div>
              <div class="text-sm text-gray-500">{{ selectedPost.lastReply }}</div>
            </div>
          </div>
          <span class="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
            {{ selectedPost.category }}
          </span>
        </div>
        <div class="border-t border-gray-100 pt-6">
          <p class="text-gray-700 leading-relaxed">
            This is a sample post content. In a real application, this would display the full content of the forum post along with any replies from other community members.
          </p>
        </div>
        <div class="border-t border-gray-100 pt-6">
          <h4 class="font-semibold text-gray-900 mb-4">Replies ({{ selectedPost.replies }})</h4>
          <div class="space-y-4">
            <div class="bg-gray-50 rounded-xl p-4">
              <div class="flex items-center mb-2">
                <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-2">
                  <el-icon class="text-primary-600"><User /></el-icon>
                </div>
                <span class="font-medium text-gray-900 text-sm">StudentHelper</span>
                <span class="text-gray-400 text-xs ml-2">1 hour ago</span>
              </div>
              <p class="text-gray-700 text-sm">Great question! I've found that the library's 4th floor has the quietest study spaces.</p>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-100 pt-6">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="Write your reply..."
          />
          <div class="flex justify-end mt-3">
            <el-button type="primary">Post Reply</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  forumTopics,
  chatSchedule,
  mentors,
  weeklyChallenges,
  leaderboard,
  events
} from '../data/mockData'

const route = useRoute()
const activeTab = ref('forums')

const showNewPostDialog = ref(false)
const showPostDetail = ref(false)
const selectedPost = ref(null)

const newPost = ref({
  title: '',
  category: '',
  content: ''
})

onMounted(() => {
  const tab = route.query.tab
  if (tab && ['forums', 'chat', 'mentorship', 'challenges', 'events'].includes(tab)) {
    activeTab.value = tab
  }
})

const viewPost = (topic) => {
  selectedPost.value = topic
  showPostDetail.value = true
}

const submitPost = () => {
  if (!newPost.value.title || !newPost.value.category || !newPost.value.content) {
    ElMessage.warning('Please fill in all fields')
    return
  }
  ElMessage.success('Post published successfully!')
  showNewPostDialog.value = false
  newPost.value = {
    title: '',
    category: '',
    content: ''
  }
}
</script>

<style scoped>
.community-tabs :deep(.el-tabs__header) {
  margin-bottom: 32px;
}

.community-tabs :deep(.el-tabs__nav-wrap::after) {
  background-color: #e2e8f0;
}

.community-tabs :deep(.el-tabs__item) {
  font-size: 16px;
  font-weight: 500;
  height: 48px;
  line-height: 48px;
}
</style>
