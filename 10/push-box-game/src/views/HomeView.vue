<script setup lang="ts">
import { levels } from '../data/levels'
import { useRouter } from 'vue-router'

const router = useRouter()

const difficultyColors: Record<string, string> = {
  easy: 'green',
  medium: 'orange',
  hard: 'red'
}

const difficultyLabels: Record<string, string> = {
  easy: '简单',
  medium: '中等',
  hard: '困难'
}

const startGame = (levelId?: number) => {
  if (levelId) {
    router.push(`/game/${levelId}`)
  } else {
    router.push('/game')
  }
}
</script>

<template>
  <div class="home-view">
    <v-container class="py-8">
      <v-row class="justify-center mb-8">
        <v-col cols="12" md="8" class="text-center">
          <h1 class="text-4xl font-bold text-primary mb-4">🎮 推箱子游戏</h1>
          <p class="text-lg text-gray-600 mb-6">
            欢迎来到推箱子游戏！这是一个经典的逻辑益智游戏，适合您和孙子一起玩。
            游戏规则很简单：把所有箱子推到目标位置上。
          </p>
          <v-btn color="primary" size="large" prepend-icon="mdi-play" @click="startGame()">
            开始游戏
          </v-btn>
          <v-btn
            color="secondary"
            size="large"
            prepend-icon="mdi-pencil"
            class="ml-4"
            @click="router.push('/editor')"
          >
            创建关卡
          </v-btn>
        </v-col>
      </v-row>

      <v-card class="mb-8" elevation="2">
        <v-card-title class="text-xl font-bold text-primary">📖 游戏说明</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item>
              <template #prepend>
                <v-icon color="primary">mdi-keyboard-arrow-up</v-icon>
              </template>
              <v-list-item-title>使用方向键或屏幕按钮控制角色移动</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <template #prepend>
                <v-icon color="primary">mdi-box</v-icon>
              </template>
              <v-list-item-title>把所有箱子推到目标位置（绿色圆点）上</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <template #prepend>
                <v-icon color="primary">mdi-refresh</v-icon>
              </template>
              <v-list-item-title>如果推错了，可以点击"重新开始"按钮</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <template #prepend>
                <v-icon color="primary">mdi-trophy</v-icon>
              </template>
              <v-list-item-title>尝试用最少的步数完成每一关！</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>

      <v-card elevation="2">
        <v-card-title class="text-xl font-bold text-primary">🎯 选择关卡</v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              v-for="level in levels"
              :key="level.id"
              cols="12"
              sm="6"
              md="4"
              class="mb-4"
            >
              <v-card
                class="cursor-pointer hover:elevation-6 transition-elevation"
                :elevation="2"
                @click="startGame(level.id)"
              >
                <v-card-text class="text-center py-6">
                  <div class="text-3xl mb-2">第 {{ level.id }} 关</div>
                  <div class="text-lg font-medium mb-2">{{ level.name }}</div>
                  <v-chip
                    :color="difficultyColors[level.difficulty]"
                    size="small"
                    variant="outlined"
                  >
                    {{ difficultyLabels[level.difficulty] }}
                  </v-chip>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>
