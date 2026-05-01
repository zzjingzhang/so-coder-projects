<template>
  <div class="game-board-container">
    <div
      class="game-board"
      :style="{
        gridTemplateColumns: `repeat(${cols}, 80px)`,
        gridTemplateRows: `repeat(${rows}, 80px)`
      }"
    >
      <GameCell
        v-for="cell in cells"
        :key="cell.id"
        :cell="cell"
        @rotate="handleRotate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import GameCell from './GameCell.vue';
import { GameCell as GameCellType, GameLevel } from '../types';
import { rotatePipe, checkWin, getWaterPath } from '../utils/gameUtils';

interface Props {
  level: GameLevel;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'win'): void;
}>();

const cells = ref<GameCellType[]>([]);
const rows = ref(0);
const cols = ref(0);

// 初始化关卡
const initLevel = () => {
  cells.value = props.level.cells.map(cell => ({ ...cell }));
  rows.value = props.level.rows;
  cols.value = props.level.cols;
  updateWaterFlow();
};

// 更新水流动状态
const updateWaterFlow = () => {
  const path = getWaterPath(cells.value, rows.value, cols.value);
  cells.value = cells.value.map(cell => ({
    ...cell,
    hasWater: path.includes(cell.id)
  }));
};

// 处理管道旋转
const handleRotate = (cellId: string) => {
  const cellIndex = cells.value.findIndex(c => c.id === cellId);
  if (cellIndex !== -1 && !cells.value[cellIndex].isFixed) {
    cells.value[cellIndex].rotation = rotatePipe(cells.value[cellIndex].rotation);
    updateWaterFlow();
    
    // 检查是否获胜
    if (checkWin(cells.value, rows.value, cols.value)) {
      emit('win');
    }
  }
};

// 监听关卡变化
watch(() => props.level, () => {
  initLevel();
}, { immediate: true });
</script>

<style scoped>
.game-board-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.game-board {
  display: grid;
  gap: 4px;
  background: rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}
</style>
