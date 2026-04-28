<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">训练计划</h1>
      <v-btn color="primary" @click="showAddPlanDialog = true">
        <v-icon left>mdi-plus</v-icon>
        创建计划
      </v-btn>
    </div>

    <v-row>
      <v-col cols="12" md="4">
        <v-card class="elevation-2 mb-6">
          <v-card-title>训练统计</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="primary">mdi-calendar-check</v-icon>
                </v-list-item-icon>
                <v-list-item-title>活跃计划</v-list-item-title>
                <template #append>
                  <span class="font-bold text-primary">{{ activePlansCount }}</span>
                </template>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="success">mdi-check-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-title>已完成计划</v-list-item-title>
                <template #append>
                  <span class="font-bold text-success">{{ completedPlansCount }}</span>
                </template>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="orange">mdi-dumbbell</v-icon>
                </v-list-item-icon>
                <v-list-item-title>总训练动作</v-list-item-title>
                <template #append>
                  <span class="font-bold text-orange">{{ totalExercisesCount }}</span>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <v-card class="elevation-2">
          <v-card-title>今日训练</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div v-if="todayTraining">
              <div class="font-semibold mb-3">{{ todayTraining.planName }}</div>
              <v-list>
                <v-list-item
                  v-for="exercise in todayTraining.exercises"
                  :key="exercise.id"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ exercise.name }}</v-list-item-title>
                    <v-list-item-subtitle>
                      {{ exercise.sets }}组 × {{ exercise.reps }}次
                      <span v-if="exercise.weight"> · {{ exercise.weight }}kg</span>
                      <span v-if="exercise.duration"> · {{ exercise.duration }}秒</span>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
            <v-alert
              v-else
              variant="outlined"
              border="start"
              color="info"
            >
              今日无训练安排，享受休息日吧！
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card class="elevation-2">
          <v-card-title>我的训练计划</v-card-title>
          <v-divider></v-divider>
          <v-expansion-panels>
            <v-expansion-panel
              v-for="plan in trainingPlans"
              :key="plan.id"
            >
              <v-expansion-panel-title>
                <div class="flex justify-between items-center w-full">
                  <div class="flex items-center">
                    <v-chip
                      :color="getStatusColor(plan.status)"
                      size="small"
                      class="mr-3"
                    >
                      {{ getStatusName(plan.status) }}
                    </v-chip>
                    <div>
                      <div class="font-semibold">{{ plan.name }}</div>
                      <div class="text-sm text-gray-500">
                        {{ plan.startDate }}
                        <span v-if="plan.endDate"> ~ {{ plan.endDate }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ getActiveDaysCount(plan) }}天/周
                  </div>
                </div>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <div class="mb-3">{{ plan.description }}</div>
                <v-divider class="my-3"></v-divider>
                <div class="font-semibold mb-2">训练安排：</div>
                <v-row>
                  <v-col
                    v-for="(day, index) in weekDays"
                    :key="index"
                    cols="12"
                    md="6"
                    lg="4"
                  >
                    <v-card
                      variant="outlined"
                      class="mb-2"
                      :class="getTrainingDay(plan, index)?.isRestDay ? 'bg-gray-50' : ''"
                    >
                      <v-card-title class="py-2 text-sm">
                        <v-icon
                          class="mr-2"
                          :color="getTrainingDay(plan, index)?.isRestDay ? 'grey' : 'primary'"
                        >
                          {{ getTrainingDay(plan, index)?.isRestDay ? 'mdi-bed' : 'mdi-dumbbell' }}
                        </v-icon>
                        {{ day }}
                        <v-chip
                          v-if="getTrainingDay(plan, index)?.isRestDay"
                          size="small"
                          variant="outlined"
                          class="ml-2"
                        >
                          休息日
                        </v-chip>
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text class="py-2">
                        <div
                          v-if="!getTrainingDay(plan, index)?.isRestDay && getTrainingDay(plan, index)?.exercises"
                        >
                          <div
                            v-for="exercise in getTrainingDay(plan, index)?.exercises"
                            :key="exercise.id"
                            class="text-sm mb-1"
                          >
                            <span class="font-medium">{{ exercise.name }}</span>
                            <span class="text-gray-500">
                              ({{ exercise.sets }}×{{ exercise.reps }})
                            </span>
                          </div>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
                <div class="flex justify-end mt-4">
                  <v-btn
                    size="small"
                    variant="text"
                    :color="plan.status === 'active' ? 'warning' : 'success'"
                    @click="togglePlanStatus(plan)"
                  >
                    {{ plan.status === 'active' ? '暂停计划' : '激活计划' }}
                  </v-btn>
                  <v-btn
                    size="small"
                    variant="text"
                    color="error"
                    @click="deletePlan(plan.id)"
                  >
                    删除计划
                  </v-btn>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-alert
            v-if="trainingPlans.length === 0"
            variant="outlined"
            class="ma-4"
          >
            暂无训练计划，点击上方按钮创建第一个计划吧！
          </v-alert>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="showAddPlanDialog" max-width="800px">
      <v-card>
        <v-card-title>
          创建训练计划
          <v-spacer></v-spacer>
          <v-btn icon @click="showAddPlanDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="planFormRef" v-model="planFormValid">
            <v-text-field
              v-model="planFormData.name"
              label="计划名称"
              :rules="[requiredRule as any]"
              class="mb-4"
            ></v-text-field>
            <v-textarea
              v-model="planFormData.description"
              label="计划描述"
              rows="2"
              class="mb-4"
            ></v-textarea>
            <v-menu v-model="startDateMenu" :close-on-content-click="false">
              <template #activator="{ props }">
                <v-text-field
                  v-model="planFormData.startDate"
                  label="开始日期"
                  prepend-icon="mdi-calendar"
                  v-bind="props"
                  :rules="[requiredRule as any]"
                  readonly
                  class="mb-4"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="planFormData.startDate"
                @update:model-value="startDateMenu = false"
              ></v-date-picker>
            </v-menu>

            <v-divider class="my-4"></v-divider>

            <div class="font-semibold mb-3">设置每周训练安排：</div>
            <v-tabs v-model="selectedDay">
              <v-tab
                v-for="(day, index) in weekDays"
                :key="index"
                :value="index"
              >
                {{ day }}
              </v-tab>
            </v-tabs>
            <v-window v-model="selectedDay">
              <v-window-item
                v-for="(_day, index) in weekDays"
                :key="index"
                :value="index"
              >
                <div class="py-4">
                  <v-checkbox
                    v-model="planFormData.trainingDays[index].isRestDay"
                    label="设为休息日"
                    class="mb-4"
                  ></v-checkbox>
                  <template v-if="!planFormData.trainingDays[index].isRestDay">
                    <div class="flex justify-between items-center mb-3">
                      <span class="font-semibold">训练动作</span>
                      <v-btn
                        size="small"
                        color="primary"
                        @click="addExerciseToDay(index)"
                      >
                        <v-icon left>mdi-plus</v-icon>
                        添加动作
                      </v-btn>
                    </div>
                    <div
                      v-for="(exercise, exIndex) in planFormData.trainingDays[index].exercises"
                      :key="exIndex"
                      class="mb-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div class="flex justify-between items-center mb-2">
                        <span class="font-medium">动作 {{ exIndex + 1 }}</span>
                        <v-btn
                          icon
                          size="small"
                          color="error"
                          @click="removeExerciseFromDay(index, exIndex)"
                          :disabled="planFormData.trainingDays[index].exercises.length <= 0"
                        >
                          <v-icon>mdi-minus-circle</v-icon>
                        </v-btn>
                      </div>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            v-model="exercise.name"
                            label="动作名称"
                            :rules="[requiredRule as any]"
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col cols="2">
                          <v-text-field
                            v-model.number="exercise.sets"
                            label="组数"
                            type="number"
                            :rules="[requiredRule as any, positiveNumberRule as any]"
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col cols="2">
                          <v-text-field
                            v-model.number="exercise.reps"
                            label="次数"
                            type="number"
                            :rules="[requiredRule as any, positiveNumberRule as any]"
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col cols="2">
                          <v-text-field
                            v-model.number="exercise.weight"
                            label="重量(kg)"
                            type="number"
                            step="0.5"
                            dense
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </div>
                  </template>
                </div>
              </v-window-item>
            </v-window>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-end">
          <v-btn text @click="showAddPlanDialog = false">取消</v-btn>
          <v-btn color="primary" @click="savePlan" :disabled="!planFormValid">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { mockTrainingPlans } from '@/data/mockData';
import type { TrainingPlan, TrainingDay, TrainingPlanStatus } from '@/types';

const trainingPlans = ref<TrainingPlan[]>([...mockTrainingPlans]);
const showAddPlanDialog = ref(false);
const startDateMenu = ref(false);
const planFormValid = ref(false);
const selectedDay = ref(1); // 默认周一

const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

const statusNames: Record<TrainingPlanStatus, string> = {
  active: '进行中',
  completed: '已完成',
  paused: '已暂停'
};

const statusColors: Record<TrainingPlanStatus, string> = {
  active: 'primary',
  completed: 'success',
  paused: 'warning'
};

const requiredRule = [(v: any) => !!v || '此项为必填项'];
const positiveNumberRule = [(v: number) => v > 0 || '必须大于0'];

const defaultTrainingDays = (): TrainingDay[] => {
  return Array.from({ length: 7 }, (_, i) => ({
    dayOfWeek: i,
    isRestDay: ![1, 3, 5].includes(i), // 周一、三、五默认训练
    exercises: [1, 3, 5].includes(i) ? [
      {
        id: Math.random().toString(36).substring(2, 11),
        name: '',
        sets: 3,
        reps: 12
      }
    ] : []
  }));
};

const planFormData = ref({
  name: '',
  description: '',
  startDate: new Date().toISOString().split('T')[0],
  trainingDays: defaultTrainingDays()
});

const activePlansCount = computed(() => {
  return trainingPlans.value.filter(p => p.status === 'active').length;
});

const completedPlansCount = computed(() => {
  return trainingPlans.value.filter(p => p.status === 'completed').length;
});

const totalExercisesCount = computed(() => {
  return trainingPlans.value.reduce((total, plan) => {
    return total + plan.trainingDays.reduce((dayTotal, day) => {
      return dayTotal + day.exercises.length;
    }, 0);
  }, 0);
});

const todayTraining = computed(() => {
  const today = new Date().getDay();
  const activePlan = trainingPlans.value.find(p => p.status === 'active');
  if (!activePlan) return null;

  const trainingDay = activePlan.trainingDays.find(d => d.dayOfWeek === today);
  if (!trainingDay || trainingDay.isRestDay) return null;

  return {
    planName: activePlan.name,
    exercises: trainingDay.exercises
  };
});

const getStatusName = (status: TrainingPlanStatus) => statusNames[status];
const getStatusColor = (status: TrainingPlanStatus) => statusColors[status];

const getActiveDaysCount = (plan: TrainingPlan) => {
  return plan.trainingDays.filter(d => !d.isRestDay).length;
};

const getTrainingDay = (plan: TrainingPlan, dayOfWeek: number) => {
  return plan.trainingDays.find(d => d.dayOfWeek === dayOfWeek);
};

const addExerciseToDay = (dayIndex: number) => {
  planFormData.value.trainingDays[dayIndex].exercises.push({
    id: Math.random().toString(36).substring(2, 11),
    name: '',
    sets: 3,
    reps: 12
  });
};

const removeExerciseFromDay = (dayIndex: number, exIndex: number) => {
  if (planFormData.value.trainingDays[dayIndex].exercises.length > 0) {
    planFormData.value.trainingDays[dayIndex].exercises.splice(exIndex, 1);
  }
};

const togglePlanStatus = (plan: TrainingPlan) => {
  const index = trainingPlans.value.findIndex(p => p.id === plan.id);
  if (index !== -1) {
    trainingPlans.value[index].status =
      plan.status === 'active' ? 'paused' : 'active';
  }
};

const deletePlan = (id: string) => {
  const index = trainingPlans.value.findIndex(p => p.id === id);
  if (index !== -1) {
    trainingPlans.value.splice(index, 1);
  }
};

const savePlan = () => {
  if (!planFormValid.value) return;

  const newPlan: TrainingPlan = {
    id: Math.random().toString(36).substring(2, 11),
    name: planFormData.value.name,
    description: planFormData.value.description,
    startDate: planFormData.value.startDate,
    status: 'active',
    trainingDays: planFormData.value.trainingDays,
    createdAt: new Date().toISOString().split('T')[0]
  };

  trainingPlans.value.unshift(newPlan);
  showAddPlanDialog.value = false;

  planFormData.value = {
    name: '',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    trainingDays: defaultTrainingDays()
  };
};
</script>
