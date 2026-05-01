<template>
  <div class="game-container">
    <div class="game-header">
      <div class="level-info">
        <h2 class="level-title">
          第 {{ currentLevel?.id }} 关：{{ currentLevel?.name }}
        </h2>
        <el-tag :type="getLevelDifficulty()">
          {{ getLevelDifficultyText() }}
        </el-tag>
      </div>
      <div class="game-controls">
        <el-button @click="goHome" icon="el-icon-arrow-left">
          返回首页
        </el-button>
        <el-button type="warning" @click="resetGame" icon="el-icon-refresh">
          重置游戏
        </el-button>
        <el-button
          v-if="hasPrevLevel"
          @click="prevLevel"
          icon="el-icon-arrow-left"
        >
          上一关
        </el-button>
        <el-button
          v-if="hasNextLevel"
          type="primary"
          @click="nextLevel"
          icon="el-icon-arrow-right"
        >
          下一关
        </el-button>
      </div>
    </div>

    <div class="game-content">
      <GameBoard
        :key="gameKey"
        :level="currentLevel"
        @win="handleWin"
      />
    </div>

    <!-- 胜利弹窗 -->
    <el-dialog
      v-model="showWinDialog"
      title="🎉 恭喜你！"
      width="400px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="win-content">
        <div class="win-animation">
          <div class="water-flow">💧💧💧</div>
        </div>
        <p class="win-text">
          太棒了！你成功将水从喷泉引导到池塘！
        </p>
        <p class="win-subtext">
          管道已全部正确连接，水流畅通无阻！
        </p>
      </div>
      <template #footer>
        <div class="win-buttons">
          <el-button @click="resetGame">
            再玩一次
          </el-button>
          <el-button v-if="hasNextLevel" type="primary" @click="nextLevelAndClose">
            下一关
          </el-button>
          <el-button v-else type="primary" @click="goHome">
            返回首页
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import GameBoard from '../components/GameBoard.vue';
import { allLevels, GameLevel } from '../data/levels';

const router = useRouter();
const route = useRoute();

const gameKey = ref(0);
const showWinDialog = ref(false);
const currentLevelId = ref(1);

const currentLevel = computed<GameLevel | undefined>(() => {
  return allLevels.find(l => l.id === currentLevelId.value);
});

const hasPrevLevel = computed(() => currentLevelId.value > 1);
const hasNextLevel = computed(() => currentLevelId.value < allLevels.length);

const goHome = () => {
  router.push('/');
};

const resetGame = () => {
  showWinDialog.value = false;
  gameKey.value++;
};

const prevLevel = () => {
  if (hasPrevLevel.value) {
    currentLevelId.value--;
    gameKey.value++;
  }
};

const nextLevel = () => {
  if (hasNextLevel.value) {
    currentLevelId.value++;
    gameKey.value++;
  }
};

const nextLevelAndClose = () => {
  showWinDialog.value = false;
  nextLevel();
};

const handleWin = () => {
  showWinDialog.value = true;
  ElMessage.success('恭喜你通关了！');
};

const getLevelDifficulty = (): 'success' | 'warning' | 'danger' => {
  if (currentLevelId.value === 1) return 'success';
  if (currentLevelId.value === 2) return 'warning';
  return 'danger';
};

const getLevelDifficultyText = (): string => {
  if (currentLevelId.value === 1) return '简单';
  if (currentLevelId.value === 2) return '中等';
  return '困难';
};

onMounted(() => {
  const levelQuery = route.query.level;
  if (levelQuery) {
    const levelId = parseInt(levelQuery as string);
    if (!isNaN(levelId) && levelId >= 1 && levelId <= allLevels.length) {
      currentLevelId.value = levelId;
    }
  }
});
</script>

<style scoped>
.game-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.game-header {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 20px 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.level-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.level-title {
  font-size: 1.3rem;
  color: #303133;
  margin: 0;
  font-weight: bold;
}

.game-controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.game-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.win-content {
  text-align: center;
  padding: 20px 0;
}

.win-animation {
  margin-bottom: 20px;
}

.water-flow {
  font-size: 3rem;
  animation: water-fall 1s ease-in-out infinite;
}

@keyframes water-fall {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.win-text {
  font-size: 1.2rem;
  color: #303133;
  margin-bottom: 10px;
  font-weight: 500;
}

.win-subtext {
  font-size: 0.95rem;
  color: #909399;
  margin: 0;
}

.win-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

@media (max-width: 768px) {
  .game-container {
    padding: 10px;
  }

  .game-header {
    padding: 15px 20px;
    flex-direction: column;
    align-items: flex-start;
  }

  .level-info {
    width: 100%;
    justify-content: space-between;
  }

  .game-controls {
    width: 100%;
    justify-content: space-between;
  }

  .level-title {
    font-size: 1.1rem;
  }
}
</style>
