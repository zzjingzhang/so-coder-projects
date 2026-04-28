<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">成就系统</h1>
      <v-chip color="primary" size="large">
        已解锁 {{ unlockedCount }}/{{ achievements.length }} 成就
      </v-chip>
    </div>

    <v-row>
      <v-col cols="12" md="4">
        <v-card class="elevation-2 mb-6">
          <v-card-title>成就统计</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="text-center py-4">
              <div class="text-6xl font-bold text-primary mb-2">
                {{ unlockedCount }}
              </div>
              <div class="text-gray-500">已解锁成就</div>
            </div>
            <v-divider class="my-4"></v-divider>
            <v-list>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="orange">mdi-trophy</v-icon>
                </v-list-item-icon>
                <v-list-item-title>里程碑成就</v-list-item-title>
                <template #append>
                  <span class="font-bold">
                    {{ getAchievementCountByType('milestone') }}
                  </span>
                </template>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="red">mdi-fire</v-icon>
                </v-list-item-icon>
                <v-list-item-title>连续打卡成就</v-list-item-title>
                <template #append>
                  <span class="font-bold">
                    {{ getAchievementCountByType('streak') }}
                  </span>
                </template>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="primary">mdi-target</v-icon>
                </v-list-item-icon>
                <v-list-item-title>目标达成成就</v-list-item-title>
                <template #append>
                  <span class="font-bold">
                    {{ getAchievementCountByType('goal') }}
                  </span>
                </template>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="green">mdi-check-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-title>坚持成就</v-list-item-title>
                <template #append>
                  <span class="font-bold">
                    {{ getAchievementCountByType('consistency') }}
                  </span>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <v-card class="elevation-2">
          <v-card-title>最近解锁</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="achievement in recentUnlocked"
                :key="achievement.id"
              >
                <v-list-item-icon>
                  <v-icon color="success" size="32">{{ achievement.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ achievement.name }}</v-list-item-title>
                  <v-list-item-subtitle>
                    解锁于 {{ achievement.unlockedAt }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-alert
              v-if="recentUnlocked.length === 0"
              variant="outlined"
              border="start"
              color="info"
            >
              暂无解锁的成就，继续努力！
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card class="elevation-2">
          <v-card-title>所有成就</v-card-title>
          <v-divider></v-divider>
          <v-tabs v-model="achievementTab">
            <v-tab value="all">全部</v-tab>
            <v-tab value="unlocked">已解锁</v-tab>
            <v-tab value="locked">未解锁</v-tab>
          </v-tabs>
          <v-window v-model="achievementTab">
            <v-window-item value="all">
              <v-row class="pa-4">
                <v-col
                  v-for="achievement in achievements"
                  :key="achievement.id"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <achievement-card :achievement="achievement"></achievement-card>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item value="unlocked">
              <v-row class="pa-4">
                <v-col
                  v-for="achievement in unlockedAchievements"
                  :key="achievement.id"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <achievement-card :achievement="achievement"></achievement-card>
                </v-col>
              </v-row>
              <v-alert
                v-if="unlockedAchievements.length === 0"
                variant="outlined"
                class="mx-4 my-2"
              >
                暂无已解锁的成就
              </v-alert>
            </v-window-item>
            <v-window-item value="locked">
              <v-row class="pa-4">
                <v-col
                  v-for="achievement in lockedAchievements"
                  :key="achievement.id"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <achievement-card :achievement="achievement"></achievement-card>
                </v-col>
              </v-row>
              <v-alert
                v-if="lockedAchievements.length === 0"
                variant="outlined"
                class="mx-4 my-2"
              >
                太棒了！所有成就都已解锁
              </v-alert>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineComponent, h } from 'vue';
import { mockAchievements } from '@/data/mockData';
import type { Achievement, AchievementType } from '@/types';

const achievements = ref<Achievement[]>([...mockAchievements]);
const achievementTab = ref('all');

const AchievementCard = defineComponent({
  name: 'AchievementCard',
  props: {
    achievement: {
      type: Object as () => Achievement,
      required: true
    }
  },
  setup(props) {
    return () => h(
      'div',
      {
        class: [
          'p-4',
          'rounded-lg',
          'border',
          'transition-all',
          'duration-300',
          'hover:shadow-lg',
          {
            'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200': props.achievement.isUnlocked,
            'bg-gray-50 border-gray-200': !props.achievement.isUnlocked
          }
        ]
      },
      [
        h(
          'div',
          { class: 'flex items-center justify-between mb-3' },
          [
            h(
              'div',
              {
                class: [
                  'w-12',
                  'h-12',
                  'rounded-full',
                  'flex',
                  'items-center',
                  'justify-center',
                  {
                    'bg-gradient-to-br from-yellow-400 to-orange-500': props.achievement.isUnlocked,
                    'bg-gray-300': !props.achievement.isUnlocked
                  }
                ]
              },
              [
                h(
                  'v-icon',
                  {
                    size: '28',
                    color: props.achievement.isUnlocked ? 'white' : 'gray-500'
                  },
                  props.achievement.icon
                )
              ]
            ),
            props.achievement.isUnlocked
              ? h(
                  'v-chip',
                  { color: 'success', size: 'small' },
                  '已解锁'
                )
              : h(
                  'v-chip',
                  { color: 'grey', size: 'small', variant: 'outlined' },
                  '未解锁'
                )
          ]
        ),
        h(
          'div',
          {
            class: [
              'font-semibold',
              'text-lg',
              'mb-1',
              { 'text-gray-400': !props.achievement.isUnlocked }
            ]
          },
          props.achievement.name
        ),
        h(
          'div',
          { class: 'text-sm text-gray-500 mb-3' },
          props.achievement.description
        ),
        !props.achievement.isUnlocked && props.achievement.progress !== undefined
          ? h(
              'div',
              {},
              [
                h(
                  'div',
                  { class: 'flex justify-between text-sm mb-1' },
                  [
                    h('span', '进度'),
                    h('span', `${props.achievement.progress}%`)
                  ]
                ),
                h(
                  'v-progress-linear',
                  {
                    value: props.achievement.progress,
                    color: 'primary',
                    height: '8'
                  }
                )
              ]
            )
          : null,
        props.achievement.isUnlocked && props.achievement.unlockedAt
          ? h(
              'div',
              { class: 'text-xs text-green-600 mt-2' },
              `解锁于 ${props.achievement.unlockedAt}`
            )
          : null
      ]
    );
  }
});

const unlockedCount = computed(() => {
  return achievements.value.filter(a => a.isUnlocked).length;
});

const unlockedAchievements = computed(() => {
  return achievements.value.filter(a => a.isUnlocked);
});

const lockedAchievements = computed(() => {
  return achievements.value.filter(a => !a.isUnlocked);
});

const recentUnlocked = computed(() => {
  return achievements.value
    .filter(a => a.isUnlocked && a.unlockedAt)
    .sort((a, b) => new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime())
    .slice(0, 3);
});

const getAchievementCountByType = (type: AchievementType) => {
  return achievements.value.filter(a => a.type === type && a.isUnlocked).length;
};
</script>
