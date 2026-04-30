<template>
  <v-container fluid class="py-6">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4 font-bold">任务管理</h1>
      </v-col>
    </v-row>

    <v-row class="mb-6">
      <v-col cols="12" sm="6" md="3">
        <v-card class="elevation-2">
          <v-card-text class="text-center">
            <div class="text-h4 font-bold text-blue-600">{{ taskStore.totalCount }}</div>
            <div class="text-sm text-gray-600">总任务数</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="elevation-2">
          <v-card-text class="text-center">
            <div class="text-h4 font-bold text-green-600">{{ taskStore.completedCount }}</div>
            <div class="text-sm text-gray-600">已完成</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="elevation-2">
          <v-card-text class="text-center">
            <div class="text-h4 font-bold text-orange-600">{{ taskStore.pendingCount }}</div>
            <div class="text-sm text-gray-600">待完成</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="elevation-2">
          <v-card-text class="text-center">
            <div class="text-h4 font-bold text-purple-600">
              {{
                taskStore.totalCount > 0
                  ? Math.round((taskStore.completedCount / taskStore.totalCount) * 100)
                  : 0
              }}%
            </div>
            <div class="text-sm text-gray-600">完成率</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mb-6">
      <v-col cols="12">
        <v-card class="elevation-2">
          <v-card-title class="pb-2">添加新任务</v-card-title>
          <v-card-text>
            <v-form v-model="valid" @submit.prevent="handleAddTask">
              <v-row dense no-gutters>
                <v-col cols="12" sm="5" md="5" class="pr-2">
                  <v-text-field
                    v-model="newTaskTitle"
                    label="任务标题"
                    placeholder="请输入任务标题"
                    :rules="[requiredRule]"
                    variant="outlined"
                    density="compact"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="5" md="5" class="px-2">
                  <v-text-field
                    v-model="newTaskDescription"
                    label="任务描述（可选）"
                    placeholder="请输入任务描述"
                    variant="outlined"
                    density="compact"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" md="2" class="d-flex align-center pl-2">
                  <v-btn
                    type="submit"
                    color="primary"
                    :loading="taskStore.isLoading"
                    :disabled="!valid"
                    class="ma-0"
                    height="40"
                  >
                    添加任务
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="elevation-2">
          <v-card-title class="d-flex justify-space-between align-center">
            <span>任务列表</span>
            <v-btn
              color="primary"
              variant="outlined"
              :loading="taskStore.isLoading"
              @click="loadTasks"
              size="small"
            >
              <v-icon class="mr-1">mdi-refresh</v-icon>
              刷新
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>

          <v-progress-linear
            v-if="taskStore.isLoading"
            indeterminate
            color="primary"
          ></v-progress-linear>

          <v-card-text v-else>
            <v-alert
              v-if="taskStore.error"
              type="error"
              dense
              class="mb-4"
              dismissible
              @dismiss="taskStore.clearError()"
            >
              {{ taskStore.error }}
            </v-alert>

            <v-list v-if="taskStore.tasks.length > 0" two-line class="py-0">
              <template v-for="(task, index) in taskStore.tasks" :key="task.id">
                <v-list-item
                  :class="{ 'opacity-60': task.completed }"
                  class="py-3"
                  :style="index > 0 ? 'border-top: 1px solid rgba(0,0,0,0.12)' : ''"
                >
                  <template v-slot:prepend>
                    <v-btn
                      icon
                      size="small"
                      :color="task.completed ? 'success' : 'grey'"
                      @click="handleToggleTask(task.id)"
                      :loading="taskStore.isLoading"
                      class="mr-3"
                    >
                      <v-icon size="20">
                        {{
                          task.completed
                            ? 'mdi-checkbox-marked-circle'
                            : 'mdi-checkbox-blank-circle-outline'
                        }}
                      </v-icon>
                    </v-btn>
                  </template>

                  <v-list-item-title
                    :class="{ 'text-decoration-line-through': task.completed }"
                    class="mb-1"
                  >
                    {{ task.title }}
                  </v-list-item-title>
                  <v-list-item-subtitle v-if="task.description" class="text-body-2">
                    {{ task.description }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-else class="text-body-2 text-gray-400">
                    无描述
                  </v-list-item-subtitle>

                  <template v-slot:append>
                    <div class="d-flex align-center ml-4 gap-3">
                      <v-chip
                        :color="task.completed ? 'success' : 'warning'"
                        size="small"
                        variant="outlined"
                      >
                        {{ task.completed ? '已完成' : '进行中' }}
                      </v-chip>
                      <v-btn
                        icon
                        size="small"
                        color="error"
                        variant="text"
                        @click="handleDeleteTask(task.id)"
                        :loading="taskStore.isLoading"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </div>
                  </template>
                </v-list-item>
              </template>
            </v-list>

            <v-empty-state
              v-else
              headline="暂无任务"
              text="点击刷新按钮加载任务或添加新任务"
            ></v-empty-state>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()

const valid = ref(false)
const newTaskTitle = ref('')
const newTaskDescription = ref('')

const requiredRule = (v: string) => !!v || '请输入任务标题'

const loadTasks = async () => {
  await taskStore.fetchTasks()
}

const handleAddTask = async () => {
  if (!newTaskTitle.value.trim()) return

  try {
    await taskStore.addTask({
      title: newTaskTitle.value,
      description: newTaskDescription.value || undefined
    })
    newTaskTitle.value = ''
    newTaskDescription.value = ''
  } catch (err) {
    console.error('添加任务失败:', err)
  }
}

const handleToggleTask = async (id: string) => {
  try {
    await taskStore.toggleTask(id)
  } catch (err) {
    console.error('更新任务失败:', err)
  }
}

const handleDeleteTask = async (id: string) => {
  try {
    await taskStore.removeTask(id)
  } catch (err) {
    console.error('删除任务失败:', err)
  }
}

onMounted(() => {
  loadTasks()
})
</script>
