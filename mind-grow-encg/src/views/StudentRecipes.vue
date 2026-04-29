<template>
  <div class="student-recipes-page">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-accent-600 to-secondary-600 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <el-icon class="text-6xl mb-4 opacity-80"><KnifeFork /></el-icon>
        <h1 class="text-4xl lg:text-5xl font-bold mb-4">Student Recipes</h1>
        <p class="text-xl text-white/90 max-w-2xl mx-auto">
          Delicious, nutritious, and budget-friendly meal ideas perfect for busy students.
        </p>
      </div>
    </section>

    <!-- Search & Filter Section -->
    <section class="py-8 bg-white border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <!-- Search Input -->
          <div class="lg:col-span-2">
            <el-input
              v-model="searchQuery"
              placeholder="Search recipes..."
              size="large"
              :prefix-icon="Search"
              clearable
            />
          </div>

          <!-- Budget Filter -->
          <el-select
            v-model="selectedBudget"
            placeholder="Budget"
            size="large"
            clearable
            class="w-full"
          >
            <el-option label="All Budgets" value="" />
            <el-option label="Low Budget" value="low" />
            <el-option label="Medium Budget" value="medium" />
          </el-select>

          <!-- Cooking Time Filter -->
          <el-select
            v-model="selectedTime"
            placeholder="Cooking Time"
            size="large"
            clearable
            class="w-full"
          >
            <el-option label="Any Time" value="" />
            <el-option label="Quick (Under 15 min)" value="quick" />
            <el-option label="Medium (15-30 min)" value="medium" />
            <el-option label="Slow (Over 30 min)" value="slow" />
          </el-select>

          <!-- Goal Filter -->
          <el-select
            v-model="selectedGoal"
            placeholder="Goal"
            size="large"
            clearable
            class="w-full"
          >
            <el-option label="All Goals" value="" />
            <el-option label="Energy Boost" value="energy" />
            <el-option label="Focus & Brain" value="focus" />
            <el-option label="Relax & Sleep" value="relax" />
          </el-select>
        </div>

        <!-- Active Filters Display -->
        <div v-if="hasActiveFilters" class="mt-4 flex flex-wrap items-center gap-2">
          <span class="text-sm text-gray-600">Active filters:</span>
          <el-tag
            v-if="selectedBudget"
            closable
            @close="selectedBudget = ''"
            class="bg-primary-50 text-primary-700 border-primary-200"
          >
            Budget: {{ selectedBudget === 'low' ? 'Low' : 'Medium' }}
          </el-tag>
          <el-tag
            v-if="selectedTime"
            closable
            @close="selectedTime = ''"
            class="bg-secondary-50 text-secondary-700 border-secondary-200"
          >
            Time: {{ timeLabel }}
          </el-tag>
          <el-tag
            v-if="selectedGoal"
            closable
            @close="selectedGoal = ''"
            class="bg-accent-50 text-accent-700 border-accent-200"
          >
            Goal: {{ goalLabel }}
          </el-tag>
          <el-button
            type="text"
            size="small"
            class="text-gray-500 hover:text-red-600"
            @click="clearAllFilters"
          >
            Clear all
          </el-button>
        </div>
      </div>
    </section>

    <!-- Recipes Grid -->
    <section class="py-12 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold text-gray-900">
            {{ filteredRecipes.length }} Recipes Found
          </h2>
          <el-select
            v-model="sortBy"
            placeholder="Sort by"
            size="large"
            class="w-48"
          >
            <el-option label="Popular (High Rated)" value="rating" />
            <el-option label="Quickest First" value="time" />
            <el-option label="A-Z" value="name" />
          </el-select>
        </div>

        <div v-if="filteredRecipes.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="recipe in sortedRecipes"
            :key="recipe.id"
            class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group"
            @click="openRecipeDetail(recipe)"
          >
            <div class="relative overflow-hidden">
              <img
                :src="recipe.image"
                :alt="recipe.title"
                class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute top-3 right-3">
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-xs font-medium',
                    recipe.budget === 'low'
                      ? 'bg-green-500 text-white'
                      : 'bg-yellow-500 text-white'
                  ]"
                >
                  {{ recipe.budget === 'low' ? '$' : '$$' }}
                </span>
              </div>
              <div class="absolute bottom-3 left-3">
                <span class="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                  <el-icon class="mr-1"><Clock /></el-icon>
                  {{ recipe.duration }} min
                </span>
              </div>
            </div>
            <div class="p-5">
              <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {{ recipe.title }}
              </h3>
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                  <el-rate
                    :model-value="recipe.rating"
                    disabled
                    size="small"
                  />
                  <span class="text-sm text-gray-500 ml-2">{{ recipe.rating }}</span>
                </div>
                <span
                  :class="[
                    'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                    recipe.goal === 'energy' ? 'bg-orange-100 text-orange-700' :
                    recipe.goal === 'focus' ? 'bg-blue-100 text-blue-700' :
                    'bg-purple-100 text-purple-700'
                  ]"
                >
                  <el-icon class="mr-1">
                    <component :is="goalIcon(recipe.goal)" />
                  </el-icon>
                  {{ recipe.goal.charAt(0).toUpperCase() + recipe.goal.slice(1) }}
                </span>
              </div>
              <div class="grid grid-cols-3 gap-2 text-center text-sm">
                <div class="bg-gray-50 rounded-lg p-2">
                  <div class="text-gray-500 text-xs">Calories</div>
                  <div class="font-semibold text-gray-900">{{ recipe.calories }}</div>
                </div>
                <div class="bg-gray-50 rounded-lg p-2">
                  <div class="text-gray-500 text-xs">Protein</div>
                  <div class="font-semibold text-gray-900">{{ recipe.protein }}g</div>
                </div>
                <div class="bg-gray-50 rounded-lg p-2">
                  <div class="text-gray-500 text-xs">Serves</div>
                  <div class="font-semibold text-gray-900">{{ recipe.servings }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <el-icon class="text-gray-300 text-6xl mb-4"><Search /></el-icon>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">No recipes found</h3>
          <p class="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
          <el-button type="primary" size="large" @click="clearAllFilters">
            Clear All Filters
          </el-button>
        </div>
      </div>
    </section>

    <!-- Recipe Detail Modal -->
    <el-dialog
      v-model="showRecipeModal"
      :title="selectedRecipe?.title"
      width="800px"
      :close-on-click-modal="false"
      class="recipe-modal"
    >
      <div v-if="selectedRecipe" class="space-y-8">
        <!-- Recipe Header Image & Info -->
        <div class="relative rounded-2xl overflow-hidden">
          <img
            :src="selectedRecipe.image"
            :alt="selectedRecipe.title"
            class="w-full h-64 object-cover"
          />
          <div class="absolute bottom-4 left-4 right-4">
            <div class="bg-white/95 backdrop-blur-sm rounded-xl p-4">
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div class="text-gray-500 text-xs">Time</div>
                  <div class="font-semibold text-gray-900">{{ selectedRecipe.duration }} min</div>
                </div>
                <div>
                  <div class="text-gray-500 text-xs">Servings</div>
                  <div class="font-semibold text-gray-900">{{ selectedRecipe.servings }}</div>
                </div>
                <div>
                  <div class="text-gray-500 text-xs">Difficulty</div>
                  <div class="font-semibold text-gray-900">{{ selectedRecipe.difficulty }}</div>
                </div>
                <div>
                  <div class="text-gray-500 text-xs">Rating</div>
                  <div class="flex items-center justify-center">
                    <el-rate :model-value="selectedRecipe.rating" disabled size="small" />
                    <span class="text-sm text-gray-600 ml-1">{{ selectedRecipe.rating }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4">
          <el-button type="primary" size="large" class="flex-1 rounded-xl" @click="generateShoppingList">
            <el-icon class="mr-2"><Document /></el-icon>
            Generate Shopping List
          </el-button>
          <el-button type="success" size="large" class="flex-1 rounded-xl" @click="calculateNutrition">
            <el-icon class="mr-2"><Calculator /></el-icon>
            Nutrition Calculator
          </el-button>
          <el-button size="large" class="rounded-xl" @click="saveRecipe">
            <el-icon class="mr-2"><Star /></el-icon>
            Save Recipe
          </el-button>
        </div>

        <!-- Nutrition Info -->
        <div class="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <el-icon class="mr-2 text-primary-600"><InfoFilled /></el-icon>
            Nutrition Information (per serving)
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-white rounded-xl p-4 text-center shadow-sm">
              <div class="text-3xl font-bold text-primary-600">{{ selectedRecipe.calories }}</div>
              <div class="text-sm text-gray-500">Calories</div>
            </div>
            <div class="bg-white rounded-xl p-4 text-center shadow-sm">
              <div class="text-3xl font-bold text-red-500">{{ selectedRecipe.protein }}g</div>
              <div class="text-sm text-gray-500">Protein</div>
            </div>
            <div class="bg-white rounded-xl p-4 text-center shadow-sm">
              <div class="text-3xl font-bold text-yellow-500">{{ selectedRecipe.carbs }}g</div>
              <div class="text-sm text-gray-500">Carbs</div>
            </div>
            <div class="bg-white rounded-xl p-4 text-center shadow-sm">
              <div class="text-3xl font-bold text-purple-500">{{ selectedRecipe.fat }}g</div>
              <div class="text-sm text-gray-500">Fat</div>
            </div>
          </div>
        </div>

        <!-- Ingredients -->
        <div>
          <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <el-icon class="mr-2 text-secondary-600"><List /></el-icon>
            Ingredients
          </h3>
          <div class="bg-white border border-gray-100 rounded-2xl p-6">
            <ul class="space-y-3">
              <li
                v-for="(ingredient, index) in selectedRecipe.ingredients"
                :key="index"
                class="flex items-center text-gray-700"
              >
                <div class="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <el-icon class="text-primary-600 text-sm"><Check /></el-icon>
                </div>
                <span>{{ ingredient }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Instructions -->
        <div>
          <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <el-icon class="mr-2 text-accent-600"><VideoCamera /></el-icon>
            Instructions
          </h3>
          <div class="space-y-4">
            <div
              v-for="(step, index) in selectedRecipe.steps"
              :key="index"
              class="flex items-start bg-white border border-gray-100 rounded-2xl p-5"
            >
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mr-4 flex-shrink-0">
                <span class="text-white font-bold">{{ index + 1 }}</span>
              </div>
              <p class="text-gray-700 pt-2">{{ step }}</p>
            </div>
          </div>
        </div>

        <!-- Nutrition Description -->
        <div class="bg-gray-50 rounded-2xl p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-2">Nutrition Summary</h3>
          <p class="text-gray-600">{{ selectedRecipe.nutritionInfo }}</p>
        </div>
      </div>
    </el-dialog>

    <!-- Shopping List Modal -->
    <el-dialog
      v-model="showShoppingListModal"
      title="Shopping List"
      width="500px"
    >
      <div v-if="selectedRecipe" class="space-y-4">
        <h4 class="font-semibold text-gray-900">{{ selectedRecipe.title }}</h4>
        <div class="space-y-2">
          <div
            v-for="(ingredient, index) in selectedRecipe.ingredients"
            :key="index"
            class="flex items-center p-3 bg-gray-50 rounded-lg"
          >
            <el-checkbox v-model="shoppingListChecked[index]" class="mr-3" />
            <span :class="shoppingListChecked[index] ? 'line-through text-gray-400' : 'text-gray-700'">
              {{ ingredient }}
            </span>
          </div>
        </div>
        <div class="pt-4 border-t border-gray-100 flex gap-3">
          <el-button type="primary" class="flex-1" @click="copyShoppingList">
            <el-icon class="mr-2"><DocumentCopy /></el-icon>
            Copy List
          </el-button>
          <el-button class="flex-1" @click="printShoppingList">
            <el-icon class="mr-2"><Printer /></el-icon>
            Print
          </el-button>
        </div>
      </div>
    </el-dialog>

    <!-- Nutrition Calculator Modal -->
    <el-dialog
      v-model="showNutritionModal"
      title="Nutrition Calculator"
      width="500px"
    >
      <div v-if="selectedRecipe" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Number of servings:</label>
          <el-input-number
            v-model="servingsCount"
            :min="1"
            :max="10"
            size="large"
            class="w-full"
          />
        </div>

        <div class="bg-gray-50 rounded-2xl p-6">
          <h4 class="font-semibold text-gray-900 mb-4">Nutrition for {{ servingsCount }} servings:</h4>
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white rounded-xl p-4 text-center shadow-sm">
              <div class="text-2xl font-bold text-primary-600">{{ totalCalories }}</div>
              <div class="text-sm text-gray-500">Calories</div>
            </div>
            <div class="bg-white rounded-xl p-4 text-center shadow-sm">
              <div class="text-2xl font-bold text-red-500">{{ totalProtein }}g</div>
              <div class="text-sm text-gray-500">Protein</div>
            </div>
            <div class="bg-white rounded-xl p-4 text-center shadow-sm">
              <div class="text-2xl font-bold text-yellow-500">{{ totalCarbs }}g</div>
              <div class="text-sm text-gray-500">Carbs</div>
            </div>
            <div class="bg-white rounded-xl p-4 text-center shadow-sm">
              <div class="text-2xl font-bold text-purple-500">{{ totalFat }}g</div>
              <div class="text-sm text-gray-500">Fat</div>
            </div>
          </div>
        </div>

        <el-alert
          title="Tip"
          type="info"
          :closable="false"
          show-icon
        >
          <template #default>
            Remember that these are approximate values. Actual nutrition may vary based on specific ingredients and portion sizes.
          </template>
        </el-alert>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { recipes } from '../data/mockData'

// State
const searchQuery = ref('')
const selectedBudget = ref('')
const selectedTime = ref('')
const selectedGoal = ref('')
const sortBy = ref('rating')

const showRecipeModal = ref(false)
const showShoppingListModal = ref(false)
const showNutritionModal = ref(false)
const selectedRecipe = ref(null)
const servingsCount = ref(1)
const shoppingListChecked = ref([])

// Computed
const hasActiveFilters = computed(() => {
  return selectedBudget.value || selectedTime.value || selectedGoal.value
})

const timeLabel = computed(() => {
  const labels = {
    quick: 'Under 15 min',
    medium: '15-30 min',
    slow: 'Over 30 min'
  }
  return labels[selectedTime.value] || ''
})

const goalLabel = computed(() => {
  const labels = {
    energy: 'Energy Boost',
    focus: 'Focus & Brain',
    relax: 'Relax & Sleep'
  }
  return labels[selectedGoal.value] || ''
})

const filteredRecipes = computed(() => {
  return recipes.filter(recipe => {
    // Search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      const matchesTitle = recipe.title.toLowerCase().includes(query)
      const matchesIngredients = recipe.ingredients.some(ing =>
        ing.toLowerCase().includes(query)
      )
      if (!matchesTitle && !matchesIngredients) {
        return false
      }
    }

    // Budget filter
    if (selectedBudget.value && recipe.budget !== selectedBudget.value) {
      return false
    }

    // Time filter
    if (selectedTime.value) {
      if (selectedTime.value === 'quick' && recipe.duration > 15) return false
      if (selectedTime.value === 'medium' && (recipe.duration < 15 || recipe.duration > 30)) return false
      if (selectedTime.value === 'slow' && recipe.duration <= 30) return false
    }

    // Goal filter
    if (selectedGoal.value && recipe.goal !== selectedGoal.value) {
      return false
    }

    return true
  })
})

const sortedRecipes = computed(() => {
  const sorted = [...filteredRecipes.value]

  switch (sortBy.value) {
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'time':
      return sorted.sort((a, b) => a.duration - b.duration)
    case 'name':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return sorted
  }
})

// Nutrition calculations
const totalCalories = computed(() => {
  return selectedRecipe.value ? selectedRecipe.value.calories * servingsCount.value : 0
})

const totalProtein = computed(() => {
  return selectedRecipe.value ? selectedRecipe.value.protein * servingsCount.value : 0
})

const totalCarbs = computed(() => {
  return selectedRecipe.value ? selectedRecipe.value.carbs * servingsCount.value : 0
})

const totalFat = computed(() => {
  return selectedRecipe.value ? selectedRecipe.value.fat * servingsCount.value : 0
})

// Methods
const goalIcon = (goal) => {
  const icons = {
    energy: 'Lightning',
    focus: 'Brain',
    relax: 'Moon'
  }
  return icons[goal] || 'Star'
}

const clearAllFilters = () => {
  searchQuery.value = ''
  selectedBudget.value = ''
  selectedTime.value = ''
  selectedGoal.value = ''
}

const openRecipeDetail = (recipe) => {
  selectedRecipe.value = recipe
  servingsCount.value = 1
  shoppingListChecked.value = recipe.ingredients.map(() => false)
  showRecipeModal.value = true
}

const generateShoppingList = () => {
  showRecipeModal.value = false
  showShoppingListModal.value = true
}

const calculateNutrition = () => {
  showRecipeModal.value = false
  showNutritionModal.value = true
}

const saveRecipe = () => {
  ElMessage.success('Recipe saved to your favorites!')
}

const copyShoppingList = () => {
  if (!selectedRecipe.value) return

  const list = selectedRecipe.value.ingredients.map((ing, i) =>
    `${shoppingListChecked.value[i] ? '✓' : '○'} ${ing}`
  ).join('\n')

  const text = `Shopping List: ${selectedRecipe.value.title}\n\n${list}`

  navigator.clipboard.writeText(text).then(() => {
    ElMessage.success('Shopping list copied to clipboard!')
  })
}

const printShoppingList = () => {
  ElMessage.info('Print functionality would open print dialog in a real app')
}
</script>

<style scoped>
.recipe-modal :deep(.el-dialog__header) {
  padding-bottom: 0;
}
</style>
