<template>
  <div class="health-balance-page">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-secondary-600 to-primary-600 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <el-icon class="text-6xl mb-4 opacity-80"><Heart /></el-icon>
        <h1 class="text-4xl lg:text-5xl font-bold mb-4">Health & Balance</h1>
        <p class="text-xl text-white/90 max-w-2xl mx-auto">
          Your complete guide to maintaining physical and mental wellness during your academic journey.
        </p>
      </div>
    </section>

    <!-- Main Content with Tabs -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <el-tabs v-model="activeTab" class="health-tabs">
          <!-- Sleep Tab -->
          <el-tab-pane label="Sleep" name="sleep">
            <div class="space-y-12">
              <!-- Sleep Calculator -->
              <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <el-icon class="mr-3 text-primary-600"><Moon /></el-icon>
                  Sleep Calculator
                </h2>
                <div class="grid lg:grid-cols-2 gap-8">
                  <div>
                    <p class="text-gray-600 mb-6">
                      Calculate the best times to fall asleep or wake up based on 90-minute sleep cycles. Waking up at the end of a cycle helps you feel more refreshed.
                    </p>
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">I need to wake up at:</label>
                        <el-time-select
                          v-model="wakeUpTime"
                          start="05:00"
                          end="10:00"
                          step="00:30"
                          placeholder="Select time"
                          size="large"
                          class="w-full"
                        />
                      </div>
                      <el-button type="primary" size="large" class="w-full rounded-xl" @click="calculateSleep">
                        Calculate Bedtimes
                      </el-button>
                    </div>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Recommended Bedtimes:</h3>
                    <div v-if="calculatedTimes.length > 0" class="space-y-3">
                      <div
                        v-for="(time, index) in calculatedTimes"
                        :key="index"
                        :class="[
                          'flex items-center justify-between p-4 rounded-xl',
                          index === 2 ? 'bg-primary-100 border-2 border-primary-400' : 'bg-gray-50'
                        ]"
                      >
                        <div class="flex items-center">
                          <el-icon :class="index === 2 ? 'text-primary-600 mr-3' : 'text-gray-400 mr-3'" :size="20">
                            <Clock />
                          </el-icon>
                          <span :class="['text-xl font-bold', index === 2 ? 'text-primary-700' : 'text-gray-700']">
                            {{ time }}
                          </span>
                        </div>
                        <span v-if="index === 2" class="text-sm font-medium text-primary-600 bg-white px-3 py-1 rounded-full">
                          Recommended
                        </span>
                      </div>
                    </div>
                    <div v-else class="text-center py-12 text-gray-400">
                      <el-icon :size="48" class="mb-3"><Moon /></el-icon>
                      <p>Select a wake-up time to see recommended bedtimes</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Sleep Cycles Explanation -->
              <div class="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">Understanding Sleep Cycles</h2>
                <div class="grid md:grid-cols-4 gap-6">
                  <div class="text-center">
                    <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <span class="text-2xl font-bold text-primary-600">1</span>
                    </div>
                    <h4 class="font-semibold text-gray-900 mb-1">Light Sleep</h4>
                    <p class="text-sm text-gray-600">Transition into sleep, easily awakened. Lasts 5-10 minutes.</p>
                  </div>
                  <div class="text-center">
                    <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <span class="text-2xl font-bold text-primary-600">2</span>
                    </div>
                    <h4 class="font-semibold text-gray-900 mb-1">Deeper Sleep</h4>
                    <p class="text-sm text-gray-600">Body temperature drops, heart rate slows. Lasts about 20 minutes.</p>
                  </div>
                  <div class="text-center">
                    <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <span class="text-2xl font-bold text-primary-600">3</span>
                    </div>
                    <h4 class="font-semibold text-gray-900 mb-1">Deep Sleep</h4>
                    <p class="text-sm text-gray-600">Most restorative stage. Body repairs and regenerates.</p>
                  </div>
                  <div class="text-center">
                    <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <span class="text-2xl font-bold text-primary-600">4</span>
                    </div>
                    <h4 class="font-semibold text-gray-900 mb-1">REM Sleep</h4>
                    <p class="text-sm text-gray-600">Dreaming occurs. Important for memory and cognition.</p>
                  </div>
                </div>
              </div>

              <!-- Sleep Tips -->
              <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-6">Sleep Optimization Tips</h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div
                    v-for="(tip, index) in sleepTips"
                    :key="index"
                    class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                      <el-icon class="text-primary-600 text-xl">
                        <component :is="tip.icon" />
                      </el-icon>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ tip.title }}</h3>
                    <p class="text-gray-600 text-sm">{{ tip.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <!-- Nutrition Tab -->
          <el-tab-pane label="Nutrition" name="nutrition">
            <div class="space-y-12">
              <!-- Nutrition Tips -->
              <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Nutrition Guidelines for Students</h2>
                <p class="text-gray-600 mb-8">Learn how to fuel your body and brain for optimal academic performance.</p>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div
                    v-for="(tip, index) in nutritionTips"
                    :key="index"
                    class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div class="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mb-4">
                      <el-icon class="text-secondary-600 text-xl">
                        <component :is="tip.icon" />
                      </el-icon>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ tip.title }}</h3>
                    <p class="text-gray-600 text-sm">{{ tip.description }}</p>
                  </div>
                </div>
              </div>

              <!-- Budget Recipes Preview -->
              <div class="bg-gradient-to-r from-secondary-50 to-primary-50 rounded-2xl p-8">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">Budget-Friendly Meal Ideas</h2>
                    <p class="text-gray-600">Check out our Student Recipes section for more budget-friendly meals.</p>
                  </div>
                  <el-button type="primary" size="large" class="mt-4 md:mt-0 rounded-xl" @click="navigateTo('/student-recipes')">
                    View All Recipes
                    <el-icon class="ml-2"><Right /></el-icon>
                  </el-button>
                </div>
                <div class="grid md:grid-cols-3 gap-6">
                  <div class="bg-white rounded-xl p-5 shadow-sm">
                    <h4 class="font-semibold text-gray-900 mb-2">Quick Breakfast</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Oatmeal with peanut butter & banana</li>
                      <li>• Greek yogurt with granola</li>
                      <li>• Egg & vegetable wrap</li>
                    </ul>
                  </div>
                  <div class="bg-white rounded-xl p-5 shadow-sm">
                    <h4 class="font-semibold text-gray-900 mb-2">Lunch on a Budget</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Chickpea & vegetable stir fry</li>
                      <li>• Lentil soup with bread</li>
                      <li>• Tuna salad sandwich</li>
                    </ul>
                  </div>
                  <div class="bg-white rounded-xl p-5 shadow-sm">
                    <h4 class="font-semibold text-gray-900 mb-2">Dinner Ideas</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Pasta with garlic & olive oil</li>
                      <li>• Rice & bean bowl</li>
                      <li>• Vegetable curry</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <!-- Stress Management Tab -->
          <el-tab-pane label="Stress Management" name="stress">
            <div class="space-y-12">
              <!-- Breathing Exercises -->
              <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <el-icon class="mr-3 text-accent-600"><WindPower /></el-icon>
                  Breathing Exercises
                </h2>
                <div class="grid lg:grid-cols-3 gap-6">
                  <div
                    v-for="(exercise, index) in breathingExercises"
                    :key="index"
                    class="bg-gradient-to-br from-accent-50 to-primary-50 rounded-2xl p-6 border border-accent-100"
                  >
                    <div class="flex items-center justify-between mb-4">
                      <h3 class="text-lg font-bold text-gray-900">{{ exercise.name }}</h3>
                      <span class="bg-white text-accent-600 px-3 py-1 rounded-full text-xs font-medium">
                        {{ exercise.duration }}
                      </span>
                    </div>
                    <span :class="[
                      'inline-block px-3 py-1 rounded-full text-xs font-medium mb-3',
                      exercise.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    ]">
                      {{ exercise.difficulty }}
                    </span>
                    <p class="text-gray-600 text-sm mb-4">{{ exercise.description }}</p>
                    <div class="border-t border-accent-100 pt-4">
                      <h4 class="font-semibold text-gray-900 text-sm mb-2">Steps:</h4>
                      <ol class="space-y-2">
                        <li
                          v-for="(step, stepIndex) in exercise.steps"
                          :key="stepIndex"
                          class="text-sm text-gray-600 flex items-start"
                        >
                          <span class="bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-accent-600 mr-2 flex-shrink-0 mt-0.5">
                            {{ stepIndex + 1 }}
                          </span>
                          <span>{{ step }}</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Organization Tips -->
              <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-6">Organization & Time Management</h2>
                <div class="grid md:grid-cols-2 gap-6">
                  <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <el-icon class="mr-2 text-primary-600"><Document /></el-icon>
                      The Pomodoro Technique
                    </h3>
                    <ul class="space-y-3">
                      <li class="flex items-start text-gray-600">
                        <el-icon class="text-primary-500 mt-1 mr-2 flex-shrink-0"><Check /></el-icon>
                        <span>Work for 25 minutes, then take a 5-minute break</span>
                      </li>
                      <li class="flex items-start text-gray-600">
                        <el-icon class="text-primary-500 mt-1 mr-2 flex-shrink-0"><Check /></el-icon>
                        <span>After 4 cycles, take a longer break (15-30 minutes)</span>
                      </li>
                      <li class="flex items-start text-gray-600">
                        <el-icon class="text-primary-500 mt-1 mr-2 flex-shrink-0"><Check /></el-icon>
                        <span>Helps maintain focus and prevents burnout</span>
                      </li>
                    </ul>
                  </div>
                  <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <el-icon class="mr-2 text-secondary-600"><List /></el-icon>
                      Task Prioritization
                    </h3>
                    <ul class="space-y-3">
                      <li class="flex items-start text-gray-600">
                        <el-icon class="text-secondary-500 mt-1 mr-2 flex-shrink-0"><Check /></el-icon>
                        <span>Use the Eisenhower Matrix: urgent/important quadrants</span>
                      </li>
                      <li class="flex items-start text-gray-600">
                        <el-icon class="text-secondary-500 mt-1 mr-2 flex-shrink-0"><Check /></el-icon>
                        <span>Tackle hardest tasks during your peak energy hours</span>
                      </li>
                      <li class="flex items-start text-gray-600">
                        <el-icon class="text-secondary-500 mt-1 mr-2 flex-shrink-0"><Check /></el-icon>
                        <span>Break large projects into smaller, manageable tasks</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <!-- Physical Activity Tab -->
          <el-tab-pane label="Physical Activity" name="physical">
            <div class="space-y-12">
              <div class="text-center max-w-2xl mx-auto mb-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Quick Workout Routines</h2>
                <p class="text-gray-600">
                  No gym? No problem. These quick workouts can be done in your dorm room with minimal or no equipment.
                </p>
              </div>

              <div class="grid lg:grid-cols-3 gap-6">
                <div
                  v-for="(workout, index) in quickWorkouts"
                  :key="index"
                  class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <img
                    :src="workout.image"
                    :alt="workout.name"
                    class="w-full h-48 object-cover"
                  />
                  <div class="p-6">
                    <div class="flex items-center justify-between mb-3">
                      <h3 class="text-lg font-bold text-gray-900">{{ workout.name }}</h3>
                      <span class="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                        {{ workout.duration }}
                      </span>
                    </div>
                    <span :class="[
                      'inline-block px-3 py-1 rounded-full text-xs font-medium mb-4',
                      workout.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    ]">
                      {{ workout.difficulty }}
                    </span>
                    <div class="border-t border-gray-100 pt-4">
                      <h4 class="font-semibold text-gray-900 text-sm mb-3">Exercises:</h4>
                      <ul class="space-y-2">
                        <li
                          v-for="(exercise, eIndex) in workout.exercises"
                          :key="eIndex"
                          class="text-sm text-gray-600 flex items-center"
                        >
                          <el-icon class="text-primary-500 mr-2"><Right /></el-icon>
                          <span class="font-medium text-gray-900">{{ exercise.name }}</span>
                          <span v-if="exercise.duration" class="text-gray-400 ml-2">({{ exercise.duration }})</span>
                          <span v-else-if="exercise.reps" class="text-gray-400 ml-2">({{ exercise.reps }} reps)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Benefits of Exercise -->
              <div class="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Why Exercise Matters for Students</h2>
                <div class="grid md:grid-cols-4 gap-6">
                  <div class="text-center">
                    <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <el-icon class="text-primary-600 text-2xl"><Brain /></el-icon>
                    </div>
                    <h4 class="font-semibold text-gray-900 mb-1">Better Focus</h4>
                    <p class="text-sm text-gray-600">Exercise improves concentration and memory</p>
                  </div>
                  <div class="text-center">
                    <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <el-icon class="text-secondary-600 text-2xl"><EmotionHappy /></el-icon>
                    </div>
                    <h4 class="font-semibold text-gray-900 mb-1">Mood Boost</h4>
                    <p class="text-sm text-gray-600">Releases endorphins, reduces stress</p>
                  </div>
                  <div class="text-center">
                    <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <el-icon class="text-accent-600 text-2xl"><Moon /></el-icon>
                    </div>
                    <h4 class="font-semibold text-gray-900 mb-1">Better Sleep</h4>
                    <p class="text-sm text-gray-600">Helps you fall asleep faster and deeper</p>
                  </div>
                  <div class="text-center">
                    <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <el-icon class="text-primary-600 text-2xl"><Trophy /></el-icon>
                    </div>
                    <h4 class="font-semibold text-gray-900 mb-1">Confidence</h4>
                    <p class="text-sm text-gray-600">Builds self-esteem and body positivity</p>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <!-- Mental Health Tab -->
          <el-tab-pane label="Mental Health" name="mental">
            <div class="space-y-12">
              <!-- Burnout Warning Signs -->
              <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div class="flex items-start mb-6">
                  <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                    <el-icon class="text-red-600 text-xl"><Warning /></el-icon>
                  </div>
                  <div>
                    <h2 class="text-2xl font-bold text-gray-900">Recognizing Burnout</h2>
                    <p class="text-gray-600">As a student, it's important to recognize the signs of burnout before it becomes overwhelming.</p>
                  </div>
                </div>
                <div class="grid md:grid-cols-2 gap-6">
                  <div class="bg-red-50 rounded-xl p-6 border border-red-100">
                    <h3 class="font-semibold text-red-800 mb-4">Warning Signs:</h3>
                    <ul class="space-y-3">
                      <li
                        v-for="(sign, index) in burnoutSigns"
                        :key="index"
                        class="flex items-start text-red-700"
                      >
                        <el-icon class="text-red-500 mt-1 mr-2 flex-shrink-0"><CircleCloseFilled /></el-icon>
                        <span>{{ sign }}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="bg-green-50 rounded-xl p-6 border border-green-100">
                    <h3 class="font-semibold text-green-800 mb-4">What to Do:</h3>
                    <ul class="space-y-3">
                      <li class="flex items-start text-green-700">
                        <el-icon class="text-green-500 mt-1 mr-2 flex-shrink-0"><CircleCheckFilled /></el-icon>
                        <span>Talk to someone you trust - a friend, family member, or counselor</span>
                      </li>
                      <li class="flex items-start text-green-700">
                        <el-icon class="text-green-500 mt-1 mr-2 flex-shrink-0"><CircleCheckFilled /></el-icon>
                        <span>Take a break - it's okay to step away from your studies</span>
                      </li>
                      <li class="flex items-start text-green-700">
                        <el-icon class="text-green-500 mt-1 mr-2 flex-shrink-0"><CircleCheckFilled /></el-icon>
                        <span>Evaluate your schedule - are you taking on too much?</span>
                      </li>
                      <li class="flex items-start text-green-700">
                        <el-icon class="text-green-500 mt-1 mr-2 flex-shrink-0"><CircleCheckFilled /></el-icon>
                        <span>Seek professional help - there's no shame in asking for support</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Support Resources -->
              <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Support Resources</h2>
                <p class="text-gray-600 mb-8">You don't have to go through this alone. Here are resources available to support you.</p>
                <div class="grid md:grid-cols-2 gap-6">
                  <div
                    v-for="(resource, index) in supportResources"
                    :key="index"
                    class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <h3 class="text-lg font-bold text-gray-900 mb-2">{{ resource.name }}</h3>
                    <p class="text-gray-600 text-sm mb-4">{{ resource.description }}</p>
                    <div class="space-y-2">
                      <div class="flex items-center text-sm">
                        <el-icon class="text-primary-500 mr-2"><Message /></el-icon>
                        <span class="text-gray-600">{{ resource.contact }}</span>
                      </div>
                      <div class="flex items-center text-sm">
                        <el-icon class="text-primary-500 mr-2"><Phone /></el-icon>
                        <span class="text-gray-600">{{ resource.phone }}</span>
                      </div>
                      <div class="flex items-center text-sm">
                        <el-icon class="text-primary-500 mr-2"><Location /></el-icon>
                        <span class="text-gray-600">{{ resource.location }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Self-Care Strategies -->
              <div class="bg-gradient-to-br from-secondary-50 to-accent-50 rounded-2xl p-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">Self-Care Strategies</h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div
                    v-for="(category, index) in selfCareStrategies"
                    :key="index"
                    class="bg-white rounded-2xl p-6 shadow-sm"
                  >
                    <h3 class="text-lg font-bold text-gray-900 mb-4 text-center">{{ category.title }}</h3>
                    <ul class="space-y-2">
                      <li
                        v-for="(item, itemIndex) in category.items"
                        :key="itemIndex"
                        class="text-sm text-gray-600 flex items-start"
                      >
                        <el-icon class="text-primary-500 mt-1 mr-2 flex-shrink-0"><Check /></el-icon>
                        <span>{{ item }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Crisis Notice -->
              <div class="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
                <el-icon class="text-red-600 text-4xl mb-4"><WarningFilled /></el-icon>
                <h3 class="text-xl font-bold text-red-800 mb-2">In Crisis?</h3>
                <p class="text-red-700 mb-4">
                  If you're feeling overwhelmed, suicidal, or in immediate danger, please reach out for help right away.
                </p>
                <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <el-button type="danger" size="large" class="rounded-xl">
                    <el-icon class="mr-2"><Phone /></el-icon>
                    Call Crisis Hotline
                  </el-button>
                  <el-button type="primary" size="large" class="rounded-xl" plain>
                    <el-icon class="mr-2"><Message /></el-icon>
                    Text a Crisis Counselor
                  </el-button>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  sleepTips,
  nutritionTips,
  breathingExercises,
  quickWorkouts,
  burnoutSigns,
  supportResources,
  selfCareStrategies
} from '../data/mockData'

const router = useRouter()
const activeTab = ref('sleep')
const wakeUpTime = ref('')
const calculatedTimes = ref([])

const navigateTo = (path) => {
  router.push(path)
}

const calculateSleep = () => {
  if (!wakeUpTime.value) {
    return
  }

  const [hours, minutes] = wakeUpTime.value.split(':').map(Number)
  const wakeTime = new Date()
  wakeTime.setHours(hours, minutes, 0, 0)

  const cycles = [7, 6, 5, 4]
  const times = []

  cycles.forEach((cycleCount) => {
    const sleepTime = new Date(wakeTime.getTime() - cycleCount * 90 * 60000 - 14 * 60000)
    const h = sleepTime.getHours().toString().padStart(2, '0')
    const m = sleepTime.getMinutes().toString().padStart(2, '0')
    times.push(`${h}:${m}`)
  })

  calculatedTimes.value = times
}
</script>

<style scoped>
.health-tabs :deep(.el-tabs__header) {
  margin-bottom: 32px;
}

.health-tabs :deep(.el-tabs__nav-wrap::after) {
  background-color: #e2e8f0;
}

.health-tabs :deep(.el-tabs__item) {
  font-size: 16px;
  font-weight: 500;
  height: 48px;
  line-height: 48px;
}
</style>
