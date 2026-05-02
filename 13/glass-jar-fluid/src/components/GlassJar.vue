<template>
  <div class="glass-jar-container">
    <div class="jar-wrapper">
      <div class="glass-jar">
        <div class="liquid-container" :style="{ height: fillLevel * 100 + '%' }">
          <div class="liquid" :style="{ backgroundColor: liquidColor }">
            <div class="wave-wrapper">
              <div class="wave wave1" :style="{ background: getWaveColor(liquidColor) }"></div>
              <div class="wave wave2" :style="{ background: getWaveColor(liquidColor, 0.6) }"></div>
              <div class="wave wave3" :style="{ background: getWaveColor(liquidColor, 0.4) }"></div>
            </div>
            <div class="liquid-bubble"></div>
            <div class="liquid-bubble"></div>
            <div class="liquid-bubble"></div>
            <div class="liquid-bubble"></div>
            <div class="liquid-shimmer"></div>
          </div>
          <div class="liquid-glow" :style="{ backgroundColor: liquidColor }"></div>
        </div>
        <div class="jar-rim"></div>
        <div class="jar-neck"></div>
        <div class="jar-body"></div>
        <div class="jar-reflection"></div>
      </div>
    </div>
    <div class="jar-label">
      <h3 class="text-xl font-semibold text-white mb-2">{{ liquidName }}</h3>
      <p class="text-gray-300 text-sm">填充度: {{ Math.round(fillLevel * 100) }}%</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  liquidColor: {
    type: String,
    default: '#00d4ff'
  },
  liquidName: {
    type: String,
    default: '未知液体'
  },
  fillLevel: {
    type: Number,
    default: 0.7
  }
})

const getWaveColor = (color, opacity = 0.8) => {
  const hex = color.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}
</script>

<style scoped>
.glass-jar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1rem;
}

.jar-wrapper {
  position: relative;
  width: 200px;
  height: 300px;
  margin-bottom: 1.5rem;
}

.glass-jar {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0 0 30px 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 0 20px rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.jar-rim {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 20px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 10px 10px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
}

.jar-neck {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: 60px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border-left: 2px solid rgba(255, 255, 255, 0.3);
  border-right: 2px solid rgba(255, 255, 255, 0.3);
  border-top: none;
  border-bottom: none;
}

.jar-body {
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
}

.jar-reflection {
  position: absolute;
  top: 60px;
  left: 10%;
  width: 20%;
  height: 80%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  border-radius: 0 0 20px 20px;
  pointer-events: none;
  z-index: 10;
}

.liquid-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 0 0 28px 28px;
  overflow: hidden;
  transition: height 0.5s ease;
}

.liquid {
  position: relative;
  width: 100%;
  height: 100%;
  opacity: 0.85;
  overflow: hidden;
}

.wave-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  overflow: hidden;
}

.wave {
  position: absolute;
  left: -50%;
  width: 200%;
  height: 300%;
  border-radius: 40%;
  animation: waveSpin 10s linear infinite;
  transform-origin: center;
}

.wave1 {
  top: -150%;
  animation-duration: 8s;
}

.wave2 {
  top: -120%;
  animation-duration: 12s;
  animation-direction: reverse;
}

.wave3 {
  top: -90%;
  animation-duration: 15s;
  animation-delay: -5s;
}

.liquid-bubble {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.3));
  animation: bubbleRise 6s ease-in-out infinite;
}

.liquid-bubble:nth-child(4) {
  width: 10px;
  height: 10px;
  left: 18%;
  bottom: 12%;
  animation-delay: 0s;
}

.liquid-bubble:nth-child(5) {
  width: 7px;
  height: 7px;
  left: 38%;
  bottom: 18%;
  animation-delay: 1.5s;
}

.liquid-bubble:nth-child(6) {
  width: 12px;
  height: 12px;
  left: 58%;
  bottom: 8%;
  animation-delay: 0.8s;
}

.liquid-bubble:nth-child(7) {
  width: 6px;
  height: 6px;
  left: 78%;
  bottom: 22%;
  animation-delay: 2.2s;
}

.liquid-shimmer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.6) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%
  );
  animation: shimmerPulse 3s ease-in-out infinite;
}

.liquid-glow {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: inherit;
  opacity: 0.3;
  filter: blur(20px);
  animation: glowPulse 3s ease-in-out infinite alternate;
}

@keyframes waveSpin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes bubbleRise {
  0% {
    transform: translateY(0) translateX(0) scale(1);
    opacity: 0.7;
  }
  25% {
    transform: translateY(-40px) translateX(6px) scale(1.15);
    opacity: 0.9;
  }
  50% {
    transform: translateY(-80px) translateX(-4px) scale(0.95);
    opacity: 0.8;
  }
  75% {
    transform: translateY(-120px) translateX(5px) scale(1.1);
    opacity: 0.6;
  }
  100% {
    transform: translateY(-160px) translateX(0) scale(0.5);
    opacity: 0;
  }
}

@keyframes shimmerPulse {
  0%, 100% {
    transform: translateY(0) scaleY(1);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-3px) scaleY(1.2);
    opacity: 0.95;
  }
}

@keyframes glowPulse {
  0% {
    opacity: 0.2;
    filter: blur(15px);
  }
  100% {
    opacity: 0.5;
    filter: blur(25px);
  }
}

.jar-label {
  text-align: center;
}
</style>