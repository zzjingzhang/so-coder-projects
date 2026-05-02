<template>
  <div class="player-car-wrapper relative w-16 h-24">
    <div class="car-body absolute inset-0 flex flex-col items-center">
      <div class="car-front w-14 h-5 bg-racing-red rounded-t-lg relative">
        <div class="headlight-left absolute top-1 left-1 w-2 h-2 bg-yellow-400 rounded-full shadow-lg" 
             :class="{ 'animate-pulse': isBoosting }"
             :style="{ boxShadow: isBoosting ? '0 0 10px 3px rgba(250, 204, 21, 0.8)' : '0 0 5px 1px rgba(250, 204, 21, 0.5)' }"
        />
        <div class="headlight-right absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full shadow-lg"
             :class="{ 'animate-pulse': isBoosting }"
             :style="{ boxShadow: isBoosting ? '0 0 10px 3px rgba(250, 204, 21, 0.8)' : '0 0 5px 1px rgba(250, 204, 21, 0.5)' }"
        />
        <div class="grille absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gray-800 rounded-sm" />
      </div>
      
      <div class="car-roof w-12 h-8 bg-racing-red relative">
        <div class="windshield absolute inset-x-1 top-1 h-3 bg-blue-400 rounded-t-sm opacity-80" />
        <div class="side-mirror-left absolute -left-2 top-2 w-2 h-3 bg-racing-red rounded-sm" />
        <div class="side-mirror-right absolute -right-2 top-2 w-2 h-3 bg-racing-red rounded-sm" />
      </div>
      
      <div class="car-rear w-14 h-6 bg-racing-red rounded-b-lg relative">
        <div class="taillight-left absolute top-1 left-1 w-2 h-2 bg-red-600 rounded-sm"
             :class="{ 'animate-pulse-fast': isBoosting }"
             :style="{ boxShadow: isBoosting ? '0 0 8px 2px rgba(220, 38, 38, 0.8)' : 'none' }"
        />
        <div class="taillight-right absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-sm"
             :class="{ 'animate-pulse-fast': isBoosting }"
             :style="{ boxShadow: isBoosting ? '0 0 8px 2px rgba(220, 38, 38, 0.8)' : 'none' }"
        />
        <div class="rear-bumper absolute bottom-0 left-0 right-0 h-2 bg-gray-800 rounded-b-lg" />
      </div>
    </div>
    
    <div class="wheels absolute inset-0">
      <div class="wheel-front-left absolute -left-1 top-3 w-3 h-5 bg-gray-800 rounded-sm border border-gray-700">
        <div class="rim absolute inset-0.5 bg-gray-600 rounded-sm flex items-center justify-center">
          <div class="w-1 h-full bg-gray-700" />
        </div>
      </div>
      
      <div class="wheel-front-right absolute -right-1 top-3 w-3 h-5 bg-gray-800 rounded-sm border border-gray-700">
        <div class="rim absolute inset-0.5 bg-gray-600 rounded-sm flex items-center justify-center">
          <div class="w-1 h-full bg-gray-700" />
        </div>
      </div>
      
      <div class="wheel-rear-left absolute -left-1 bottom-3 w-3 h-5 bg-gray-800 rounded-sm border border-gray-700">
        <div class="rim absolute inset-0.5 bg-gray-600 rounded-sm flex items-center justify-center">
          <div class="w-1 h-full bg-gray-700" />
        </div>
      </div>
      
      <div class="wheel-rear-right absolute -right-1 bottom-3 w-3 h-5 bg-gray-800 rounded-sm border border-gray-700">
        <div class="rim absolute inset-0.5 bg-gray-600 rounded-sm flex items-center justify-center">
          <div class="w-1 h-full bg-gray-700" />
        </div>
      </div>
    </div>
    
    <div v-if="isBoosting" class="boost-effect absolute -bottom-3 left-1/2 transform -translate-x-1/2">
      <div class="flame-1 w-6 h-8 bg-gradient-to-t from-yellow-500 via-orange-500 to-transparent rounded-full animate-pulse opacity-80" />
      <div class="flame-2 absolute -left-2 bottom-0 w-4 h-6 bg-gradient-to-t from-yellow-400 via-orange-400 to-transparent rounded-full animate-pulse opacity-60" style="animationDelay: 0.1s" />
      <div class="flame-3 absolute -right-2 bottom-0 w-4 h-6 bg-gradient-to-t from-yellow-400 via-orange-400 to-transparent rounded-full animate-pulse opacity-60" style="animationDelay: 0.2s" />
    </div>
    
    <div class="shadow absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-black opacity-30 rounded-full blur-sm" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isBoosting?: boolean
}>()
</script>

<style scoped>
.car-body {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
}

.boost-effect {
  z-index: -1;
}

.flame-1,
.flame-2,
.flame-3 {
  animation: flicker 0.1s ease-in-out infinite alternate;
}

@keyframes flicker {
  0% { transform: scaleY(1); opacity: 0.8; }
  100% { transform: scaleY(1.2); opacity: 1; }
}
</style>
