<template>
  <div class="roll-call-container">
    <div class="header-section">
      <h1 class="title">
        🎓 教课点名系统 🎓
      </h1>
      <p class="subtitle">趣味点名，快乐学习</p>
    </div>

    <div class="main-card">
      <div class="name-display-wrapper">
        <div
          class="name-display"
          :class="{ 'rolling-active': isRolling }"
        >
          <div v-if="isRolling && !selectedName" class="scrolling-wrapper">
            <div
              v-for="(name, index) in displayNames"
              :key="index"
              class="rolling-name"
            >
              {{ name }}
            </div>
          </div>
          <div
            v-else-if="selectedName"
            class="celebration-name"
          >
            🎉 {{ selectedName }} 🎉
          </div>
          <div v-else class="placeholder-text">
            点击下方按钮开始点名
          </div>
        </div>
      </div>

      <div class="button-wrapper">
        <button
          :disabled="isRolling"
          @click="handleRollCall"
          class="roll-button"
          :class="{ 
            'button-rolling': isRolling,
            'button-selected': selectedName 
          }"
        >
          <span v-if="isRolling" class="loading-dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </span>
          <span v-else>{{ buttonText }}</span>
        </button>
      </div>

      <div v-if="isRolling" class="countdown-wrapper">
        <span class="countdown-text">
          ⏰ 剩余时间: {{ countdown }} 秒
        </span>
      </div>
    </div>

    <div class="students-card">
      <h2 class="students-title">
        👥 所有同学 👥
      </h2>
      <div class="students-grid">
        <div
          v-for="(name, index) in students"
          :key="index"
          class="student-card"
          :class="getStudentCardClass(name)"
        >
          {{ name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from "vue";

const students = ref([
  "张三", "李四", "王五", "赵六", "钱七",
  "孙八", "刘刘", "黄一", "张久", "郭及",
  "黄小小", "陈友友", "赵词", "陈戉", "温开",
]);

const isRolling = ref(false);
const selectedName = ref("");
const countdown = ref(10);
const currentIndex = ref(0);
let rollInterval = null;
let countdownInterval = null;
let audioContext = null;
let oscillator = null;
let gainNode = null;

const displayNames = computed(() => {
  const names = [];
  for (let i = 0; i < 5; i++) {
    const index = (currentIndex.value + i) % students.value.length;
    names.push(students.value[index]);
  }
  return names;
});

const buttonText = computed(() => {
  if (selectedName.value) return "重新开始";
  return "开始点名";
});

const getStudentCardClass = (name) => {
  const classes = [];
  
  if (isRolling.value) {
    classes.push("card-rainbow");
  }
  
  if (selectedName.value && name === selectedName.value) {
    classes.push("card-selected");
  }
  
  return classes;
};

const playMusic = () => {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    oscillator = audioContext.createOscillator();
    gainNode = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);

    const notes = [
      523.25, 587.33, 659.25, 698.46, 783.99, 698.46, 659.25, 587.33,
    ];
    let noteIndex = 0;

    const playNote = () => {
      if (!oscillator || !isRolling.value) return;
      oscillator.frequency.setValueAtTime(notes[noteIndex], audioContext.currentTime);
      noteIndex = (noteIndex + 1) % notes.length;
    };

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    oscillator.start();
    setInterval(playNote, 200);
  } catch (e) {
    console.log("音乐播放失败:", e);
  }
};

const stopMusic = () => {
  if (oscillator) {
    try {
      oscillator.stop();
    } catch (e) {}
    oscillator = null;
  }
  if (audioContext) {
    try {
      audioContext.close();
    } catch (e) {}
    audioContext = null;
  }
};

const handleRollCall = () => {
  if (selectedName.value) {
    selectedName.value = "";
    isRolling.value = false;
    countdown.value = 10;
    currentIndex.value = 0;
    stopMusic();
    return;
  }

  if (isRolling.value) return;

  isRolling.value = true;
  countdown.value = 10;
  currentIndex.value = 0;
  playMusic();

  rollInterval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % students.value.length;
  }, 500);

  countdownInterval = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(rollInterval);
      clearInterval(countdownInterval);
      const randomIndex = Math.floor(Math.random() * students.value.length);
      selectedName.value = students.value[randomIndex];
      isRolling.value = false;
      stopMusic();
    }
  }, 1000);
};

onUnmounted(() => {
  if (rollInterval) clearInterval(rollInterval);
  if (countdownInterval) clearInterval(countdownInterval);
  stopMusic();
});
</script>

<style scoped>
/* 容器样式 */
.roll-call-container {
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

/* 头部样式 */
.header-section {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 0.5rem;
  font-family: 'Comic Sans MS', 'Marker Felt', cursive, sans-serif;
  margin: 0;
  line-height: 1.2;
}

.subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.85);
  font-family: 'Comic Sans MS', 'Marker Felt', cursive, sans-serif;
  margin: 0;
}

/* 卡片容器通用样式 */
.main-card {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 3rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 42rem;
  box-sizing: border-box;
}

.students-card {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 3rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 56rem;
  box-sizing: border-box;
}

/* 名字显示区域 */
.name-display-wrapper {
  margin-bottom: 2rem;
}

.name-display {
  background: linear-gradient(135deg, #dbeafe 0%, #f3e8ff 100%);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 4px solid #93c5fd;
  min-height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.name-display.rolling-active {
  border-color: #a855f7;
}

.scrolling-wrapper {
  width: 100%;
  height: 5rem;
  overflow: hidden;
  position: relative;
}

.rolling-name {
  font-size: 2.25rem;
  font-weight: bold;
  color: #7c3aed;
  text-align: center;
  padding: 1rem 0;
  font-family: 'Comic Sans MS', 'Marker Felt', cursive, sans-serif;
  animation: scrollUp 0.5s linear infinite;
  margin: 0;
}

.celebration-name {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  font-family: 'Comic Sans MS', 'Marker Felt', cursive, sans-serif;
  animation: celebrate 0.5s ease-in-out infinite, bounce 0.5s ease-in-out infinite;
  margin: 0;
}

.placeholder-text {
  font-size: 2rem;
  font-weight: bold;
  color: #9ca3af;
  text-align: center;
  font-family: 'Comic Sans MS', 'Marker Felt', cursive, sans-serif;
  margin: 0;
}

/* 按钮样式 */
.button-wrapper {
  display: flex;
  justify-content: center;
}

.roll-button {
  height: 4rem;
  padding: 0 3rem;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #f472b6 0%, #a855f7 100%);
  color: white;
  font-family: 'Comic Sans MS', 'Marker Felt', cursive, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
}

.roll-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.3);
}

.roll-button:active:not(:disabled) {
  transform: translateY(0);
}

.roll-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.roll-button.button-selected {
  background: linear-gradient(135deg, #4ade80 0%, #3b82f6 100%);
}

/* 加载动画 */
.loading-dots {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.dot {
  width: 0.75rem;
  height: 0.75rem;
  background-color: white;
  border-radius: 50%;
  animation: dotBounce 1.4s ease-in-out infinite both;
}

.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }
.dot:nth-child(3) { animation-delay: 0s; }

/* 倒计时 */
.countdown-wrapper {
  margin-top: 1.5rem;
  text-align: center;
}

.countdown-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: #f97316;
  font-family: 'Comic Sans MS', 'Marker Felt', cursive, sans-serif;
}

/* 学生名单 */
.students-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: #7c3aed;
  margin-bottom: 1.5rem;
  font-family: 'Comic Sans MS', 'Marker Felt', cursive, sans-serif;
  margin-top: 0;
}

.students-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

@media (min-width: 768px) {
  .students-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

.student-card {
  padding: 1rem;
  text-align: center;
  border-radius: 0.75rem;
  border: 2px solid #93c5fd;
  font-weight: bold;
  font-size: 1.125rem;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #eff6ff 0%, #faf5ff 100%);
  color: #1e293b;
  font-family: 'Comic Sans MS', 'Marker Felt', cursive, sans-serif;
  box-sizing: border-box;
}

.student-card.card-rainbow {
  animation: rainbowBorder 1s linear infinite;
}

.student-card.card-selected {
  background: linear-gradient(135deg, #fef3c7 0%, #ffedd5 100%);
  border-color: #fb923c;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
  transform: scale(1.1);
  z-index: 10;
}

/* 动画定义 */
@keyframes scrollUp {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
}

@keyframes celebrate {
  0%, 100% {
    transform: scale(1);
    color: #f43f5e;
  }
  25% {
    transform: scale(1.1);
    color: #14b8a6;
  }
  50% {
    transform: scale(1.2);
    color: #0ea5e9;
  }
  75% {
    transform: scale(1.1);
    color: #eab308;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes rainbowBorder {
  0% {
    box-shadow: 0 0 8px #ef4444, 0 0 16px #ef4444;
    border-color: #ef4444;
  }
  16% {
    box-shadow: 0 0 8px #f97316, 0 0 16px #f97316;
    border-color: #f97316;
  }
  33% {
    box-shadow: 0 0 8px #eab308, 0 0 16px #eab308;
    border-color: #eab308;
  }
  50% {
    box-shadow: 0 0 8px #22c55e, 0 0 16px #22c55e;
    border-color: #22c55e;
  }
  66% {
    box-shadow: 0 0 8px #3b82f6, 0 0 16px #3b82f6;
    border-color: #3b82f6;
  }
  83% {
    box-shadow: 0 0 8px #8b5cf6, 0 0 16px #8b5cf6;
    border-color: #8b5cf6;
  }
  100% {
    box-shadow: 0 0 8px #ef4444, 0 0 16px #ef4444;
    border-color: #ef4444;
  }
}

@keyframes dotBounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* 响应式调整 */
@media (max-width: 640px) {
  .roll-call-container {
    padding: 1rem;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .main-card, .students-card {
    padding: 1.5rem;
  }
  
  .rolling-name, .placeholder-text {
    font-size: 1.5rem;
  }
  
  .celebration-name {
    font-size: 1.75rem;
  }
  
  .roll-button {
    height: 3rem;
    padding: 0 1.5rem;
    font-size: 1.125rem;
  }
}
</style>
