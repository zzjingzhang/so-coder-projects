<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
    <div class="max-w-[800px] mx-auto">
      <!-- 标题 -->
      <header class="text-center mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
          水电解动画教学
        </h1>
        <p class="text-gray-600 text-lg">
          探索水分子分解为氢气和氧气的化学过程
        </p>
      </header>

      <!-- 进度指示器 -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm font-medium text-gray-700">
            步骤 {{ currentStep }} / {{ steps.length }}
          </span>
          <span class="text-sm text-gray-500">
            {{ steps[currentStep - 1]?.title || '' }}
          </span>
        </div>
        
        <!-- 步骤进度条 -->
        <div class="flex justify-between mb-2">
          <button
            v-for="(step, index) in steps"
            :key="index"
            @click="goToStep(index + 1)"
            class="flex-1 text-center"
            :disabled="!isStepAccessible(index + 1)"
          >
            <div
              class="w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
              :class="getStepIndicatorClass(index + 1)"
            >
              {{ index + 1 }}
            </div>
          </button>
        </div>
        
        <!-- 进度条 -->
        <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500"
            :style="{ width: getProgressPercentage + '%' }"
          ></div>
        </div>
      </div>

      <!-- 动画展示区域 -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div class="mb-4">
          <h2 class="text-xl font-bold text-blue-800 mb-2">
            {{ steps[currentStep - 1]?.title }}
          </h2>
          <p class="text-gray-600">
            {{ steps[currentStep - 1]?.description }}
          </p>
        </div>

        <!-- SVG动画容器 -->
        <div class="relative bg-gradient-to-b from-gray-50 to-blue-50 rounded-xl overflow-hidden" style="height: 400px;">
          <svg
            viewBox="0 0 600 400"
            class="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- 背景 -->
            <defs>
              <!-- 渐变定义 -->
              <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#60a5fa;stop-opacity:0.3" />
                <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0.6" />
              </linearGradient>
              
              <linearGradient id="cathodeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#4b5563;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#6b7280;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#4b5563;stop-opacity:1" />
              </linearGradient>
              
              <linearGradient id="anodeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#4b5563;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#6b7280;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#4b5563;stop-opacity:1" />
              </linearGradient>
              
              <linearGradient id="activeCathode" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#1d4ed8;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#3b82f6;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
              </linearGradient>
              
              <linearGradient id="activeAnode" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#b91c1c;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#ef4444;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#b91c1c;stop-opacity:1" />
              </linearGradient>

              <!-- 气泡动画 -->
              <g id="bubbleGroup">
                <circle class="bubble" cx="0" cy="0" r="4" fill="#ffffff" opacity="0.7">
                  <animate attributeName="cy" from="0" to="-80" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.7" to="0" dur="2s" repeatCount="indefinite" />
                </circle>
              </g>
            </defs>

            <!-- 容器 -->
            <rect x="80" y="100" width="440" height="250" rx="10" fill="none" stroke="#94a3b8" stroke-width="3" />

            <!-- 水面 - 波浪效果 -->
            <path
              :d="getWavePath()"
              fill="url(#waterGradient)"
              class="transition-all duration-1000"
            />

            <!-- 电源 -->
            <g>
              <rect x="260" y="20" width="80" height="40" rx="5" fill="#1f2937" stroke="#374151" stroke-width="2" />
              <text x="300" y="45" text-anchor="middle" fill="white" font-size="14" font-weight="bold">电源</text>
              
              <!-- 正极标记 -->
              <circle cx="330" cy="40" r="6" fill="#ef4444" :class="currentStep >= 2 ? 'animate-pulse' : ''" />
              <text x="330" y="45" text-anchor="middle" fill="white" font-size="12" font-weight="bold">+</text>
              
              <!-- 负极标记 -->
              <circle cx="270" cy="40" r="6" fill="#3b82f6" :class="currentStep >= 2 ? 'animate-pulse' : ''" />
              <text x="270" y="45" text-anchor="middle" fill="white" font-size="12" font-weight="bold">-</text>
            </g>

            <!-- 电路连线 -->
            <g :class="currentStep >= 2 ? 'opacity-100' : 'opacity-50'" class="transition-opacity duration-500">
              <!-- 负极到阴极 -->
              <path
                d="M 270 46 L 270 100 L 180 100 L 180 130"
                fill="none"
                stroke="#3b82f6"
                stroke-width="3"
                :class="currentStep >= 3 ? 'animate-pulse' : ''"
              />
              
              <!-- 正极到阳极 -->
              <path
                d="M 330 46 L 330 100 L 420 100 L 420 130"
                fill="none"
                stroke="#ef4444"
                stroke-width="3"
                :class="currentStep >= 3 ? 'animate-pulse' : ''"
              />
            </g>

            <!-- 阴极（负极）-->
            <g>
              <rect
                x="165"
                y="130"
                width="30"
                height="180"
                rx="3"
                :fill="currentStep >= 3 ? 'url(#activeCathode)' : 'url(#cathodeGradient)'"
                class="transition-all duration-500"
              />
              
              <!-- 阴极标签 -->
              <text
                x="180"
                y="330"
                text-anchor="middle"
                :fill="currentStep >= 3 ? '#1d4ed8' : '#4b5563'"
                font-size="14"
                font-weight="bold"
              >
                阴极(-)
              </text>
              
              <!-- 阴极高亮效果 -->
              <rect
                v-if="currentStep >= 3"
                x="160"
                y="125"
                width="40"
                height="190"
                rx="5"
                fill="none"
                stroke="#60a5fa"
                stroke-width="2"
                opacity="0.5"
                class="animate-pulse"
              />
            </g>

            <!-- 阳极（正极）-->
            <g>
              <rect
                x="405"
                y="130"
                width="30"
                height="180"
                rx="3"
                :fill="currentStep >= 3 ? 'url(#activeAnode)' : 'url(#anodeGradient)'"
                class="transition-all duration-500"
              />
              
              <!-- 阳极标签 -->
              <text
                x="420"
                y="330"
                text-anchor="middle"
                :fill="currentStep >= 3 ? '#b91c1c' : '#4b5563'"
                font-size="14"
                font-weight="bold"
              >
                阳极(+)
              </text>
              
              <!-- 阳极高亮效果 -->
              <rect
                v-if="currentStep >= 3"
                x="400"
                y="125"
                width="40"
                height="190"
                rx="5"
                fill="none"
                stroke="#fca5a5"
                stroke-width="2"
                opacity="0.5"
                class="animate-pulse"
              />
            </g>

            <!-- 水分子 -->
            <g v-if="currentStep >= 1">
              <!-- 左侧水分子 -->
              <g v-for="i in 4" :key="'water-left-' + i" class="transition-all duration-1000">
                <circle
                  :cx="130 + (i % 2) * 15"
                  :cy="200 + Math.floor(i / 2) * 40"
                  r="12"
                  fill="#ef4444"
                  opacity="0.8"
                />
                <circle
                  :cx="122 + (i % 2) * 15"
                  :cy="190 + Math.floor(i / 2) * 40"
                  r="6"
                  fill="#60a5fa"
                  opacity="0.8"
                />
                <circle
                  :cx="138 + (i % 2) * 15"
                  :cy="190 + Math.floor(i / 2) * 40"
                  r="6"
                  fill="#60a5fa"
                  opacity="0.8"
                />
              </g>

              <!-- 右侧水分子 -->
              <g v-for="i in 4" :key="'water-right-' + i" class="transition-all duration-1000">
                <circle
                  :cx="450 + (i % 2) * 15"
                  :cy="200 + Math.floor(i / 2) * 40"
                  r="12"
                  fill="#ef4444"
                  opacity="0.8"
                />
                <circle
                  :cx="442 + (i % 2) * 15"
                  :cy="190 + Math.floor(i / 2) * 40"
                  r="6"
                  fill="#60a5fa"
                  opacity="0.8"
                />
                <circle
                  :cx="458 + (i % 2) * 15"
                  :cy="190 + Math.floor(i / 2) * 40"
                  r="6"
                  fill="#60a5fa"
                  opacity="0.8"
                />
              </g>
            </g>

            <!-- 步骤3：电子流动 -->
            <g v-if="currentStep >= 3">
              <!-- 电子从阴极流向水分子 -->
              <g v-for="i in 3" :key="'electron-cathode-' + i">
                <circle
                  :cx="180"
                  :cy="200 + i * 50"
                  r="3"
                  fill="#fbbf24"
                  class="animate-pulse"
                >
                  <animate
                    attributeName="cx"
                    values="180; 160"
                    :dur="(1 + i * 0.2) + 's'"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0; 1; 0"
                    :dur="(1 + i * 0.2) + 's'"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>

              <!-- 电子从水分子流向阳极 -->
              <g v-for="i in 3" :key="'electron-anode-' + i">
                <circle
                  :cx="400"
                  :cy="200 + i * 50"
                  r="3"
                  fill="#fbbf24"
                  class="animate-pulse"
                >
                  <animate
                    attributeName="cx"
                    values="440; 420"
                    :dur="(1 + i * 0.2) + 's'"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0; 1; 0"
                    :dur="(1 + i * 0.2) + 's'"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            </g>

            <!-- 步骤4：分子分解 -->
            <g v-if="currentStep >= 4">
              <!-- 氢离子（H+）向阴极移动 -->
              <g v-for="i in 3" :key="'h-ion-' + i">
                <circle
                  :cx="170 - i * 15"
                  :cy="220 + i * 30"
                  r="8"
                  fill="#60a5fa"
                  opacity="0.9"
                  class="animate-float"
                />
                <text
                  :cx="170 - i * 15"
                  :cy="224 + i * 30"
                  text-anchor="middle"
                  fill="white"
                  font-size="10"
                  font-weight="bold"
                >
                  H<tspan baseline-shift="super" font-size="8">+</tspan>
                </text>
              </g>

              <!-- 氢氧根离子（OH-）向阳极移动 -->
              <g v-for="i in 2" :key="'oh-ion-' + i">
                <circle
                  :cx="430 + i * 15"
                  :cy="230 + i * 40"
                  r="10"
                  fill="#a855f7"
                  opacity="0.9"
                  class="animate-float"
                />
                <text
                  :cx="430 + i * 15"
                  :cy="234 + i * 40"
                  text-anchor="middle"
                  fill="white"
                  font-size="9"
                  font-weight="bold"
                >
                  OH<tspan baseline-shift="super" font-size="7">-</tspan>
                </text>
              </g>
            </g>

            <!-- 步骤5：气泡产生 -->
            <g v-if="currentStep >= 5">
              <!-- 氢气气泡（阴极）- 2倍数量 -->
              <g v-for="i in 8" :key="'h2-bubble-' + i">
                <circle
                  :cx="160 + (i % 2) * 15"
                  :cy="280 - Math.floor(i / 2) * 30"
                  :r="5 + (i % 3)"
                  fill="#ffffff"
                  opacity="0.7"
                  stroke="#60a5fa"
                  stroke-width="1"
                >
                  <animate
                    attributeName="cy"
                    :values="(280 - Math.floor(i / 2) * 30) + '; ' + (140 - Math.floor(i / 2) * 20)"
                    :dur="(2 + i * 0.3) + 's'"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.7; 0.3; 0"
                    :dur="(2 + i * 0.3) + 's'"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>

              <!-- 氧气气泡（阳极）- 较少数量 -->
              <g v-for="i in 4" :key="'o2-bubble-' + i">
                <circle
                  :cx="405 + (i % 2) * 15"
                  :cy="290 - Math.floor(i / 2) * 40"
                  :r="6 + (i % 2)"
                  fill="#ffffff"
                  opacity="0.7"
                  stroke="#ef4444"
                  stroke-width="1"
                >
                  <animate
                    attributeName="cy"
                    :values="(290 - Math.floor(i / 2) * 40) + '; ' + (150 - Math.floor(i / 2) * 25)"
                    :dur="(2.5 + i * 0.4) + 's'"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.7; 0.3; 0"
                    :dur="(2.5 + i * 0.4) + 's'"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>

              <!-- 气体标签 -->
              <g>
                <rect x="110" y="140" width="50" height="25" rx="5" fill="rgba(96, 165, 250, 0.8)" />
                <text x="135" y="157" text-anchor="middle" fill="white" font-size="12" font-weight="bold">H₂</text>
              </g>
              <g>
                <rect x="440" y="140" width="50" height="25" rx="5" fill="rgba(239, 68, 68, 0.8)" />
                <text x="465" y="157" text-anchor="middle" fill="white" font-size="12" font-weight="bold">O₂</text>
              </g>

              <!-- 比例说明 -->
              <text x="300" y="360" text-anchor="middle" fill="#4b5563" font-size="14" font-weight="bold">
                产生比例: H₂ : O₂ = 2 : 1
              </text>
            </g>

            <!-- 水分子图例 -->
            <g transform="translate(50, 350)">
              <circle cx="10" cy="10" r="12" fill="#ef4444" opacity="0.8" />
              <text x="30" y="15" fill="#4b5563" font-size="12">O (氧原子)</text>
              
              <circle cx="100" cy="10" r="6" fill="#60a5fa" opacity="0.8" />
              <text x="115" y="15" fill="#4b5563" font-size="12">H (氢原子)</text>
            </g>
          </svg>
        </div>
      </div>

      <!-- 控制按钮 -->
      <div class="flex justify-center gap-4 mb-8">
        <button
          @click="previousStep"
          :disabled="currentStep === 1"
          class="px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
          :class="currentStep === 1 
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
            : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg'"
        >
          <span>←</span>
          <span>上一步</span>
        </button>
        
        <button
          @click="resetAnimation"
          class="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          重置
        </button>
        
        <button
          @click="nextStep"
          :disabled="currentStep === steps.length"
          class="px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
          :class="currentStep === steps.length 
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
            : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg'"
        >
          <span>下一步</span>
          <span>→</span>
        </button>
      </div>

      <!-- 化学方程式 -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 class="text-xl font-bold text-blue-900 mb-4 text-center">
          水电解反应方程式
        </h3>
        
        <div class="bg-blue-50 rounded-xl p-6 mb-4">
          <p class="text-center text-2xl font-mono text-blue-800 font-bold">
            2H₂O → 2H₂↑ + O₂↑
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-4">
          <!-- 阴极反应 -->
          <div class="bg-blue-50 rounded-xl p-4">
            <h4 class="font-bold text-blue-800 mb-2 flex items-center gap-2">
              <span class="w-3 h-3 bg-blue-500 rounded-full"></span>
              阴极反应（还原反应）
            </h4>
            <p class="text-lg font-mono text-gray-700">
              4H₂O + 4e⁻ → 2H₂↑ + 4OH⁻
            </p>
            <p class="text-sm text-gray-500 mt-2">
              水分子在阴极获得电子，被还原生成氢气
            </p>
          </div>
          
          <!-- 阳极反应 -->
          <div class="bg-red-50 rounded-xl p-4">
            <h4 class="font-bold text-red-800 mb-2 flex items-center gap-2">
              <span class="w-3 h-3 bg-red-500 rounded-full"></span>
              阳极反应（氧化反应）
            </h4>
            <p class="text-lg font-mono text-gray-700">
              2H₂O → O₂↑ + 4H⁺ + 4e⁻
            </p>
            <p class="text-sm text-gray-500 mt-2">
              水分子在阳极失去电子，被氧化生成氧气
            </p>
          </div>
        </div>
      </div>

      <!-- 思考问题 -->
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <h3 class="text-xl font-bold text-blue-900 mb-4">
          思考问题
        </h3>
        
        <div class="space-y-4">
          <!-- 问题1 -->
          <div class="border border-gray-200 rounded-xl overflow-hidden">
            <button
              @click="toggleQuestion(1)"
              class="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
            >
              <span class="font-medium text-gray-800">
                问题1：为什么电解水时，阴极产生的氢气量是阳极产生氧气量的两倍？
              </span>
              <span
                class="text-2xl text-blue-500 transition-transform duration-300"
                :class="expandedQuestions.includes(1) ? 'rotate-45' : ''"
              >
                +
              </span>
            </button>
            <div
              v-if="expandedQuestions.includes(1)"
              class="px-6 py-4 bg-green-50 border-t border-gray-200"
            >
              <h4 class="font-bold text-green-800 mb-2">答案：</h4>
              <p class="text-gray-700">
                根据化学方程式 2H₂O → 2H₂ + O₂，每分解2个水分子，产生2个氢气分子和1个氧气分子。
                从原子守恒的角度来看：
              </p>
              <ul class="list-disc list-inside mt-2 space-y-1 text-gray-700">
                <li>2个水分子包含：4个氢原子和2个氧原子</li>
                <li>4个氢原子 → 2个氢气分子 (H₂)</li>
                <li>2个氧原子 → 1个氧气分子 (O₂)</li>
              </ul>
              <p class="text-gray-700 mt-2">
                因此，氢气和氧气的体积比为 <strong>2:1</strong>。
              </p>
            </div>
          </div>

          <!-- 问题2 -->
          <div class="border border-gray-200 rounded-xl overflow-hidden">
            <button
              @click="toggleQuestion(2)"
              class="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
            >
              <span class="font-medium text-gray-800">
                问题2：在电解水过程中，为什么需要在水中加入电解质（如稀硫酸或氢氧化钠）？
              </span>
              <span
                class="text-2xl text-blue-500 transition-transform duration-300"
                :class="expandedQuestions.includes(2) ? 'rotate-45' : ''"
              >
                +
              </span>
            </button>
            <div
              v-if="expandedQuestions.includes(2)"
              class="px-6 py-4 bg-green-50 border-t border-gray-200"
            >
              <h4 class="font-bold text-green-800 mb-2">答案：</h4>
              <p class="text-gray-700">
                纯水中的离子浓度非常低（只有约 10⁻⁷ mol/L 的 H⁺ 和 OH⁻），导电性很差。加入电解质的目的是：
              </p>
              <ul class="list-disc list-inside mt-2 space-y-1 text-gray-700">
                <li><strong>增加导电性：</strong>电解质在水中解离成离子，提高溶液的导电能力</li>
                <li><strong>加速电解过程：</strong>更多的离子参与电荷传递，使电解反应更快进行</li>
                <li><strong>降低能耗：</strong>良好的导电性可以降低电解所需的电压</li>
              </ul>
              <p class="text-gray-700 mt-2">
                常用的电解质包括稀硫酸 (H₂SO₄)、氢氧化钠 (NaOH) 等，它们本身不参与电极反应，只起导电作用。
              </p>
            </div>
          </div>

          <!-- 问题3 -->
          <div class="border border-gray-200 rounded-xl overflow-hidden">
            <button
              @click="toggleQuestion(3)"
              class="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
            >
              <span class="font-medium text-gray-800">
                问题3：电解水在实际应用中有什么重要意义？
              </span>
              <span
                class="text-2xl text-blue-500 transition-transform duration-300"
                :class="expandedQuestions.includes(3) ? 'rotate-45' : ''"
              >
                +
              </span>
            </button>
            <div
              v-if="expandedQuestions.includes(3)"
              class="px-6 py-4 bg-green-50 border-t border-gray-200"
            >
              <h4 class="font-bold text-green-800 mb-2">答案：</h4>
              <p class="text-gray-700">
                电解水技术在多个领域具有重要应用价值：
              </p>
              <div class="grid md:grid-cols-2 gap-4 mt-3">
                <div class="bg-white p-3 rounded-lg">
                  <h5 class="font-bold text-blue-800 mb-1">🧪 氢能生产</h5>
                  <p class="text-sm text-gray-600">
                    利用可再生能源（太阳能、风能）电解水制取绿色氢气，是实现碳中和的重要途径
                  </p>
                </div>
                <div class="bg-white p-3 rounded-lg">
                  <h5 class="font-bold text-blue-800 mb-1">🚀 航天领域</h5>
                  <p class="text-sm text-gray-600">
                    火箭燃料（液氢）和生命支持系统的氧气供应，可通过电解水制备
                  </p>
                </div>
                <div class="bg-white p-3 rounded-lg">
                  <h5 class="font-bold text-blue-800 mb-1">🔬 实验室研究</h5>
                  <p class="text-sm text-gray-600">
                    制备高纯度氢气和氧气，用于化学实验和分析
                  </p>
                </div>
                <div class="bg-white p-3 rounded-lg">
                  <h5 class="font-bold text-blue-800 mb-1">🔋 能量存储</h5>
                  <p class="text-sm text-gray-600">
                    将多余电能转化为氢气存储，需要时通过燃料电池发电
                  </p>
                </div>
              </div>
              <p class="text-gray-700 mt-3">
                随着氢能经济的发展，电解水技术将在未来能源体系中扮演越来越重要的角色。
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 页脚 -->
      <footer class="text-center mt-8 text-gray-500 text-sm">
        <p>水电解动画教学演示 | 化学教育工具</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 当前步骤
const currentStep = ref(1)

// 展开的问题
const expandedQuestions = ref([])

// 步骤定义
const steps = [
  {
    id: 1,
    title: '初始状态',
    description: '电解槽中装有水（可加入电解质增强导电性），两个电极（阴极和阳极）浸入水中。电路尚未接通。'
  },
  {
    id: 2,
    title: '接通电源',
    description: '接通直流电源后，阴极连接电源负极，阳极连接电源正极。电路形成完整回路，电流开始流动。'
  },
  {
    id: 3,
    title: '电子流动',
    description: '电子从电源负极流向阴极，在阴极表面积累；同时阳极的电子被电源正极吸引，流向电源正极。电极开始带电。'
  },
  {
    id: 4,
    title: '分子分解',
    description: '在电场作用下，水分子（H₂O）发生电离：阴极附近的水分子获得电子被还原，阳极附近的水分子失去电子被氧化。离子开始向对应电极移动。'
  },
  {
    id: 5,
    title: '气体产生',
    description: '阴极：4H₂O + 4e⁻ → 2H₂↑ + 4OH⁻，产生氢气；阳极：2H₂O → O₂↑ + 4H⁺ + 4e⁻，产生氧气。氢气和氧气的体积比为 2:1。'
  }
]

// 计算属性
const getProgressPercentage = computed(() => {
  return ((currentStep.value - 1) / (steps.length - 1)) * 100
})

// 方法
const nextStep = () => {
  if (currentStep.value < steps.length) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const resetAnimation = () => {
  currentStep.value = 1
  expandedQuestions.value = []
}

const goToStep = (step) => {
  if (isStepAccessible(step)) {
    currentStep.value = step
  }
}

const isStepAccessible = (step) => {
  return step >= 1 && step <= steps.length
}

const getStepIndicatorClass = (step) => {
  if (step < currentStep.value) {
    return 'bg-green-500 text-white'
  } else if (step === currentStep.value) {
    return 'bg-blue-600 text-white scale-110 shadow-lg'
  } else {
    return 'bg-gray-200 text-gray-500'
  }
}

const getWavePath = () => {
  return `M 80 180 
    Q 130 170, 180 180 
    T 280 180 
    T 380 180 
    T 480 180 
    T 520 180 
    L 520 350 
    L 80 350 
    Z`
}

const toggleQuestion = (questionId) => {
  const index = expandedQuestions.value.indexOf(questionId)
  if (index === -1) {
    expandedQuestions.value.push(questionId)
  } else {
    expandedQuestions.value.splice(index, 1)
  }
}
</script>

<style scoped>
.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
</style>
