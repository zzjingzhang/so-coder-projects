<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto">
      <header class="text-center mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          气体浓度模拟器
        </h1>
        <p class="text-gray-600 text-lg">
          探索惰性气体(氦气)对氮气和氢气浓度的影响
        </p>
      </header>

      <div class="flex justify-center mb-6">
        <div class="bg-white/80 backdrop-blur-sm rounded-full shadow-lg p-1 flex flex-wrap justify-center gap-1">
          <button
            @click="activeTab = 'constant-volume'"
            :class="[
              'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300',
              activeTab === 'constant-volume'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            ]"
          >
            恒温恒容
          </button>
          <button
            @click="activeTab = 'constant-pressure'"
            :class="[
              'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300',
              activeTab === 'constant-pressure'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            ]"
          >
            恒温恒压
          </button>
        </div>
      </div>

      <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-4 mb-6">
        <h3 class="text-sm font-semibold text-gray-700 mb-3 text-center">气体图例</h3>
        <div class="flex flex-wrap justify-center gap-6">
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded-full bg-blue-500 shadow-sm"></div>
            <span class="text-sm text-gray-700">N₂ 氮气</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded-full bg-red-500 shadow-sm"></div>
            <span class="text-sm text-gray-700">H₂ 氢气</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded-full bg-green-500 shadow-sm"></div>
            <span class="text-sm text-gray-700">He 氦气</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 transition-all duration-500 hover:shadow-2xl"
          :class="{
            'ring-2 ring-blue-400': activeTab === 'constant-volume',
            'ring-2 ring-emerald-400': activeTab === 'constant-pressure'
          }"
        >
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-gray-800">
              {{ activeTab === 'constant-volume' ? '恒温恒容条件' : '恒温恒压条件' }}
            </h2>
            <Badge
              :class="activeTab === 'constant-volume' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'"
              :value="activeTab === 'constant-volume' ? 'V=常数' : 'P=常数'"
            />
          </div>

          <div class="mb-4 h-80">
            <ParticleSimulation
              :moles="simulation.moles"
              :mode="simulation.mode"
              :volume-ratio="volumeRatio"
            />
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div class="bg-blue-50 rounded-xl p-3 text-center">
              <p class="text-xs text-blue-600 font-medium mb-1">N₂ (mol)</p>
              <p class="text-lg font-bold text-blue-700">{{ simulation.moles.N2.toFixed(1) }}</p>
            </div>
            <div class="bg-red-50 rounded-xl p-3 text-center">
              <p class="text-xs text-red-600 font-medium mb-1">H₂ (mol)</p>
              <p class="text-lg font-bold text-red-700">{{ simulation.moles.H2.toFixed(1) }}</p>
            </div>
            <div class="bg-green-50 rounded-xl p-3 text-center">
              <p class="text-xs text-green-600 font-medium mb-1">He (mol)</p>
              <p class="text-lg font-bold text-green-700">{{ simulation.moles.He.toFixed(1) }}</p>
            </div>
            <div class="bg-purple-50 rounded-xl p-3 text-center">
              <p class="text-xs text-purple-600 font-medium mb-1">总物质的量</p>
              <p class="text-lg font-bold text-purple-700">{{ simulation.totalMoles.toFixed(1) }}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            <div class="bg-gray-50 rounded-xl p-3 text-center">
              <p class="text-xs text-gray-600 font-medium mb-1">
                {{ activeTab === 'constant-volume' ? '压力 (atm)' : '体积 (L)' }}
              </p>
              <p class="text-lg font-bold text-gray-800">
                {{ activeTab === 'constant-volume' 
                  ? simulation.currentPressure.toFixed(2) 
                  : simulation.currentVolume.toFixed(1) }}
              </p>
            </div>
            <div class="bg-gray-50 rounded-xl p-3 text-center">
              <p class="text-xs text-gray-600 font-medium mb-1">
                {{ activeTab === 'constant-volume' ? '体积 (L)' : '压力 (atm)' }}
              </p>
              <p class="text-lg font-bold text-gray-800">
                {{ activeTab === 'constant-volume' 
                  ? simulation.currentVolume.toFixed(1) 
                  : simulation.currentPressure.toFixed(2) }}
              </p>
            </div>
            <div class="bg-gray-50 rounded-xl p-3 text-center col-span-2 md:col-span-1">
              <p class="text-xs text-gray-600 font-medium mb-1">温度 (K)</p>
              <p class="text-lg font-bold text-gray-800">{{ simulation.temperature }}</p>
            </div>
          </div>

          <div class="space-y-3 mb-4">
            <div class="flex items-center gap-3">
              <span class="text-xs font-medium text-blue-600 w-20">N₂ 浓度</span>
              <ProgressBar 
                :value="concentrationPercentage(simulation.concentrations.N2)" 
                class="flex-1 h-3"
                styleClass="bg-blue-200"
                :valueStyle="{ backgroundColor: '#3b82f6' }"
              />
              <span class="text-xs font-mono text-gray-700 w-24 text-right">
                {{ simulation.concentrations.N2.toFixed(3) }} mol/L
              </span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xs font-medium text-red-600 w-20">H₂ 浓度</span>
              <ProgressBar 
                :value="concentrationPercentage(simulation.concentrations.H2)" 
                class="flex-1 h-3"
                styleClass="bg-red-200"
                :valueStyle="{ backgroundColor: '#ef4444' }"
              />
              <span class="text-xs font-mono text-gray-700 w-24 text-right">
                {{ simulation.concentrations.H2.toFixed(3) }} mol/L
              </span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xs font-medium text-green-600 w-20">He 浓度</span>
              <ProgressBar 
                :value="concentrationPercentage(simulation.concentrations.He)" 
                class="flex-1 h-3"
                styleClass="bg-green-200"
                :valueStyle="{ backgroundColor: '#22c55e' }"
              />
              <span class="text-xs font-mono text-gray-700 w-24 text-right">
                {{ simulation.concentrations.He.toFixed(3) }} mol/L
              </span>
            </div>
          </div>

          <div class="flex flex-wrap gap-3">
            <Button
              @click="simulation.addHelium(0.1)"
              class="flex-1 min-w-32"
              :class="activeTab === 'constant-volume' ? 'p-button-success' : 'p-button-help'"
            >
              <span class="flex items-center justify-center gap-2">
                <span class="text-lg">+</span>
                <span>添加 0.1mol He</span>
              </span>
            </Button>
            <Button
              @click="simulation.reset()"
              class="flex-1 min-w-32"
              severity="secondary"
            >
              <span class="flex items-center justify-center gap-2">
                <span>🔄</span>
                <span>重置系统</span>
              </span>
            </Button>
          </div>
        </div>

        <div class="space-y-6">
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4">当前浓度状态</h2>
            <div class="grid grid-cols-3 gap-4">
              <div class="text-center p-4 bg-blue-50 rounded-xl border-2 border-blue-100">
                <div class="w-12 h-12 mx-auto mb-2 rounded-full bg-blue-500 flex items-center justify-center">
                  <span class="text-white font-bold text-lg">N₂</span>
                </div>
                <p class="text-2xl font-bold text-blue-700">
                  {{ simulation.concentrations.N2.toFixed(3) }}
                </p>
                <p class="text-xs text-gray-500 mt-1">mol/L</p>
              </div>
              <div class="text-center p-4 bg-red-50 rounded-xl border-2 border-red-100">
                <div class="w-12 h-12 mx-auto mb-2 rounded-full bg-red-500 flex items-center justify-center">
                  <span class="text-white font-bold text-lg">H₂</span>
                </div>
                <p class="text-2xl font-bold text-red-700">
                  {{ simulation.concentrations.H2.toFixed(3) }}
                </p>
                <p class="text-xs text-gray-500 mt-1">mol/L</p>
              </div>
              <div class="text-center p-4 bg-green-50 rounded-xl border-2 border-green-100">
                <div class="w-12 h-12 mx-auto mb-2 rounded-full bg-green-500 flex items-center justify-center">
                  <span class="text-white font-bold text-lg">He</span>
                </div>
                <p class="text-2xl font-bold text-green-700">
                  {{ simulation.concentrations.He.toFixed(3) }}
                </p>
                <p class="text-xs text-gray-500 mt-1">mol/L</p>
              </div>
            </div>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4">科学原理</h2>
            <div class="space-y-4">
              <div class="p-4 bg-amber-50 rounded-xl border-l-4 border-amber-400">
                <h3 class="font-semibold text-amber-800 mb-2">理想气体定律</h3>
                <p class="text-sm text-amber-700 font-mono text-center py-2 bg-white/50 rounded">
                  PV = nRT
                </p>
              </div>

              <div 
                class="p-4 rounded-xl border-l-4"
                :class="activeTab === 'constant-volume' 
                  ? 'bg-blue-50 border-blue-400' 
                  : 'bg-emerald-50 border-emerald-400'"
              >
                <h3 
                  class="font-semibold mb-2"
                  :class="activeTab === 'constant-volume' ? 'text-blue-800' : 'text-emerald-800'"
                >
                  {{ activeTab === 'constant-volume' ? '恒温恒容条件' : '恒温恒压条件' }}
                </h3>
                <p 
                  class="text-sm"
                  :class="activeTab === 'constant-volume' ? 'text-blue-700' : 'text-emerald-700'"
                >
                  {{ activeTab === 'constant-volume' 
                    ? '在恒温恒容条件下，添加惰性气体(He)会增加总压力，但N₂和H₂的浓度保持不变。' 
                    : '在恒温恒压条件下，添加惰性气体(He)会使体积增大，导致N₂和H₂的浓度降低。' 
                  }}
                </p>
              </div>

              <div class="p-4 bg-purple-50 rounded-xl border-l-4 border-purple-400">
                <h3 class="font-semibold text-purple-800 mb-2">浓度计算</h3>
                <p class="text-sm text-purple-700 font-mono text-center py-2 bg-white/50 rounded">
                  C = n / V
                </p>
                <p class="text-xs text-purple-600 mt-2 text-center">
                  浓度 = 物质的量 / 体积
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <ConcentrationChart :data="simulation.concentrationHistory" />
      </div>

      <footer class="mt-8 text-center text-gray-500 text-sm">
        <p>气体浓度模拟器 - 基于理想气体定律的科学教育工具</p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Badge from 'primevue/badge'
import ProgressBar from 'primevue/progressbar'
import Button from 'primevue/button'
import ParticleSimulation from '../components/ParticleSimulation.vue'
import ConcentrationChart from '../components/ConcentrationChart.vue'
import { useGasSimulation } from '../composables/useGasSimulation'

const activeTab = ref<'constant-volume' | 'constant-pressure'>('constant-volume')

const cvSimulation = useGasSimulation('constant-volume')
const cpSimulation = useGasSimulation('constant-pressure')

const simulation = computed(() => {
  return activeTab.value === 'constant-volume' ? cvSimulation : cpSimulation
})

const volumeRatio = computed(() => {
  const baseVolume = 10
  return simulation.value.currentVolume / baseVolume
})

function concentrationPercentage(conc: number): number {
  const maxConc = 0.3
  return Math.min(100, (conc / maxConc) * 100)
}

watch(activeTab, (newTab) => {
  if (newTab === 'constant-volume') {
    cvSimulation.setMode('constant-volume')
  } else {
    cpSimulation.setMode('constant-pressure')
  }
})
</script>

<style scoped>
:deep(.p-progressbar) {
  border-radius: 9999px !important;
}

:deep(.p-progressbar-value) {
  border-radius: 9999px !important;
}

:deep(.p-button) {
  justify-content: center;
  font-weight: 600;
}

:deep(.p-badge) {
  font-weight: 600;
}
</style>
