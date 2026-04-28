<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">体重管理</h1>
      <v-btn color="primary" @click="showAddWeightDialog = true">
        <v-icon left>mdi-plus</v-icon>
        记录体重
      </v-btn>
    </div>

    <v-row>
      <v-col cols="12" md="4">
        <v-card class="elevation-2 mb-6">
          <v-card-title>当前体重</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="text-center py-6">
            <div class="text-5xl font-bold text-primary mb-2">
              {{ latestWeight }}<span class="text-2xl">kg</span>
            </div>
            <div
              v-if="weightRecords.length > 1"
              class="flex justify-center items-center"
            >
              <v-icon
                :color="weightChange < 0 ? 'success' : 'error'"
                class="mr-1"
              >
                {{ weightChange < 0 ? "mdi-arrow-down" : "mdi-arrow-up" }}
              </v-icon>
              <span
                :class="weightChange < 0 ? 'text-green-600' : 'text-red-600'"
                class="text-lg font-semibold"
              >
                {{ Math.abs(weightChange).toFixed(1) }} kg
              </span>
              <span class="text-gray-500 ml-2">（较上一次）</span>
            </div>
          </v-card-text>
        </v-card>

        <v-card class="elevation-2">
          <v-card-title>体重目标</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row class="mb-4">
              <v-col cols="6" class="text-center">
                <div class="text-sm text-gray-500">起始体重</div>
                <div class="text-xl font-bold">
                  {{ weightGoal.startWeight }} kg
                </div>
              </v-col>
              <v-col cols="6" class="text-center">
                <div class="text-sm text-gray-500">目标体重</div>
                <div class="text-xl font-bold text-primary">
                  {{ weightGoal.targetWeight }} kg
                </div>
              </v-col>
            </v-row>

            <div class="mb-2">
              <div class="flex justify-between text-sm mb-1">
                <span>目标进度</span>
                <span>{{ weightProgress.toFixed(1) }}%</span>
              </div>
              <v-progress-linear
                :value="weightProgress"
                color="success"
                height="10"
              ></v-progress-linear>
            </div>

            <div class="text-center mt-4">
              <v-chip color="primary" size="large">
                还需减重
                {{ (latestWeight - weightGoal.targetWeight).toFixed(1) }} kg
              </v-chip>
            </div>

            <v-btn
              block
              class="mt-4"
              variant="outlined"
              @click="showGoalDialog = true"
            >
              修改目标
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card class="elevation-2 mb-6">
          <v-card-title>体重趋势</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="h-64 flex items-center justify-center">
              <div class="text-center text-gray-500">
                <v-icon size="64" class="mb-2">mdi-chart-line</v-icon>
                <div>体重趋势图表</div>
                <div class="text-sm mt-1">可集成 Chart.js 显示详细图表</div>
              </div>
            </div>
            <v-row class="mt-4">
              <v-col cols="4" class="text-center">
                <div class="text-sm text-gray-500">最高体重</div>
                <div class="text-xl font-bold text-red-500">
                  {{ maxWeight }} kg
                </div>
              </v-col>
              <v-col cols="4" class="text-center">
                <div class="text-sm text-gray-500">最低体重</div>
                <div class="text-xl font-bold text-green-500">
                  {{ minWeight }} kg
                </div>
              </v-col>
              <v-col cols="4" class="text-center">
                <div class="text-sm text-gray-500">累计减重</div>
                <div class="text-xl font-bold text-primary">
                  {{ totalWeightLoss.toFixed(1) }} kg
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card class="elevation-2">
          <v-card-title>体重记录</v-card-title>
          <v-divider></v-divider>
          <v-data-table
            :headers="weightHeaders"
            :items="weightRecords"
            :items-per-page="10"
            class="elevation-0"
          >
            <template #item.actions="{ item }">
              <v-btn
                icon
                size="small"
                color="error"
                @click="deleteWeight(item.id)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="showAddWeightDialog" max-width="500px">
      <v-card>
        <v-card-title>
          记录体重
          <v-spacer></v-spacer>
          <v-btn icon @click="showAddWeightDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="weightFormRef" v-model="weightFormValid">
            <v-text-field
              v-model.number="weightFormData.weight"
              label="体重 (kg)"
              type="number"
              step="0.1"
              :rules="[requiredRule as any, positiveNumberRule as any]"
              class="mb-4"
            ></v-text-field>
            <v-text-field
              v-model.number="weightFormData.bodyFat"
              label="体脂率 (%)"
              type="number"
              step="0.1"
              class="mb-4"
            ></v-text-field>
            <v-text-field
              v-model.number="weightFormData.muscleMass"
              label="肌肉量 (kg)"
              type="number"
              step="0.1"
              class="mb-4"
            ></v-text-field>
            <v-menu v-model="weightDateMenu" :close-on-content-click="false">
              <template #activator="{ props }">
                <v-text-field
                  v-model="weightFormData.date"
                  label="记录日期"
                  prepend-icon="mdi-calendar"
                  v-bind="props"
                  :rules="[requiredRule as any]"
                  readonly
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="weightFormData.date"
                @update:model-value="weightDateMenu = false"
              ></v-date-picker>
            </v-menu>
            <v-textarea
              v-model="weightFormData.notes"
              label="备注"
              rows="2"
              class="mt-4"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-end">
          <v-btn text @click="showAddWeightDialog = false">取消</v-btn>
          <v-btn
            color="primary"
            @click="saveWeight"
            :disabled="!weightFormValid"
          >
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showGoalDialog" max-width="500px">
      <v-card>
        <v-card-title>
          设置体重目标
          <v-spacer></v-spacer>
          <v-btn icon @click="showGoalDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="goalFormRef" v-model="goalFormValid">
            <v-text-field
              v-model.number="goalFormData.targetWeight"
              label="目标体重 (kg)"
              type="number"
              step="0.1"
              :rules="[requiredRule as any, positiveNumberRule as any]"
              class="mb-4"
            ></v-text-field>
            <v-text-field
              v-model.number="goalFormData.startWeight"
              label="起始体重 (kg)"
              type="number"
              step="0.1"
              :rules="[requiredRule as any, positiveNumberRule as any]"
              class="mb-4"
            ></v-text-field>
            <v-menu v-model="goalDateMenu" :close-on-content-click="false">
              <template #activator="{ props }">
                <v-text-field
                  v-model="goalFormData.targetDate"
                  label="目标日期"
                  prepend-icon="mdi-calendar"
                  v-bind="props"
                  :rules="[requiredRule as any]"
                  readonly
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="goalFormData.targetDate"
                @update:model-value="goalDateMenu = false"
              ></v-date-picker>
            </v-menu>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-end">
          <v-btn text @click="showGoalDialog = false">取消</v-btn>
          <v-btn color="primary" @click="saveGoal" :disabled="!goalFormValid">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { mockWeightRecords, mockWeightGoal } from "@/data/mockData";
import type { WeightRecord, WeightGoal } from "@/types";

const weightRecords = ref<WeightRecord[]>([...mockWeightRecords]);
const weightGoal = ref<WeightGoal>({ ...mockWeightGoal });

const showAddWeightDialog = ref(false);
const showGoalDialog = ref(false);
const weightDateMenu = ref(false);
const goalDateMenu = ref(false);
const weightFormValid = ref(false);
const goalFormValid = ref(false);

const weightHeaders = [
  { title: "日期", key: "date" },
  { title: "体重 (kg)", key: "weight" },
  { title: "体脂率 (%)", key: "bodyFat" },
  { title: "肌肉量 (kg)", key: "muscleMass" },
  { title: "操作", key: "actions" },
];

const weightFormData = ref({
  weight: 75,
  bodyFat: undefined as number | undefined,
  muscleMass: undefined as number | undefined,
  date: new Date().toISOString().split("T")[0],
  notes: "",
});

const goalFormData = ref({
  targetWeight: weightGoal.value.targetWeight,
  startWeight: weightGoal.value.startWeight,
  targetDate: weightGoal.value.targetDate,
});

const requiredRule = [(v: any) => !!v || "此项为必填项"];
const positiveNumberRule = [(v: number) => v > 0 || "必须大于0"];

const latestWeight = computed(() => {
  return weightRecords.value[0]?.weight || 0;
});

const weightChange = computed(() => {
  if (weightRecords.value.length < 2) return 0;
  return weightRecords.value[0].weight - weightRecords.value[1].weight;
});

const maxWeight = computed(() => {
  return Math.max(...weightRecords.value.map((w) => w.weight));
});

const minWeight = computed(() => {
  return Math.min(...weightRecords.value.map((w) => w.weight));
});

const totalWeightLoss = computed(() => {
  return weightGoal.value.startWeight - latestWeight.value;
});

const weightProgress = computed(() => {
  const totalToLose =
    weightGoal.value.startWeight - weightGoal.value.targetWeight;
  const lostSoFar = weightGoal.value.startWeight - latestWeight.value;
  return totalToLose > 0 ? Math.min(100, (lostSoFar / totalToLose) * 100) : 0;
});

const deleteWeight = (id: string) => {
  const index = weightRecords.value.findIndex((w) => w.id === id);
  if (index !== -1) {
    weightRecords.value.splice(index, 1);
  }
};

const saveWeight = () => {
  if (!weightFormValid.value) return;

  const newRecord: WeightRecord = {
    id: Math.random().toString(36).substring(2, 11),
    weight: weightFormData.value.weight,
    bodyFat: weightFormData.value.bodyFat,
    muscleMass: weightFormData.value.muscleMass,
    date: weightFormData.value.date,
    notes: weightFormData.value.notes,
  };

  weightRecords.value.unshift(newRecord);
  showAddWeightDialog.value = false;
  weightFormData.value = {
    weight: 75,
    bodyFat: undefined,
    muscleMass: undefined,
    date: new Date().toISOString().split("T")[0],
    notes: "",
  };
};

const saveGoal = () => {
  if (!goalFormValid.value) return;

  weightGoal.value = {
    ...weightGoal.value,
    targetWeight: goalFormData.value.targetWeight,
    startWeight: goalFormData.value.startWeight,
    targetDate: goalFormData.value.targetDate,
  };

  showGoalDialog.value = false;
};
</script>
