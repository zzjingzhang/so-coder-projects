<template>
  <div
    class="game-cell"
    :class="{
      'has-water': cell.hasWater,
      'fixed': cell.isFixed,
      'clickable': !cell.isFixed && cell.type !== 'empty'
    }"
    @click="handleClick"
  >
    <div
      class="pipe-container"
      :style="{ transform: `rotate(${cell.rotation}deg)` }"
    >
      <!-- 空单元格 -->
      <template v-if="cell.type === 'empty'">
        <div class="empty-cell"></div>
      </template>

      <!-- 喷泉 -->
      <template v-else-if="cell.type === 'fountain'">
        <div class="fountain">
          <div class="fountain-water">
            <div class="water-drop"></div>
            <div class="water-drop"></div>
            <div class="water-drop"></div>
          </div>
          <div class="fountain-base"></div>
        </div>
        <div class="pipe-straight"></div>
      </template>

      <!-- 池塘 -->
      <template v-else-if="cell.type === 'pond'">
        <div class="pond">
          <div class="pond-water"></div>
          <div class="pond-edge"></div>
        </div>
        <div class="pipe-straight"></div>
      </template>

      <!-- 直线管道 -->
      <template v-else-if="cell.type === 'straight'">
        <div class="pipe-straight"></div>
      </template>

      <!-- 拐角管道 -->
      <template v-else-if="cell.type === 'corner'">
        <div class="pipe-corner"></div>
      </template>

      <!-- T型管道 -->
      <template v-else-if="cell.type === 't-shape'">
        <div class="pipe-t-shape"></div>
      </template>

      <!-- 十字管道 -->
      <template v-else-if="cell.type === 'cross'">
        <div class="pipe-cross"></div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GameCell } from '../types';

const props = defineProps<{
  cell: GameCell;
}>();

const emit = defineEmits<{
  (e: 'rotate', id: string): void;
}>();

const handleClick = () => {
  if (!props.cell.isFixed && props.cell.type !== 'empty') {
    emit('rotate', props.cell.id);
  }
};
</script>

<style scoped>
.game-cell {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.game-cell.clickable {
  cursor: pointer;
}

.game-cell.clickable:hover {
  background: rgba(240, 248, 255, 0.95);
  border-color: #409eff;
  transform: scale(1.02);
}

.game-cell.fixed {
  background: rgba(255, 250, 240, 0.95);
  cursor: not-allowed;
}

.game-cell.has-water::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.2), rgba(30, 144, 255, 0.2));
  animation: water-flow 1s ease-in-out infinite;
  pointer-events: none;
}

@keyframes water-flow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

.pipe-container {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

/* 空单元格 */
.empty-cell {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, #f5f5f5 0%, #e0e0e0 100%);
  border-radius: 8px;
}

/* 喷泉 */
.fountain {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  z-index: 2;
}

.fountain-base {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 15px;
  background: linear-gradient(180deg, #87ceeb 0%, #4682b4 100%);
  border-radius: 5px 5px 10px 10px;
}

.fountain-water {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
}

.water-drop {
  width: 6px;
  height: 15px;
  background: linear-gradient(180deg, #409eff 0%, #66b1ff 100%);
  border-radius: 50% 50% 50% 50%;
  animation: drip 1s ease-in-out infinite;
}

.water-drop:nth-child(1) { animation-delay: 0s; }
.water-drop:nth-child(2) { animation-delay: 0.2s; }
.water-drop:nth-child(3) { animation-delay: 0.4s; }

@keyframes drip {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(-10px); opacity: 0.7; }
}

/* 池塘 */
.pond {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 30px;
  z-index: 2;
}

.pond-water {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px;
  background: linear-gradient(180deg, #409eff 0%, #2d8cf0 50%, #1e6bb8 100%);
  border-radius: 50%;
  animation: pond-ripple 2s ease-in-out infinite;
}

.pond-edge {
  position: absolute;
  bottom: -2px;
  left: -2px;
  width: calc(100% + 4px);
  height: 25px;
  border: 3px solid #8b7355;
  border-radius: 50%;
  background: transparent;
}

@keyframes pond-ripple {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* 直线管道 */
.pipe-straight {
  position: relative;
  width: 100%;
  height: 100%;
}

.pipe-straight::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 16px;
  transform: translateY(-50%);
  background: linear-gradient(180deg, #a0a0a0 0%, #707070 50%, #505050 100%);
  border-radius: 8px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

.pipe-straight::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 4px;
  right: 4px;
  height: 8px;
  transform: translateY(-50%);
  background: linear-gradient(180deg, #409eff 0%, #66b1ff 100%);
  border-radius: 4px;
  opacity: 0.8;
}

/* 拐角管道 */
.pipe-corner {
  position: relative;
  width: 100%;
  height: 100%;
}

.pipe-corner::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 50%;
  height: 16px;
  transform: translateY(-50%);
  background: linear-gradient(180deg, #a0a0a0 0%, #707070 50%, #505050 100%);
  border-radius: 8px 0 0 8px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

.pipe-corner::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 16px;
  height: 50%;
  transform: translateX(-50%);
  background: linear-gradient(90deg, #a0a0a0 0%, #707070 50%, #505050 100%);
  border-radius: 8px 8px 0 0;
  box-shadow: inset 2px 0 4px rgba(0, 0, 0, 0.3);
}

/* T型管道 */
.pipe-t-shape {
  position: relative;
  width: 100%;
  height: 100%;
}

.pipe-t-shape::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 16px;
  transform: translateY(-50%);
  background: linear-gradient(180deg, #a0a0a0 0%, #707070 50%, #505050 100%);
  border-radius: 8px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

.pipe-t-shape::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 16px;
  height: 50%;
  transform: translateX(-50%);
  background: linear-gradient(90deg, #a0a0a0 0%, #707070 50%, #505050 100%);
  border-radius: 8px 8px 0 0;
  box-shadow: inset 2px 0 4px rgba(0, 0, 0, 0.3);
}

/* 十字管道 */
.pipe-cross {
  position: relative;
  width: 100%;
  height: 100%;
}

.pipe-cross::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 16px;
  transform: translateY(-50%);
  background: linear-gradient(180deg, #a0a0a0 0%, #707070 50%, #505050 100%);
  border-radius: 8px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

.pipe-cross::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 16px;
  transform: translateX(-50%);
  background: linear-gradient(90deg, #a0a0a0 0%, #707070 50%, #505050 100%);
  border-radius: 8px;
  box-shadow: inset 2px 0 4px rgba(0, 0, 0, 0.3);
}
</style>
