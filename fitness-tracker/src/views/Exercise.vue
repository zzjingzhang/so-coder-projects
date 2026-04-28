<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">运动记录</h1>
      <v-btn color="primary" @click="showAddDialog = true">
        <v-icon left>mdi-plus</v-icon>
        添加运动
      </v-btn>
    </div>

    <v-row>
      <v-col cols="12" md="4">
        <v-card class="elevation-2 mb-6">
          <v-card-title>运动统计</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list>
              <v-list-item :prepend-icon="'mdi-run'" prepend-icon-color="primary">
                <v-list-item-title>总运动次数</v-list-item-title>
                <template #append>
                  <span class="font-bold">{{ exerciseRecords.length }}次</span>
                </template>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item :prepend-icon="'mdi-clock-outline'" prepend-icon-color="success">
                <v-list-item-title>总运动时长</v-list-item-title>
                <template #append>
                  <span class="font-bold">{{ totalMinutes }}分钟</span>
                </template>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item :prepend-icon="'mdi-fire'" prepend-icon-color="orange">
                <v-list-item-title>总消耗卡路里</v-list-item-title>
                <template #append>
                  <span class="font-bold">{{ totalCalories }}kcal</span>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <v-card class="elevation-2">
          <v-card-title>运动类型分布</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="(count, type) in exerciseTypeCounts"
                :key="type"
                :prepend-icon="getExerciseIcon(type as ExerciseType)"
                :prepend-icon-color="getTypeColor(type as ExerciseType)"
              >
                <v-list-item-title>{{ getExerciseName(type as ExerciseType) }}</v-list-item-title>
                <template #append>
                  <span class="font-bold">{{ count }}次</span>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card class="elevation-2">
          <v-card-title>运动记录列表</v-card-title>
          <v-divider></v-divider>
          <v-data-table
            :headers="headers"
            :items="exerciseRecords"
            :items-per-page="10"
            class="elevation-0"
          >
            <template #item.type="{ item }">
              <v-chip :color="getTypeColor(item.type)" size="small">
                {{ getExerciseName(item.type) }}
              </v-chip>
            </template>
            <template #item.intensity="{ item }">
              <v-chip :color="getIntensityColor(item.intensity)" size="small">
                {{ getIntensityName(item.intensity) }}
              </v-chip>
            </template>
            <template #item.date="{ item }">
              {{ formatDate(item.date) }}
            </template>
            <template #item.actions="{ item }">
              <v-btn icon size="small" color="primary" @click="editExercise(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon size="small" color="error" @click="deleteExercise(item.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="showAddDialog" max-width="600px">
      <v-card>
        <v-card-title>
          {{ isEditing ? '编辑运动记录' : '添加运动记录' }}
          <v-spacer></v-spacer>
          <v-btn icon @click="showAddDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="formRef" v-model="valid">
            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="formData.type"
                  label="运动类型"
                  :items="exerciseTypeOptions"
                  item-title="name"
                  item-value="type"
                  :rules="[requiredRule as any]"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="formData.intensity"
                  label="运动强度"
                  :items="intensityOptions"
                  item-title="name"
                  item-value="intensity"
                  :rules="[requiredRule as any]"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model.number="formData.duration"
                  label="运动时长（分钟）"
                  type="number"
                  :rules="[requiredRule as any, positiveNumberRule as any]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model.number="formData.caloriesBurned"
                  label="消耗卡路里"
                  type="number"
                  :rules="[requiredRule as any, positiveNumberRule as any]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-menu v-model="dateMenu" :close-on-content-click="false">
                  <template #activator="{ props }">
                    <v-text-field
                      v-model="formData.date"
                      label="运动日期"
                      prepend-icon="mdi-calendar"
                      v-bind="props"
                      :rules="[requiredRule as any]"
                      readonly
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="formData.date" @update:model-value="dateMenu = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="formData.notes"
                  label="备注"
                  rows="2"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-end">
          <v-btn text @click="showAddDialog = false">取消</v-btn>
          <v-btn color="primary" @click="saveExercise" :disabled="!valid">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { mockExerciseRecords } from '@/data/mockData';
import type { ExerciseRecord, ExerciseType, ExerciseIntensity } from '@/types';

const exerciseRecords = ref<ExerciseRecord[]>([...mockExerciseRecords]);
const showAddDialog = ref(false);
const isEditing = ref(false);
const editingId = ref<string | null>(null);
const dateMenu = ref(false);
const valid = ref(false);

const headers = [
  { title: '运动类型', key: 'type' },
  { title: '时长（分钟）', key: 'duration' },
  { title: '强度', key: 'intensity' },
  { title: '卡路里', key: 'caloriesBurned' },
  { title: '日期', key: 'date' },
  { title: '操作', key: 'actions' }
];

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

const exerciseTypeOptions = Object.entries(exerciseNames).map(([type, name]) => ({
  type,
  name
}));

const intensityOptions = Object.entries(intensityNames).map(([intensity, name]) => ({
  intensity,
  name
}));

const formData = ref({
  type: 'running' as ExerciseType,
  duration: 30,
  intensity: 'medium' as ExerciseIntensity,
  caloriesBurned: 300,
  date: new Date().toISOString().split('T')[0],
  notes: ''
});

const requiredRule = [(v: any) => !!v || '此项为必填项'];
const positiveNumberRule = [(v: number) => v > 0 || '必须大于0'];

const totalMinutes = computed(() => {
  return exerciseRecords.value.reduce((sum, e) => sum + e.duration, 0);
});

const totalCalories = computed(() => {
  return exerciseRecords.value.reduce((sum, e) => sum + e.caloriesBurned, 0);
});

const exerciseTypeCounts = computed(() => {
  const counts: Record<string, number> = {};
  exerciseRecords.value.forEach(e => {
    counts[e.type] = (counts[e.type] || 0) + 1;
  });
  return counts;
});

const getExerciseName = (type: ExerciseType) => exerciseNames[type];
const getExerciseIcon = (type: ExerciseType) => exerciseIcons[type];
const getIntensityName = (intensity: ExerciseIntensity) => intensityNames[intensity];

const getTypeColor = (type: ExerciseType) => {
  const colors: Record<ExerciseType, string> = {
    running: 'blue',
    cycling: 'green',
    swimming: 'cyan',
    strength: 'orange',
    yoga: 'purple',
    other: 'grey'
  };
  return colors[type];
};

const getIntensityColor = (intensity: ExerciseIntensity) => {
  const colors: Record<ExerciseIntensity, string> = {
    low: 'green',
    medium: 'orange',
    high: 'red'
  };
  return colors[intensity];
};

const formatDate = (date: string) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const resetForm = () => {
  formData.value = {
    type: 'running',
    duration: 30,
    intensity: 'medium',
    caloriesBurned: 300,
    date: new Date().toISOString().split('T')[0],
    notes: ''
  };
  isEditing.value = false;
  editingId.value = null;
};

const editExercise = (exercise: ExerciseRecord) => {
  isEditing.value = true;
  editingId.value = exercise.id;
  formData.value = {
    type: exercise.type,
    duration: exercise.duration,
    intensity: exercise.intensity,
    caloriesBurned: exercise.caloriesBurned,
    date: exercise.date,
    notes: exercise.notes || ''
  };
  showAddDialog.value = true;
};

const deleteExercise = (id: string) => {
  const index = exerciseRecords.value.findIndex(e => e.id === id);
  if (index !== -1) {
    exerciseRecords.value.splice(index, 1);
  }
};

const saveExercise = () => {
  if (!valid.value) return;

  if (isEditing.value && editingId.value) {
    const index = exerciseRecords.value.findIndex(e => e.id === editingId.value);
    if (index !== -1) {
      exerciseRecords.value[index] = {
        ...exerciseRecords.value[index],
        ...formData.value
      };
    }
  } else {
    const newExercise: ExerciseRecord = {
      id: Math.random().toString(36).substring(2, 11),
      ...formData.value
    };
    exerciseRecords.value.unshift(newExercise);
  }

  showAddDialog.value = false;
  resetForm();
};
</script>
