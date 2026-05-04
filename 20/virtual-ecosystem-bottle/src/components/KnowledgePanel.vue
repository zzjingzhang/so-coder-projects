<template>
  <div class="glass-panel p-6 mt-6">
    <h2 class="text-xl font-bold text-white mb-4 flex items-center">
      <i class="pi pi-book mr-2"></i>科学知识
    </h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- 光合作用 -->
      <div class="glass-panel-dark p-5">
        <div class="flex items-center mb-4">
          <div class="w-10 h-10 rounded-full bg-green-500/30 flex items-center justify-center mr-3">
            <i class="pi pi-sun text-green-400 text-xl"></i>
          </div>
          <h3 class="text-white font-semibold">光合作用</h3>
        </div>
        <p class="text-white/70 text-sm mb-3">
          植物和藻类利用光能将二氧化碳和水转化为葡萄糖和氧气的过程。
        </p>
        <div class="bg-white/5 rounded-lg p-3 font-mono text-xs text-green-300">
          6CO₂ + 6H₂O + 光能 → C₆H₁₂O₆ + 6O₂
        </div>
        <ul class="mt-3 text-white/60 text-xs space-y-1">
          <li>• 吸收: CO₂ (二氧化碳)</li>
          <li>• 释放: O₂ (氧气)</li>
          <li>• 需要: 光照、叶绿素</li>
        </ul>
      </div>
      
      <!-- 呼吸作用 -->
      <div class="glass-panel-dark p-5">
        <div class="flex items-center mb-4">
          <div class="w-10 h-10 rounded-full bg-orange-500/30 flex items-center justify-center mr-3">
            <i class="pi pi-heart text-orange-400 text-xl"></i>
          </div>
          <h3 class="text-white font-semibold">呼吸作用</h3>
        </div>
        <p class="text-white/70 text-sm mb-3">
          所有生物细胞分解有机物释放能量的过程，消耗氧气产生二氧化碳。
        </p>
        <div class="bg-white/5 rounded-lg p-3 font-mono text-xs text-orange-300">
          C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 能量
        </div>
        <ul class="mt-3 text-white/60 text-xs space-y-1">
          <li>• 消耗: O₂ (氧气)</li>
          <li>• 产生: CO₂ (二氧化碳)</li>
          <li>• 目的: 释放能量供生命活动</li>
        </ul>
      </div>
      
      <!-- 气体平衡 -->
      <div class="glass-panel-dark p-5">
        <div class="flex items-center mb-4">
          <div class="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center mr-3">
            <i class="pi pi-compass text-blue-400 text-xl"></i>
          </div>
          <h3 class="text-white font-semibold">气体平衡</h3>
        </div>
        <p class="text-white/70 text-sm mb-3">
          健康的生态系统中，植物光合作用产生的氧气与生物呼吸消耗的氧气保持动态平衡。
        </p>
        <div class="flex items-center justify-center my-4">
          <div class="flex items-center gap-2">
            <div class="text-center">
              <span class="text-2xl">🌱</span>
              <p class="text-green-400 text-xs mt-1">植物</p>
            </div>
            <div class="flex flex-col items-center">
              <div class="flex items-center text-blue-400 text-xs">
                <span>O₂</span>
                <i class="pi pi-arrow-right mx-1"></i>
              </div>
              <div class="flex items-center text-orange-400 text-xs">
                <i class="pi pi-arrow-left mx-1"></i>
                <span>CO₂</span>
              </div>
            </div>
            <div class="text-center">
              <span class="text-2xl">🐟</span>
              <p class="text-orange-400 text-xs mt-1">动物</p>
            </div>
          </div>
        </div>
        <ul class="text-white/60 text-xs space-y-1">
          <li>• 植物过多 → 氧气过剩，CO₂不足</li>
          <li>• 动物过多 → 氧气不足，CO₂过剩</li>
          <li>• 平衡状态 → 生态系统健康</li>
        </ul>
      </div>
      
      <!-- 微生物作用 -->
      <div class="glass-panel-dark p-5">
        <div class="flex items-center mb-4">
          <div class="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center mr-3">
            <i class="pi pi-microchip text-purple-400 text-xl"></i>
          </div>
          <h3 class="text-white font-semibold">微生物的作用</h3>
        </div>
        <p class="text-white/70 text-sm mb-3">
          细菌和原生生物在生态系统中扮演分解者的角色，是物质循环的关键环节。
        </p>
        <div class="space-y-3">
          <div class="bg-white/5 rounded-lg p-3">
            <h4 class="text-purple-300 text-sm font-semibold mb-1">🦠 细菌</h4>
            <ul class="text-white/60 text-xs space-y-1">
              <li>• 分解有机物为无机物</li>
              <li>• 释放营养物质供植物吸收</li>
              <li>• 参与氮循环和碳循环</li>
            </ul>
          </div>
          <div class="bg-white/5 rounded-lg p-3">
            <h4 class="text-purple-300 text-sm font-semibold mb-1">🔬 原生生物</h4>
            <ul class="text-white/60 text-xs space-y-1">
              <li>• 捕食细菌控制种群</li>
              <li>• 促进营养物质循环</li>
              <li>• 作为食物网的基础环节</li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- 环境因素 -->
      <div class="glass-panel-dark p-5">
        <div class="flex items-center mb-4">
          <div class="w-10 h-10 rounded-full bg-yellow-500/30 flex items-center justify-center mr-3">
            <i class="pi pi-sliders-h text-yellow-400 text-xl"></i>
          </div>
          <h3 class="text-white font-semibold">环境因素影响</h3>
        </div>
        <p class="text-white/70 text-sm mb-3">
          光照、温度和营养水平直接影响生态系统的代谢速率和平衡状态。
        </p>
        <div class="space-y-3">
          <div class="flex items-start gap-2">
            <span class="text-xl">☀️</span>
            <div>
              <h4 class="text-yellow-300 text-sm font-semibold">光照强度</h4>
              <p class="text-white/60 text-xs">
                影响光合作用效率。光照越强，植物产氧越多，但过强可能抑制生长。
              </p>
            </div>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-xl">🌡️</span>
            <div>
              <h4 class="text-red-300 text-sm font-semibold">温度</h4>
              <p class="text-white/60 text-xs">
                影响酶的活性。20-28°C是大多数水生生物的适宜温度范围。
              </p>
            </div>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-xl">🧪</span>
            <div>
              <h4 class="text-green-300 text-sm font-semibold">营养水平</h4>
              <p class="text-white/60 text-xs">
                氮、磷等营养物质影响植物生长。过多可能导致富营养化。
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- pH值说明 -->
      <div class="glass-panel-dark p-5">
        <div class="flex items-center mb-4">
          <div class="w-10 h-10 rounded-full bg-cyan-500/30 flex items-center justify-center mr-3">
            <i class="pi pi-flask text-cyan-400 text-xl"></i>
          </div>
          <h3 class="text-white font-semibold">pH值与水质</h3>
        </div>
        <p class="text-white/70 text-sm mb-3">
          pH值反映水体的酸碱度，对水生生物的生存和代谢至关重要。
        </p>
        
        <!-- pH刻度条 -->
        <div class="my-4">
          <div class="flex justify-between text-xs text-white/60 mb-1">
            <span>0</span>
            <span>酸性</span>
            <span>7</span>
            <span>中性</span>
            <span>14</span>
            <span>碱性</span>
          </div>
          <div class="h-4 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 to-blue-500"></div>
          <div class="flex justify-between text-xs text-white/50 mt-1">
            <span>强酸</span>
            <span>弱酸</span>
            <span>中性</span>
            <span>弱碱</span>
            <span>强碱</span>
          </div>
        </div>
        
        <div class="bg-white/5 rounded-lg p-3">
          <h4 class="text-cyan-300 text-sm font-semibold mb-2">CO₂与pH的关系</h4>
          <ul class="text-white/60 text-xs space-y-1">
            <li>• CO₂溶于水形成碳酸 (H₂CO₃)</li>
            <li>• CO₂增加 → pH降低（酸性增强）</li>
            <li>• CO₂减少 → pH升高（碱性增强）</li>
            <li>• 适宜范围: pH 6.5 - 8.0</li>
          </ul>
        </div>
        
        <div class="mt-3 text-white/50 text-xs">
          <p>💡 提示：通过观察pH值变化可以间接了解生态系统的气体平衡状态。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>
