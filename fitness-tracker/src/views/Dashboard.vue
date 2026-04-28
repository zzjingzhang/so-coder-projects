<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">仪表盘</h1>
    
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-card class="elevation-2">
          <v-card-title class="text-center pt-4">
            <v-icon size="48" color="primary">mdi-run</v-icon>
          </v-card-title>
          <v-card-text class="text-center">
            <div class="text-3xl font-bold">{{ stats.totalWorkouts }}</div>
            <div class="text-gray-600">总运动次数</div>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" sm="6" md="3">
        <v-card class="elevation-2">
          <v-card-title class="text-center pt-4">
            <v-icon size="48" color="success">mdi-clock-outline</v-icon>
          </v-card-title>
          <v-card-text class="text-center">
            <div class="text-3xl font-bold">{{ Math.round(stats.totalMinutes / 60) }}h</div>
            <div class="text-gray-600">总运动时长</div>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" sm="6" md="3">
        <v-card class="elevation-2">
          <v-card-title class="text-center pt-4">
            <v-icon size="48" color="orange">mdi-fire</v-icon>
          </v-card-title>
          <v-card-text class="text-center">
            <div class="text-3xl font-bold">{{ stats.totalCaloriesBurned }}</div>
            <div class="text-gray-600">总消耗卡路里</div>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" sm="6" md="3">
        <v-card class="elevation-2">
          <v-card-title class="text-center pt-4">
            <v-icon size="48" color="red">mdi-fire</v-icon>
          </v-card-title>
          <v-card-text class="text-center">
            <div class="text-3xl font-bold">{{ stats.currentStreak }}天</div>
            <div class="text-gray-600">当前连续运动</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="12" md="8">
        <v-card class="elevation-2">
          <v-card-title>近期运动记录</v-card-title>
          <v-divider></v-divider>
          <v-list>
            <v-list-item
              v-for="exercise in recentExercises"
              :key="exercise.id"
              :prepend-icon="getExerciseIcon(exercise.type)"
            >
              <v-list-item-title>{{ getExerciseName(exercise.type) }}</v-list-item-title>
              <v-list-item-subtitle>{{ exercise.duration }}分钟 · {{ getIntensityName(exercise.intensity) }}强度 · {{ exercise.caloriesBurned }}卡路里</v-list-item-subtitle>
              <template #append>
                <v-chip color="primary" size="small">{{ exercise.date }}</v-chip>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="4">
        <v-card class="elevation-2">
          <v-card-title>今日营养摄入</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="mb-4">
              <div class="flex justify-between mb-1">
                <span>总卡路里</span>
                <span class="font-bold">{{ todayNutrition.calories }} kcal</span>
              </div>
              <v-progress-linear
                :value="(todayNutrition.calories / 2000) * 100"
                color="primary"
                height="8"
              ></v-progress-linear>
              <div class="text-xs text-gray-500 mt-1">目标: 2000 kcal</div>
            </div>
            
            <v-row>
              <v-col cols="4">
                <div class="text-center">
                  <v-icon color="red">mdi-protein</v-icon>
                  <div class="font-bold">{{ todayNutrition.protein }}g</div>
                  <div class="text-xs text-gray-500">蛋白质</div>
                </div>
              </v-col>
              <v-col cols="4">
                <div class="text-center">
                  <v-icon color="blue">mdi-bread-slice</v-icon>
                  <div class="font-bold">{{ todayNutrition.carbs }}g</div>
                  <div class="text-xs text-gray-500">碳水</div>
                </div>
              </v-col>
              <v-col cols="4">
                <div class="text-center">
                  <v-icon color="orange">mdi-olive-oil</v-icon>
                  <div class="font-bold">{{ todayNutrition.fat }}g</div>
                  <div class="text-xs text-gray-500">脂肪</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="12">
        <v-card class="elevation-2">
          <v-card-title>体重趋势</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="flex items-center justify-between mb-4">
              <div>
                <span class="text-3xl font-bold">{{ latestWeight }} kg</span>
                <span class="text-sm text-green-600 ml-2">
                  ↓ {{ weightChange.toFixed(1) }} kg
                </span>
              </div>
              <div>
                <v-chip color="primary" size="small">
                  目标: {{ weightGoal.targetWeight }} kg
                </v-chip>
              </div>
            </div>
            <div class="h-40">
              <v-progress-linear
                :value="weightProgress"
                color="success"
                height="12"
              ></v-progress-linear>
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>{{ weightGoal.startWeight }} kg</span>
                <span>目标进度: {{ weightProgress.toFixed(1) }}%</span>
                <span>{{ weightGoal.targetWeight }} kg</span>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { mockExerciseRecords, mockMealRecords, mockWeightRecords, mockWeightGoal, mockUserStats } from '@/data/mockData';
import type { ExerciseType, ExerciseIntensity, NutritionInfo } from '@/types';

const stats = mockUserStats;
const recentExercises = mockExerciseRecords.slice(0, 5);
const weightGoal = mockWeightGoal;

const exerciseNames: Record<ExerciseType, string> = {
  running: '跑步',
  cycling: '骑行',
  swimming: '游泳',
  strength: '力量训练',
  yoga: '瑜伽',
  other: '其他运动'
};

const exerciseIcons: Record<ExerciseType, string> = {
  running: 'mdi-run',
  cycling: 'mdi-bike',
  swimming: 'mdi-swim',
  strength: 'mdi-dumbbell',
  yoga: 'mdi-yoga',
  other: 'mdi-dumbbell'
};

const intensityNames: Record<ExerciseIntensity, string> = {
  low: '低',
  medium: '中',
  high: '高'
};

const getExerciseName = (type: ExerciseType) => exerciseNames[type];
const getExerciseIcon = (type: ExerciseType) => exerciseIcons[type];
const getIntensityName = (intensity: ExerciseIntensity) => intensityNames[intensity];

const todayNutrition = computed<NutritionInfo>(() => {
  const today = new Date().toISOString().split('T')[0];
  const todayMeals = mockMealRecords.filter(m => m.date === today);
  
  return {
    calories: todayMeals.reduce((sum, m) => sum + m.totalNutrition.calories, 0),
    protein: todayMeals.reduce((sum, m) => sum + m.totalNutrition.protein, 0),
    carbs: todayMeals.reduce((sum, m) => sum + m.totalNutrition.carbs, 0),
    fat: todayMeals.reduce((sum, m) => sum + m.totalNutrition.fat, 0)
  };
});

const latestWeight = computed(() => {
  return mockWeightRecords[0]?.weight || 0;
});

const weightChange = computed(() => {
  if (mockWeightRecords.length < 2) return 0;
  return mockWeightRecords[mockWeightRecords.length - 1].weight - mockWeightRecords[0].weight;
});

const weightProgress = computed(() => {
  const totalToLose = weightGoal.startWeight - weightGoal.targetWeight;
  const lostSoFar = weightGoal.startWeight - latestWeight.value;
  return totalToLose > 0 ? (lostSoFar / totalToLose) * 100 : 0;
});
</script>
