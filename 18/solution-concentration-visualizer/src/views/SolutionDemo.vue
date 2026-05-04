<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
    <div class="container mx-auto px-4 py-8">
      <header class="text-center mb-10">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">溶液浓度可视化演示</h1>
        <p class="text-lg text-gray-600">通过调整溶质质量和溶剂体积，观察溶液浓度的变化</p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 class="text-xl font-semibold text-blue-700 mb-6 text-center">溶液 A</h2>
          
          <div class="beaker-container mb-6">
            <div class="beaker">
              <div 
                class="liquid" 
                :style="liquidStyleA"
              ></div>
              <div class="scale-marks">
                <div v-for="i in 5" :key="i" class="scale-mark" :style="{ bottom: (i * 20) + '%' }">
                  <span class="scale-label">{{ i * 20 }}mL</span>
                </div>
              </div>
            </div>
            <div class="text-center mt-3">
              <span class="text-sm text-gray-600">浓度：</span>
              <span class="text-lg font-bold text-blue-600">{{ concentrationA.toFixed(2) }}%</span>
            </div>
          </div>

          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">溶质质量 (g)</label>
              <input 
                type="range" 
                v-model.number="solutionA.solute" 
                min="0" 
                max="50" 
                step="1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div class="text-center text-sm text-gray-500 mt-2 font-medium">{{ solutionA.solute }} g</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">溶剂体积 (mL)</label>
              <input 
                type="range" 
                v-model.number="solutionA.solvent" 
                min="10" 
                max="100" 
                step="5"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div class="text-center text-sm text-gray-500 mt-2 font-medium">{{ solutionA.solvent }} mL</div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex flex-col items-center justify-center">
          <div class="text-6xl mb-4 text-blue-500">➕</div>
          <h2 class="text-xl font-semibold text-gray-700 mb-6">混合操作</h2>
          
          <button 
            class="w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium py-4 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
            @click="mixSolutions"
          >
            混合两种溶液
          </button>
          
          <button 
            class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-lg font-medium py-4 px-6 rounded-lg transition-all duration-200 border border-gray-300 flex items-center justify-center"
            @click="resetSolutions"
          >
            重置
          </button>

          <div class="mt-8 p-4 bg-blue-50 rounded-xl w-full">
            <h3 class="text-sm font-semibold text-blue-700 mb-2">浓度计算公式：</h3>
            <p class="text-sm text-gray-600">
              浓度 = 溶质质量 ÷ (溶质质量 + 溶剂质量) × 100%
            </p>
            <p class="text-xs text-gray-500 mt-2">
              * 溶剂密度近似为 1g/mL，所以体积(mL) ≈ 质量(g)
            </p>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 class="text-xl font-semibold text-green-700 mb-6 text-center">溶液 B</h2>
          
          <div class="beaker-container mb-6">
            <div class="beaker">
              <div 
                class="liquid" 
                :style="liquidStyleB"
              ></div>
              <div class="scale-marks">
                <div v-for="i in 5" :key="i" class="scale-mark" :style="{ bottom: (i * 20) + '%' }">
                  <span class="scale-label">{{ i * 20 }}mL</span>
                </div>
              </div>
            </div>
            <div class="text-center mt-3">
              <span class="text-sm text-gray-600">浓度：</span>
              <span class="text-lg font-bold text-green-600">{{ concentrationB.toFixed(2) }}%</span>
            </div>
          </div>

          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">溶质质量 (g)</label>
              <input 
                type="range" 
                v-model.number="solutionB.solute" 
                min="0" 
                max="50" 
                step="1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
              <div class="text-center text-sm text-gray-500 mt-2 font-medium">{{ solutionB.solute }} g</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">溶剂体积 (mL)</label>
              <input 
                type="range" 
                v-model.number="solutionB.solvent" 
                min="10" 
                max="100" 
                step="5"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
              <div class="text-center text-sm text-gray-500 mt-2 font-medium">{{ solutionB.solvent }} mL</div>
            </div>
          </div>
        </div>
      </div>

      <div 
        v-if="mixedSolution"
        class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 transition-all duration-500"
      >
        <h2 class="text-2xl font-bold text-center text-purple-700 mb-8">混合结果</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="flex flex-col items-center">
            <div class="beaker-container large">
              <div class="beaker large">
                <div 
                  class="liquid" 
                  :style="mixedLiquidStyle"
                ></div>
                <div class="scale-marks">
                  <div v-for="i in 5" :key="i" class="scale-mark" :style="{ bottom: (i * 20) + '%' }">
                    <span class="scale-label">{{ i * 40 }}mL</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center mt-4">
              <span class="text-lg text-gray-600">混合后浓度：</span>
              <span class="text-2xl font-bold text-purple-600">{{ mixedConcentration.toFixed(2) }}%</span>
            </div>
          </div>

          <div class="space-y-4">
            <div class="border border-gray-200 rounded-lg overflow-hidden">
              <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 class="font-semibold text-gray-700">计算详情</h3>
              </div>
              <table class="w-full text-sm">
                <tbody>
                  <tr class="border-b border-gray-100">
                    <td class="py-3 px-4 text-gray-600">溶液 A 溶质质量：</td>
                    <td class="py-3 px-4 text-right font-medium">{{ solutionA.solute }} g</td>
                  </tr>
                  <tr class="border-b border-gray-100">
                    <td class="py-3 px-4 text-gray-600">溶液 B 溶质质量：</td>
                    <td class="py-3 px-4 text-right font-medium">{{ solutionB.solute }} g</td>
                  </tr>
                  <tr class="border-b border-gray-200 bg-blue-50">
                    <td class="py-3 px-4 text-gray-700 font-semibold">总溶质质量：</td>
                    <td class="py-3 px-4 text-right font-bold text-blue-600">{{ mixedSolution.totalSolute }} g</td>
                  </tr>
                  <tr class="border-b border-gray-100">
                    <td class="py-3 px-4 text-gray-600">溶液 A 溶剂质量：</td>
                    <td class="py-3 px-4 text-right font-medium">{{ solutionA.solvent }} g</td>
                  </tr>
                  <tr class="border-b border-gray-100">
                    <td class="py-3 px-4 text-gray-600">溶液 B 溶剂质量：</td>
                    <td class="py-3 px-4 text-right font-medium">{{ solutionB.solvent }} g</td>
                  </tr>
                  <tr class="border-b border-gray-200 bg-green-50">
                    <td class="py-3 px-4 text-gray-700 font-semibold">总溶剂质量：</td>
                    <td class="py-3 px-4 text-right font-bold text-green-600">{{ mixedSolution.totalSolvent }} g</td>
                  </tr>
                  <tr class="bg-purple-50">
                    <td class="py-3 px-4 text-gray-700 font-semibold">总溶液质量：</td>
                    <td class="py-3 px-4 text-right font-bold text-purple-600">{{ mixedSolution.totalSolute + mixedSolution.totalSolvent }} g</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h4 class="text-sm font-semibold text-blue-800">浓度计算式</h4>
                  <p class="text-sm text-blue-700 mt-1 font-mono">
                    {{ mixedSolution.totalSolute }} g ÷ ({{ mixedSolution.totalSolute }} g + {{ mixedSolution.totalSolvent }} g) × 100% = {{ mixedConcentration.toFixed(2) }}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div 
        v-else
        class="bg-gray-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-200"
      >
        <div class="text-5xl mb-4">🧪</div>
        <p class="text-gray-500 text-lg">调整溶液 A 和溶液 B 的参数，然后点击"混合两种溶液"按钮查看混合结果</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const solutionA = ref({
  solute: 10,
  solvent: 50
})

const solutionB = ref({
  solute: 20,
  solvent: 80
})

const mixedSolution = ref(null)

const concentrationA = computed(() => {
  const total = solutionA.value.solute + solutionA.value.solvent
  return (solutionA.value.solute / total) * 100
})

const concentrationB = computed(() => {
  const total = solutionB.value.solute + solutionB.value.solvent
  return (solutionB.value.solute / total) * 100
})

const mixedConcentration = computed(() => {
  if (!mixedSolution.value) return 0
  const total = mixedSolution.value.totalSolute + mixedSolution.value.totalSolvent
  return (mixedSolution.value.totalSolute / total) * 100
})

const getColorByConcentration = (concentration, hue = 200) => {
  const saturation = 60 + (concentration * 0.4)
  const lightness = 85 - (concentration * 0.5)
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

const getHeightByVolume = (volume, maxVolume = 100) => {
  const percentage = (volume / maxVolume) * 100
  return Math.min(percentage, 95)
}

const liquidStyleA = computed(() => ({
  height: `${getHeightByVolume(solutionA.value.solvent + solutionA.value.solute * 0.1, 120)}%`,
  backgroundColor: getColorByConcentration(concentrationA.value, 210)
}))

const liquidStyleB = computed(() => ({
  height: `${getHeightByVolume(solutionB.value.solvent + solutionB.value.solute * 0.1, 120)}%`,
  backgroundColor: getColorByConcentration(concentrationB.value, 150)
}))

const mixedLiquidStyle = computed(() => {
  if (!mixedSolution.value) return {}
  const totalVolume = mixedSolution.value.totalSolvent + mixedSolution.value.totalSolute * 0.1
  return {
    height: `${getHeightByVolume(totalVolume, 240)}%`,
    backgroundColor: getColorByConcentration(mixedConcentration.value, 270)
  }
})

const mixSolutions = () => {
  mixedSolution.value = {
    totalSolute: solutionA.value.solute + solutionB.value.solute,
    totalSolvent: solutionA.value.solvent + solutionB.value.solvent
  }
}

const resetSolutions = () => {
  solutionA.value = { solute: 10, solvent: 50 }
  solutionB.value = { solute: 20, solvent: 80 }
  mixedSolution.value = null
}
</script>

<style scoped>
.beaker-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 200px;
}

.beaker-container.large {
  height: 280px;
}

.beaker {
  position: relative;
  width: 120px;
  height: 180px;
  border: 3px solid #94a3b8;
  border-top: none;
  border-radius: 0 0 12px 12px;
  background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%);
  overflow: hidden;
}

.beaker::before,
.beaker::after {
  content: '';
  position: absolute;
  top: -3px;
  width: 20px;
  height: 20px;
  border: 3px solid #94a3b8;
  border-bottom: none;
  border-radius: 8px 8px 0 0;
}

.beaker::before {
  left: -3px;
  border-right: none;
}

.beaker::after {
  right: -3px;
  border-left: none;
}

.beaker.large {
  width: 160px;
  height: 250px;
}

.liquid {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 0 0 9px 9px;
  transition: all 0.5s ease-out;
  background-image: linear-gradient(
    to bottom,
    rgba(255,255,255,0.4) 0%,
    rgba(255,255,255,0.1) 30%,
    transparent 100%
  );
}

.liquid::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(to right, 
    transparent 0%, 
    rgba(255,255,255,0.5) 50%, 
    transparent 100%
  );
}

.scale-marks {
  position: absolute;
  top: 0;
  right: 8px;
  bottom: 0;
  width: 2px;
  pointer-events: none;
}

.scale-mark {
  position: absolute;
  right: 0;
  width: 12px;
  height: 1px;
  background-color: #94a3b8;
}

.scale-mark::before {
  content: '';
  position: absolute;
  right: 0;
  top: -1px;
  width: 6px;
  height: 3px;
  background-color: #94a3b8;
}

.scale-label {
  position: absolute;
  right: 16px;
  top: -6px;
  font-size: 9px;
  color: #64748b;
  white-space: nowrap;
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: currentColor;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transition: transform 0.15s ease;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: currentColor;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
</style>
