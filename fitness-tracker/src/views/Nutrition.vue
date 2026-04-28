<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">饮食日志</h1>
      <v-btn color="primary" @click="showAddMealDialog = true">
        <v-icon left>mdi-plus</v-icon>
        添加餐食
      </v-btn>
    </div>

    <v-row>
      <v-col cols="12" md="4">
        <v-card class="elevation-2 mb-6">
          <v-card-title>今日营养摄入</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="mb-6">
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">总卡路里</span>
                <span class="text-2xl font-bold text-primary">
                  {{ todayTotalNutrition.calories }}
                  <span class="text-sm font-normal text-gray-500">/ 2000 kcal</span>
                </span>
              </div>
              <v-progress-linear
                :value="Math.min(100, (todayTotalNutrition.calories / 2000) * 100)"
                color="primary"
                height="12"
              ></v-progress-linear>
            </div>

            <v-row>
              <v-col cols="6">
                <div class="text-center p-3 rounded-lg bg-red-lighten-5">
                  <v-icon color="red" size="24">mdi-protein</v-icon>
                  <div class="text-lg font-bold mt-1">{{ todayTotalNutrition.protein }}g</div>
                  <div class="text-xs text-gray-500">蛋白质</div>
                  <div class="text-xs text-gray-400 mt-1">目标: 60g</div>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="text-center p-3 rounded-lg bg-blue-lighten-5">
                  <v-icon color="blue" size="24">mdi-bread-slice</v-icon>
                  <div class="text-lg font-bold mt-1">{{ todayTotalNutrition.carbs }}g</div>
                  <div class="text-xs text-gray-500">碳水化合物</div>
                  <div class="text-xs text-gray-400 mt-1">目标: 250g</div>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="text-center p-3 rounded-lg bg-orange-lighten-5">
                  <v-icon color="orange" size="24">mdi-olive-oil</v-icon>
                  <div class="text-lg font-bold mt-1">{{ todayTotalNutrition.fat }}g</div>
                  <div class="text-xs text-gray-500">脂肪</div>
                  <div class="text-xs text-gray-400 mt-1">目标: 65g</div>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="text-center p-3 rounded-lg bg-green-lighten-5">
                  <v-icon color="green" size="24">mdi-leaf</v-icon>
                  <div class="text-lg font-bold mt-1">{{ todayTotalNutrition.fiber || 0 }}g</div>
                  <div class="text-xs text-gray-500">膳食纤维</div>
                  <div class="text-xs text-gray-400 mt-1">目标: 25g</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card class="elevation-2">
          <v-card-title>今日餐食统计</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="orange">mdi-food-apple</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>早餐</v-list-item-title>
                </v-list-item-content>
                <template #append>
                  <span class="font-bold">{{ getMealCalories('breakfast') }} kcal</span>
                </template>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="green">mdi-food</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>午餐</v-list-item-title>
                </v-list-item-content>
                <template #append>
                  <span class="font-bold">{{ getMealCalories('lunch') }} kcal</span>
                </template>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="purple">mdi-food-drumstick</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>晚餐</v-list-item-title>
                </v-list-item-content>
                <template #append>
                  <span class="font-bold">{{ getMealCalories('dinner') }} kcal</span>
                </template>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="blue">mdi-cookie</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>零食</v-list-item-title>
                </v-list-item-content>
                <template #append>
                  <span class="font-bold">{{ getMealCalories('snack') }} kcal</span>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card class="elevation-2">
          <v-card-title>今日饮食记录</v-card-title>
          <v-divider></v-divider>
          <v-expansion-panels>
            <v-expansion-panel
              v-for="meal in todayMeals"
              :key="meal.id"
            >
              <v-expansion-panel-title>
                <div class="flex justify-between items-center w-full">
                  <div class="flex items-center">
                    <v-icon :color="getMealTypeColor(meal.mealType)" class="mr-2">
                      {{ getMealTypeIcon(meal.mealType) }}
                    </v-icon>
                    <span class="font-semibold">{{ getMealTypeName(meal.mealType) }}</span>
                  </div>
                  <span class="font-bold text-primary">{{ meal.totalNutrition.calories }} kcal</span>
                </div>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-table dense>
                  <thead>
                    <tr>
                      <th>食物名称</th>
                      <th>数量</th>
                      <th>卡路里</th>
                      <th>蛋白质</th>
                      <th>碳水</th>
                      <th>脂肪</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="food in meal.foods" :key="food.id">
                      <td>{{ food.name }}</td>
                      <td>{{ food.quantity }} {{ food.servingSize }}</td>
                      <td>{{ (food.nutrition.calories * food.quantity).toFixed(0) }}</td>
                      <td>{{ (food.nutrition.protein * food.quantity).toFixed(1) }}g</td>
                      <td>{{ (food.nutrition.carbs * food.quantity).toFixed(1) }}g</td>
                      <td>{{ (food.nutrition.fat * food.quantity).toFixed(1) }}g</td>
                    </tr>
                  </tbody>
                </v-table>
                <div class="flex justify-end mt-3">
                  <v-btn size="small" variant="text" color="error" @click="deleteMeal(meal.id)">
                    删除
                  </v-btn>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-alert
            v-if="todayMeals.length === 0"
            variant="outlined"
            class="ma-4"
          >
            暂无今日饮食记录，点击上方按钮添加第一餐吧！
          </v-alert>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="showAddMealDialog" max-width="600px">
      <v-card>
        <v-card-title>
          添加餐食
          <v-spacer></v-spacer>
          <v-btn icon @click="showAddMealDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="mealFormRef" v-model="mealFormValid">
            <v-select
              v-model="mealFormData.mealType"
              label="餐食类型"
              :items="mealTypeOptions"
              item-title="name"
              item-value="type"
              :rules="[requiredRule as any]"
              class="mb-4"
            ></v-select>

            <v-divider class="my-4"></v-divider>

            <div class="mb-4">
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">食物列表</span>
                <v-btn size="small" color="primary" @click="addFoodItem">
                  <v-icon left>mdi-plus</v-icon>
                  添加食物
                </v-btn>
              </div>
              <div
                v-for="(food, index) in mealFormData.foods"
                :key="index"
                class="mb-3 p-3 bg-gray-50 rounded-lg"
              >
                <div class="flex justify-between items-center mb-2">
                  <span class="font-semibold">食物 {{ index + 1 }}</span>
                  <v-btn
                    icon
                    size="small"
                    color="error"
                    @click="removeFoodItem(index)"
                    :disabled="mealFormData.foods.length <= 1"
                  >
                    <v-icon>mdi-minus-circle</v-icon>
                  </v-btn>
                </div>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="food.name"
                      label="食物名称"
                      :rules="[requiredRule as any]"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      v-model.number="food.quantity"
                      label="数量"
                      type="number"
                      step="0.5"
                      :rules="[requiredRule as any, positiveNumberRule as any]"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      v-model="food.servingSize"
                      label="单位"
                      :rules="[requiredRule as any]"
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3">
                    <v-text-field
                      v-model.number="food.nutrition.calories"
                      label="卡路里"
                      type="number"
                      :rules="[requiredRule as any, positiveNumberRule as any]"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      v-model.number="food.nutrition.protein"
                      label="蛋白质(g)"
                      type="number"
                      step="0.1"
                      :rules="[requiredRule as any]"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      v-model.number="food.nutrition.carbs"
                      label="碳水(g)"
                      type="number"
                      step="0.1"
                      :rules="[requiredRule as any]"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      v-model.number="food.nutrition.fat"
                      label="脂肪(g)"
                      type="number"
                      step="0.1"
                      :rules="[requiredRule as any]"
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-end">
          <v-btn text @click="showAddMealDialog = false">取消</v-btn>
          <v-btn color="primary" @click="saveMeal" :disabled="!mealFormValid">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { mockMealRecords } from '@/data/mockData';
import type { MealRecord, FoodItem, NutritionInfo } from '@/types';

const mealRecords = ref<MealRecord[]>([...mockMealRecords]);
const showAddMealDialog = ref(false);
const mealFormValid = ref(false);

const mealTypeNames: Record<string, string> = {
  breakfast: '早餐',
  lunch: '午餐',
  dinner: '晚餐',
  snack: '零食'
};

const mealTypeIcons: Record<string, string> = {
  breakfast: 'mdi-food-apple',
  lunch: 'mdi-food',
  dinner: 'mdi-food-drumstick',
  snack: 'mdi-cookie'
};

const mealTypeColors: Record<string, string> = {
  breakfast: 'orange',
  lunch: 'green',
  dinner: 'purple',
  snack: 'blue'
};

const mealTypeOptions = Object.entries(mealTypeNames).map(([type, name]) => ({
  type,
  name
}));

const mealFormData = ref({
  mealType: 'breakfast' as string,
  foods: [
    {
      id: '',
      name: '',
      servingSize: '份',
      quantity: 1,
      nutrition: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      }
    } as FoodItem
  ]
});

const requiredRule = [(v: any) => !!v || '此项为必填项'];
const positiveNumberRule = [(v: number) => v > 0 || '必须大于0'];

const today = computed(() => new Date().toISOString().split('T')[0]);

const todayMeals = computed(() => {
  return mealRecords.value.filter(m => m.date === today.value);
});

const todayTotalNutrition = computed<NutritionInfo>(() => {
  return todayMeals.value.reduce(
    (total, meal) => ({
      calories: total.calories + meal.totalNutrition.calories,
      protein: total.protein + meal.totalNutrition.protein,
      carbs: total.carbs + meal.totalNutrition.carbs,
      fat: total.fat + meal.totalNutrition.fat,
      fiber: (total.fiber || 0) + (meal.totalNutrition.fiber || 0),
      sugar: (total.sugar || 0) + (meal.totalNutrition.sugar || 0)
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 } as NutritionInfo
  );
});

const getMealTypeName = (type: string) => mealTypeNames[type] || type;
const getMealTypeIcon = (type: string) => mealTypeIcons[type] || 'mdi-food';
const getMealTypeColor = (type: string) => mealTypeColors[type] || 'grey';

const getMealCalories = (mealType: string) => {
  return todayMeals.value
    .filter(m => m.mealType === mealType)
    .reduce((sum, m) => sum + m.totalNutrition.calories, 0);
};

const addFoodItem = () => {
  mealFormData.value.foods.push({
    id: '',
    name: '',
    servingSize: '份',
    quantity: 1,
    nutrition: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    }
  });
};

const removeFoodItem = (index: number) => {
  if (mealFormData.value.foods.length > 1) {
    mealFormData.value.foods.splice(index, 1);
  }
};

const deleteMeal = (id: string) => {
  const index = mealRecords.value.findIndex(m => m.id === id);
  if (index !== -1) {
    mealRecords.value.splice(index, 1);
  }
};

const saveMeal = () => {
  if (!mealFormValid.value) return;

  const foodsWithIds = mealFormData.value.foods.map(f => ({
    ...f,
    id: f.id || Math.random().toString(36).substring(2, 11)
  }));

  const totalNutrition: NutritionInfo = foodsWithIds.reduce(
    (total, food) => ({
      calories: total.calories + food.nutrition.calories * food.quantity,
      protein: total.protein + food.nutrition.protein * food.quantity,
      carbs: total.carbs + food.nutrition.carbs * food.quantity,
      fat: total.fat + food.nutrition.fat * food.quantity
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const newMeal: MealRecord = {
    id: Math.random().toString(36).substring(2, 11),
    date: today.value,
    mealType: mealFormData.value.mealType as 'breakfast' | 'lunch' | 'dinner' | 'snack',
    foods: foodsWithIds,
    totalNutrition
  };

  mealRecords.value.unshift(newMeal);
  showAddMealDialog.value = false;

  mealFormData.value = {
    mealType: 'breakfast',
    foods: [
      {
        id: '',
        name: '',
        servingSize: '份',
        quantity: 1,
        nutrition: {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0
        }
      }
    ]
  };
};
</script>
